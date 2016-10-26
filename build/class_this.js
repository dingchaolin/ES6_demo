'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultHandler = { get: function get(obj, propName) {
        return obj[propName];
    }, set: function set(obj, propName, val) {
        obj[propName] = val;
    } };var Proxy = function Proxy(target, handler) {
    this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
};Proxy.prototype.getTrap = function (propertyName) {
    return this.handler.get(this.target, propertyName);
};Proxy.prototype.setTrap = function (propertyName, value) {
    this.handler.set(this.target, propertyName, value);
};function globalGetInterceptor(object, propertyName) {
    if (object instanceof Proxy) {
        return object.getTrap(propertyName);
    }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
        return value.bind(object);
    } else {
        return value;
    }
}function globalSetInterceptor(object, propertyName, value) {
    if (object instanceof Proxy) {
        return object.setTrap(propertyName, value);
    }defaultHandler.set(propertyName, value);
}
var Logger = function () {
    function Logger() {
        var _this = this;

        (0, _classCallCheck3.default)(this, Logger);

        //使用箭头函数能够避免this指向丢失的问题  因为的箭头函数的this时钟指向自身
        globalSetInterceptor(this, 'printName_arrow', function () {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dcl';

            globalGetInterceptor(_this, 'print')('Hello ' + name);
        });
        //在构造中bind this也能解决此问题
        globalSetInterceptor(this, 'printName_bindThis', globalGetInterceptor(globalGetInterceptor(this, 'printName_bindThis'), 'bind')(this));
    }

    (0, _createClass3.default)(Logger, [{
        key: 'printName',
        value: function printName() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dcl';

            globalGetInterceptor(this, 'print')('Hello ' + name);
        }
    }, {
        key: 'printName_bindThis',
        value: function printName_bindThis() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dcl';

            globalGetInterceptor(this, 'print')('Hello ' + name);
        }
    }, {
        key: 'print',
        value: function print(text) {
            globalGetInterceptor(console, 'log')(text);
        }
    }]);
    return Logger;
}();

var logger = new Logger();

//解构赋值  找不到this
var printName = logger.printName;
var print = logger.print;
var printName_arrow = logger.printName_arrow;
var printName_bindThis = logger.printName_bindThis;


print('dcl');
//printName();//报错  this指向丢失
printName_arrow('arrow function'); //使用箭头函数能够避免this指向丢失的问题
printName_bindThis('bind this'); //在构造中使用bind方法绑定this也能解决此问题