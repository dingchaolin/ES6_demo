//编译出错
/*
不能执行
 */
 var handler = {
     get:function(target, key ){
     if( key === 'prototype' ){
        return Object.prototype;
     }
     return `hello ${key}`;

     },
     apply:function( target, thisBinding, args ){
        return args;
     },
     construct:function( target, args ){
        return {value:args};
     }
 };

 var fproxy = new Proxy( function( x, y ){ return x+y;}, handler );

 fproxy( 1, 2 )  ;
 new fproxy( 1, 2)  ;
 fproxy.prototype === Object.prototype ;
 fproxy.foo ;
