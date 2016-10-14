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

var ERROR = function ERROR() {
    (0, _classCallCheck3.default)(this, ERROR);

    this.stack = "ERROR stack";
};

var ExtendableError = function (_Error) {
    (0, _inherits3.default)(ExtendableError, _Error);

    function ExtendableError(message) {
        (0, _classCallCheck3.default)(this, ExtendableError);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ExtendableError.__proto__ || (0, _getPrototypeOf2.default)(ExtendableError)).call(this));

        _this.message = message;
        _this.stack = new Error().stack;
        _this.name = _this.constructor.name;
        return _this;
    }

    return ExtendableError;
}(Error);

var ExtendableERROR = function (_ERROR) {
    (0, _inherits3.default)(ExtendableERROR, _ERROR);

    function ExtendableERROR(message) {
        (0, _classCallCheck3.default)(this, ExtendableERROR);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (ExtendableERROR.__proto__ || (0, _getPrototypeOf2.default)(ExtendableERROR)).call(this));

        _this2.message = message;
        _this2.stack = new ERROR().stack;
        _this2.name = _this2.constructor.name;
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
console.log("message=" + myerror.message);
console.log("name=" + myerror.name);
console.log("stack=" + myerror.stack);
//实例 myerror 是 Error的实例  继承Error的类 myerror都不是他们的实例
console.log(myerror instanceof Error); //ture
console.log(myerror instanceof MyError); //false
console.log(myerror instanceof ExtendableError); //false

//非原生构造函数的继承
var myERROR = new MyERROR("out of range");
console.log("message=" + myERROR.message);
console.log("name=" + myERROR.name);
console.log("stack=" + myERROR.stack);
//实例 myERROR 是 ERROR的实例  继承ERROR的类 myERROR都是他们的实例
console.log(myERROR instanceof ERROR); //ture
console.log(myERROR instanceof MyERROR); //true
console.log(myERROR instanceof ExtendableERROR); //true