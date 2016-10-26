function createArray( ...elements ){
    let handler = {
        get( target, key, receiver ){
            let index = Number( key );
            console.log( 'index='+index );
            if( index < 0 ){
                key = String( target.length + index );
            }
            return Reflect.get( target, key, receiver );
        }
    };
    let target = [];
    target.push( ...elements );
    console.log( target );
    return new Proxy( target, handler );
}

let arr = createArray( 'a', 'b', 'c' );
console.log( arr );