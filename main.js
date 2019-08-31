var display = document.getElementById("display");
var calcInterface = document.getElementById("calculator");
var calc = {
  currentNum: "0",
  activeOperator: null,
  currentEquation: [],

  appendCurrentNum: function(newNum) {
    if (this.currentNum == "0") {
      if (newNum == ".") {
        this.currentNum = "0.";
      } else {
        this.currentNum = newNum;
      }
    } else {
      if (newNum == ".") {
        if (this.currentNum.indexOf(".") === -1) {
          this.currentNum += newNum;
        }
      } else {
        this.currentNum += newNum;
      }
    }
  },

  //UI

  displayCurrentNum: function(display) {
    display.innerHTML = this.currentNum;
  },
  
  allClear: function() {
    this.currentNum = "0";
    this.currentEquation = [];
  },

  clearCurrentNum: function() {
    this.currentNum = "0";
  },

  changeSign: function() {
    this.currentNum = (Number(this.currentNum) * -1).toString();
  },

  operate: function(num1, operator, num2) {
    if (operator == "divide") {
      return num1 / num2;
    } else if (operator == "multiply") {
      return num1 * num2;
    } else if (operator == "subtract") {
      return num1 - num2;
    } else if (operator == "add") {
      return num1 + num2;
    }
  },

  appendToCurrentEquation: function(target) {
    if (target.classList.contains("operator") && !this.activeOperator) {
      console.log("test");
      this.currentEquation.push(Number(this.currentNum));
      console.log(this.currentNum);
      console.log(this.currentEquation);
    } else if (
      target.classList.contains("number") &&
      this.activeOperator
    ) {
      this.currentEquation.push(this.activeOperator);
      this.activeOperator = null;
      this.clearCurrentNum();
    }
  },

  solve: function(arr) {
    var eq = [...arr];
    console.log(eq);
    if (typeof eq[eq.length - 1] === "string") {
      eq.push(Number(this.currentNum));
      return this.solve(eq);
    } else if (eq.length === 1) {
      return eq[0];
    } else if (eq.length >= 3) {
      var i;
      if (eq.includes("multiply") || eq.includes("divide")) {
        var m = eq.indexOf("multiply");
        var d = eq.indexOf("divide");
        if (m === -1) {
          i = d;
        } else if (d === -1) {
          i = m;
        } else {
          i = Math.min(m, d);
        }
      } else if (eq.includes("add") || eq.includes("subtract")) {
        var a = eq.indexOf("add");
        var s = eq.indexOf("subtract");
        if (a === -1) {
          i = s;
        } else if (s === -1) {
          i = a;
        } else {
          i = Math.min(a, s);
        }
      }
      var n = this.operate(eq[i - 1], eq[i], eq[i + 1]);
      eq.splice(i - 1, 3, n);
      return this.solve(eq);
    }
  }
};

calcInterface.addEventListener("click", function(e) {
  var id = e.target.id;
  calc.appendToCurrentEquation(e.target);

  if (id[0] === "n") {
    calc.appendCurrentNum(id[1]);
    calc.displayCurrentNum(display);
  } else if (id === "clear") {
    calc.allClear();
    calc.displayCurrentNum(display);
  } else if (id === "sign") {
    calc.changeSign();
    calc.displayCurrentNum(display);
  } else if (e.target.classList.contains("operator")) {
    calc.activeOperator = id;
  } else if (id == "equals") {
    calc.currentNum = calc.solve(calc.currentEquation);
    calc.currentEquation = [];
    calc.activeOperator = null;
    calc.displayCurrentNum(display);
  }
});
