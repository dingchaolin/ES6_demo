"use strict";

var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomHTMLElement = function () {
    function CustomHTMLElement(element) {
        (0, _classCallCheck3.default)(this, CustomHTMLElement);

        this.element = element;
    }

    (0, _createClass3.default)(CustomHTMLElement, [{
        key: "html",
        get: function get() {
            return this.element.innerHTML;
        },
        set: function set(value) {
            this.element.innerHTML = value;
        }
    }]);
    return CustomHTMLElement;
}();

var descriptor = (0, _getOwnPropertyDescriptor2.default)(CustomHTMLElement.prototype, "html");

console.log(("get" in descriptor) + "," + ("set" in descriptor)); //true, true
console.log(descriptor);
/*
 { get: [Function: get],
 set: [Function: set],
 enumerable: false,
 configurable: true }

 */