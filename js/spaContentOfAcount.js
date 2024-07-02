function pageLoadSpaContentOfAccount() {
  const appAccount = {
    pages: [],
    init: function () {
      appAccount.pages = document.querySelectorAll(".contentOfAccountPage");

      document
        .getElementById("btnAccountBalance")
        .addEventListener("click", () => {
          window.location.hash = "AccountBalance";
        });
      document
        .getElementById("btnMonthlyIncome")
        .addEventListener("click", () => {
          window.location.hash = "MonthlyIncome";
        });
      document
        .getElementById("btnMonthlyExpenses")
        .addEventListener("click", () => {
          window.location.hash = "MonthlyExpenses";
        });
      document
        .getElementById("btnBankTransfer")
        .addEventListener("click", () => {
          window.location.hash = "BankTransfer";
        });
      document
        .getElementById("btnCashDeposit")
        .addEventListener("click", () => {
          window.location.hash = "CashDeposit";
        });
      document
        .getElementById("btnCashWithdrawal")
        .addEventListener("click", () => {
          window.location.hash = "CashWithdrawal";
        });
      document.getElementById("btnLogOut").addEventListener("click", () => {
        window.addEventListener("hashchange", app.nav);
        window.removeEventListener("hashchange", appAccount.nav);
        window.location.hash = "login";
      });

      window.removeEventListener("hashchange", app.nav);
      window.addEventListener("hashchange", appAccount.nav);
      let openTemplate = document.querySelector(location.hash).content;
      const contentDiv = document.querySelector("#contentOfAccount");
      contentDiv.replaceChildren(openTemplate.cloneNode(true));
      history.pushState({}, "AccountBalance", "#AccountBalance");
    },
    nav: function () {
      let hash = location.hash.replace("#", "");
      let openTemplate = document.querySelector(location.hash).content;
      const contentDiv = document.querySelector("#contentOfAccount");
      contentDiv.replaceChildren(openTemplate.cloneNode(true));
      switch (hash) {
        case "AccountBalance":
          showBalance();
          break;
        case "CashDeposit":
          cashDeposit();
          break;
        case "CashWithdrawal":
          cashWithdrawal();
          break; case "MonthlyIncome":
          monthlyIncomes();
          break;
        case "MonthlyExpenses":
          monthlyExpenses();
          break;
        case "BankTransfer":
          bankTransfer();
          break;
        case "login":
          sessionStorage.setItem('currentUser', '');
          break;
      }
    },
  };

  appAccount.init();
}

pageLoadSpaContentOfAccount();