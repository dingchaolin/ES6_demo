'use strict';

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultHandler = { get: function get(obj, propName) {
        return obj[propName];
    }, set: function set(obj, propName, val) {
        obj[propName] = val;
    } };var Proxy = function Proxy(target, handler) {
    this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
};
Proxy.prototype.getTrap = function (propertyName) {
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
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, key) {
        if (globalGetInterceptor(key, 'indexOf')('_') == 0) {
            return; //返回undefined
        }
        return globalGetInterceptor(Object, 'getOwnPropertyDescriptor')(target, key);
    }
};

var target = { _name: 'dcl', age: 23 };

var proxy = new Proxy({ _name: 'dcl', age: 23 }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, key) {
        if (key.indexOf('_') == 0) {
            return;
        }
        return (0, _getOwnPropertyDescriptor2.default)(target, key);
    }
});

var obj1 = globalGetInterceptor(Object, 'getOwnPropertyDescriptor')(proxy, 'heigth'); //undefined
var obj2 = globalGetInterceptor(Object, 'getOwnPropertyDescriptor')(proxy, '_name'); //undefined
var obj3 = globalGetInterceptor(Object, 'getOwnPropertyDescriptor')(proxy, 'age'); //// { value: 'age', writable: true, enumerable: true, configurable: true }
globalGetInterceptor(console, 'log')(obj1, obj2, obj3);