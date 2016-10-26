"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
}
var CustomHTMLElement = function () {
    function CustomHTMLElement(element) {
        (0, _classCallCheck3.default)(this, CustomHTMLElement);

        globalSetInterceptor(this, "element", element);
    }

    (0, _createClass3.default)(CustomHTMLElement, [{
        key: "html",
        get: function get() {
            return globalGetInterceptor(globalGetInterceptor(this, "element"), "innerHTML");
        },
        set: function set(value) {
            globalSetInterceptor(globalGetInterceptor(this, "element"), "innerHTML", value);
        }
    }]);
    return CustomHTMLElement;
}();

var descriptor = globalGetInterceptor(Object, "getOwnPropertyDescriptor")(globalGetInterceptor(CustomHTMLElement, "prototype"), "html");

globalGetInterceptor(console, "log")(("get" in descriptor) + "," + ("set" in descriptor)); //true, true
globalGetInterceptor(console, "log")(descriptor);
/*
 { get: [Function: get],
 set: [Function: set],
 enumerable: false,
 configurable: true }

 */