'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultHandler = { get: function get(obj, propName) {
        return obj[propName];
    },
    set: function set(obj, propName, val) {
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
} //使用表达式的形式定义类

var myClass = function () {
    //也可省略Me  let myClass = class{ ... }
    function Me(name) {
        (0, _classCallCheck3.default)(this, Me);
        globalSetInterceptor(this, 'name', name);
    }
    //Me只能在代码内部使用 指代当前类


    (0, _createClass3.default)(Me, [{
        key: 'getMyName',
        value: function getMyName() {
            globalGetInterceptor(console, 'log')('Me=' + Me);
            /*
             Me=function Me(name) {
             (0, _classCallCheck3.default)(this, Me);
               this.name = name;
             }
             */
            return globalGetInterceptor(this, 'name');
        }
    }]);
    return Me;
}();

var inst = new myClass('dcl');
globalGetInterceptor(console, 'log')(globalGetInterceptor(inst, 'getMyName')());