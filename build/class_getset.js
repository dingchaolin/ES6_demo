"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyClass = function () {
    function MyClass() {
        (0, _classCallCheck3.default)(this, MyClass);
    }

    (0, _createClass3.default)(MyClass, [{
        key: "prop",
        get: function get() {
            return "getter";
        },
        set: function set(value) {
            console.log("setter = " + value);
        }
    }]);
    return MyClass;
}();

var myclass = new MyClass();
myclass.prop = 123;
console.log(myclass.prop);