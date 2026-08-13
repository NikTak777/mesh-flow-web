const loginForm = document.getElementById('login-form')
const emailInput = document.getElementById('email-input')
const passwordInput = document.getElementById('password-input')
const backBtn = document.getElementById('back-btn')

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault()

    const payload = {
        email: emailInput.value,
        password: passwordInput.value
    }
    try {
        const response = await fetch('http://127.0.0.1:8000/v1/auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(payload),
            credentials: 'include'
        }
        )

        if (response.ok) {
            const data = await response.json()

            localStorage.setItem('access_token', data.access_token);

            alert('Вход успешно осуществлён! Добро пожаловать!');

            window.location.href = 'index.html'; 
        } else {
            const errorData = await response.json();
            alert(errorData.detail || 'Ошибка входа. Попробуйте ещё раз');
        }
    } catch (error) {
        console.error('Ошибка входа:', error)
    }
})

backBtn.addEventListener('click', function(event) {
    event.preventDefault()

    window.location.href = 'index.html'
})