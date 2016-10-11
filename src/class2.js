//使用表达式的形式定义类

let myClass = class Me{
    //也可省略Me  let myClass = class{ ... }
    constructor( name ){
        this.name = name;
    }
    //Me只能在代码内部使用 指代当前类
    getMyName(){
        console.log( `Me=${Me}` );
        /*
         Me=function Me(name) {
         (0, _classCallCheck3.default)(this, Me);

         this.name = name;
         }
         */
        return this.name;
    }
}

let inst = new myClass( 'dcl' );
console.log( inst.getMyName() );

