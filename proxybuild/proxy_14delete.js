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
} //deleteProperty 用于拦截delete操作
//如果deleteProperty抛出异常或者返回false 当前元素的属性就不会被删除
var handler = {
    deleteProperty: function deleteProperty(target, key) {
        invariant(key, 'delete');
        return true; //如果返回false会直接导致删除属性抛出异常
    }
};

function invariant(key, action) {
    if (globalGetInterceptor(key, 'indexOf')('_') == 0) {
        throw new Error("private!");
    }
}

var target = { _name: "dcl" };
var proxy = new Proxy(target, {
    deleteProperty: function deleteProperty(target, key) {
        invariant(key, 'delete');
        return true;
    }
});

delete globalGetInterceptor(proxy, '_name');