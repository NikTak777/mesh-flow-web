const loginForm = document.getElementById('login-form')
const emailInput = document.getElementById('email-input')
const passwordInput = document.getElementById('password-input')

const userData = {
    email: 'admin@admin.com',
    password: 'password'
}

loginForm.addEventListener('submit', function(event) {
    event.preventDefault()

    if (emailInput.value !== userData.email) {
        alert('Такого аккаунта не существует!')
        emailInput.value = ''
        passwordInput.value = ''
    } else if (passwordInput.value !== userData.password) {
        alert('Неверный пароль!')
        passwordInput.value = ''
    } else {
        alert('Вход успешно выполнен!')
        window.location.href = 'index.html'
    }
})