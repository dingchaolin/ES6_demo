Function.prototype.MyApply = function( thisObj, args ){
    thisObj = thisObj||window;
    thisObj.method = this;
    var thisArgs = [];
    var runMethod = thisObj.method();
    if( args ){
        for( var i = 0, length = args.length; i < length; i ++ ){
            thisArgs.push( "args[" + i + "]" );
        }
        runMethod = eval("thisObj.method(" + thisArgs + ")");
        //console.log( "thisObj.method(" + thisArgs + ")" );//thisObj.method(args[0],args[1])
        delete thisObj.method;
    }
    return runMethod;
}

Function.prototype.MyCall = function() {

    return this.MyApply( Array.prototype.shift.MyApply(arguments), arguments);
}

function Person( name, age ){

    this.name = name;
    this.age = age;
}

var p1 = new Person('dcl',12);
console.log(p1);

var pApply = {};
Person.MyApply( pApply, ["a",32]);
console.log( pApply );

var pCall = {};
Person.MyCall( pCall, "b",45);
console.log( pCall );
