class Reatangle{
    constructor( length, width ){
        console.log( new.target === Reatangle);
        this.length = length;
        this.width = width;
    }

}
 class Square extends Reatangle{
     constructor( length ){
         super( length, length );
     }
 }
var obj = new Reatangle( 3, 4 );//true
//当子继承父类的时候 会返回子类的构造函数
var obj = new Square( 3 );//false

