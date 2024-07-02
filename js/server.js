function server(fxhr, data) {
  let url = fxhr._url.split("/");
  if (fxhr._requestType == "POST") {
    //עדכון משתמש
    if (url[3] == "account") {
      fxhr._status = !exist(data._id);
      if (fxhr._status) {
        postAccount(data);
      }
    }

    if (url[3] == "deposit") {
        postDeposit(data);
    }

    if (url[3] == "withdrawal") {
      if (postWithdrawal(data)) {
        fxhr._status = true;
      } else {
        fxhr._status = false;
      }
    }
  }

  if (fxhr._requestType == "GET") {
    if (url[3] == "account") {
      if (!exist(data._id)) {
        fxhr._status = "not exist";
      } else {
        if (data._code != getCode(data._id)) {
          fxhr._status = "incorrect password";
        } else fxhr._status = "worked";
      }
    }

    if (url[3] == "transfer") {
      if (exist(data._id)) {
        if (!existName(data._id, data._name)) {
          fxhr._status = "incorrect name";
        } else {
          fxhr._status = "worked";
        }
      } else {
        fxhr._status = "not exist";
      }
    }

    if (url[3] == "balance") {
      fxhr._responseText = getBalance(data);
    }

    if (url[3] == "incomes") {
      fxhr._responseText = getIncomes(data);
    }

    if (url[3] == "expenses") {
      fxhr._responseText = getExpenses(data);
    }
  }

  if (fxhr._requestType == "PUT") {
    if (url[3] == "balance") {
      putBalance(data);
    }
  }
}

// class MyObject extends EventTarget {
//     constructor(name) {
//       super();
//       this.name = name;
//     }
//     trigger(message) {
//       const e = new CustomEvent('update', {detail: {message}});
//       this.dispatchEvent(e);
//     }
//   }

//   const o = new MyObject('Good Boy');

//   o.addEventListener('update', e => {
//     console.log('Update event by', e.target.name, 'triggered, message:', e.detail.message);
//   });

//   // Should output to the console: Update event by Good Boy triggered, message: Hello
//   o.trigger('Hello');
