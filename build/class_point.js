"use strict";

var _getOwnPropertyNames = require("babel-runtime/core-js/object/get-own-property-names");

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MethodName = "GetPoint";

var Point = function () {
    //类的构造函数使用new才能调用
    function Point(x, y) {
        (0, _classCallCheck3.default)(this, Point);

        //都是定义本身
        this.x = x;
        this.y = y;
    }
    //实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
    //所有的方法的定义都是在prototype上定义的
    //此处定义的属性都是定义在__proto__
    //此处定义的属性都是定义在原型对象上的


    (0, _createClass3.default)(Point, [{
        key: "toString",
        value: function toString() {
            return "(" + this.x + "," + this.y + ")";
        }
        //类的属性名可以采用表达式的方式

    }, {
        key: MethodName,
        value: function value() {
            return "(" + this.x + "," + this.y + ")";
        }
    }]);
    return Point;
}();

(0, _assign2.default)(Point.prototype, {
    MoveUp: function MoveUp() {
        this.x--;
    },
    MoveDown: function MoveDown() {
        this.x++;
    },
    MoveLeft: function MoveLeft() {
        this.y--;
    },
    MoveRight: function MoveRight() {
        this.y++;
    }
});

var pt = new Point(3, 5);
pt.Type = function () {
    return "point";
};

console.log(pt.toString());
var flag = Point == Point.prototype.constructor;
var flag1 = pt.constructor == Point.prototype.constructor;

console.log("{flag = " + flag + ", flag1 = " + flag1);

console.log(Point.prototype);

console.log((0, _keys2.default)(Point.prototype)); //[ 'MoveUp', 'MoveDown', 'MoveLeft', 'MoveRight' ] 类中定义的方法不可以枚举 与ES5中不一样

console.log((0, _getOwnPropertyNames2.default)(Point.prototype));
/*
[ 'constructor',
'toString',
    'MoveUp',
    'MoveDown',
    'MoveLeft',
    'MoveRight' ]
    */
console.log(pt[MethodName]());

console.log(Point.__proto__.hasOwnProperty('toString')); //true
console.log(Point.__proto__.hasOwnProperty('MoveUp')); //false
//可以通过实例的__proto__属性为Class添加方法。
pt.__proto__.PrintPoint = function () {
    return "print Point";
};

console.log(pt.PrintPoint());