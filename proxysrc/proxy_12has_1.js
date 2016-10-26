var obj = { age : 10 };
Object.preventExtensions( obj );//禁止扩展该对象

var proxy = new Proxy( obj, {
    //has调用的是HasProperty 而不是 HasOwnProperty  has 方法不判断一个方法是自身的方法 还是继承的方法
    has: function (target, prop ) {
        return false;
    }
});

'age' in proxy;//TypeError


