var handler = {
    getOwnPropertyDescriptor( target, key ){
        if( key.indexOf('_') == 0 ){
            return;//返回undefined
        }
        return Object.getOwnPropertyDescriptor( target, key );
    }
}

var target = { _name:'dcl', age:23 };

var proxy = new Proxy( { _name:'dcl', age:23 }, {
    getOwnPropertyDescriptor( target, key ){
        if( key.indexOf('_') == 0 ){
            return;
        }
        return Object.getOwnPropertyDescriptor( target, key );
    }
});

var obj1 = Object.getOwnPropertyDescriptor(proxy, 'heigth' );//undefined
var obj2 = Object.getOwnPropertyDescriptor(proxy, '_name' );//undefined
var obj3 = Object.getOwnPropertyDescriptor(proxy, 'age' );//// { value: 'age', writable: true, enumerable: true, configurable: true }
console.log( obj1, obj2, obj3 );
