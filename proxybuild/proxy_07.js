"use strict";

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
} //链式调用   不能正常执行
var pipe = function () {
    return function (value) {
        var funcStack = [];
        var oproxy = new Proxy({}, {
            get: function get(pipeObject, fnName) {
                if (fnName === 'name') {
                    return funcStack.reduce(function (val, fn) {
                        return fn(val);
                    }, value);
                }
                funcStack.push(window[fnName]); //window is not defined
                return oproxy;
            }
        });
        return oproxy;
    };
}();

var double = function double(n) {
    return n * 2;
};
var pow = function pow(n) {
    return n * n;
};
var reverseInt = function reverseInt(n) {
    return globalGetInterceptor(globalGetInterceptor(globalGetInterceptor(globalGetInterceptor(n, "toString")(), "split")(""), "reverse")(), "join")("") | 0;
};
var n = globalGetInterceptor(globalGetInterceptor(globalGetInterceptor(globalGetInterceptor(pipe(3), "double"), "pow"), "reverseInt"), "get");
globalGetInterceptor(console, "log")(n);