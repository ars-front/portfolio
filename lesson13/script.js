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
let Cancel = document.getElementById('cancel');

Start.disabled = true; 
Start.style.opacity = 0.2;
Start.style.cursor = 'default';

let isNumber = function(n){

  return !isNaN(parseFloat(n)) && isFinite(n)

};



let money;
    



let appData = {

  income : {},
  addIncome : [],
  expenses : {},
  addExpenses : [],
  deposit : false,
  percentDeposit : 0,
  moneyDeposit : 0,
  incomeMonth : 0,
  budget : 0,
  budgetDay : 0,
  budgetMonth : 0,
  expensesMonth : 0,
  temp : 0,

  start : function(){
    
 
  Start.style.opacity = 0.2;
  Start.style.cursor = 'default';
  Start.style.display = "none";
  Cancel.style.display = 'block';

  salaryAmount.readOnly = "readonly";
   targetAmount.readOnly = "readonly";
   additionalIncomeTitle.readOnly = "readonly";
   additionalIncomeAmount.readOnly = "readonly";
   additionalIncome.readOnly = "readonly";
   budgetMonthValue.readOnly = "readonly";
   budgetDayValue.readOnly = "readonly";
   possibleExpenses.readOnly = "readonly";
   expensesMonthValue.readOnly = "readonly";
   possibleIncome.readOnly = "readonly";
   incomePeriod.readOnly = "readonly";
   targetMonth.readOnly = "readonly";
   titlePeriodAmount.readOnly = "readonly";
   additionalExpensesItem.readOnly = "readonly";
   



  
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.expensesMonth = this.getExpensesMonth();

  this.getAddExpenses();
  this.getAddIncome();
  this.getIncome();
  this.budgetMonth = this.getBudget(money, this.expensesMonth);
  this.budgetDay = this.budgetMonth / 30;
  this.showResult();
  
 
  },

  Reset: function(){


    Start.style.display = 'block';
    Cancel.style.display = 'none';
   
    salaryAmount.readOnly = false;
   targetAmount.readOnly = false;
   additionalIncomeTitle.readOnly = false;
   additionalIncomeAmount.readOnly = false;
   additionalIncome.readOnly = false;
   budgetMonthValue.readOnly = false;
   budgetDayValue.readOnly = false;
   possibleExpenses.readOnly = false;
   expensesMonthValue.readOnly = false;
   possibleIncome.readOnly = false;
   incomePeriod.readOnly = false;
   targetMonth.readOnly = false;
   titlePeriodAmount.readOnly = false;
   additionalExpensesItem.readOnly = false;

    

    appData.income = {};
    appData.addIncome = [];
    appData.expenses = {};
    appData.addExpenses = [];
    appData.deposit = false;
    appData.percentDeposit = 0;
    appData.moneyDeposit = 0;
    appData.incomeMonth = 0;
    appData.budget = 0;
    appData.budgetDay = 0;
    appData.budgetMonth = 0;
    appData.expensesMonth = 0;
    appData.temp = 0;

   salaryAmount.value = null;
   targetAmount.value = null;
   additionalIncomeTitle.value = null;
   additionalIncomeAmount.value = null;
   additionalIncome.value = null;
   budgetMonthValue.value = null;
   budgetDayValue.value = null;
   possibleExpenses.value  = null;
   expensesMonthValue.value = null;
   possibleIncome.value  = null;
   incomePeriod.value = null;
   targetMonth.value = null;
   titlePeriodAmount.value = null;
   additionalExpensesItem.value  = null;
   periodRange.value = 1;

   additionalIncome.forEach(function(item){
    item.value = null;
  });



  incomeItems.forEach(function(item){
    item.querySelector('.income-title').value = null;
    item.querySelector('.income-amount').value = null;

    if(incomeItems.length > 1){
      item.remove();
    }
    incomeItems = document.querySelectorAll('.income-items');

    
});



  expensesItem.forEach(function(item){
    
    item.querySelector('.expenses-title').value = null;
    item.querySelector('.expenses-amount').value = null;
    
    if(expensesItem.length > 1 ){
      item.remove();
    }

    expensesItem = document.querySelectorAll('.expenses-items');

    
});


buttonAddExpanses.style.display = 'block';
buttonAddIncome.style.display = 'block';
titlePeriodAmount.innerHTML= 1;

  },

  showResult: function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    possibleExpenses.value = this.addExpenses.join(", ");
    possibleIncome.value = this.addIncome.join(', ');
    targetMonth.value = this.getTargetMonth();
    incomePeriod.value =  this.calcSavedMoney();
    
    
  },

  addExpensesBlock: function(){
    let cloneExpensesItem = expensesItem[0].cloneNode(true);
    expensesItem[0].parentNode.insertBefore(cloneExpensesItem, buttonAddExpanses);
    expensesItem = document.querySelectorAll('.expenses-items');
    
    if(expensesItem.length > 2){
      buttonAddExpanses.style.display = 'none';
    }

  },

  getExpenses: function(){
    expensesItem = document.querySelectorAll('.expenses-items');
    
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
    
    if(incomeItems.length > 2){
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
     this.incomeMonth += +this.income[key];
   }
  
  },

  getAddExpenses: function(){
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
        item = item.trim();
        if(item!== ''){
          appData.addExpenses.push(item);
        }
      });
      
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

    for(let key in this.expenses){
      sum+= +this.expenses[key];

    }
    return sum;
  },

  getBudget : function () {

    return this.budget + this.incomeMonth - this.expensesMonth;
  },
  
  getTargetMonth : function () {

    return parseFloat(Math.ceil(targetAmount.value / this.budgetMonth));
  
     
    
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
    return this.budgetMonth * periodRange.value;
  
  }


}


Start.addEventListener('click', appData.start.bind(appData));
Cancel.addEventListener('click', appData.Reset.bind(appData));

salaryAmount.addEventListener('input', function(){
  

  if(salaryAmount.value !== ''){
    Start.disabled = false; 
    Start.style.opacity = 1;
    Start.style.cursor = 'pointer';
    
  }else{
    Start.disabled = true; 
    Start.style.opacity = 0.2;
    Start.style.cursor = 'default';
  };
  

});

function Ranger(e){
  titlePeriodAmount.innerHTML= e.target.value;
  appData.showResult();
}

buttonAddExpanses.addEventListener('click', appData.addExpensesBlock);
buttonAddIncome.addEventListener('click', appData.addIncomeBlock);



periodRange.addEventListener('input', Ranger, false);





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