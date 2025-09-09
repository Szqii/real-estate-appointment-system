import instance from "@/services/index.js";
import normalizeAppointment from "@/utils/normalizeAppointmentData.js";

export const getAppointments = async (params) => {
    try {
        const response = await instance.get('/appointments', {params});
        return response.data.records.map(normalizeAppointment);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};
