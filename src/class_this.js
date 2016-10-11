class Logger{
    constructor( ){
        //使用箭头函数能够避免this指向丢失的问题  因为的箭头函数的this时钟指向自身
        this.printName_arrow = ( name = 'dcl')=>{
            this.print( `Hello ${name}` );
        }
        //在构造中bind this也能解决此问题
        this.printName_bindThis = this.printName_bindThis.bind( this );
    }
    printName( name = 'dcl' ){
        this.print( `Hello ${name}` );
    }

    printName_bindThis( name = 'dcl' ){
        this.print( `Hello ${name}` );
    }

    print( text ){
        console.log( text );
    }
}

const logger = new Logger();

//解构赋值  找不到this
const { printName,print,printName_arrow,printName_bindThis } = logger;

print( 'dcl' );
//printName();//报错  this指向丢失
printName_arrow('arrow function');//使用箭头函数能够避免this指向丢失的问题
printName_bindThis('bind this');//在构造中使用bind方法绑定this也能解决此问题
