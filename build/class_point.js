"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultHandler = { get: function get(obj, propName) {
        return obj[propName];
    }, set: function set(obj, propName, val) {
        obj[propName] = val;
    } };var Proxy = function Proxy(target, handler) {
    this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
};
Proxy.prototype.getTrap = function (propertyName) {
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
}var MethodName = "GetPoint";

var Point = function () {
    //类的构造函数使用new才能调用
    function Point(x, y) {
        (0, _classCallCheck3.default)(this, Point);

        //都是定义本身
        globalSetInterceptor(this, "x", x);
        globalSetInterceptor(this, "y", y);
    }
    //实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
    //所有的方法的定义都是在prototype上定义的
    //此处定义的属性都是定义在__proto__
    //此处定义的属性都是定义在原型对象上的


    (0, _createClass3.default)(Point, [{
        key: "toString",
        value: function toString() {
            return "(" + globalGetInterceptor(this, "x") + "," + globalGetInterceptor(this, "y") + ")";
        }
        //类的属性名可以采用表达式的方式

    }, {
        key: MethodName,
        value: function value() {
            return "(" + globalGetInterceptor(this, "x") + "," + globalGetInterceptor(this, "y") + ")";
        }
    }]);
    return Point;
}();

globalGetInterceptor(Object, "assign")(globalGetInterceptor(Point, "prototype"), {
    MoveUp: function MoveUp() {
        globalGetInterceptor(this, "x")--;
    },
    MoveDown: function MoveDown() {
        globalGetInterceptor(this, "x")++;
    },
    MoveLeft: function MoveLeft() {
        globalGetInterceptor(this, "y")--;
    },
    MoveRight: function MoveRight() {
        globalGetInterceptor(this, "y")++;
    }
});

var pt = new Point(3, 5);
globalSetInterceptor(pt, "Type", function () {
    return "point";
});

globalGetInterceptor(console, "log")(globalGetInterceptor(pt, "toString")());
var flag = Point == globalGetInterceptor(globalGetInterceptor(Point, "prototype"), "constructor");
var flag1 = globalGetInterceptor(pt, "constructor") == globalGetInterceptor(globalGetInterceptor(Point, "prototype"), "constructor");

globalGetInterceptor(console, "log")("{flag = " + flag + ", flag1 = " + flag1);

globalGetInterceptor(console, "log")(globalGetInterceptor(Point, "prototype"));

globalGetInterceptor(console, "log")(globalGetInterceptor(Object, "keys")(globalGetInterceptor(Point, "prototype"))); //[ 'MoveUp', 'MoveDown', 'MoveLeft', 'MoveRight' ] 类中定义的方法不可以枚举 与ES5中不一样

globalGetInterceptor(console, "log")(globalGetInterceptor(Object, "getOwnPropertyNames")(globalGetInterceptor(Point, "prototype")));
/*
[ 'constructor',
'toString',
    'MoveUp',
    'MoveDown',
    'MoveLeft',
    'MoveRight' ]
    */
globalGetInterceptor(console, "log")(globalGetInterceptor(pt, "MethodName")());

globalGetInterceptor(console, "log")(globalGetInterceptor(globalGetInterceptor(Point, "__proto__"), "hasOwnProperty")('toString')); //true
globalGetInterceptor(console, "log")(globalGetInterceptor(globalGetInterceptor(Point, "__proto__"), "hasOwnProperty")('MoveUp')); //false
//可以通过实例的__proto__属性为Class添加方法。
globalSetInterceptor(globalGetInterceptor(pt, "__proto__"), "PrintPoint", function () {
    return "print Point";
});

globalGetInterceptor(console, "log")(globalGetInterceptor(pt, "PrintPoint")());