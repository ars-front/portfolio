let income="фриланс",  mission = 5000000, period = 12;



let showTypeOf = function(data){
    return typeof(data)
}


let money = +prompt("Ваш месячный доход?","300000");

if(!money){
    confirm.log("Некорректное значение!");
    money = +prompt("Ваш месячный доход?");
}

let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "бензин,еда,комунальные платежи");

let deposit = confirm("Есть ли у вас депозит в банке?");
let expenses1 = prompt("Введите обязательную статью расходов?","еда");
let amount1 = +prompt("Во сколько это обойдется?", "10000");

let expenses2 = prompt("Введите обязательную статью расходов?", "комунальные платежи");
let amount2 = +prompt("Во сколько это обойдется?", "10000");



console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));


let getExpensesMonth = function (amount1, amount2) {

  return amount1+amount2;
  
}

let getAccumulatedMonth = function (money, сallback) {

  return money - сallback(amount1, amount2);
  
}

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth);


let getTargetMonth = function (mission, budgetMonth) {

  return Math.ceil(mission / budgetMonth)
  
}


console.log("Расходы за месяц "+getExpensesMonth(amount1, amount2));

console.log(addExpenses.toLowerCase().split(', '));

console.log("Цель будет достигнута за: "+ getTargetMonth(mission, accumulatedMonth)+" месяцев");



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


}

console.log(getStatusIncome(budgetDay));
