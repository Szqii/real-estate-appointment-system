/**
 * Application configuration
 */
export const config = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Real Estate Appointment Manager',
    version: '1.0.0',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    key: import.meta.env.VITE_API_KEY,
    timeout: 10000,
  },
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
}
