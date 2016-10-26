'use strict';

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
} //编译出错
/*
不能执行
 */
var handler = {
   get: function get(target, key) {
      if (key === 'prototype') {
         return globalGetInterceptor(Object, 'prototype');
      }
      return 'hello ' + key;
   },
   apply: function apply(target, thisBinding, args) {
      return args;
   },
   construct: function construct(target, args) {
      return { value: args };
   }
};

var fproxy = new Proxy(function (x, y) {
   return x + y;
}, handler);

fproxy(1, 2);
new fproxy(1, 2);
globalGetInterceptor(fproxy, 'prototype') === globalGetInterceptor(Object, 'prototype');
globalGetInterceptor(fproxy, 'foo');