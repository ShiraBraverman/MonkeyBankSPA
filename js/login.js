function pageLoad() {
    let signup = document.querySelector(".signup");
    let loginBtn = document.getElementById("clkbtnLogin");
    const loginId = document.getElementById("loginId");
    const loginPassword = document.getElementById("loginPassword");


    signup.addEventListener("click", () => {
        window.location.hash = "registration";

    });

    loginBtn.addEventListener("click", newlogin);
}

function newlogin() {
    if (loginId.value.length != 9) {
        alert('Invalid id, id must contain exactly 9 characters');
        return;
    }

    if (loginPassword.value.length != 4) {
        alert('Invalid password, Password must contain exactly 4 characters');
        return;
    }


    let fxhr = new FXMLHttpRequest();
    fxhr.open('GET', `https:/accounts/api/account`);
    
    fxhr.addEventListener('load', () => {
        if (fxhr._status=="worked") {
            window.location.hash = "myAccount";
            sessionStorage.setItem('currentUser', account._id);
        }
        else {
            alert(fxhr._status);
        }
    });

    let account = new Account(loginId.value, loginPassword.value);

    fxhr.send(account);

}

pageLoad();








// let Lusers = [];
// let LusersCount = 0;
// let LuserDoesntExist = false;

// if (localStorage.getItem('2048users')) {
//     users = JSON.parse(localStorage.getItem('2048users'));
// }

// if (localStorage.getItem('2048usersCount')) {
//     usersCount = parseInt(localStorage.getItem('2048usersCount'));
// }

// if (localStorage.getItem('2048currentUser')) {
//     currentUser = JSON.parse(localStorage.getItem('2048currentUser'));
// }

// let i;
// for (i = 0; i < usersCount; i++) {
//     if (users[i].name === loginUserName.value) {
//         userDoesntExist = true;
//         break;
//     }
// }

// if (userDoesntExist === false) {
//     alert('User not exists');
//     slider.classList.add("moveslider");
//     formSection.classList.add("form-section-move");
//     signupUserName.value = loginUserName.value;
//     loginUserName.value = "";
//     loginPassword.value = "";
//     return;
// }

// if (loginPassword.value !== users[i].password) {
//     alert('incorect password');
//     loginPassword.value = "";
//     return;
// }

// let currentUser = i;
// localStorage.setItem('2048currentUser', JSON.stringify(currentUser));
// window.location.replace('../HTML/game.html');