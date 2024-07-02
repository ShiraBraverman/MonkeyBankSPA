function pageLoad() {
    console.log('page load');
    let login = document.querySelector(".login");
    let signupBtn = document.getElementById("clkbtnSignup");
    const signupUserName = document.getElementById("signupUserName");
    const signupId = document.getElementById("signupId");
    const signupAge = document.getElementById("signupAge");
    const signupPassword = document.getElementById("signupPassword");
    const signupConfirmPassword = document.getElementById("signupConfirmPassword");

    login.addEventListener("click", () => {
        window.location.hash = "login";
    });

    signupBtn.addEventListener("click", newsignup);
}

function newsignup() {
    debugger
    if (/^.*(?=.{2,})[a-zA-Zא-ת].*$/.test(signupUserName.value) !== true) {
        alert('Invalid username, Username must contain at least 2 letters');
        return;
    }

    if (signupId.value.length != 9) {
        alert('Invalid id, id must contain exactly 9 characters');
        return;
    }

    if (signupAge.value < 16) {
        alert('oops, you are too small to open a Bank Account. come back when you will be 16');
        return;
    }

    if (signupPassword.value.length != 4) {
        alert('Invalid password, Password must contain exactly 4 characters');
        return;
    }

    if (signupPassword.value !== signupConfirmPassword.value) {
        alert('incorect password');
        return;
    }

    let fxhr = new FXMLHttpRequest();
    fxhr.open('POST', `https:/accounts/api/account`);
    
    fxhr.addEventListener('load', () => {
        if (fxhr._status) {
            window.location.hash = "myAccount";
            sessionStorage.setItem('currentUser', account._id);
        } 
        else {
            alert('id already has a Bank Account');
        }
    });

    let account = new Account(signupId.value, signupPassword.value,signupUserName.value);

    fxhr.send(account);
}

pageLoad();