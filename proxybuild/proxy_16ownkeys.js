'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _ownKeys = require('babel-runtime/core-js/reflect/own-keys');

var _ownKeys2 = _interopRequireDefault(_ownKeys);

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
}var target = {
    _bar: 'foo',
    _prop: "bar",
    prop: 'baz'
};

var handler = {
    ownKeys: function ownKeys(target) {
        return globalGetInterceptor(globalGetInterceptor(Reflect, 'ownKeys')(target), 'filter')(function (key) {
            return globalGetInterceptor(key, 'indexOf')("_") != 0;
        });
    }
};

var proxy = new Proxy({
    _bar: 'foo',
    _prop: "bar",
    prop: 'baz'
}, {
    ownKeys: function ownKeys(target) {
        return (0, _ownKeys2.default)(target).filter(function (key) {
            return key.indexOf("_") != 0;
        });
    }
});

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = (0, _getIterator3.default)(globalGetInterceptor(Object, 'keys')(proxy)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        globalGetInterceptor(console, 'log')(globalGetInterceptor(target, 'key'));
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}