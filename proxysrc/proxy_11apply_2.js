var twice = {
    apply(target, ctx, args ){
        return Reflect.apply(...arguments)*2;
    }
}

function sum( left, right ){
    return left + right;
}

var proxy = new Proxy( sum, twice );
//直接调用报错  proxy is not function
proxy( 1, 2 );//6
proxy.call( null, 5, 6 );//22
proxy.apply( null, [7,8] );//30

//直接调用 Reflect.apply 也会被拦截
Reflect.apply( proxy, null, [7,8] );//30


