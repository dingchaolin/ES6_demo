/*
因为ES5不支持proxy，需要安装plugin 才能实现proxy
 npm install babel-plugin-proxy --save-dev
 并在.babelrc 中添加plugins babel-plugin-proxy
 添加这个之后 会影响别的 所以要注意
 */

var obj = new Proxy( {}, {
    get:function( target, key, receiver ){
        console.log( `get ${key}` );
        //console.log( arguments );
        return Reflect.get(  target, key, receiver );
    },
    set:function( target, key, value, receiver ){
        console.log( `set ${key}` );
        console.log( `value = ${ value }` );
        return Reflect.set( target, key, value, receiver );
    }
});

obj.count = 2;

console.log( obj.count );//undefined  外部获取不到
obj.count = 3;




