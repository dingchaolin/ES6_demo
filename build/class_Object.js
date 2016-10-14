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

var NewObj = function (_Object) {
    (0, _inherits3.default)(NewObj, _Object);

    function NewObj() {
        (0, _classCallCheck3.default)(this, NewObj);
        return (0, _possibleConstructorReturn3.default)(this, (NewObj.__proto__ || (0, _getPrototypeOf2.default)(NewObj)).apply(this, arguments));
    }

    return NewObj;
}(Object);

var o = new NewObj({ attr: true });
console.log(o.attr === true);