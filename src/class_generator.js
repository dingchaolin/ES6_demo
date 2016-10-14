class Foo{
    //spread
    constructor( ...args ){
        this.args = args;
    }
    //* 表示generator 方法
    *[Symbol.iterator](){
        for( let arg of this.args ){
            yield arg;
        }
    }
}
//Symbol.iterator 方法返回一个Foo类的默认遍历器
//for ... of 会自动调用这个遍历器

for( let x of (new Foo("hello", "world") ) ){
    console.log( x );
}

console.log( Symbol("hello") === Symbol("hello") );//false
console.log( Symbol("hello") );//Symbol(hello)
