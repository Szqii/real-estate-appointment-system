import instance from '@/services/index.js'

export const getAppointments = async (params) => {
  let allAppointments = []
  let offset = null

  try {
    do {
      const response = await instance.get('/appointments', {
        params: {
          ...params,
          pageSize: 100,
          offset,
        },
      })

      const { records, offset: newOffset } = response.data
      allAppointments = [...allAppointments, ...records]
      offset = newOffset
    } while (offset)
    return allAppointments
  } catch (error) {
    console.error('Error fetching appointments:', error)
    throw error
  }
}
