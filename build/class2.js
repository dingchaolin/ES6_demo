'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//使用表达式的形式定义类

var myClass = function () {
    //也可省略Me  let myClass = class{ ... }
    function Me(name) {
        (0, _classCallCheck3.default)(this, Me);

        this.name = name;
    }
    //Me只能在代码内部使用 指代当前类


    (0, _createClass3.default)(Me, [{
        key: 'getMyName',
        value: function getMyName() {
            console.log('Me=' + Me);
            /*
             Me=function Me(name) {
             (0, _classCallCheck3.default)(this, Me);
               this.name = name;
             }
             */
            return this.name;
        }
    }]);
    return Me;
}();

var inst = new myClass('dcl');
console.log(inst.getMyName());