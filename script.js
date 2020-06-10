let arr = ["2666","4999","7888","943","2666","4999","7888"], result = [];


arr.forEach((element) => {
  if(element[0] === "2"||element[0]=== "4"){
  console.log(element)
  }
})


for(let j = 2; j <=100; j++){
  let mark = true; 
  
    for(var i=2; i<j; i++) {
        if(j % i == 0) {
            mark = false;
            break;
        }
    }
      if(mark){
      console.log(j+" Делители этого числа: 1 и "+j);
      }

    
    //result.push(prime);
}