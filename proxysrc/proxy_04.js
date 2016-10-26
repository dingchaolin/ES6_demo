var person = {name:'dcl'};
/*
//使用一个变量竟然读不出属性的值
var handler = {
    get:function(target, key ){
        if( key in target ){
            console.log( target );

            return target[key];
        }
        else{
            throw new ReferenceError(`${key} not exist`);
        }
    }
}
*/
var proxy = new Proxy( person, {
    get:function(target, key ){
        if( key in target ){
            //console.log( target );
            return target[key];
        }
        else{
            throw new ReferenceError(`${key} not exist`);
        }
    }
} );

console.log( proxy.name );
console.log( proxy.foo );




