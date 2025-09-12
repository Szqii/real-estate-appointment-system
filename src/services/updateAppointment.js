import instance from "@/services/index.js";

export const updateAppointment = async (appointmentId, appointmentData) => {
    try {
        const response = await instance.patch(`/appointments/${appointmentId}`, appointmentData);
        return response.data;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
}