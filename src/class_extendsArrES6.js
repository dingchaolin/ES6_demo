/*
ES6 是先创建基类的this，然后再用子类构造函数修饰此this，使得父类的行为属性是可以继承的
 */
class MyArray extends Array{
    constructor(...args){
        super(...args);
    }
};

let ma = new Array();
ma[0] = 12;
console.log( `ma[0]=${ma[0]}`);
console.log( `ma.length=${ma.length}`);