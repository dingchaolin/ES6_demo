'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Point = function () {
    //类的构造函数使用new才能调用
    function Point(x, y) {
        (0, _classCallCheck3.default)(this, Point);

        //都是定义本身
        this.x = x;
        this.y = y;
    }

    (0, _createClass3.default)(Point, [{
        key: 'toString',
        value: function toString() {
            return '(' + this.x + ',' + this.y + ')';
        }
    }]);
    return Point;
}();

var ColorPoint = function (_Point) {
    (0, _inherits3.default)(ColorPoint, _Point);

    function ColorPoint() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
        var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'red';
        (0, _classCallCheck3.default)(this, ColorPoint);

        //调用基类的constructor(x,y)
        /*
        子类必须在构造函数调用super方法，否则会报错，因为子类中没有自己的this对象
        而是继承父类的this对象，然后对其加工，如果不调用父类的super方法，子类就得不到this对象
        ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
        ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。
         */
        var _this = (0, _possibleConstructorReturn3.default)(this, (ColorPoint.__proto__ || (0, _getPrototypeOf2.default)(ColorPoint)).call(this, x, y));
        //####################
        //只有调用了super方法之后 才能使用this
        //只有super方法才能返回父类的实例
        //####################


        _this.color = color;
        return _this;
    }

    (0, _createClass3.default)(ColorPoint, [{
        key: 'toString',
        value: function toString() {
            return this.color + ',' + (0, _get3.default)(ColorPoint.prototype.__proto__ || (0, _getPrototypeOf2.default)(ColorPoint.prototype), 'toString', this).call(this);
        }
    }]);
    return ColorPoint;
}(Point);

var pt = new Point(2, 3);
var cp = new ColorPoint();
console.log((cp instanceof Point) + ',' + (cp instanceof ColorPoint)); //true true
console.log(pt.toString());
console.log(cp.toString());
//子类原型的原型是基类的原型
console.log(cp.__proto__.__proto__ === pt.__proto__); //true

//通过子类的__proto__.__proto__可以修改父类的属性
cp.__proto__.__proto__.toString = function () {
    console.log('color is red!');
};

pt.toString();