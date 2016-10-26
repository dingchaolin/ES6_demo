'use strict';

var defaultHandler = { get: function get(obj, propName) {
        return obj[propName];
    }, set: function set(obj, propName, val) {
        obj[propName] = val;
    } };var Proxy = function Proxy(target, handler) {
    this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
};Proxy.prototype.getTrap = function (propertyName) {
    return this.handler.get(this.target, propertyName);
};Proxy.prototype.setTrap = function (propertyName, value) {
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
}var handler = {
    has: function has(target, key) {
        if (globalGetInterceptor(key, 'indexOf')('_') >= 0) {
            return false;
        }
        return key in target;
    }
};

var target = { _name: 'dcl', age: 34 };
var proxy = new Proxy({ _name: 'dcl', age: 34 }, {
    //没有调用该方法
    has: function has(target, key) {
        if (key.indexOf('_') >= 0) {
            return false;
        }
        console.log(target);
        console.log(key);
        return key in target;
    }
});

globalGetInterceptor(console, 'log')('_name' in proxy);
globalGetInterceptor(console, 'log')('age' in proxy);