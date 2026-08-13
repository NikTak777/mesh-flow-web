const feedContainer = document.getElementById('post-list');

function renderPosts(postsArray) {
    feedContainer.innerHTML = '<h2>Лента рекомендаций</h2>';

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