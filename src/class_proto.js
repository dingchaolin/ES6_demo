
class A{ /*...*/}
class B extends A{ /*...*/ }
/*
1.子类的__proto__属性，表示构造函数的继承 总是指向父类
2.子类的prototype的__proto__属性，表示方法的继承，总是指向父类的prototype属性
 */
console.log( B.prototype.__proto__ == A.prototype );//true
console.log( B.__proto__ == A );//true

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


 */
//判断一个类是否继承了另一个类
console.log( Object.getPrototypeOf( B ) === A);//true  B.__proto__ === A

