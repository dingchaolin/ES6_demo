'use strict';

var defaultHandler = { get: function get(obj, propName) {
        return obj[propName];
    }, set: function set(obj, propName, val) {
        obj[propName] = val;
    } };var Proxy = function Proxy(target, handler) {
    this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
};
Proxy.prototype.getTrap = function (propertyName) {
    return this.handler.get(this.target, propertyName);
};
Proxy.prototype.setTrap = function (propertyName, value) {
    this.handler.set(this.target, propertyName, value);
};function globalGetInterceptor(object, propertyName) {
    if (object instanceof Proxy) {
        return object.getTrap(propertyName);
    }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
        return value.bind(object);
    } else {
        return value;
    }
}function globalSetInterceptor(object, propertyName, value) {
    if (object instanceof Proxy) {
        return object.setTrap(propertyName, value);
    }defaultHandler.set(propertyName, value);
}function invariant(key, action) {
    if (globalGetInterceptor(key, 'indexOf')("_") >= 0) {
        globalGetInterceptor(console, 'log')('private attr:' + key + ', ' + action + ', NO!');
        return false;
    }
    return true;
}

//var handler = {
//    get( target, key ){
//        if( invariant( key, 'get') ){
//            return target[key];
//        }
//        return false;
//
//    },
//    set( target, key ){
//        if( invariant( key, 'set' ) ){
//            return true;
//        }
//
//
//    }
//
//
//}

var target = { _name: 'dcl', age: 34 };var proxy = new Proxy(target, {
    get: function get(target, key) {
        if (invariant(key, 'get')) {
            return target[key];
        }
        return false;
    },
    set: function set(target, key) {
        if (invariant(key, 'set')) {
            return true;
        }
    }
});

globalGetInterceptor(console, 'log')(globalGetInterceptor(proxy, '_name'));
globalGetInterceptor(console, 'log')(globalGetInterceptor(proxy, 'age'));