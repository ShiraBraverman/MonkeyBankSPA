function showBalance() {
  let fxhr = new FXMLHttpRequest();
  fxhr.open("GET", `https:/accounts/api/balance`);
  fxhr.addEventListener("load", () => {
    document.getElementById("sumBalance").innerHTML = fxhr._responseText;
  });
  fxhr.send(sessionStorage.getItem("currentUser"));
}

function cashDeposit() {
  document.getElementById("btnDeposit").addEventListener("click", () => {
    let sum = document.getElementById("CashDepositSum").value;
    if (/^[0-9]+(\.[0-9]+)?$/.test(sum)) {
      if (sum >= 0) {
        newDeposit(sum, sessionStorage.getItem("currentUser"));
        document.getElementById("CashDepositSum").innerHTML = "";
        window.location.hash = "AccountBalance";
      } else {
        alert("enter a positive number please");
      }
    } else {
      alert("enter a number please");
    }
  });
}

function cashWithdrawal() {
  document.getElementById("btnWithdrawal").addEventListener("click", () => {
    let sum = document.getElementById("CashWithdrawalSum").value;
    if (/^[0-9]+(\.[0-9]+)?$/.test(sum)) {
      if (sum >= 0) {
        newWithdrawal(sum, sessionStorage.getItem("currentUser"));
        document.getElementById("CashWithdrawalSum").innerHTML = "";
        window.location.hash = "AccountBalance";
      } else {
        alert("enter a positive number please");
      }
    } else {
      alert("enter a number please");
    }
  });
}

function monthlyIncomes() {
  let sumOfIncomes = 0;
  let fxhr = new FXMLHttpRequest();
  fxhr.open("GET", `https:/accounts/api/incomes`);
  fxhr.addEventListener("load", () => {
    let table = document.getElementById("IncomesTable");
    for (let obj of fxhr._responseText) {
      let row = table.insertRow();
      let dateCell = row.insertCell();
      let sumCell = row.insertCell();
      dateCell.innerHTML = obj.date;
      sumCell.innerHTML = obj.amount;
      sumOfIncomes += parseInt(obj.amount);
    }
    document.getElementById("sumOfIncomes").innerHTML += sumOfIncomes;
  });
  fxhr.send(sessionStorage.getItem("currentUser"));
}

function monthlyExpenses() {
  let sumOfExpenses = 0;
  let fxhr = new FXMLHttpRequest();
  fxhr.open("GET", `https:/accounts/api/expenses`);
  fxhr.addEventListener("load", () => {
    let table = document.getElementById("ExpensesTable");
    for (let obj of fxhr._responseText) {
      let row = table.insertRow();
      let dateCell = row.insertCell();
      let sumCell = row.insertCell();
      dateCell.innerHTML = obj.date;
      sumCell.innerHTML = obj.amount;
      sumOfExpenses += parseInt(obj.amount);
    }
    document.getElementById("sumOfExpenses").innerHTML += sumOfExpenses;
  });
  fxhr.send(sessionStorage.getItem("currentUser"));
}

function bankTransfer() {
  document.getElementById("btnTransfer").addEventListener("click", () => {
    if (
      !/^.*(?=.{2,})[a-zA-Zא-ת].*$/.test((document.getElementById("BankTransferName").value))
    ) {
      alert("Invalid username, Username must contain at least 2 letters");
      return;
    }

    if (document.getElementById("BankTransferId").value.length != 9) {
      alert("Invalid id, id must contain exactly 9 characters");
      return;
    }

    if (
      /^[0-9]+(\.[0-9]+)?$/.test(document.getElementById("BankTransferSum"))
    ) {
      alert("please enter only numbers");
      return;
    }

    let fxhr = new FXMLHttpRequest();
    fxhr.open("GET", `https:/accounts/api/transfer`);

    fxhr.addEventListener("load", () => {
      debugger
      if (fxhr._status == "not exist" || fxhr._status == "worked") {
        newWithdrawal(
          document.getElementById("BankTransferSum").value
          , sessionStorage.getItem("currentUser")
        );
      }
      if (fxhr._status == "worked") {
        newDeposit(
          document.getElementById("BankTransferSum").value
          , document.getElementById("BankTransferId").value
        );
      }
       if (fxhr._status == "incorrect name") {
        alert(fxhr._status);
      }
    });
    let account = new Account(
      document.getElementById("BankTransferId").value, 0,
      document.getElementById("BankTransferName").value
    );

    fxhr.send(account);
  });
}

function newDeposit(sum, id) {
  let fxhrD = new FXMLHttpRequest();
  fxhrD.open("POST", `https:/accounts/api/deposit`);

  let fxhrB = new FXMLHttpRequest();
  fxhrB.open("PUT", `https:/accounts/api/balance`);

  fxhrD.addEventListener("load", () => {
    fxhrB.send(
      JSON.stringify({
        id: id,
        balance: sum,
      })
    );
  });

  fxhrD.send(
    JSON.stringify({
      id: id,
      sum: sum,
      date: today(),
    })
  );
}

function newWithdrawal(sum, id) {
  debugger
  let fxhrD = new FXMLHttpRequest();
  fxhrD.open("POST", `https:/accounts/api/withdrawal`);

  let fxhrB = new FXMLHttpRequest();
  fxhrB.open("PUT", `https:/accounts/api/balance`);

  fxhrD.addEventListener("load", () => {
    if (fxhrD._status) {
      fxhrB.send(
        JSON.stringify({
          id: id,
          balance: sum * -1,
        })
      );
    } else {
      alert(
        "There is no enough money in the balance for this cash withdrawal. If do you want u can try with less money."
      );
    }
  });

  fxhrD.send(
    JSON.stringify({
      id: id,
      sum: sum,
      date: today(),
    })
  );
}

function today() {
  let today = new Date();

  let formattedDate =
    today.getDate() +
    "/" +
    parseInt(today.getMonth()) +
    1 +
    "/" +
    today.getFullYear();
  return formattedDate;
}
