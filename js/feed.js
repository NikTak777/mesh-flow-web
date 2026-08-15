const newPost = document.getElementById('create-post-form')
const titlePost = document.getElementById('new-post-title')
const descriptionPost = document.getElementById('new-post-description')

newPost.addEventListener('submit', async function(event) {
    event.preventDefault();

    const token = localStorage.getItem('access_token')

    let response = await fetch(
        'http://127.0.0.1:8000/v1/auth/me',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )

    if (response.ok) {
        const userData = await response.json()

        response = await fetch('http://127.0.0.1:8000/v1/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                channelName: userData['login'],
                title: titlePost.value,
                description: descriptionPost.value
            })
        });
    }

    window.location.href = 'index.html'

})