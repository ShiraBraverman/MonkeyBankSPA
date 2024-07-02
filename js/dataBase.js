function exist(id) {
  if (localStorage.getItem(id)) return true;
  return false;
}

function existName(id, name) {
  if (JSON.parse(localStorage.getItem(id))._name == name) return true;
  return false;
}

function getAccount(id) {
  return localStorage.getItem(id);
}

function postAccount(account) {
  account._balance = 0;
  localStorage.setItem(account._id, JSON.stringify(account));
}

function getCode(id) {
  return JSON.parse(localStorage.getItem(id))._code;
}

function getBalance(id) {
  return JSON.parse(localStorage.getItem(id))._balance;
}

function postDeposit(data) {
  let parseData = JSON.parse(data);

  let oldAccount = JSON.parse(localStorage.getItem(parseData.id));
  let newAccount = new Account(
    oldAccount._id,
    oldAccount._code,
    oldAccount._name,
    oldAccount._balance,
    oldAccount._incomes,
    oldAccount._expenses
  );

  newAccount.addDeposit(parseData.sum, parseData.date);

  localStorage.setItem(parseData.id, JSON.stringify(newAccount));
}

function postWithdrawal(data) {
  let parseData = JSON.parse(data);

  let oldAccount = JSON.parse(localStorage.getItem(parseData.id));
  if (oldAccount._balance - parseData.sum <= -2000)
    return false;

  let newAccount = new Account(
    oldAccount._id,
    oldAccount._code,
    oldAccount._name,
    oldAccount._balance,
    oldAccount._incomes,
    oldAccount._expenses
  );

  newAccount.addWithdrawal(parseData.sum, parseData.date);
  localStorage.setItem(parseData.id, JSON.stringify(newAccount));
  return true;
}

function putBalance(data) {
  let parseData = JSON.parse(data);

  let oldAccount = JSON.parse(localStorage.getItem(parseData.id));
  let newAmount = parseInt(oldAccount._balance) + parseInt(parseData.balance);

  let newAccount = new Account(
    oldAccount._id,
    oldAccount._code,
    oldAccount._name,
    newAmount,
    oldAccount._incomes,
    oldAccount._expenses
  );

  localStorage.setItem(JSON.parse(data).id, JSON.stringify(newAccount));
}

function getIncomes(id) {
  return (JSON.parse(localStorage.getItem(id)))._incomes;
}

function getExpenses(id) {
  return (JSON.parse(localStorage.getItem(id)))._expenses;
}
