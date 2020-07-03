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
    

const AppData = function(){
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.incomeMonth = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.temp = 0;
  
};

AppData.prototype.start = function(){
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
};

AppData.prototype.Reset = function(){


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

  

  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.incomeMonth = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.temp = 0;

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

AppData.prototype.showResult = function(){
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.ceil(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  possibleExpenses.value = this.addExpenses.join(", ");
  possibleIncome.value = this.addIncome.join(', ');
  targetMonth.value = this.getTargetMonth();
  incomePeriod.value =  this.calcSavedMoney();
  
};

AppData.prototype.addExpensesBlock= function(){
  let cloneExpensesItem = expensesItem[0].cloneNode(true);
  expensesItem[0].parentNode.insertBefore(cloneExpensesItem, buttonAddExpanses);
  expensesItem = document.querySelectorAll('.expenses-items');
  
  if(expensesItem.length > 2){
    buttonAddExpanses.style.display = 'none';
  }

};

AppData.prototype.getExpenses= function(){
  const _this = this;
  expensesItem = document.querySelectorAll('.expenses-items');
  
  expensesItem.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== ''&& cashExpenses !== ''){
        _this.expenses[itemExpenses]= cashExpenses;
      }
  });
};

AppData.prototype.addIncomeBlock= function(){
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonAddIncome);
  incomeItems = document.querySelectorAll('.income-items');
  
  if(incomeItems.length > 2){
    buttonAddIncome.style.display = 'none';
  }

};

AppData.prototype.getIncome= function(){
  const _this = this;
  incomeItems.forEach(function(item){
    let itemIncome = item.querySelector('.income-title').value.trim();
    let cashIncome = +item.querySelector('.income-amount').value;
    if(itemIncome !== ''&& cashIncome !== ''){
      _this.income[itemIncome]= cashIncome;
    }
});

 for( let key in _this.income){
   this.incomeMonth += +this.income[key];
 }

};


AppData.prototype.getAddExpenses= function(){
  const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item!== ''){
        _this.addExpenses.push(item);
      }
    });
    
};

AppData.prototype.getAddIncome= function(){
  const _this = this;
  additionalIncome.forEach(function(item){
    let itemValue = item.value.trim();
    if(itemValue!== ''){
      _this.addIncome.push(itemValue);
    }
  });

};



AppData.prototype.getExpensesMonth = function(){
  let sum = 0;

  for(let key in this.expenses){
    sum+= +this.expenses[key];

  }
  return sum;
};


AppData.prototype.getBudget = function () {

  return this.budget + this.incomeMonth - this.expensesMonth;
};


AppData.prototype.getTargetMonth = function () {

  return parseFloat(Math.ceil(targetAmount.value / this.budgetMonth));
};

/*
AppData.prototype.getStatusIncome = function(){

    if(1200<=appData.budgetDay){
        return ("У вас высокий уровень дохода");
  
    }else if(appData.budgetDay>600&&appData.budgetDay<1200){
      return ("У вас средний уровень дохода");
  
    }else if(appData.budgetDay<=600){
        return ("К сожалению у вас уровень дохода ниже среднего");
  
    }else{
        return ("Что то пошло не так");
    }
};
*/


AppData.prototype.getInfoDeposit = function(){
  const _this = this;
  if(_this.deposit){
    do{
      _this.percentDeposit = prompt('Какой годовой процент?', 10);
    }while (!isNumber(_this.percentDeposit));

    do{
      _this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    }while (!isNumber(_this.moneyDeposit));
  }
};


AppData.prototype.calcSavedMoney = function(){
  return this.budgetMonth * periodRange.value;
};


AppData.prototype.eventListners = function(){
  const _this = this;
Start.addEventListener('click', _this.start.bind(_this));
Cancel.addEventListener('click', _this.Reset.bind(_this));

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


buttonAddExpanses.addEventListener('click', _this.addExpensesBlock);
buttonAddIncome.addEventListener('click', _this.addIncomeBlock);

periodRange.addEventListener('input', function(e){
  titlePeriodAmount.innerHTML= e.target.value;
  _this.showResult();

});

};

const appData2 = new AppData();

appData2.eventListners();





appData2.expensesMonth = appData2.getExpensesMonth();


appData2.budgetMonth = appData2.getBudget(money, appData2.expensesMonth);

//console.log(appData.getTargetMonth(appData.mission, appData.budgetMonth));


appData2.budgetDay = appData2.budgetMonth / 30;



for(let key in appData2){
  console.log(appData2[key]);
}

appData2.getInfoDeposit();


for(let key in appData2.addExpenses){

  let temp;
  if(key<Object.keys(appData.addExpenses).length-1){
  temp = appData2.addExpenses[key][0].toUpperCase() + appData2.addExpenses[key].slice(1)+", ";
  }else{
    temp = appData2.addExpenses[key][0].toUpperCase() + appData2.addExpenses[key].slice(1);
  }
}
