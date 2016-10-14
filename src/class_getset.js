class MyClass{
    constructor(){

    }
    get prop(){
        return "getter";
    }
    set prop(value){
        console.log(`setter = ${value}`);
    }
}

var myclass = new MyClass();
myclass.prop = 123;
console.log( myclass.prop );

