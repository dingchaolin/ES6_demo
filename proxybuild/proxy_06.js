'use strict';

var defaultHandler = {
    get: function get(obj, propName) {
        return obj[propName];
    }, set: function set(obj, propName, val) {
        obj[propName] = val;
    } };var Proxy = function Proxy(target, handler) {
    this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;
    this.handler.set = this.handler.set || defaultHandler.set;
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
}function createArray() {
    var handler = {
        get: function get(target, key, receiver) {
            var index = Number(key);
            globalGetInterceptor(console, 'log')('index=' + index);
            if (index < 0) {
                key = String(globalGetInterceptor(target, 'length') + index);
            }
            return globalGetInterceptor(Reflect, 'get')(target, key, receiver);
        }
    };var target = [];
    globalGetInterceptor(target, 'push').apply(undefined, arguments);
    globalGetInterceptor(console, 'log')(target);
    return new Proxy(target, handler);
}

var arr = createArray('a', 'b', 'c');
globalGetInterceptor(console, 'log')(arr);