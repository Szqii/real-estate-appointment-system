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

    const filters = ref({
        status: 'All Statuses', // All, Upcoming, Completed, Cancelled
        agentIds: [], // All or specific agent ID
        dateRange: null, // { from: Date, to: Date } or null
        search: '' // search term
    })

    const filteredAppointments = computed(() => {
        return appointments.value.filter(app => {
            const statusMatch = !filters.value.status || filters.value.status === 'All Statuses' || app.status === filters.value.status
            const agentMatch = !filters.value.agentIds.length || app.agents.some(a => filters.value.agentIds.includes(a.id))
            const dateMatch = !filters.value.dateRange || (
                new Date(app.appointmentDate) >= new Date(filters.value.dateRange.from) &&
                new Date(app.appointmentDate) <= new Date(filters.value.dateRange.to)
            )

            const search = filters.value.search || ""
            const searchMatch = !search || Object.values(app).some(val => {
                if (typeof val === "string" || typeof val === "number") {
                    return val.toString().includes(search)
                }
                if (Array.isArray(val)) {
                    return val.some(item => Object.values(item).some(v => v?.toString().includes(search)))
                }
                return false
            })


            return statusMatch && agentMatch && dateMatch && searchMatch
        })
    })

    const totalAppointments = computed(() => filteredAppointments.value.length)
    const pageSize = 10
    const totalPages = computed(() => Math.ceil(totalAppointments.value / pageSize))

    const currentPage = ref(1)

    const paginatedAppointments = computed(() => {
        const start = (currentPage.value - 1) * pageSize
        return filteredAppointments.value.slice(start, start + pageSize)
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

    const setFilter = (key, value) => {
        filters.value[key] = value
        setCurrentPage(1) // Reset to first page on filter change
    }

    return {
        // State
        appointments,
        filteredAppointments,
        paginatedAppointments,
        totalAppointments,
        totalPages,
        currentPage,
        loading,
        error,
        filters,

        // Actions
        fetchAppointments,
        setAppointments,
        setLoading,
        setError,
        setCurrentPage,
        setFilter
    }
})
