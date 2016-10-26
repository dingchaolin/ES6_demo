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
}globalSetInterceptor(globalGetInterceptor(Function, 'prototype'), 'Apply', function (thisObj, arrArguments) {
    thisObj = thisObj || window;
    globalSetInterceptor(thisObj, 'method', this);
    var runMethod;
    if (!arrArguments) {
        runMethod = globalGetInterceptor(thisObj, 'method')();
    } else {
        var args = [];
        for (var i = 0, len = globalGetInterceptor(arrArguments, 'length'); i < len; i++) {
            globalGetInterceptor(args, 'push')('arrArguments[' + i + ']');
        }
        runMethod = eval("thisObj.method(" + args + ")");
    }
    delete globalGetInterceptor(thisObj, 'method');
    return runMethod;
});
globalSetInterceptor(globalGetInterceptor(Function, 'prototype'), 'Call', function () {
    return globalGetInterceptor(this, 'Apply')(globalGetInterceptor(globalGetInterceptor(globalGetInterceptor(Array, 'prototype'), 'shift'), 'Apply')(arguments), arguments);
});

//var obj = {};
//function f(a,b,c) {
//    console.log(this == obj);//看看Apply和Call 是不是把函数内的this 指向了 obj对象
//    console.log(a + b + c);
//}
//f(1, 2, 3);
//f.Apply(obj, [4, 5, 6]);
//f.Call(obj, 7, 8, 9);

function Person(name, age) {
    globalSetInterceptor(this, 'name', name);
    globalSetInterceptor(this, 'age', age);
}

var p1 = new Person('dcl', 12);
globalGetInterceptor(console, 'log')(p1);

var obj = {};

globalGetInterceptor(Person, 'Apply')(obj, ['ddd', 24]);
globalGetInterceptor(console, 'log')(obj);