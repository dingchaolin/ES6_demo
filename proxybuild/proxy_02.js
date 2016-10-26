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
}var proxy1 = new Proxy({}, {
    get: function get(target, key) {
        return 35;
    }
});

//console.log( proxy1.name );//35
//console.log( proxy1.title );//35

//一个空的proxy对象
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
globalSetInterceptor(proxy, 'a', 'a');
globalGetInterceptor(console, 'log')(globalGetInterceptor(target, 'a'));

var obj = globalGetInterceptor(Object, 'create')(proxy);
var obj1 = globalGetInterceptor(Object, 'create')(proxy1);
globalGetInterceptor(console, 'log')('obj1.time = ' + globalGetInterceptor(obj1, 'time'));globalGetInterceptor(console, 'log')('obj.a = ' + globalGetInterceptor(obj, 'a'));