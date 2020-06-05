

let num = 266219;
let result=1;

num = num.toString().split('');

result = num.reduce((a,b)=>a*b);

console.log(result);

//result**=3

alert((result**3).toString().slice(0,2));






