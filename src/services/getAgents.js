import instance from '@/services/index.js'

export const getAgents = async (params) => {
  try {
    const response = await instance.get('/agents', { params })
    console.log(response.data)
    return response.data.records
  } catch (error) {
    console.error('Error fetching appointments:', error)
    throw error
  }
}
