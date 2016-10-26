var handler = {
    has( target, key ){
        if( key.indexOf('_') >= 0 ){
            return false;
        }
        return key in target;
    }
};

var target = { _name : 'dcl', age : 34 };
var proxy = new Proxy( { _name : 'dcl', age : 34 }, {
    //没有调用该方法
    has:function( target, key ){
        if( key.indexOf('_') >= 0 ){
            return false;
        }
        console.log( target );
        console.log( key );
        return key in target;
    }
} );

console.log( '_name' in proxy );
console.log( 'age' in proxy );