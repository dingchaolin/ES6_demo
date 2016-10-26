let  target = {
    _bar:'foo',
    _prop:"bar",
    prop:'baz'
};

let handler = {
    ownKeys( target ){
        return Reflect.ownKeys(target).filter(key=>key.indexOf("_") != 0 );
    }
};


let proxy = new Proxy( {
    _bar:'foo',
    _prop:"bar",
    prop:'baz'
},{
    ownKeys( target ){
        return Reflect.ownKeys(target).filter(key=>key.indexOf("_") != 0 );
    }
});

for ( let key of Object.keys(proxy) ){
    console.log( target[key] );
}

