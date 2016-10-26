function invariant( key, action ){
    if( key.indexOf("_") >= 0 ){
        console.log(`private attr:${key}, ${action}, NO!`);
        return false;
    }
    return true;
}

//var handler = {
//    get( target, key ){
//        if( invariant( key, 'get') ){
//            return target[key];
//        }
//        return false;
//
//    },
//    set( target, key ){
//        if( invariant( key, 'set' ) ){
//            return true;
//        }
//
//
//    }
//
//
//}

var target = { _name:'dcl', age:34 };
var proxy = new Proxy( target, {
    get( target, key ){
        if( invariant( key, 'get') ){
            return target[key];
        }
        return false;

    },
    set( target, key ){
        if( invariant( key, 'set' ) ){
            return true;
        }


    }


} );

console.log( proxy._name );
console.log( proxy.age );