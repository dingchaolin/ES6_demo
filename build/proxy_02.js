'use strict';

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var proxy1 = new Proxy({}, {
    get: function get(target, key) {
        return 35;
    }
});

//console.log( proxy1.name );//35
//console.log( proxy1.title );//35

//一个空的proxy对象
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'a';
console.log(target.a);

var obj = (0, _create2.default)(proxy);
var obj1 = (0, _create2.default)(proxy1);
console.log('obj1.time = ' + obj1.time);
console.log('obj.a = ' + obj.a);