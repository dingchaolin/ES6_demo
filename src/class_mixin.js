function mix( ...mixins ){
    class Mix{}
    function copyProperties( target, source ){
        for( let key of Reflect.ownKeys( source ) ){
            if( key !== "constructor" &&
            key !== "prototype" &&
            key !== "name" ){
                let desc = Object.getOwnPropertyDescriptor( source, key );
                Object.defineProperty( target, key, desc );
            }
        }
    }

    for( let mixin of mixins ){
        copyProperties( Mix, mixin );//继承构造函数
        copyProperties( Mix.prototype, mixin.prototype );//继承方法
    }

    return Mix;
}

//这个mix方法能够将多个类的方法合成到一个类上面 使用的时候 只要继承这个类即可
class DistributedEdit extends mix( Loggable, Serializable ){
    //...
}