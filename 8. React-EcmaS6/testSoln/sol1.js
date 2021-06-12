// Q8
// const object = {
//     message: 'Hello, World!',
//     logMessage() {
//     console.log(this.message); // What is logged?
//     }
//     };setTimeout(object.logMessage, 1000);

// Q9.

const object = {
    message: 'Hello, World!',
};
function logMessage() {
    console.log(this.message); // "Hello, World!"
}
let ret = logMessage.bind(object);
ret();

// const object = {
//     who: 'World',
//     greet() {
//     return `Hello, ${this.who}!`;
//     },
//     farewell: () => {
//     return `Goodbye, ${this.who}!`;
//     }
//    };
//    console.log(object.greet()); // What is logged?
//    console.log(object.farewell()); // What is logged?
   