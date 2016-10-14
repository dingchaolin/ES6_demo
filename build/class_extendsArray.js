'use strict';

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MyArray() {
    Array.apply(this, arguments); //这行代码没有正确执行 原生构造函数的this无法绑定 导致拿不到内部属性
}
/*
ES5 继承实现的机制是先新建子类的this对象，再将基类的属性添加到子类对象上面，由于基类的内部属性拿不到 导致子类无法继承原生对象
 */
MyArray.prototype = (0, _create2.default)(Array.prototype, {
    constructor: {
        value: MyArray,
        writable: true,
        configurable: true,
        enumerable: true
    }
});

var colors = new MyArray();
colors[0] = 'red';
console.log(colors[0]);
//console.log( `{length=${colors.length} );