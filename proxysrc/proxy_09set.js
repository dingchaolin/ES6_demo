//var validator = {
//    set:function(obj, prop, value ){
//        if( prop == 'age' ){
//            if( !Number.isInteger( value ) ){
//                throw  new TypeError( 'The age is not a int');
//            }
//            if( value > 200 ){
//                throw new RangeError('The age is seems invalid');
//            }
//        }
//        obj[prop] = value;
//    }
//};

var person = new Proxy( {}, {
    set:function(obj, prop, value ){
        if( prop == 'age' ){
            if( !Number.isInteger( value ) ){
                throw  new TypeError( 'The age is not a int');
            }
            if( value > 200 ){
                throw new RangeError('The age is seems invalid');
            }
        }
        obj[prop] = value;
    }
} );
person.age = 100;
console.log( person.age );

person.age = 200;
person.age = "dcl";