const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const emailError = document.querySelector(".loginEmail__error");
console.log(emailError)
const passwordError = document.querySelector(".loginPassword__error");
const submit = document.querySelector("form #submit");

const user = {
    password: document.querySelector("form #password"),
    email: document.querySelector("form #email"),
    submit: document.querySelector("form #submit"),
};

const chargeUtile = JSON.stringify(user);

async function userLogin () {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: chargeUtile
    };
    const response = await fetch('https://localhost:5678/api/users/login', requestOptions);
    const data = await response.json();
    console.log(data)
};

userLogin();

async function login() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userEmail = email.value;
        const userPassword = password.value;
        console.log(userEmail,userPassword);
        }
        )
    }

login();