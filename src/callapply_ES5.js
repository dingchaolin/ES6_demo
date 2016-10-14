Function.prototype.Apply = function(thisObj, arrArguments) {
    thisObj = thisObj || window;
    thisObj.method = this;
    var runMethod;
    if (!arrArguments) {
        runMethod = thisObj.method();
    }
    else {
        var args = [];
        for (var i = 0, len = arrArguments.length; i < len; i++) {
            args.push('arrArguments[' + i + ']');
        }
        runMethod = eval("thisObj.method(" + args + ")");
    }
    delete thisObj.method;
    return runMethod;
}
Function.prototype.Call = function() {
    return this.Apply(Array.prototype.shift.Apply(arguments), arguments);
}

//var obj = {};
//function f(a,b,c) {
//    console.log(this == obj);//看看Apply和Call 是不是把函数内的this 指向了 obj对象
//    console.log(a + b + c);
//}
//f(1, 2, 3);
//f.Apply(obj, [4, 5, 6]);
//f.Call(obj, 7, 8, 9);

function Person( name, age ){
    this.name = name;
    this.age = age;
}

var p1 = new Person( 'dcl', 12 );
console.log( p1 );

var obj = {};

Person.Apply( obj, ['ddd',24] );
console.log( obj );
