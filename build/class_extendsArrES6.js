"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
ES6 是先创建基类的this，然后再用子类构造函数修饰此this，使得父类的行为属性是可以继承的
 */
var MyArray = function (_Array) {
    (0, _inherits3.default)(MyArray, _Array);

    function MyArray() {
        var _ref;

        (0, _classCallCheck3.default)(this, MyArray);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return (0, _possibleConstructorReturn3.default)(this, (_ref = MyArray.__proto__ || (0, _getPrototypeOf2.default)(MyArray)).call.apply(_ref, [this].concat(args)));
    }

    return MyArray;
}(Array);

;

var ma = new Array();
ma[0] = 12;
console.log("ma[0]=" + ma[0]);
console.log("ma.length=" + ma.length);