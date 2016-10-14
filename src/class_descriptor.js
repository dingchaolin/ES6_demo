class CustomHTMLElement{
    constructor( element ){
        this.element = element;
    }
    get html(){
        return this.element.innerHTML;
    }
    set html(value){
        this.element.innerHTML = value;
    }
}


var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype,"html");

console.log( `${"get" in descriptor},${"set" in descriptor}` );//true, true
console.log( descriptor );
/*
 { get: [Function: get],
 set: [Function: set],
 enumerable: false,
 configurable: true }

 */