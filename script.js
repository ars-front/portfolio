let isNumber = function(n){

  return !isNaN(parseFloat(n)) && isFinite(n)

};

let money, income="фриланс",  mission = 5000000, period = 12, expenses =[], temp;



let showTypeOf = function(data){
    return typeof(data);
};


let start = function(){
  
  
   do{
    money = prompt("Ваш месячный доход?");
  }while (!isNumber(money));
  
  money = +money;
};

start();

let getExpensesMonth = function(){
   
  let sum = 0;

  for(let i=0; i < 2; i++){
    expenses[i] = prompt("Введите обязательную статью расходов?","еда");

    do{
      temp= prompt("Во сколько это обойдется?", "10000");
    }while (!isNumber(temp));
    sum+= +temp;
  }
  
  return sum;
}



//let money = +prompt("Ваш месячный доход?","300000");



let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "бензин,еда,комунальные платежи");

let deposit = confirm("Есть ли у вас депозит в банке?");

let expensesAmount = getExpensesMonth();





console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));


//let getExpensesMonth = function (amount1, amount2) {

 //// return amount1+amount2;
  
//};

let getAccumulatedMonth = function (money, expensesAmount) {

  return money - expensesAmount;
  
};

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);


let getTargetMonth = function (mission, budgetMonth) {

  let targetMonth = parseFloat(Math.ceil(mission / budgetMonth));
   
  if(targetMonth < 0){
    targetMonth = "Цель не будет достигнута";
  }else{
    targetMonth = "Цель будет достигнута за: "+ targetMonth +" месяцев";
  }
 
  return targetMonth;
  
};


console.log("Расходы за месяц "+ expensesAmount );

console.log(addExpenses.toLowerCase().split(', '));

console.log(getTargetMonth(mission, accumulatedMonth));



let budgetDay = accumulatedMonth / 30;

console.log("Бюджет на день "+ (Math.floor(budgetDay)));

let getStatusIncome = function(budgetDay){

  if(1200<=budgetDay){
      return ("У вас высокий уровень дохода");

  }else if(budgetDay>600&&budgetDay<1200){
     return ("У вас средний уровень дохода");

  }else if(budgetDay<=600){
      return ("К сожалению у вас уровень дохода ниже среднего");

  }else{
      return ("Что то пошло не так");
  }


};

console.log(getStatusIncome(budgetDay));
