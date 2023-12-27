import axios from 'axios'

// const ensureToken = async () => {
//   let storedToken = localStorage.getItem('token')

//   if (!storedToken) {
//     try {
//       const response = await axios.get('https://api.blog.redberryinternship.ge/api/token')
//       storedToken = response.data.token
//       localStorage.setItem('token', storedToken)
//     } catch (error) {
//       console.error('Error fetching token:', error)
//       storedToken = null
//     }
//   }

//   return storedToken
// }

const createCustomFetch = async () => {
  const token = '8b4db4ad6386e49cdf934eea4687231b67a66c49abe0d7888f32985d763ecca8'
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
