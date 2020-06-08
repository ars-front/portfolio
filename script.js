
let money, income, addExpenses, deposit, mission, period, expenses1, amount1, expenses2, amount2, budgetMonth=0;

money = 60000;
income = "фриланс";
addExpenses = "интернет, такси, коммуналка";
deposit = true;
mission = 5000000;
period = 12;

console.log(typeof money );
console.log(typeof income );
console.log(typeof deposit);

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

budgetMonth = money - (amount1+amount2);

console.log(addExpenses.toLowerCase().split(', '));

console.log("Период равен " + period + " месяцев" );

console.log("Цель заработать " + mission + " рублей");

console.log("Цель будет достигнута за: "+ (Math.ceil(mission / budgetMonth))+" месяцев");

console.log("Бюджет на месяц "+budgetMonth);

//console.log(addExpenses.length);



let budgetDay = budgetMonth / 30;

console.log("Бюджет на день "+ (Math.floor(budgetDay)));

if(1200<=budgetDay){
    console.log("У вас высокий уровень дохода");

}else if(budgetDay>600&&budgetDay<1200){
    console.log("У вас средний уровень дохода");

}else if(budgetDay<=600){
    console.log("К сожалению у вас уровень дохода ниже среднего");

}else{
    console.log("Что то пошло не так");

}
