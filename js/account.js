class Account {
  constructor(
    id,
    code,
    name = "",
    balance = 0,
    incomes = [],
    expenses = []
  ) {
    this._id = id;
    this._name = name;
    this._code = code;
    this._balance = balance;
    this._incomes = incomes;
    this._expenses = expenses;
  }

  addDeposit(amount, date) {
    const deposit = {
      amount: amount,
      date: date,
    };

    this._incomes.push(deposit);
  }

  addWithdrawal(amount, date) {
    const withdrawal = {
      amount: amount,
      date: date,
    };

    this._expenses.push(withdrawal);
  }
}
