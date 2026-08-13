const newPost = document.getElementById('create-post-form')
const titlePost = document.getElementById('new-post-title')
const descriptionPost = document.getElementById('new-post-description')

newPost.addEventListener('submit', async function(event) {
    event.preventDefault();

    const post = {
        channelName: "Обо всём и ни о чем",
        timeAgo: "Только что",
        title: titlePost.value,
        text: descriptionPost.value,
        likes: 0,
        comments: 0
    }

    console.log("Новый пост с фронта: ", post)

    const response = await fetch('http://127.0.0.1:8000/v1/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                title: titlePost.value,
                description: descriptionPost.value
            })
        });

    const result = await response.json();
    console.log("Ответ сервера: ", result);

    window.location.href = 'index.html'

})