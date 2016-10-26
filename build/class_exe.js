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
} //这里是一个能立即执行的类
//但是babel编译出的代码执行报错
/*
 C:\ES6\ES6_demo\node_modules\babel-runtime\helpers\classCallCheck.js:7
 throw new TypeError("Cannot call a class as a function");
 ^

 TypeError: Cannot call a class as a function
 at exports.default (C:\ES6\ES6_demo\node_modules\babel-runtime\helpers\class
 CallCheck.js:7:11)
 at _class (C:\ES6\ES6_demo\build\class_exe.js:17:38)
 at Object.<anonymous> (C:\ES6\ES6_demo\build\class_exe.js:29:4)
 at Module._compile (module.js:409:26)
 at Object.Module._extensions..js (module.js:416:10)
 at Module.load (module.js:343:32)
 at Function.Module._load (module.js:300:12)
 at Function.Module.runMain (module.js:441:10)
 at startup (node.js:139:18)
 at node.js:968:3

 */
var Person = function () {
  function _class(name) {
    (0, _classCallCheck3.default)(this, _class);

    globalSetInterceptor(this, 'name', name);
  }

  (0, _createClass3.default)(_class, [{
    key: 'sayName',
    value: function sayName() {
      globalGetInterceptor(console, 'log')(globalGetInterceptor(this, 'name'));
    }
  }]);
  return _class;
}()('dcl');

globalGetInterceptor(Person, 'sayName')();