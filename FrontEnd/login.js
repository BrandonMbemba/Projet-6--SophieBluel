const email = document.getElementById('email')
const password = document.getElementById('password')
const submit = document.getElementById('submit')
const pwdEmailError = document.querySelector('.emailPassword__error')
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  login(e)
})


async function login(e) {
  const user = {
    password: e.target.password.value,
    email: e.target.email.value,
  }
  const chargeUtile = JSON.stringify(user)
  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: chargeUtile
    })
    const data = await response.json()
    sessionStorage.setItem('Token', data.token)
    if (data.message || data.error) {
      pwdEmailError.innerHTML = `<p>La combinaison e-mail/mot de passe est incorrecte<p>`
    } else {
      sessionStorage.setItem('Connecte', JSON.stringify(true))
      window.location.replace('index.html')
    }
  } catch (error) {
    const p = document.createElement('p')
    p.innerHTML = 'La combinaison e-mail/mot de passe est incorrecte'
    pwdEmailError.appendChild(p)
  }
}
