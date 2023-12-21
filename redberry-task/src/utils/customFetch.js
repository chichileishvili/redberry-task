import axios from 'axios'

const customFetch = axios.create({
  baseURL: 'https://api.blog.redberryinternship.ge/api',
})

export default customFetch
