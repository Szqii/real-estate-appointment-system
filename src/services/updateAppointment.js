import instance from '@/services/index.js'

export const updateAppointment = async (appointmentId, appointmentData) => {
    try {
        const response = await instance.patch(
            `/appointments/${appointmentId}`,
            {fields: appointmentData.records[0].fields}
        )
        return response.data
    } catch (error) {
        console.error('Error updating appointment:', error)
        throw error
    }
}
