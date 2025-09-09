import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import {getAppointments} from "@/services/getAppointments.js";

export const useAppointmentsStore = defineStore('appointments', () => {
        const appointments = ref([])
        const totalAppointments = computed(() => appointments.value.length)
        const loading = ref(false)
        const error = ref(null)

        const fetchAppointments = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await getAppointments()
                setAppointments(data)
                console.log('Pinia Store - Appointments fetched:', data)
            } catch (err) {
                setError(err.message || 'Failed to fetch appointments')
            } finally {
                setLoading(false)
                console.log('Pinia Store - Loading state:', loading.value)
            }
        }

        const setAppointments = (data) => {
            appointments.value = data
        }

        const setLoading = (value) => {
            loading.value = value
        }
        const setError = (err) => {
            error.value = err
        }

        return {
            fetchAppointments,
            appointments,
            totalAppointments,
            loading,
            error,
            setAppointments,
            setLoading,
            setError
        }
    }
)
