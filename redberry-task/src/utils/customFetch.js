import axios from 'axios'

const fetchToken = async () => {
  const storedToken = localStorage.getItem('token')
  const storedTimestamp = localStorage.getItem('tokenTimestamp')
  const currentTime = new Date().getTime()

  if (storedToken && storedTimestamp && currentTime - storedTimestamp < 3600000) {
    return storedToken
  } else {
    try {
      const response = await axios.get('https://api.blog.redberryinternship.ge/api/token')
      const newToken = response.data.token // Assuming the token is in the response body directly
      localStorage.setItem('token', newToken)
      localStorage.setItem('tokenTimestamp', currentTime.toString())
      return newToken
    } catch (error) {
      console.error('Error fetching token:', error)
      return null
    }
  }
}

const createCustomFetch = async () => {
  const token = await fetchToken()
  if (token) {
    return axios.create({
      baseURL: 'https://api.blog.redberryinternship.ge/api',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } else {
    console.error('Failed to create custom axios instance: No token')
    return null
  }
}

export const customFetch = await createCustomFetch()
