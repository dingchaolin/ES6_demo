//function Person( name ){
//    if( new.target !== undefined ){//不能执行
//
//        this.name = name;
//
//    }else{
//        throw new Error("必须使用new来生成实例！");
//    }
//}

//function Person( name ){
//    if( new.target === Person ){
//        this.name = name;
//    }
//    else{
//        throw new Error("必须使用new来生成实例！");
//    }
//}
//
//var p = new Person('dcl');
//console.log(p);
//var notp = {};
//Person.call( notp,"yyy");
//console.log(notp);

class A {
    constructor() {
        console.log(new.target.name);
    }
}

class B extends A { constructor() { super(); } }

var a = new A(); // logs "A"
var b = new B(); // logs "B"