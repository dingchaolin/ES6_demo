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
};
function globalGetInterceptor(object, propertyName) {
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
} //has 拦截对for in 不生效  has对in生效
var stu1 = { name: "zhangsan", "score": 59 };
var stu2 = { name: "lisi", "score": 99 };

var handler = {
    has: function has(target, prop) {
        if (prop === 'score' && globalGetInterceptor(target, "prop") < 60) {
            globalGetInterceptor(console, "log")(globalGetInterceptor(target, "name") + " \u4E0D\u53CA\u683C\uFF01");
            return false;
        }
        return prop in target;
    }
};

var proxy1 = new Proxy(stu1, handler);
var proxy2 = new Proxy(stu2, handler);

'score' in proxy1; // zhangsan 不及格  false
'score' in proxy2; //true

for (var a in proxy1) {
    globalGetInterceptor(console, "log")(globalGetInterceptor(proxy1, "a"));
}
//zhangsan 59

for (var b in proxy2) {
    globalGetInterceptor(console, "log")(globalGetInterceptor(proxy2, "b"));
}
//lisi 99