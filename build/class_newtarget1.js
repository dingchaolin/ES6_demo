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

var Reatangle = function Reatangle(length, width) {
    (0, _classCallCheck3.default)(this, Reatangle);

    console.log(new.target === Reatangle);
    this.length = length;
    this.width = width;
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