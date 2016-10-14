//ES6 规定 类中只有静态方法 没有静态属性
//ES7 中有关于 静态属性的提案
class Foo{
    //实例属性定义 ES7
    myprop = 42;
    //新写法定义静态属性 直接赋值
    static mystaticprop = 50;
    constructor(){
        console.log( "static myprop=" + this.myprop );//说明静态属性是在构造函数之前已经创建出来了
    }
    static StaticMethod(){
        console.log( "StaticMethod Super" );
        return "StaticMethod Super";
    }
}

class FooChild extends Foo{
    static StaticMethodToo(){
        console.log( super.StaticMethod()+", Child" );//super 对象可以调用基类的方法
        return "Child StaticMethod";
    }
}

Foo.StaticMethod();
FooChild.StaticMethod();//继承调用
FooChild.StaticMethodToo();
let foo = new Foo();
//foo.StaticMethod();// 出错 静态方法只属于类 不属于对象
//let fooChild = new FooChild();
//fooChild.StaticMethod();//调用出错 静态方法只属于类 不属于对象
//静态属性定义老写法
Foo.prop = 1;
//老写法定义静态属性访问
console.log( "Foo.prop = " + Foo.prop );//在对象中定义的属性 使用类可以访问  1
console.log( "foo.prop = " + foo.prop );//在对象中定义的属性 使用实例对象可以访问  undefined
//实例属性访问
console.log( "Foo.myprop = " + Foo.myprop );//在对象中定义的属性 使用类不可以访问 undefined
console.log( "foo.myprop = " + foo.myprop );//在对象中定义的属性 使用实例对象可以访问 42
//新写法定义静态属性访问
console.log( "Foo.mystaticprop = " + Foo.mystaticprop );//在对象中定义的属性 使用类可以访问 50
console.log( "foo.mystaticprop = " + foo.mystaticprop );//在对象中定义的属性 使用实例对象不可以访问 undefined



