const API_BASE_URL = 'http://127.0.0.1:8000/v1/'

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
            const refreshResponse = await fetch(
                `${API_BASE_URL}/auth/refresh`,
                {
                    method: 'POST',
                    credentials: 'include'
                }
            )

            if (refreshResponse.ok) {
                const data = await refreshResponse.json()
                token = data.access_token

                localStorage.setItem('access_token', token)

                headers['Authorization'] = `Bearer ${token}`
            
                response = await fetch(
                    `${API_BASE_URL}${endpoint}`,
                    {
                        ...options,
                        headers,
                        credentials: 'include'
                    }
                )
            } else {
                localStorage.removeItem('access_token')
                window.location.href = 'login.html'
                return null
            }
        }

        return response

    } catch (error) {
        throw error
    }
}