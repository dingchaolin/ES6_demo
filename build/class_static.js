"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//ES6 规定 类中只有静态方法 没有静态属性
//ES7 中有关于 静态属性的提案
var Foo = function () {
    //实例属性定义 ES7
    function Foo() {
        (0, _classCallCheck3.default)(this, Foo);
        this.myprop = 42;

        console.log("static myprop=" + this.myprop); //说明静态属性是在构造函数之前已经创建出来了
    }
    //新写法定义静态属性 直接赋值


    (0, _createClass3.default)(Foo, null, [{
        key: "StaticMethod",
        value: function StaticMethod() {
            console.log("StaticMethod Super");
            return "StaticMethod Super";
        }
    }]);
    return Foo;
}();

Foo.mystaticprop = 50;

var FooChild = function (_Foo) {
    (0, _inherits3.default)(FooChild, _Foo);

    function FooChild() {
        (0, _classCallCheck3.default)(this, FooChild);
        return (0, _possibleConstructorReturn3.default)(this, (FooChild.__proto__ || (0, _getPrototypeOf2.default)(FooChild)).apply(this, arguments));
    }

    (0, _createClass3.default)(FooChild, null, [{
        key: "StaticMethodToo",
        value: function StaticMethodToo() {
            console.log((0, _get3.default)(FooChild.__proto__ || (0, _getPrototypeOf2.default)(FooChild), "StaticMethod", this).call(this) + ", Child"); //super 对象可以调用基类的方法
            return "Child StaticMethod";
        }
    }]);
    return FooChild;
}(Foo);

Foo.StaticMethod();
FooChild.StaticMethod(); //继承调用
FooChild.StaticMethodToo();
var foo = new Foo();
//foo.StaticMethod();// 出错 静态方法只属于类 不属于对象
//let fooChild = new FooChild();
//fooChild.StaticMethod();//调用出错 静态方法只属于类 不属于对象
//静态属性定义老写法
Foo.prop = 1;
//老写法定义静态属性访问
console.log("Foo.prop = " + Foo.prop); //在对象中定义的属性 使用类可以访问  1
console.log("foo.prop = " + foo.prop); //在对象中定义的属性 使用实例对象可以访问  undefined
//实例属性访问
console.log("Foo.myprop = " + Foo.myprop); //在对象中定义的属性 使用类不可以访问 undefined
console.log("foo.myprop = " + foo.myprop); //在对象中定义的属性 使用实例对象可以访问 42
//新写法定义静态属性访问
console.log("Foo.mystaticprop = " + Foo.mystaticprop); //在对象中定义的属性 使用类可以访问 50
console.log("foo.mystaticprop = " + foo.mystaticprop); //在对象中定义的属性 使用实例对象不可以访问 undefined