const feedContainer = document.getElementById('post-list')
const profileIcon = document.getElementById('profile-icon')
const profileDropdown = document.getElementById('profile-dropdown')
const logOutBtn = document.getElementById('logout-btn')
const authBtn = document.getElementById('auth-btn')
const authLink = document.getElementById('auth-link')

function renderPosts(postsArray) {
    feedContainer.innerHTML = '<h2>Лента рекомендаций</h2>'

    postsArray.forEach(post => {
        const postHTML = `
            <article class="post">
                <header class="post-header">
                    <span class="channel-name">${post.channelName} ● </span>
                    <span class="post-time">${post.timeAgo}</span>
                </header>
                <div class="post-content">
                    <h2>${post.title}</h2>
                    <p>${post.text}</p>
                </div>
                <footer class="post-actions">
                    <button class="like-btn">Лайк (${post.likes})</button>
                    <button class="comment-btn">Комментарии (${post.comments})</button>
                </footer>
            </article>
        `;
        
        feedContainer.insertAdjacentHTML('beforeend', postHTML);
    });
}

const getPosts = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/v1/post')
        const data = await response.json()
        console.log("Данные с сервера: ", data)
        renderPosts(data);
    }
    catch {
        console.log('Не удалось получить ответ от сервера!')
    }
}

getPosts()

profileIcon.addEventListener('click', function(event) {
    profileDropdown.classList.toggle('active')
})

logOutBtn.addEventListener('click', function(event) {
    localStorage.removeItem('access_token')
    window.location.href = 'index.html'
})

const profileEmail = document.getElementById('profile-email')

const getUserData = async () => {
    const token = localStorage.getItem('access_token')
    if (token !== null) {
        console.log('Токен пользователя:', token)

        const response = await fetch(
            'http://127.0.0.1:8000/v1/auth/me',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        if (response.ok) {
            logOutBtn.classList.toggle('active')
            const userData = await response.json()
            console.log(userData)
            profileEmail.textContent = userData["email"]
            authLink.textContent = userData["login"]
            authLink.removeAttribute('href')
        } else {
            authBtn.classList.toggle('active')
            profileEmail.textContent = 'Пока тут пусто...'
        }
    } else {
        authBtn.classList.toggle('active')
        profileEmail.textContent = 'Пока тут пусто...'
    }
}

getUserData()

authBtn.addEventListener('click', function(event) {
    window.location.href = 'login.html'
})