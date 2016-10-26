"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

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
var Reatangle = function Reatangle(length, width) {
    (0, _classCallCheck3.default)(this, Reatangle);

    globalGetInterceptor(console, "log")(new.target === Reatangle);
    globalSetInterceptor(this, "length", length);
    globalSetInterceptor(this, "width", width);
};

var Square = function (_Reatangle) {
    (0, _inherits3.default)(Square, _Reatangle);

    function Square(length) {
        (0, _classCallCheck3.default)(this, Square);
        return (0, _possibleConstructorReturn3.default)(this, (Square.__proto__ || (0, _getPrototypeOf2.default)(Square)).call(this, length, length));
    }

    return Square;
}(Reatangle);

var obj = new Reatangle(3, 4); //true
//当子继承父类的时候 会返回子类的构造函数
var obj = new Square(3); //false