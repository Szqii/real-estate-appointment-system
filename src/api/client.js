import axios from 'axios'
import { config } from '@/config'

/**
 * HTTP client instance with default configuration
 */
const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.api.key}`,
  },
})

/**
 * Request interceptor for logging and request modification
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * Response interceptor for error handling and logging
 */
apiClient.interceptors.response.use(
  (response) => {
    // Log response time in development
    if (import.meta.env.DEV) {
      const endTime = new Date()
      const duration = endTime - response.config.metadata.startTime
      console.log(`API Request to ${response.config.url} took ${duration}ms`)
    }
    return response
  },
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      console.error('Authentication failed')
    } else if (error.response?.status >= 500) {
      console.error('Server error occurred')
    }
    return Promise.reject(error)
  },
)

export default apiClient
