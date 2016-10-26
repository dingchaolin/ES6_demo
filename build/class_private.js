'use strict';

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

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
};

Proxy.prototype.setTrap = function (propertyName, value) {
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
} //私有方法 ES6暂时不提供
var MyClass = function () {
    function MyClass(name) {
        (0, _classCallCheck3.default)(this, MyClass);

        globalSetInterceptor(this, '_name', name);
    }

    (0, _createClass3.default)(MyClass, [{
        key: '_privete_GetName',
        value: function _privete_GetName() {
            return globalGetInterceptor(this, '_name');
        }
    }, {
        key: 'getName',
        value: function getName() {
            return globalGetInterceptor(this, '_privete_GetName')();
        }
    }]);
    return MyClass;
}();

var inst = new MyClass('dcl');
globalGetInterceptor(console, 'log')(globalGetInterceptor(inst, 'getName')());

//将私有方法放到class外部 就能实现private
function _setName(name) {
    globalSetInterceptor(this, 'name', name);
}
var MyClass2 = function () {
    function MyClass2(name) {
        (0, _classCallCheck3.default)(this, MyClass2);

        globalSetInterceptor(this, 'name', name);
    }

    (0, _createClass3.default)(MyClass2, [{
        key: 'setName',
        value: function setName(name) {
            globalGetInterceptor(_setName, 'call')(this, name);
        }
    }, {
        key: 'getName',
        value: function getName() {
            return globalGetInterceptor(this, 'name');
        }
    }]);
    return MyClass2;
}();

var inst2 = new MyClass2('dcl');
globalGetInterceptor(inst2, 'setName')('ys');
globalGetInterceptor(console, 'log')(globalGetInterceptor(inst2, 'getName')());

//使用symbol实现私有
var name = (0, _symbol2.default)("name");
var getName = (0, _symbol2.default)("getName");

var MyClass3 = function () {
    function MyClass3(_name) {
        (0, _classCallCheck3.default)(this, MyClass3);

        globalSetInterceptor(this, 'name', _name);
    }

    (0, _createClass3.default)(MyClass3, [{
        key: getName,
        value: function value() {
            return globalGetInterceptor(this, 'name');
        }
    }, {
        key: 'getMyName',
        value: function getMyName() {
            return globalGetInterceptor(this, 'getName')();
        }
    }]);
    return MyClass3;
}();

var inst3 = new MyClass3('SkyVio');
globalGetInterceptor(console, 'log')(globalGetInterceptor(inst3, 'getMyName')());
//console.log( inst3.getName() );//报错 getName is not a function