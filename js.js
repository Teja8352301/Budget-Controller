// TOTAL BUDGET
var inputObj = [];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var i = 1;
var mon = document.querySelector("#total_month");
var tAmount = document.querySelector("#total_amount");
var date = new Date();
var incomeAmount = document.querySelector("#income_amount");
var expenseAmount = document.querySelector("#expense_amount");
var symbol = document.querySelector("#symbol");
var inputName = document.querySelector("#input_name");
var inputValue = document.querySelector("#input_value");
var checkButton = document.querySelector("#input_check");
var insertPos = document.querySelector("#insertHtml");
var insertNeg = document.querySelector("#insertHtml2");
// TOtal Budget FUnction
(function () {
  mon.textContent = ` Available Budget in ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
  incomeAmount.textContent = "0";
  expenseAmount.textContent = "0";
  focus1();
  // useArray();
  //   console.log(symbol.value);
})();

let inbadge;
let exbadge;
let incount = 0;
let excount = 0;

// Input Function
function focus1() {
  inputName.addEventListener("keypress", function (e) {
    if (e.code === "Enter") {
      inputValue.focus();
    }
  });
  inputValue.addEventListener("keypress", function (e) {
    if (e.code === "Enter") {
      checking();
    }
  });
}

checkButton.addEventListener("click", checking);
function checking() {
  if (inputName.value == "" || inputValue == 0) {
    alert("Invalid Inputs");
  } else {
    objCon();
  }
}

// OBJECT CONVERSION///////////////
var objCon = function () {
  var obj = {
    type: symbol.value,
    amt: inputValue.value,
    name: inputName.value,
  };
  //   console.log(obj);
  inputObj.push(obj);
  addHtml(obj);
  totalBudget();
  inputName.value = inputValue.value = "";
  symbol.value = "plus";
  inputName.focus();
};

// Total amount
var totalBudget = function () {
  var sum = 0;
  inputObj.forEach(function (val) {
    if (val.type == "plus") {
      sum = sum + parseInt(val.amt);
    }
    if (val.type === "minus") {
      sum = sum - parseInt(val.amt);
    }
  });

  tAmount.textContent = sum;
  inExBudget();
};

// Income Amount
var inExBudget = function () {
  var insum = 0;
  var exsum = 0;
  inputObj.forEach(function (val) {
    if (val.type == "plus") {
      insum = insum + parseInt(val.amt);
    }
    if (val.type === "minus") {
      exsum = exsum + parseInt(val.amt);
    }
  });
  incomeAmount.textContent = insum;
  expenseAmount.textContent = exsum;
  inexbadge(insum, exsum);
};
// Badge Function////////////////
var inexbadge = function (insum, exsum) {
  var i = 0;
  var j = 0;
  inputObj.forEach(function (val) {
    if (val.type == "plus") {
      var amt = parseInt(val.amt);
      var total = 100 * (amt / parseInt(insum));

      var cond = true;
      var obj;
      while (cond) {
        i++;
        obj = document.querySelector(`#inbadge${i}`);
        if (obj) {
          cond = false;
        }
      }
      obj.textContent = total.toFixed(2) + "%";
    }
    if (val.type === "minus") {
      var amt = parseInt(val.amt);
      var total = 100 * (amt / parseInt(exsum));
      var cond1 = true;
      var obj1;
      while (cond1) {
        j++;
        obj1 = document.querySelector(`#exbadge${j}`);
        if (obj1) {
          cond1 = false;
        }
      }
      obj1.textContent = total.toFixed(2) + "%";
    }
  });
};
var count = 1;
//////////////Adding Html Element/////////
var addHtml = function (val) {
  if (val.type === "plus") {
    incount = incount + 1;
    var html = `        <div
        id="income_item"
        class="d-flex justify-content-between bg-success text-white align-items-center rounded pl-2 mb-3"
      >
        <div class="h4" id="head">${val.name}</div>
        <div class="h4 pt-2 d-flex align-items-center justify-content-center">
          ${val.amt}<span id="inbadge${incount}" class="badge badge-light bg-danger m-2 text-white"
            >36%</span
          >
          <div class="rounded bg-danger clos${count} dan">
                <i
                  class="fa fa-close text-white d-flex justify-content-center align-items-center"
                  style="font-size: 24px"
                ></i>
              </div>
        </div>
      </div>`;
    insertPos.insertAdjacentHTML("afterbegin", html);
  }
  if (val.type === "minus") {
    excount = excount + 1;
    var html = `
    <div
      id="expense_item"
      class="d-flex justify-content-between bg-danger text-white align-items-center rounded pl-2 mb-3"
    >
      <div class="h4" id="head">${val.name}</div>
      <div class="h4 pt-2 d-flex align-items-center justify-content-center">
        ${val.amt}
        <span id="exbadge${excount}" class="badge badge-light bg-success m-2 text-white">36%</span>
        <div class="rounded bg-danger clos${count} dan">
                <i
                  class="fa fa-close text-white d-flex justify-content-center align-items-center"
                  style="font-size: 24px"
                ></i>
              </div>
      </div>
    </div>`;
    insertNeg.insertAdjacentHTML("afterbegin", html);
  }
  closing(count, val.type);
  count = count + 1;

  //   });
};

// Badge Modification/////////////
function closing(count, type) {
  var closed = document.querySelector(`.clos${count}`);
  closed.addEventListener("click", function () {
    var parentNode = closed.parentElement.parentElement;
    console.log(parentNode.firstElementChild.textContent);
    inputObj.forEach(function (val) {
      if (val.name === parentNode.firstElementChild.textContent) {
        inputObj.splice(inputObj.indexOf(val), 1);
        parentNode.remove();
        totalBudget();
      }
    });
  });
}

// Using Array

// function useArray() {
//   if (inputObj.length) {
//     inputObj.forEach(function (val) {
//       addHtml(val);
//     });
//   }
// }
