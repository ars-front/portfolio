'use strict';




//let money;
    

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
  this.Start = document.getElementById('start');
  this.buttonAddIncome =document.getElementsByTagName('button')[0];
  this.buttonAddExpanses =document.getElementsByTagName('button')[1];
  this.salaryAmount = document.querySelector('.salary-amount');
  this.additionalIncomeTitle = document.querySelector('.income-items> .income-title')
  this.additionalIncomeAmount = document.querySelector('.income-items> .income-amount');
  this.possibleExpenseTitle =  document.querySelector('.expenses-items> .expenses-title');
  //let possibleExpenseAmount =  document.querySelector('.expenses-items> .expenses-amount');
  this.expensesItem = document.querySelectorAll('.expenses-items');
  this.additionalExpensesItem =  document.querySelector('.additional_expenses-item');
  this.deposit = document.querySelector('#deposit-check');
  this.targetAmount =  document.querySelector('.target-amount');
  this.periodRange =  document.querySelector('.period-select');
  this.additionalIncome = document.querySelectorAll('.additional_income-item');
  this.budgetMonthValue =  document.querySelector('.budget_month-value');
  this.budgetDayValue =  document.querySelector('.budget_day-value');
  this.expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
  this.possibleIncome =  document.querySelector('.additional_income-value');
  this.possibleExpenses =  document.querySelector('.additional_expenses-value');
  this.incomePeriod =  document.querySelector('.income_period-value');
  this.targetMonth =  document.querySelector('.target_month-value');
  this.incomeItems = document.querySelectorAll('.income-items');
  this.titlePeriodAmount =  document.querySelector('.title.period-amount');
  this.Cancel = document.getElementById('cancel');
  this.isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
  };
};




AppData.prototype.CheckValue = function(){

  if(this.salaryAmount.value !== ''){
    this.Start.disabled = false; 
    this.Start.style.opacity = 1;
    this.Start.style.cursor = 'pointer';
    
  }else{
    this.Start.disabled = true; 
    this.Start.style.opacity = 0.2;
    this.Start.style.cursor = 'default';
  };

};



AppData.prototype.ChangePeriod = function(){
  this.titlePeriodAmount.innerHTML= this.periodRange.value;
  this.showResult();
};

AppData.prototype.start = function(){

  this.Start.disabled = true; 
  this.Start.style.opacity = 0.2;
  this.Start.style.cursor = 'default';
  this.Start.style.opacity = 0.2;
  this.Start.style.cursor = 'default';
  this.Start.style.display = "none";
  this.Cancel.style.display = 'block';

  this.salaryAmount.readOnly = "readonly";
  this.targetAmount.readOnly = "readonly";
  this.additionalIncomeTitle.readOnly = "readonly";
  this.additionalIncomeAmount.readOnly = "readonly";
  this.additionalIncome.readOnly = "readonly";
  this.budgetMonthValue.readOnly = "readonly";
  this.budgetDayValue.readOnly = "readonly";
  this.possibleExpenses.readOnly = "readonly";
  this.expensesMonthValue.readOnly = "readonly";
  this.possibleIncome.readOnly = "readonly";
  this.incomePeriod.readOnly = "readonly";
  this.targetMonth.readOnly = "readonly";
  this.titlePeriodAmount.readOnly = "readonly";
  this.additionalExpensesItem.readOnly = "readonly";
   
  this.budget = +this.salaryAmount.value;
  this.getExpenses();
  this.expensesMonth = this.getExpensesMonth();

  this.getAddExpenses();
  this.getAddIncome();
  this.getIncome();
  this.budgetMonth = this.getBudget(this.expensesMonth);
  this.budgetDay = this.budgetMonth / 30;
  this.showResult();
};

AppData.prototype.Reset = function(){

  this.Start.style.display = 'block';
  this.Cancel.style.display = 'none';
 
  this.salaryAmount.readOnly = false;
  this.targetAmount.readOnly = false;
  this.additionalIncomeTitle.readOnly = false;
  this.additionalIncomeAmount.readOnly = false;
  this.additionalIncome.readOnly = false;
  this.budgetMonthValue.readOnly = false;
  this.budgetDayValue.readOnly = false;
  this.possibleExpenses.readOnly = false;
  this.expensesMonthValue.readOnly = false;
  this.possibleIncome.readOnly = false;
  this.incomePeriod.readOnly = false;
  this.targetMonth.readOnly = false;
  this.titlePeriodAmount.readOnly = false;
  this.additionalExpensesItem.readOnly = false;

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

  this.salaryAmount.value = null;
  this.targetAmount.value = null;
  this.additionalIncomeTitle.value = null;
  this.additionalIncomeAmount.value = null;
  this.additionalIncome.value = null;
  this.budgetMonthValue.value = null;
  this.budgetDayValue.value = null;
  this.possibleExpenses.value  = null;
  this.expensesMonthValue.value = null;
  this.possibleIncome.value  = null;
  this.incomePeriod.value = null;
  this.targetMonth.value = null;
  this.titlePeriodAmount.value = null;
  this.additionalExpensesItem.value  = null;
  this.periodRange.value = 1;

  this.additionalIncome.forEach(function(item){
  item.value = null;
});


this.incomeItems.forEach(function(item){
  item.querySelector('.income-title').value = null;
  item.querySelector('.income-amount').value = null;

  if(this.incomeItems.length > 1){
    item.remove();
  }
  this.incomeItems = document.querySelectorAll('.income-items');

}, this);

this.expensesItem.forEach(function(item){
  item.querySelector('.expenses-title').value = null;
  item.querySelector('.expenses-amount').value = null;
  
  if(this.expensesItem.length > 1 ){
    item.remove();
  }
  this.expensesItem = document.querySelectorAll('.expenses-items');

},this);

this.buttonAddExpanses.style.display = 'block';
this.buttonAddIncome.style.display = 'block';
this.titlePeriodAmount.innerHTML= 1;

};

