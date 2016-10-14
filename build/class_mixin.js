"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _ownKeys = require("babel-runtime/core-js/reflect/own-keys");

var _ownKeys2 = _interopRequireDefault(_ownKeys);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mix() {
    var Mix = function Mix() {
        (0, _classCallCheck3.default)(this, Mix);
    };

    function copyProperties(target, source) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)((0, _ownKeys2.default)(source)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                if (key !== "constructor" && key !== "prototype" && key !== "name") {
                    var desc = (0, _getOwnPropertyDescriptor2.default)(source, key);
                    (0, _defineProperty2.default)(target, key, desc);
                }
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
    }

    for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
        mixins[_key] = arguments[_key];
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = (0, _getIterator3.default)(mixins), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var mixin = _step2.value;

            copyProperties(Mix, mixin); //继承构造函数
            copyProperties(Mix.prototype, mixin.prototype); //继承方法
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return Mix;
}

//这个mix方法能够将多个类的方法合成到一个类上面 使用的时候 只要继承这个类即可

var DistributedEdit = function (_mix) {
    (0, _inherits3.default)(DistributedEdit, _mix);

    function DistributedEdit() {
        (0, _classCallCheck3.default)(this, DistributedEdit);
        return (0, _possibleConstructorReturn3.default)(this, (DistributedEdit.__proto__ || (0, _getPrototypeOf2.default)(DistributedEdit)).apply(this, arguments));
    }

    return DistributedEdit;
}(mix(Loggable, Serializable));