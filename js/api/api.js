const API_BASE_URL = 'http://127.0.0.1:8000/v1/'

let refreshPromise = null // Переменная блокировки

const apiFetch = async (endpoint, options={}) => {
    
    let token = localStorage.getItem('access_token')

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    try {
        let response = await fetch(
            `${API_BASE_URL}${endpoint}`,
            {
                ...options,
                headers,
                credentials: 'include'
            }
        )

        if (response.status === 401) {
            if (!refreshPromise) {
                refreshPromise = fetch(
                    `${API_BASE_URL}/auth/refresh`,
                    {
                        method: 'POST',
                        credentials: 'include'
                    }
                )
                .then( async (refreshResponse) => {
                    if (refreshResponse.ok) {
                        const data = await refreshResponse.json()
                        localStorage.setItem('access_token', data.access_token)
                        return data.access_token
                    } else {
                        localStorage.removeItem('access_token')
                        window.location.href = 'login.html'
                        return null
                    }
                    }
                )
                .finally (() => {
                    refreshPromise = null
                })
                }
            }

            const newToken = await refreshPromise

            if (newToken) {
                headers['Authorization'] = `Bearer ${newToken}`
                response = await fetch(
                    `${API_BASE_URL}${endpoint}`,
                    {
                        ...options,
                        headers,
                        credentials: 'include'
                    })
            } else {
                return null
            }
        }

        return response

    } catch (error) {
        throw error
    }
}