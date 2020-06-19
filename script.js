'use strict';

let isNumber = function(n){

  return !isNaN(parseFloat(n)) && isFinite(n)

};



let money,
    start = function(){

      do{
        money = prompt("Ваш месячный доход?");
      }while (!isNumber(money));
    
    money = +money;

    };

start();

let appData = {

  income : {},
  addIncome : [],
  expenses : {},
  addExpenses : [],
  deposit : false,
  mission : 5000000,
  period : 12,
  budget : money,
  budgetDay : 0,
  budgetMonth : 0,
  expensesMonth : 0,
  temp : 0,
  asking : function(){
    appData.addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "бензин,еда,комунальные платежи");
    appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

    let sum = 0;

    let exp1 =0;
    let exp2 =0;
  
    for(let i=0; i < 2; i++){
      exp1 = prompt("Введите обязательную статью расходов?","еда");
  
      do{
        exp2= +prompt("Во сколько это обойдется?", "10000");
      }while (!isNumber(exp2));

      appData.expenses[exp1] = exp2;

    }
    

  },

  getExpensesMonth : function(){
    let sum = 0;

    for(let key in appData.expenses){
      sum+= appData.expenses[key]
    }
    return sum;
  },

  getBudget : function () {

    return appData.budget - appData.expensesMonth;
  },
  
  getTargetMonth : function () {

    let targetMonth = parseFloat(Math.ceil(appData.mission / appData.budgetMonth));
     
    if(targetMonth < 0){
      targetMonth = "Цель не будет достигнута";
    }else{
      targetMonth = "Цель будет достигнута за: "+ targetMonth +" месяцев";
    }
   
    return targetMonth;
  },

  getStatusIncome : function(){

    if(1200<=appData.budgetDay){
        return ("У вас высокий уровень дохода");
  
    }else if(appData.budgetDay>600&&appData.budgetDay<1200){
       return ("У вас средний уровень дохода");
  
    }else if(appData.budgetDay<=600){
        return ("К сожалению у вас уровень дохода ниже среднего");
  
    }else{
        return ("Что то пошло не так");
    }
  }


}

appData.asking();





appData.expensesMonth = appData.getExpensesMonth();


appData.budgetMonth = appData.getBudget(money, appData.expensesMonth);

console.log("Расходы за месяц "+ appData.expensesMonth );


console.log(appData.getTargetMonth(appData.mission, appData.budgetMonth));



appData.budgetDay = appData.budgetMonth / 30;

//console.log("Бюджет на день "+ (Math.floor(appData.budgetDay)));



console.log(appData.getStatusIncome(appData.budgetDay));
