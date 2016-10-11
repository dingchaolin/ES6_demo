//这里是一个能立即执行的类
//但是babel编译出的代码执行报错
/*
 C:\ES6\ES6_demo\node_modules\babel-runtime\helpers\classCallCheck.js:7
 throw new TypeError("Cannot call a class as a function");
 ^

 TypeError: Cannot call a class as a function
 at exports.default (C:\ES6\ES6_demo\node_modules\babel-runtime\helpers\class
 CallCheck.js:7:11)
 at _class (C:\ES6\ES6_demo\build\class_exe.js:17:38)
 at Object.<anonymous> (C:\ES6\ES6_demo\build\class_exe.js:29:4)
 at Module._compile (module.js:409:26)
 at Object.Module._extensions..js (module.js:416:10)
 at Module.load (module.js:343:32)
 at Function.Module._load (module.js:300:12)
 at Function.Module.runMain (module.js:441:10)
 at startup (node.js:139:18)
 at node.js:968:3

 */
let Person = class{
    constructor( name ){
        this.name = name;
    }
    sayName(){
        console.log( this.name );
    }
}('dcl')

Person.sayName();

