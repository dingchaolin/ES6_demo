//私有方法 ES6暂时不提供
var MyClass = class{
    constructor( name ){
        this._name = name;
    }
    _privete_GetName(){
        return this._name;
    }
    getName( ){
        return this._privete_GetName();
    }
}

let inst = new MyClass('dcl');
console.log( inst.getName() );


//将私有方法放到class外部 就能实现private
function _setName( name ){
    this.name = name ;
}
var MyClass2 = class{
    constructor( name ){
        this.name = name;
    }
    setName( name ){
        _setName.call( this, name );
    }

    getName(){
        return this.name;
    }
}

var inst2 = new MyClass2( 'dcl' );
inst2.setName( 'ys' );
console.log( inst2.getName() );

//使用symbol实现私有
const name = Symbol("name");
const getName = Symbol("getName");

var MyClass3 = class{
    constructor( _name ){
        this[name] = _name;
    }
    [getName](){
        return this[name];
    }
    getMyName(){
        return this[getName]();
    }
}

let inst3 = new MyClass3( 'SkyVio' );
console.log( inst3.getMyName() );
//console.log( inst3.getName() );//报错 getName is not a function


