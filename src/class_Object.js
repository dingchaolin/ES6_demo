class NewObj extends Object{
    constructor() {
        super(...arguments);
    }
}

let o = new NewObj({attr:true});
console.log( o.attr === true );

