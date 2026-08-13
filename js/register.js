const registerForm = document.getElementById('register-form')
const emailInput = document.getElementById('email-input')
const loginInput = document.getElementById('login-input')
const passwordInput = document.getElementById('password-input')
const confirmInput = document.getElementById('confirm-input')
const backBtn = document.getElementById('back-btn')

registerForm.addEventListener('submit', function(event) {
    event.preventDefault()

    if (passwordInput.value !== confirmInput.value) {
        alert('Пароли не совпадают!')
        confirmInput.value = ''
    } else {
        alert('Регистрация успешно выполнена!')
        window.location.href = 'index.html'
    }
    
})

backBtn.addEventListener('click', function(event) {
    event.preventDefault()

    window.location.href = 'index.html'
})