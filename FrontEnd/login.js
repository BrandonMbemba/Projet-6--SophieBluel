const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const pwdEmailError = document.querySelector(".emailPassword__error");
console.log(pwdEmailError);


submit.addEventListener("click",(e) => {
    login(email.value,password.value);
})


function login () {
    const form = document.querySelector("form");
    form.addEventListener("submit",(e) => {
    e.preventDefault();
    const user = {
        password: e.target.password.value,
        email: e.target.email.value,
    };
    console.log(user.password,user.email);
    const chargeUtile = JSON.stringify(user);
    console.log(chargeUtile);
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers:{  "Content-Type": "application/json",
                    "accept" : "application/json",    },
        body:   chargeUtile
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        sessionStorage.setItem("Token", data.token);
        if (data.message || data.error) {
            const p = document.createElement("p");
            p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";
            pwdEmailError.appendChild(p);
        } else {
            sessionStorage.setItem("Connecté", JSON.stringify(true));
            window.location.replace("index.html");
        }
    })

    })
}
