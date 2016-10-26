"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

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
};
function globalGetInterceptor(object, propertyName) {
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
var A = function A() {
  (0, _classCallCheck3.default)(this, A);
};

var B = function (_A) {
  (0, _inherits3.default)(B, _A);

  function B() {
    (0, _classCallCheck3.default)(this, B);
    return (0, _possibleConstructorReturn3.default)(this, (B.__proto__ || (0, _getPrototypeOf2.default)(B)).apply(this, arguments));
  }

  return B;
}(A);

/*
1.子类的__proto__属性，表示构造函数的继承 总是指向父类
2.子类的prototype的__proto__属性，表示方法的继承，总是指向父类的prototype属性
 */
globalGetInterceptor(console, "log")(globalGetInterceptor(globalGetInterceptor(B, "prototype"), "__proto__") == globalGetInterceptor(A, "prototype")); //true
globalGetInterceptor(console, "log")(globalGetInterceptor(B, "__proto__") == A); //true

/*
class A{}
class B{}
Object.setPrototypeOf( B.prototype, A.prototype );//B继承A的实例
//上面一行代码相当于：
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf( B, A);//B继承A的静态属性
//上面一行代码相当于
B.__proto__ = A;

//setPrototypeOf实现如下：
Object.setPrototypeOf = function( obj, proto ){
    obj.__proto__ = proto;
}

Object.create( A.prototype );
//等同于
B.prototype.__proto__ = A.prototype;


 */ //判断一个类是否继承了另一个类
globalGetInterceptor(console, "log")(globalGetInterceptor(Object, "getPrototypeOf")(B) === A); //true  B.__proto__ === A