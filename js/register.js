const registerForm = document.getElementById('register-form')
const emailInput = document.getElementById('email-input')
const loginInput = document.getElementById('login-input')
const passwordInput = document.getElementById('password-input')
const confirmInput = document.getElementById('confirm-input')
const backBtn = document.getElementById('back-btn')

registerForm.addEventListener('submit', async function(event) {
    event.preventDefault()

    const payload = {
        email: emailInput.value,
        login: loginInput.value,
        password: passwordInput.value
    };

    if (passwordInput.value !== confirmInput.value) {
        alert('Пароли не совпадают!')
        confirmInput.value = ''
    } else {
        try {
            const response = await fetch('http://127.0.0.1:8000/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                
                localStorage.setItem('access_token', data.access_token);
                
                alert('Регистрация успешно завершена! Добро пожаловать!');
                
                window.location.href = 'index.html'; 
            } else {
                const errorData = await response.json();
                alert(errorData.detail || 'Ошибка при регистрации');
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    }
    
})

backBtn.addEventListener('click', function(event) {
    event.preventDefault()

    window.location.href = 'index.html'
})