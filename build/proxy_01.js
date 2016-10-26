"use strict";

var _set = require("babel-runtime/core-js/reflect/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("babel-runtime/core-js/reflect/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
因为ES5不支持proxy，需要安装plugin 才能实现proxy
 npm install babel-plugin-proxy --save-dev
 并在.babelrc 中添加plugins babel-plugin-proxy
 */

var obj = new Proxy({}, {
    get: function get(target, key, receiver) {
        console.log("get " + key);
        //console.log( arguments );
        return (0, _get2.default)(target, key, receiver);
    },
    set: function set(target, key, value, receiver) {
        console.log("set " + key);
        console.log("value = " + value);
        return (0, _set2.default)(target, key, value, receiver);
    }
});

obj.count = 2;

console.log(obj.count); //undefined  外部获取不到
obj.count = 3;