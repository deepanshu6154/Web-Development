

// let arr = [1,2,3];

// ****************Destructuring ***********
// [x,y,z] = arr;
// console.log(x);
// console.log(y);
// console.log(z);


// let arr = [1,2,3,4,5];
// ******* Skipping ************
// [a,b,,d,e] = arr;
// console.log(a,b,d,e);

//  get all values in a variable using dots 
// [a,b,...c] = arr;
// console.log(a,b,c);


/////////////////////////////////Default values

let arr =['Howdy'];
let [ab='hello',cd='bye',ef='say']=arr;
console.log(ab+" "+cd+" "+ef);

//////////////////////////////////swapping values

// let a =3;
// let b=6;
// [a,b] =[b,a];
// console.log(a);
// console.log(b);