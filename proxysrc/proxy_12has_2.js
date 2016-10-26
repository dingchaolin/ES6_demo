//has 拦截对for in 不生效  has对in生效
let stu1 = { name:"zhangsan" , "score" : 59 };
let stu2 = { name:"lisi" ,  "score" : 99 };

let handler = {
    has( target, prop ){
        if( prop === 'score' && target[prop] < 60 ){
            console.log( `${target.name} 不及格！` );
            return false;
        }
        return prop in target;
    }
}

let proxy1 = new Proxy( stu1, handler );
let proxy2 = new Proxy( stu2, handler );

'score' in proxy1;// zhangsan 不及格  false
'score' in proxy2;//true

for( let a in proxy1 ){
    console.log( proxy1[a] );
}
//zhangsan 59

for( let b in proxy2 ){
    console.log( proxy2[b] );
}
//lisi 99



