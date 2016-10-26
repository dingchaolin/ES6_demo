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

var defaultHandler = {
    get: function get(obj, propName) {
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
var ERROR = function ERROR() {
    (0, _classCallCheck3.default)(this, ERROR);
    globalSetInterceptor(this, "stack", "ERROR stack");
};

var ExtendableError = function (_Error) {
    (0, _inherits3.default)(ExtendableError, _Error);

    function ExtendableError(message) {
        (0, _classCallCheck3.default)(this, ExtendableError);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ExtendableError.__proto__ || (0, _getPrototypeOf2.default)(ExtendableError)).call(this));

        globalSetInterceptor(_this, "message", message);
        globalSetInterceptor(_this, "stack", globalGetInterceptor(new Error(), "stack"));
        globalSetInterceptor(_this, "name", globalGetInterceptor(globalGetInterceptor(_this, "constructor"), "name"));
        return _this;
    }

    return ExtendableError;
}(Error);

var ExtendableERROR = function (_ERROR) {
    (0, _inherits3.default)(ExtendableERROR, _ERROR);

    function ExtendableERROR(message) {
        (0, _classCallCheck3.default)(this, ExtendableERROR);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (ExtendableERROR.__proto__ || (0, _getPrototypeOf2.default)(ExtendableERROR)).call(this));

        globalSetInterceptor(_this2, "message", message);
        globalSetInterceptor(_this2, "stack", globalGetInterceptor(new ERROR(), "stack"));
        globalSetInterceptor(_this2, "name", globalGetInterceptor(globalGetInterceptor(_this2, "constructor"), "name"));
        return _this2;
    }

    return ExtendableERROR;
}(ERROR);

var MyError = function (_ExtendableError) {
    (0, _inherits3.default)(MyError, _ExtendableError);

    function MyError(m) {
        (0, _classCallCheck3.default)(this, MyError);
        return (0, _possibleConstructorReturn3.default)(this, (MyError.__proto__ || (0, _getPrototypeOf2.default)(MyError)).call(this, m));
    }

    return MyError;
}(ExtendableError);

var MyERROR = function (_ExtendableERROR) {
    (0, _inherits3.default)(MyERROR, _ExtendableERROR);

    function MyERROR(m) {
        (0, _classCallCheck3.default)(this, MyERROR);
        return (0, _possibleConstructorReturn3.default)(this, (MyERROR.__proto__ || (0, _getPrototypeOf2.default)(MyERROR)).call(this, m));
    }

    return MyERROR;
}(ExtendableERROR);
//原生构造函数的继承


var myerror = new MyError("out of range");
globalGetInterceptor(console, "log")("message=" + globalGetInterceptor(myerror, "message"));
globalGetInterceptor(console, "log")("name=" + globalGetInterceptor(myerror, "name"));
globalGetInterceptor(console, "log")("stack=" + globalGetInterceptor(myerror, "stack"));
//实例 myerror 是 Error的实例  继承Error的类 myerror都不是他们的实例
globalGetInterceptor(console, "log")(myerror instanceof Error); //ture
globalGetInterceptor(console, "log")(myerror instanceof MyError); //false
globalGetInterceptor(console, "log")(myerror instanceof ExtendableError); //false

//非原生构造函数的继承
var myERROR = new MyERROR("out of range");
globalGetInterceptor(console, "log")("message=" + globalGetInterceptor(myERROR, "message"));
globalGetInterceptor(console, "log")("name=" + globalGetInterceptor(myERROR, "name"));
globalGetInterceptor(console, "log")("stack=" + globalGetInterceptor(myERROR, "stack"));
//实例 myERROR 是 ERROR的实例  继承ERROR的类 myERROR都是他们的实例
globalGetInterceptor(console, "log")(myERROR instanceof ERROR); //ture
globalGetInterceptor(console, "log")(myERROR instanceof MyERROR); //true
globalGetInterceptor(console, "log")(myERROR instanceof ExtendableERROR); //true