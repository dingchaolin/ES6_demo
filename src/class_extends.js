class Point {
    //类的构造函数使用new才能调用
    constructor( x, y ){
        //都是定义本身
        this.x = x ;
        this.y = y ;
    }

    toString(){
        return `(${this.x},${this.y})`;
    }

}

class ColorPoint extends Point{
    constructor( x=2, y=3, color='red' ){
        //####################
        //只有调用了super方法之后 才能使用this
        //只有super方法才能返回父类的实例
        //####################
        super( x, y );//调用基类的constructor(x,y)
        /*
        子类必须在构造函数调用super方法，否则会报错，因为子类中没有自己的this对象
        而是继承父类的this对象，然后对其加工，如果不调用父类的super方法，子类就得不到this对象
        ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
        ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。
         */
        this.color = color;
    }
    toString(){
        return `${this.color},${super.toString()}`;
    }
}
let pt = new Point( 2,3);
let cp = new ColorPoint( );
console.log( `${ cp instanceof Point},${cp instanceof ColorPoint}`);//true true
console.log( pt.toString() );
console.log( cp.toString() );
//子类原型的原型是基类的原型
console.log(   cp.__proto__.__proto__=== pt.__proto__ );//true

//通过子类的__proto__.__proto__可以修改父类的属性
cp.__proto__.__proto__.toString = ()=>{
    console.log( 'color is red!' );
};

pt.toString();




