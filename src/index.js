import 'bable-polyfill';//解决浏览器兼容问题

var data = Array.from("abcd");
let sum = n => {
    let total = 0;
    for( let i = 0; i < n ; i ++ ){
        total += i;
    }
    return total;
}

