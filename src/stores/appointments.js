import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import {getAppointments} from "@/services/getAppointments.js";
import compareDateToToday from "@/utils/compareDateToToday.js";
import {useAgentsStore} from "@/stores/agents.js";
import normalizeAppointment from "@/utils/normalizeAppointmentData.js";

export const useAppointmentsStore = defineStore('appointments', () => {
    const agentsStore = useAgentsStore()

    const _appointments = ref([])

    const appointments = computed(() =>
        [..._appointments.value]
            .map(app => {
                if (app.isCancelled) {
                    return {...app, status: "Cancelled", left: null}
                } else {
                    const {status, left} = compareDateToToday(app.appointmentDate)
                    return {...app, status, left}
                }
            })
            .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
    )

    const totalAppointments = computed(() => appointments.value.length)
    const pageSize = 10
    const totalPages = computed(() => Math.ceil(totalAppointments.value / pageSize))

    const currentPage = ref(1)

    const paginatedAppointments = computed(() => {
        const start = (currentPage.value - 1) * pageSize
        return appointments.value.slice(start, start + pageSize)
    })

    const loading = ref(false)
    const error = ref(null)

    const fetchAppointments = async () => {
        setLoading(true)
        setError(null)
        try {
            const agentMap = new Map(agentsStore.agents.map(a => [a.id, a]))
            const data = await getAppointments()

            const normalizedData = data.map(app => normalizeAppointment(app, agentMap))

            setCurrentPage(1)
            setAppointments(normalizedData)
        } catch (err) {
            setError(err.message || 'Failed to fetch appointments')
        } finally {
            setLoading(false)
        }
    }

    const setAppointments = (data) => {
        _appointments.value = data
    }

    const setLoading = (value) => {
        loading.value = value
    }
    const setError = (err) => {
        error.value = err
    }

    const setCurrentPage = (page) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
        }
    }

    return {
        fetchAppointments,
        appointments,
        totalAppointments,
        totalPages,
        paginatedAppointments,
        currentPage,
        loading,
        error,
        setCurrentPage,
        setAppointments,
        setLoading,
        setError
    }
})
