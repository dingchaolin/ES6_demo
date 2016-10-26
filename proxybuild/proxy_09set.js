'use strict';

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

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
} //var validator = {
//    set:function(obj, prop, value ){
//        if( prop == 'age' ){
//            if( !Number.isInteger( value ) ){
//                throw  new TypeError( 'The age is not a int');
//            }
//            if( value > 200 ){
//                throw new RangeError('The age is seems invalid');
//            }
//        }
//        obj[prop] = value;
//    }
//};

var person = new Proxy({}, {
    set: function set(obj, prop, value) {
        if (prop == 'age') {
            if (!(0, _isInteger2.default)(value)) {
                throw new TypeError('The age is not a int');
            }
            if (value > 200) {
                throw new RangeError('The age is seems invalid');
            }
        }
        obj[prop] = value;
    }
});
globalSetInterceptor(person, 'age', 100);
globalGetInterceptor(console, 'log')(globalGetInterceptor(person, 'age'));

globalSetInterceptor(person, 'age', 200);
globalSetInterceptor(person, 'age', "dcl");