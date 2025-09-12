import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
})

export default instance
