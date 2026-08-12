const newPost = document.getElementById('create-post-form')
const titlePost = document.getElementById('new-post-title')
const descriptionPost = document.getElementById('new-post-description')

newPost.addEventListener('submit', function(event) {
    event.preventDefault();

    const post = {
        channelName: "Обо всём и ни о чем",
        timeAgo: "Только что",
        title: titlePost.value,
        text: descriptionPost.value,
        likes: 0,
        comments: 0
    }

    alert(`
    Новый пост:
    ${titlePost.value}
    ${descriptionPost.value}
    `)

    window.location.href = 'index.html'

})