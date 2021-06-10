
// var person = "deepu" ;
function fn(){
    'use strict'   // when use strict is used inside function which are called normally then this
                   // value is equal to undefined
    console.log(this);
    console.log(this.person);
}
// when a function is called normally or deafult then this value is equal to window
// fn();

// when a function is called through an object then this keyword is equal to object
let obj = {person:"Deepu",
            country:"India",
            func: fn
        }
obj.func();

// Here the function is not called through object
// var func = obj.func;
// func();

setTimeout(obj.func,1000) ;   // there is no effect of use strict in native method of js
