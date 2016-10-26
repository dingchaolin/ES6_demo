"use strict";

var _set = require("babel-runtime/core-js/reflect/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("babel-runtime/core-js/reflect/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultHandler = { get: function get(obj, propName) {
        return obj[propName];
    }, set: function set(obj, propName, val) {
        obj[propName] = val;
    } };var Proxy = function Proxy(target, handler) {
    this.target = target;
    this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
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
} /*
  因为ES5不支持proxy，需要安装plugin 才能实现proxy
   npm install babel-plugin-proxy --save-dev
   并在.babelrc 中添加plugins babel-plugin-proxy
   添加这个之后 会影响别的 所以要注意
   */

var obj = new Proxy({}, {
    get: function get(target, key, receiver) {
        console.log("get " + key); //console.log( arguments );
        return (0, _get2.default)(target, key, receiver);
    },
    set: function set(target, key, value, receiver) {
        console.log("set " + key);
        console.log("value = " + value);
        return (0, _set2.default)(target, key, value, receiver);
    }
});

globalSetInterceptor(obj, "count", 2);

globalGetInterceptor(console, "log")(globalGetInterceptor(obj, "count")); //undefined  外部获取不到
globalSetInterceptor(obj, "count", 3);