AppData.prototype.showResult = function(){
  this.budgetMonthValue.value = this.budgetMonth;
  this.budgetDayValue.value = Math.ceil(this.budgetDay);
  this.expensesMonthValue.value = this.expensesMonth;
  this.possibleExpenses.value = this.addExpenses.join(", ");
  this.possibleIncome.value = this.addIncome.join(', ');
  this.targetMonth.value = this.getTargetMonth();
  this.incomePeriod.value =  this.calcSavedMoney();
};


AppData.prototype.addExpensesBlock= function(){
  let cloneExpensesItem = this.expensesItem[0].cloneNode(true);
  this.expensesItem[0].parentNode.insertBefore(cloneExpensesItem, this.buttonAddExpanses);
  this.expensesItem = document.querySelectorAll('.expenses-items');
  
  if(this.expensesItem.length > 2){
    this.buttonAddExpanses.style.display = 'none';
  }

};

AppData.prototype.getExpenses= function(){
  this.expensesItem = document.querySelectorAll('.expenses-items');
  
  this.expensesItem.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== ''&& cashExpenses !== ''){
        this.expenses[itemExpenses]= cashExpenses;
      }
  }, this);
};

AppData.prototype.addIncomeBlock= function(){
  let cloneIncomeItem = this.incomeItems[0].cloneNode(true);
  this.incomeItems[0].parentNode.insertBefore(cloneIncomeItem, this.buttonAddIncome);
  this.incomeItems = document.querySelectorAll('.income-items');
  
  if(this.incomeItems.length > 2){
    this.buttonAddIncome.style.display = 'none';
  }
};

AppData.prototype.getIncome = function(){
  this.incomeItems.forEach(function(item){
    let itemIncome = item.querySelector('.income-title').value.trim();
    let cashIncome = +item.querySelector('.income-amount').value;
    if(itemIncome !== ''&& cashIncome !== ''){
      this.income[itemIncome]= cashIncome;
    }
}, this);

 for( let key in this.income){
   this.incomeMonth += +this.income[key];
 }

};


AppData.prototype.getAddExpenses= function(){

    let addExpenses = this.additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item!== ''){
        this.addExpenses.push(item);
      }
    }, this);
    
};

AppData.prototype.getAddIncome= function(){
  this.additionalIncome.forEach(function(item){
    let itemValue = item.value.trim();
    if(itemValue!== ''){
      this.addIncome.push(itemValue);
    }
  }, this);

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

  return parseFloat(Math.ceil(this.targetAmount.value / this.budgetMonth));
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
    }while (!this.isNumber(_this.percentDeposit));

    do{
      _this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    }while (!this.isNumber(_this.moneyDeposit));
  }
};


AppData.prototype.calcSavedMoney = function(){
  return this.budgetMonth * this.periodRange.value;
};


AppData.prototype.eventListners = function(){
  
  this.Start.addEventListener('click', this.start.bind(this));
  this.Cancel.addEventListener('click', this.Reset.bind(this));
  this.salaryAmount.addEventListener('input', this.CheckValue.bind(this));

  this.buttonAddExpanses.addEventListener('click', this.addExpensesBlock.bind(this));
  this.buttonAddIncome.addEventListener('click', this.addIncomeBlock.bind(this));

  this.periodRange.addEventListener('input', this.ChangePeriod.bind(this));
    
};

const appData2 = new AppData();

appData2.eventListners();

//appData2.getInfoDeposit();


/*
for(let key in appData2.addExpenses){

  let temp;
  if(key<Object.keys(appData2.addExpenses).length-1){
  temp = appData2.addExpenses[key][0].toUpperCase() + appData2.addExpenses[key].slice(1)+", ";
  }else{
    temp = appData2.addExpenses[key][0].toUpperCase() + appData2.addExpenses[key].slice(1);
  }
}
*/
