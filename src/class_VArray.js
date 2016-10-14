class VersionedArray extends Array{
    constructor(){
        super();
        this.history = [[]];
        /*
         VA.commit is not a function
         这个错误 解决方案
         1 不行
         2 可行
         3 可行
         */
        //this.commit = this.commit.bind( this ); 这样不行  1

        //2
        /*
         this.commit = function(){
            this.history.push( this.slice() );
         }
         this.revert = function(){
            this.splice( 0, this.length, ...this.history[this.history.length-1] );
         }
       */

    }
    //3

    commit=()=>{
        this.history.push( this.slice() );
    }
    revert=()=>{
        this.splice( 0, this.length, ...this.history[this.history.length-1] );
    }

}


let VA = new VersionedArray();
VA.push( 1 );
VA.push( 2 );
console.log( `1 VA=${VA}`);
console.log( `1=[${VA.history}]`);
VA.commit();
VA.push( 3 );
VA.commit();
console.log( `2 VA=${VA}`);
console.log( `2=[${VA.history}]`);
VA.revert();
console.log( `3 VA=${VA}`);
console.log( `3=[${VA.history}]`);
