import instance from "@/services/index.js";


export const postAppointment = async (appointmentData) => {
    try {
        const response = await instance.post("/appointments", appointmentData);
        return response.data;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
}
