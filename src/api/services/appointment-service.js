import apiClient from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'

/**
 * Appointment API service
 */
export class AppointmentService {
  /**
   * Fetch app appointments
   */
  static async getAppointments(params) {
    let allAppointments = []
    let offset = null
    try {
      do {
        const response = await apiClient.get(ENDPOINTS.APPOINTMENTS, {
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
      {
        return allAppointments
      }
    } catch (error) {
      throw new Error(`Failed to fetch appointments: ${error.message}`)
    }
  }

  /**
   * Create a new appointment
   */
  static async createAppointment(appointmentData) {
    try {
      const response = await apiClient.post(ENDPOINTS.APPOINTMENTS, appointmentData)
      return response.data
    } catch (error) {
      throw new Error(`Failed to create appointment: ${error.message}`)
    }
  }

  /**
   * Update an existing appointment
   */
  static async updateAppointment(appointmentId, appointmentData) {
    try {
      const response = await apiClient.patch(`${ENDPOINTS.APPOINTMENTS}/${appointmentId}`, {
        fields: appointmentData,
      })
      return response.data
    } catch (error) {
      throw new Error(`Failed to update appointment: ${error.message}`)
    }
  }

  /**
   * Delete an appointment
   */
  static async deleteAppointment(appointmentId) {
    try {
      const response = await apiClient.delete(`${ENDPOINTS.APPOINTMENTS}/${appointmentId}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to delete appointment: ${error.message}`)
    }
  }
}
