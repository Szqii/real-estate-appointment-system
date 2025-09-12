<template>
  <div>
    <Loading v-if="loading" />
    <div v-else-if="error" class="error-message">
      <p>Error loading appointments: {{ error }}</p>
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
import Loading from '@/components/Loading.vue'
import AppointmentCard from '@/components/AppointmentsPartials/AppointmentCard.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'

import CreateAppointmentModal from '@/components/CreateAppointmentModal.vue'
import EditAppointmentModal from '@/components/EditAppointmentModal.vue'
import { ref } from 'vue'

defineProps({
  appointments: Array,
  appointmentsLength: Number,
  loading: Boolean,
  error: String,
})

const isModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedAppointment = ref(null)

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
</script>
