let MethodName = "GetPoint";
class Point {
    //类的构造函数使用new才能调用
    constructor( x, y ){
        //都是定义本身
        this.x = x ;
        this.y = y ;
    }
    //实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
    //所有的方法的定义都是在prototype上定义的
    //此处定义的属性都是定义在__proto__
    //此处定义的属性都是定义在原型对象上的
    toString(){
        return `(${this.x},${this.y})`;
    }
    //类的属性名可以采用表达式的方式
    [MethodName](){
        return `(${this.x},${this.y})`;
    }

}

Object.assign( Point.prototype, {
   MoveUp(){
       this.x --;
   },
    MoveDown(){
        this.x ++;
    },
    MoveLeft(){
        this.y --;
    },
    MoveRight(){
        this.y ++;
    }
});

let pt = new Point( 3, 5 );
pt.Type = ()=>{ return "point" ; }

console.log( pt.toString() );
var flag = ( Point == Point.prototype.constructor );
var flag1 = ( pt.constructor == Point.prototype.constructor );

console.log( `{flag = ${flag}, flag1 = ${flag1}` );

console.log( Point.prototype );

console.log( Object.keys( Point.prototype ) );//[ 'MoveUp', 'MoveDown', 'MoveLeft', 'MoveRight' ] 类中定义的方法不可以枚举 与ES5中不一样

console.log( Object.getOwnPropertyNames( Point.prototype ) );
/*
[ 'constructor',
'toString',
    'MoveUp',
    'MoveDown',
    'MoveLeft',
    'MoveRight' ]
    */
console.log( pt[MethodName]() );

console.log( Point.__proto__.hasOwnProperty('toString') );//true
console.log( Point.__proto__.hasOwnProperty('MoveUp') );//false
//可以通过实例的__proto__属性为Class添加方法。
pt.__proto__.PrintPoint = ()=>{
    return "print Point";
}

console.log( pt.PrintPoint() );



