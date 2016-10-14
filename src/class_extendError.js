class ERROR{
    constructor(){
        this.stack = "ERROR stack";
    }
}
class ExtendableError extends Error{
    constructor( message ){
        super( );
        this.message = message;
        this.stack = (new Error).stack;
        this.name = this.constructor.name;
    }
}

class ExtendableERROR extends ERROR{
    constructor( message ){
        super( );
        this.message = message;
        this.stack = (new ERROR).stack;
        this.name = this.constructor.name;
    }
}

class MyError extends ExtendableError{
    constructor( m ){
        super( m );
    }
}

class MyERROR extends ExtendableERROR{
    constructor( m ){
        super( m );
    }
}
//原生构造函数的继承
var myerror = new MyError( "out of range" );
console.log( `message=${myerror.message}` );
console.log( `name=${myerror.name}` );
console.log( `stack=${myerror.stack}` );
//实例 myerror 是 Error的实例  继承Error的类 myerror都不是他们的实例
console.log( myerror instanceof Error );//ture
console.log( myerror instanceof MyError );//false
console.log( myerror instanceof ExtendableError );//false

//非原生构造函数的继承
var myERROR = new MyERROR( "out of range" );
console.log( `message=${myERROR.message}` );
console.log( `name=${myERROR.name}` );
console.log( `stack=${myERROR.stack}` );
//实例 myERROR 是 ERROR的实例  继承ERROR的类 myERROR都是他们的实例
console.log( myERROR instanceof ERROR );//ture
console.log( myERROR instanceof MyERROR );//true
console.log( myERROR instanceof ExtendableERROR );//true
