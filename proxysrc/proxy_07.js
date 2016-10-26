//链式调用   不能正常执行
var pipe = (function(){
    return function(value){
        var funcStack = [];
        var oproxy = new Proxy({},{
            get : function( pipeObject, fnName ){
                if( fnName === 'name' ){
                    return funcStack.reduce( function( val, fn ){
                        return fn( val );
                    },value );
                }
                funcStack.push( window[fnName] );//window is not defined
                return oproxy;
            }
        });
        return oproxy;
     }
})();

var double = n=>n*2;
var pow = n=>n*n;
var reverseInt = n => n.toString().split("").reverse().join("")|0;
var n = pipe(3).double.pow.reverseInt.get;
console.log( n );