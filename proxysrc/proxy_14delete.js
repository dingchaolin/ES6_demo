//deleteProperty 用于拦截delete操作
//如果deleteProperty抛出异常或者返回false 当前元素的属性就不会被删除
var handler = {
    deleteProperty( target, key ){
        invariant( key, 'delete');
        return true;//如果返回false会直接导致删除属性抛出异常
    }
}

function invariant( key, action ){
    if( key.indexOf( '_') == 0  ){
        throw new Error( "private!" );
    }
}

var target = {_name:"dcl"};
var proxy = new Proxy( target, {
    deleteProperty( target, key ){
        invariant( key, 'delete');
        return true;
    }
});

delete proxy._name
