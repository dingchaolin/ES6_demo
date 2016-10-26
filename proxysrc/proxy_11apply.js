var target = function(){ console.log( "I am target!" ); }

var handler ={
    apply:function( ){
        console.log("i am proxy");
        return "i am proxy ";
    }
}

var p = new Proxy( function(){ console.log( "I am target!" ); }, {
    apply:function( ){
        console.log("i am proxy");
        return "i am proxy ";
    }
} );
p();