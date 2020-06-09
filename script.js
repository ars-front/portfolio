let money, income, addExpenses, deposit, mission, period, expenses1, amount1, expenses2, amount2, accumulatedMonth;

money = 60000;
income = "фриланс";
addExpenses = "интернет, такси, коммуналка";
deposit = true;
mission = 5000000;
period = 12;

let showTypeOf = function(data){
    return typeof(data)
}

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

money = +prompt("Ваш месячный доход?","300000");

if(!money){
    confirm.log("Некорректное значение!");
    money = +prompt("Ваш месячный доход?");
}

addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "бензин,еда,комунальные платежи");

deposit = confirm("Есть ли у вас депозит в банке?");
expenses1 = prompt("Введите обязательную статью расходов?","еда");
amount1 = +prompt("Во сколько это обойдется?", "10000");

expenses2 = prompt("Введите обязательную статью расходов?", "комунальные платежи");
amount2 = +prompt("Во сколько это обойдется?", "10000");


let getExpensesMonth = function (amount1, amount2) {

  return amount1+amount2;
  
}

let getAccumulatedMonth = function (money, сallback) {

  return money - сallback(amount1, amount2);
  
}

accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth);


let getTargetMonth = function (mission, budgetMonth) {

  return Math.ceil(mission / budgetMonth)
  
}





//console.log("Период равен " + period + " месяцев" );

//console.log("Цель заработать " + mission + " рублей");
console.log("Расходы за месяц "+getExpensesMonth(amount1, amount2));

console.log(addExpenses.toLowerCase().split(', '));

console.log("Цель будет достигнута за: "+ getTargetMonth(mission, accumulatedMonth)+" месяцев");

//console.log("Бюджет на месяц "+accumulatedMonth);

//console.log(addExpenses.length);



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
