let proto = new Proxy({}, {
    get:function( target ,key ){
        console.log( `get ${key}`);
        return target[key];
    }
});

let obj = Object.create( proto );
console.log( obj.name );

