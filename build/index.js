"use strict";

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

require("bable-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//解决浏览器兼容问题

var data = (0, _from2.default)("abcd");
var sum = function sum(n) {
    var total = 0;
    for (var i = 0; i < n; i++) {
        total += i;
    }
    return total;
};