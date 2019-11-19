class Transaction {
  static id = 0;

  constructor(amount, description) {
      this.id = Transaction.id++;
      this.amount = amount;
      this.description = description;
  }
}

class Income extends Transaction {
  constructor(amount, description) {
      super(amount, description);
  }
}

class Expense extends Transaction {
  constructor(amount, description) {
      super(amount, description);
  }
}

let allIncome = [];
let allExpense = [];

const month = document.querySelector(".budget__title--month");
const totalBudget = document.getElementsByClassName("budget__value");
const totalIncome = document.getElementsByClassName("budget__income--value");
const totalExpenses = document.getElementsByClassName("budget__expenses--value");
const totalExpensesPercent = document.getElementsByClassName("budget__expenses--percentage");

const clear = document.querySelector(".container.clearfix");

const addValues = document.getElementById("budgetInputs");
const addName = addValues.querySelector(".add__description");
const inputNumber = addValues.querySelector(".add__value");

const incomeList = document.querySelector(".income__list");
const expensesList = document.querySelector(".expenses__list");

addValues.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log(e);
  let addNumber = parseInt(inputNumber.value).toFixed(2);

  if (addName.innerHTML === "") {
    console.log("Please enter description!");
    inputNumber.value = '';
    return;
  }

  if (inputNumber.innerHTML === "") {
    console.log("Please enter a value!");
    addName.value = '';
    return;
  }

  if (addValues.children[0].value === "inc") {
    allIncome.push(new Income(parseInt(addNumber), addName.value));
  } else if (addValues.children[0].value === "exp") {
    allExpense.push(new Expense(parseInt(addNumber), addName.value));
  }

  inputNumber.value = '';
  addName.value = '';
  updatePage(allIncome, allExpense);
})

const getDate = function() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  
  let currentDate = new Date();
  let monthIndex = currentDate.getMonth();
  let monthName = months[monthIndex];
  let currentYear = currentDate.getFullYear();
  month.textContent = `${monthName} ${currentYear}`;
};

getDate();

const updatePage = function(income, expense) {
  incomeList.innerHTML = "";
  expensesList.innerHTML = "";

  let sumIncome = 0;
  let sumExpense = 0;

  for (let elem of income) {
    sumIncome += elem.amount;
    incomeList.insertAdjacentHTML("beforeend", 
      `<div class="item clearfix" id="${elem.id}">
        <div class="item__description">${elem.description}</div>
        <div class="right clearfix">
        <div class="item__value">+ $${(elem.amount).toFixed(2)}</div>
        <div class="item__delete">
        <button class="item__delete--btn">
          <i class="ion-ios-close-outline"></i>
        </button>
        </div>
        </div>
      </div>`);
  }

  for (let element of expense) {
    sumExpense += element.amount;
    let percent = ((sumIncome <= 0) || (sumIncome <= sumExpense)) ? 0 : parseInt((element.amount / sumIncome) * 100);
    expensesList.insertAdjacentHTML("beforeend", 
      `<div class="item clearfix" id="${element.id}">
        <div class="item__description">${element.description}</div>
        <div class="right clearfix">
        <div class="item__value">- $${element.amount}</div>
        <div class="item__percentage">${percent}%</div>
        <div class="item__delete">
        <button class="item__delete--btn">
          <i class="ion-ios-close-outline"></i>
        </button>
        </div>
        </div>
      </div>`);
  }

  totalExpenses[0].textContent = `- $${sumExpense.toFixed(2)}`;
  totalIncome[0].textContent = `+ $${sumIncome.toFixed(2)}`;

  totalBudget[0].textContent = `$${(sumIncome - sumExpense).toFixed(2)}`;
  let sumPercent = ((sumIncome <= 0) || (sumIncome <= sumExpense)) ? 0 : parseInt((sumExpense / sumIncome) * 100);
  totalExpensesPercent[0].textContent = `${sumPercent}%`;
};

clear.addEventListener("click", function(e) {
  let idToErase = parseInt(e.path[4].id);
  if (e.target.className === "ion-ios-close-outline") {
    allExpense = allExpense.filter(obj => obj.id !== idToErase);
    allIncome = allIncome.filter(obj => obj.id !== idToErase);
  }

  updatePage(allIncome, allExpense);
})