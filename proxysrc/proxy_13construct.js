//construct  用于拦截 new

var p = new Proxy( function(){}, {
    construct: function( target, args ){
        console.log( `called ${args.join(', ')}` );
        return {value:args };//必须返回一个对象 否则会报错
        //return new target( ...args );
    }
})

var data = p(1).value;