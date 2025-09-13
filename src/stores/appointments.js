import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { AppointmentService } from '@/api/services'
import { compareDateToToday, normalizeAppointment, showToast, toastMessages } from '@/utils'
import { APPOINTMENT_STATUS } from '@/constants'
import { config } from '@/config'
import { useAgentsStore } from '@/stores/agents.js'

export const useAppointmentsStore = defineStore('appointments', () => {
  const agentsStore = useAgentsStore()

  const _appointments = ref([])

  const appointments = computed(() =>
    [..._appointments.value]
      .map((app) => {
        if (app.isCancelled) {
          return { ...app, status: 'Cancelled', left: null }
        } else {
          const { status, left } = compareDateToToday(app.appointmentDate)
          return { ...app, status, left }
        }
      })
      .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)),
  )

  const filters = ref({
    status: APPOINTMENT_STATUS.ALL,
    agentIds: [], // All or specific agent ID
    dateRange: null, // { from: Date, to: Date } or null
    search: '', // search term
  })

  const filteredAppointments = computed(() => {
    return appointments.value.filter((app) => {
      const statusMatch =
        !filters.value.status ||
        filters.value.status === APPOINTMENT_STATUS.ALL ||
        app.status === filters.value.status
      const agentMatch =
        !filters.value.agentIds.length ||
        app.agents.some((a) => filters.value.agentIds.includes(a.id))
      const dateMatch =
        !filters.value.dateRange ||
        (new Date(app.appointmentDate) >= new Date(filters.value.dateRange.from) &&
          new Date(app.appointmentDate) <= new Date(filters.value.dateRange.to))

      const search = filters.value.search || ''
      const searchMatch =
        !search ||
        app.appointmentAddress?.includes(search) ||
        app.contacts?.some((c) => {
          const contact = c._custom?.value || c
          return [contact?.name, contact?.email, contact?.phone].some((val) =>
            val?.toString().includes(search),
          )
        })

      return statusMatch && agentMatch && dateMatch && searchMatch
    })
  })

  const uniqueContacts = computed(() => {
    const map = new Map()
    appointments.value.forEach((app) => {
      app.contacts.forEach((contact) => {
        if (!map.has(contact.id)) {
          map.set(contact.id, contact)
        }
      })
    })
    return Array.from(map.values())
  })

  const totalAppointments = computed(() => filteredAppointments.value.length)
  const pageSize = config.pagination.defaultPageSize
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
      const agentMap = new Map(agentsStore.agents.map((a) => [a.id, a]))
      const data = await AppointmentService.getAppointments()

      const normalizedData = data.map((app) => normalizeAppointment(app, agentMap))

      setCurrentPage(1)
      setAppointments(normalizedData)
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch appointments'
      setError(errorMessage)
      showToast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const createAppointment = async (appointmentData) => {
    try {
      const agentMap = new Map(agentsStore.agents.map((a) => [a.id, a]))
      const data = await AppointmentService.createAppointment(appointmentData)
      const newAppointment = normalizeAppointment(data.records[0], agentMap)
      setAppointments([newAppointment, ..._appointments.value])
      showToast.success(toastMessages.appointment.created)
      return newAppointment
    } catch (err) {
      const errorMessage = err.message || toastMessages.appointment.createError
      showToast.error(errorMessage)
      throw err
    }
  }

  const updateAppointment = async (appointmentId, appointmentData) => {
    try {
      const data = await AppointmentService.updateAppointment(appointmentId, appointmentData)
      const agentMap = new Map(agentsStore.agents.map((a) => [a.id, a]))
      const updatedAppointment = normalizeAppointment(data, agentMap)

      // Update the appointment in the store
      const index = _appointments.value.findIndex((app) => app.id === appointmentId)
      if (index !== -1) {
        _appointments.value[index] = updatedAppointment
      }
      showToast.success(toastMessages.appointment.updated)
      return updatedAppointment
    } catch (err) {
      const errorMessage = err.message || toastMessages.appointment.updateError
      showToast.error(errorMessage)
      throw err
    }
  }

  const deleteAppointment = async (appointmentId) => {
    try {
      await AppointmentService.deleteAppointment(appointmentId)

      // Remove the appointment from the store
      const index = _appointments.value.findIndex((app) => app.id === appointmentId)
      if (index !== -1) {
        _appointments.value.splice(index, 1)
      }
      showToast.success(toastMessages.appointment.deleted)
    } catch (err) {
      const errorMessage = err.message || toastMessages.appointment.deleteError
      showToast.error(errorMessage)
      throw err
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
    uniqueContacts,
    totalAppointments,
    totalPages,
    currentPage,
    loading,
    error,
    filters,

    // Actions
    fetchAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    setAppointments,
    setLoading,
    setError,
    setCurrentPage,
    setFilter,
  }
})
