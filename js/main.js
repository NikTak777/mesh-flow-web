const mockPosts = [
    {
        channelName: "Обо всём и не о чем",
        timeAgo: "10 минут назад",
        title: "Физика мягких тел",
        text: "Наконец-то закончил рендер сетки для кастомного 2D движка на Python. Выдает стабильные 60 FPS!",
        likes: 128,
        comments: 14
    },
    {
        channelName: "MeshFlow Dev",
        timeAgo: "2 часа назад",
        title: "Архитектура проекта",
        text: "Переписал структуру бэкенда на FastAPI. Uvicorn работает отлично, приступаю к верстке фронта.",
        likes: 45,
        comments: 2
    },
    {
        channelName: "Hardware & Chips",
        timeAgo: "4 часа назад",
        title: "Сборка 4-битного сумматора",
        text: "Собрал схему полного сумматора на логических вентилях в Tinkercad. Теперь планирую каскадировать его для 8 бит!",
        likes: 89,
        comments: 7
    },
    {
        channelName: "Sim World",
        timeAgo: "6 часов назад",
        title: "Деформации узлов и балок",
        text: "Разбирал структуру файлов симуляции физики. Удивительно, насколько изящно организована модель мягких тел при правильной связке точек массы.",
        likes: 210,
        comments: 31
    },
    {
        channelName: "Pit Stop Notes",
        timeAgo: "8 часов назад",
        title: "Аэродинамика и прижимная сила",
        text: "Разбор обновлений боковых понтонов и днища болидов. Векторы распределения воздушных потоков выглядят очень интересно.",
        likes: 312,
        comments: 54
    },
    {
        channelName: "MeshFlow Dev",
        timeAgo: "12 часов назад",
        title: "Подключение WebSockets",
        text: "Планирую внедрение реального времени для чатов и уведомлений. Думаю над структурой сообщений для минимальной задержки.",
        likes: 67,
        comments: 9
    },
    {
        channelName: "Code & Coffee",
        timeAgo: "1 день назад",
        title: "Flexbox vs Grid: Короткая шпаргалка",
        text: "Используйте Flexbox для одномерных раскладок (строка или колонка), а Grid — когда вам нужна полноценная двумерная сетка с несколькими рядами и столбцами.",
        likes: 540,
        comments: 42
    },
    {
        channelName: "Tactics & Games",
        timeAgo: "1 день назад",
        title: "Тактика позиционирования",
        text: "Несколько наблюдений по бесшумному передвижению и правильному выбору углов при контроле сложных локаций.",
        likes: 156,
        comments: 23
    },
    {
        channelName: "Python Inside",
        timeAgo: "2 дня назад",
        title: "Оптимизация тяжелых вычислений",
        text: "Тестирую сборку с ускорением математических операций. Для работы с вектором аэродинамических сил и деформацией это даст отличный буст.",
        likes: 420,
        comments: 68
    },
    {
        channelName: "Frontend Tricks",
        timeAgo: "3 дня назад",
        title: "Плавный скролл и sticky-элементы",
        text: "Разбираемся, как сделать так, чтобы боковое меню аккуратно фиксировалось при прокрутке длинной ленты постов всего одной строчкой CSS (`position: sticky`).",
        likes: 275,
        comments: 18
    }
];

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

renderPosts(mockPosts);

const getPosts = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/v1/post');
        console.log("Ответ сервера: ", response)
    }
    catch {
        console.log('Не удалось получить ответ от сервера!')
    }
}

getPosts()