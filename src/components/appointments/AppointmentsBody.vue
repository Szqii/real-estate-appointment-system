<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <div v-else-if="error" class="error-message">
      <p>Error loading appointments: {{ error }}</p>
    </div>
    <div v-else-if="appointments.length === 0" class="mt-8">
      <!-- Show different empty states based on whether filters are active -->
      <EmptyState
        v-if="hasActiveFilters"
        type="filter"
        title="No appointments match your filters"
        description="Try adjusting your search criteria, date range, status, or agent filters to find what you're looking for."
        action-text="Clear All Filters"
        @action="clearAllFilters"
        secondary-action-text="Create New Appointment"
        :show-secondary-action="true"
        @secondary-action="openModal"
      />
      <EmptyState
        v-else-if="hasSearchQuery"
        type="search"
        title="No appointments found"
        description="We couldn't find any appointments matching your search. Try different keywords or browse all appointments."
        action-text="Clear Search"
        @action="clearSearch"
        secondary-action-text="Create New Appointment"
        :show-secondary-action="true"
        @secondary-action="openModal"
      />
      <EmptyState v-else type="appointments" @action="openModal" />
      <CreateAppointmentModal :isModalOpen="isModalOpen" @close="closeModal" />
      <EditAppointmentModal
        :isModalOpen="isEditModalOpen"
        :appointment="selectedAppointment"
        @close="closeEditModal"
      />
    </div>
    <div v-else class="flex flex-col gap-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span class="font-bold text-sm sm:text-base"
          >{{ appointmentsLength }} appointments found.</span
        >

        <button
          type="button"
          @click="openModal"
          class="flex items-center justify-center gap-2 text-white bg-primary hover:text-primary hover:bg-transparent border border-primary focus:outline-none font-medium rounded-lg text-sm px-4 sm:px-6 py-3 text-center transition duration-200 w-full sm:w-auto"
        >
          <FontAwesomeIcon :icon="faCalendarPlus" class="text-base sm:text-lg" />
          <span class="ml-1 sm:ml-2">Create Appointment</span>
        </button>
        <CreateAppointmentModal :isModalOpen="isModalOpen" @close="closeModal" />
        <EditAppointmentModal
          :isModalOpen="isEditModalOpen"
          :appointment="selectedAppointment"
          @close="closeEditModal"
        />
      </div>
      <div class="space-y-3">
        <div
          v-for="appointment in appointments"
          :key="appointment.id"
          @click="openEditModal(appointment)"
          class="px-3 sm:px-4 md:px-6 py-4 sm:py-3 md:py-2 border border-gray-300 rounded-xl cursor-pointer hover:shadow-md transition-all duration-200 odd:bg-[#EDF0F5] even:bg-[#F9F9F9]"
        >
          <AppointmentCard :appointment="appointment" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { LoadingSpinner, EmptyState } from '@/components/ui'
import AppointmentCard from './AppointmentCard.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'

import { CreateAppointmentModal, EditAppointmentModal } from '@/components/modals'
import { ref, computed } from 'vue'
import { useAppointmentsStore } from '@/stores/appointments'
import { APPOINTMENT_STATUS } from '@/constants'

defineProps({
  appointments: {
    type: Array,
    required: true,
  },
  appointmentsLength: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
})

const appointmentsStore = useAppointmentsStore()

const isModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedAppointment = ref(null)

// Computed properties to detect active filters
const hasActiveFilters = computed(() => {
  const filters = appointmentsStore.filters
  return (
    (filters.status && filters.status !== APPOINTMENT_STATUS.ALL) ||
    (filters.agentIds && filters.agentIds.length > 0) ||
    (filters.dateRange && filters.dateRange !== null)
  )
})

const hasSearchQuery = computed(() => {
  return appointmentsStore.filters.search && appointmentsStore.filters.search.trim().length > 0
})

const openModal = () => {
  if (!isModalOpen.value) {
    isModalOpen.value = true
  }
}

const closeModal = () => {
  if (isModalOpen.value) {
    isModalOpen.value = false
  }
}

const openEditModal = (appointment) => {
  selectedAppointment.value = appointment
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  selectedAppointment.value = null
}

// Methods to clear filters and search
const clearAllFilters = () => {
  appointmentsStore.setFilter('status', APPOINTMENT_STATUS.ALL)
  appointmentsStore.setFilter('agentIds', [])
  appointmentsStore.setFilter('dateRange', null)
  appointmentsStore.setFilter('search', '')
}

const clearSearch = () => {
  appointmentsStore.setFilter('search', '')
  appointmentsStore.setFilter('dateRange', null)
}
</script>
