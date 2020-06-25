'use strict';

let Start = document.getElementById('start');
let buttonAddIncome =document.getElementsByTagName('button')[0];
let buttonAddExpanses =document.getElementsByTagName('button')[1];
let salaryAmount = document.querySelector('.salary-amount');
let additionalIncomeTitle = document.querySelector('.income-items> .income-title')
let additionalIncomeAmount = document.querySelector('.income-items> .income-amount');
let possibleExpenseTitle =  document.querySelector('.expenses-items> .expenses-title');
//let possibleExpenseAmount =  document.querySelector('.expenses-items> .expenses-amount');
let expensesItem = document.querySelectorAll('.expenses-items');
let additionalExpensesItem =  document.querySelector('.additional_expenses-item');
let deposit = document.querySelector('#deposit-check');
let targetAmount =  document.querySelector('.target-amount');
let periodRange =  document.querySelector('.period-select');
let additionalIncome = document.querySelectorAll('.additional_income-item');
let budgetMonthValue =  document.querySelector('.budget_month-value');
let budgetDayValue =  document.querySelector('.budget_day-value');
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let possibleIncome =  document.querySelector('.additional_income-value');
let possibleExpenses =  document.querySelector('.additional_expenses-value');
let incomePeriod =  document.querySelector('.income_period-value');
let targetMonth =  document.querySelector('.target_month-value');
let incomeItems = document.querySelectorAll('.income-items');
let titlePeriodAmount =  document.querySelector('.title.period-amount');

Start.disabled = true; 
Start.style.opacity = 0.2;
Start.style.cursor = 'default';

let isNumber = function(n){

  return !isNaN(parseFloat(n)) && isFinite(n)

};



let money;
    

//start();

let appData = {

  income : {},
  addIncome : [],
  expenses : {},
  addExpenses : [],
  deposit : false,
  percentDeposit : 0,
  moneyDeposit : 0,
  incomeMonth : 0,
  //period : 12,
  budget : 0,
  budgetDay : 0,
  budgetMonth : 0,
  expensesMonth : 0,
  temp : 0,

  start : function(){
  
  appData.budget = +salaryAmount.value;
  

  appData.getExpenses();
  appData.expensesMonth = appData.getExpensesMonth();

  appData.getAddExpenses();
  appData.getAddIncome();
  appData.getIncome();
  appData.budgetMonth = appData.getBudget(money, appData.expensesMonth);
  appData.budgetDay = appData.budgetMonth / 30;
  appData.showResult();
  //appData.asking();

  },
  showResult: function(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.ceil(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    possibleExpenses.value = appData.addExpenses.join(", ");
    possibleIncome.value = appData.addIncome.join(', ');
    targetMonth.value = appData.getTargetMonth();
    incomePeriod.value = appData.calcSavedMoney();
    
    
  },

  addExpensesBlock: function(){
    let cloneExpensesItem = expensesItem[0].cloneNode(true);
    expensesItem[0].parentNode.insertBefore(cloneExpensesItem, buttonAddExpanses);
    expensesItem = document.querySelectorAll('.expenses-items');
    
    if(expensesItem.length === 3){
      buttonAddExpanses.style.display = 'none';
    }

  },

  getExpenses: function(){
    expensesItem.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== ''&& cashExpenses !== ''){
          appData.expenses[itemExpenses]= cashExpenses;
        }
    });
  },

  addIncomeBlock: function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonAddIncome);
    incomeItems = document.querySelectorAll('.income-items');
    
    if(incomeItems.length === 3){
      buttonAddIncome.style.display = 'none';
    }

  },
  
  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value.trim();
      let cashIncome = +item.querySelector('.income-amount').value;
      if(itemIncome !== ''&& cashIncome !== ''){
        appData.income[itemIncome]= cashIncome;
      }
  });
 
   for( let key in appData.income){
     appData.incomeMonth += +appData.income[key];
   }
  
  },

  getAddExpenses: function(){
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
        item = item.trim();
        if(item!== ''){
          appData.addExpenses.push(item);
        }
      })
      
  },

  getAddIncome: function(){
    additionalIncome.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue!== ''){
        appData.addIncome.push(itemValue);
      }
    });

  },

  asking : function(){

    

    let check;
    do{
      appData.addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "бензин,еда,комунальные платежи");
      appData.addExpenses =appData.addExpenses.trim();
      check = appData.addExpenses.indexOf(',')
    }while ( isNumber(appData.addExpenses)||appData.addExpenses===''||check===-1 );
    appData.addExpenses = appData.addExpenses.toLowerCase().split(',');
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

    
    

  },

  getExpensesMonth : function(){
    let sum = 0;

    for(let key in appData.expenses){
      sum+= +appData.expenses[key];

    }
    return sum;
  },

  getBudget : function () {

    return appData.budget + appData.incomeMonth - appData.expensesMonth;
  },
  
  getTargetMonth : function () {

    let targetMonth = parseFloat(Math.ceil(targetAmount.value / appData.budgetMonth));
     
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
  },

  getInfoDeposit : function(){
    if(appData.deposit){
      do{
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      }while (!isNumber(appData.percentDeposit));

      do{
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney : function(){
    return appData.budgetMonth * periodRange.value;

  }


}


salaryAmount.addEventListener('input', function(){
  

  if(salaryAmount.value !== ''){
    Start.disabled = false; 
    Start.style.opacity = 1;
    Start.style.cursor = 'pointer';
    Start.addEventListener('click', appData.start);
  }else{
    Start.disabled = true; 
    Start.style.opacity = 0.2;
    Start.style.cursor = 'default';

  };
  

});



buttonAddExpanses.addEventListener('click', appData.addExpensesBlock);
buttonAddIncome.addEventListener('click', appData.addIncomeBlock);

//periodRange.addEventListener('input', appData.addIncomeBlock);
periodRange.addEventListener('input', function(e){
  titlePeriodAmount.innerHTML= e.target.value;
  appData.showResult();
});





appData.expensesMonth = appData.getExpensesMonth();


appData.budgetMonth = appData.getBudget(money, appData.expensesMonth);

console.log("Расходы за месяц "+ appData.expensesMonth );


console.log(appData.getTargetMonth(appData.mission, appData.budgetMonth));


appData.budgetDay = appData.budgetMonth / 30;


console.log(appData.getStatusIncome(appData.budgetDay));

for(let key in appData){
  console.log(appData[key]);
}

appData.getInfoDeposit();

for(let key in appData.addExpenses){

  let temp;
  if(key<Object.keys(appData.addExpenses).length-1){
  temp = appData.addExpenses[key][0].toUpperCase() + appData.addExpenses[key].slice(1)+", ";
  }else{
    temp = appData.addExpenses[key][0].toUpperCase() + appData.addExpenses[key].slice(1);
  }
}
