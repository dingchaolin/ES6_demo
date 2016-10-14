class Reatangle{
    constructor( length, width ){
        if( new.target === Reatangle){
            throw new Error("本类不能被实例化！");//由这个可以实现不能被继承的使用的类 不能被实例化
        }

    }

}
 class Square extends Reatangle{
     constructor( length ){
         super(  );
         this.length = length;
     }
 }
var obj = new Reatangle( 3, 4 );//true
//当子继承父类的时候 会返回子类的构造函数
var obj = new Square( 3 );//false

