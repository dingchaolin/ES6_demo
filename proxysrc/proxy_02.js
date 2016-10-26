var proxy1 = new Proxy({},{
    get:function( target, key ){
        return 35;
    }
});

//console.log( proxy1.name );//35
//console.log( proxy1.title );//35

//一个空的proxy对象
var target= {};
var handler = {};
var proxy = new Proxy( target, handler );
proxy.a = 'a';
console.log( target.a );

let obj = Object.create( proxy );
let obj1 = Object.create( proxy1 );
console.log( `obj1.time = ${obj1.time}` );
console.log( `obj.a = ${obj.a}` );

