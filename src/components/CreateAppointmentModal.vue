<template>
  <div
    v-show="isModalOpen"
    id="crud-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50"
  >
    <div class="relative p-4 w-full max-w-xl max-h-[80vh] mx-4">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-sm">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200"
        >
          <h3 class="text-lg font-semibold text-gray-900">Create an Appointment</h3>
          <button
            type="button"
            @click="closeModal"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
            data-modal-toggle="crud-modal"
          >
            <FontAwesomeIcon :icon="faXmark" />
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form class="p-4 md:p-5" @submit.prevent="createAppointment">
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div class="col-span-2">
              <label class="block mb-2 text-sm font-medium text-gray-900">Contact *</label>
              <ContactMultiSelect
                class="col-span-2"
                @update:selectedContacts="(ids) => (contactIds = ids)"
              />
              <div v-if="errors.contacts" class="text-red-500 text-sm mt-1">
                {{ errors.contacts }}
              </div>
            </div>

            <div class="col-span-2">
              <label class="block mb-2 text-sm font-medium text-gray-900">Property Address *</label>
              <input
                type="text"
                name="address"
                id="address"
                v-model="appointmentAddress"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter property address"
                required
              />
              <div v-if="errors.address" class="text-red-500 text-sm mt-1">
                {{ errors.address }}
              </div>
            </div>

            <div class="col-span-2">
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Assigned Agent(s) *</label
              >
              <AgentSelect class="col-span-2" @update:selectedAgents="(ids) => (agentIds = ids)" />
              <div v-if="errors.agents" class="text-red-500 text-sm mt-1">{{ errors.agents }}</div>
            </div>

            <div class="col-span-2">
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Appointment Date & Time *</label
              >
              <DateSelect
                class="col-span-2"
                @update:selectedDate="(date) => (appointmentDate = date)"
              />
              <div v-if="errors.date" class="text-red-500 text-sm mt-1">{{ errors.date }}</div>
            </div>
          </div>

          <!-- Validation Error Summary -->
          <div
            v-if="Object.keys(errors).length > 0"
            class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <p class="text-red-800 text-sm font-medium">Please fix the following errors:</p>
            <ul class="text-red-700 text-sm mt-1 ml-4 list-disc">
              <li v-for="(error, field) in errors" :key="field">{{ error }}</li>
            </ul>
          </div>

          <div class="flex gap-3">
            <button
              type="submit"
              :disabled="loading"
              class="text-white inline-flex items-center bg-primary hover:shadow focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer disabled:opacity-50"
            >
              <FontAwesomeIcon :icon="faPlus" class="me-2" />
              {{ loading ? 'Creating...' : 'Create Appointment' }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="text-gray-500 bg-gray-100 hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ContactMultiSelect from '@/components/ContactMultiSelect.vue'
import AgentSelect from '@/components/AgentSelect.vue'
import DateSelect from '@/components/DateSelect.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useAppointmentsStore } from '@/stores/appointments.js'

defineProps({
  isModalOpen: Boolean,
})
const emits = defineEmits(['close'])

const appointmentDate = ref(null)
const appointmentAddress = ref('')
const contactIds = ref([])
const agentIds = ref([])
const loading = ref(false)
const errors = ref({})

const store = useAppointmentsStore()

// Validation
const validateForm = () => {
  errors.value = {}

  if (!appointmentDate.value) {
    errors.value.date = 'Appointment date and time are required'
  }

  if (!appointmentAddress.value?.trim()) {
    errors.value.address = 'Property address is required'
  }

  if (!contactIds.value.length) {
    errors.value.contacts = 'At least one contact must be selected'
  }

  if (!agentIds.value.length) {
    errors.value.agents = 'At least one agent must be assigned'
  }

  return Object.keys(errors.value).length === 0
}

const createAppointment = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true
  try {
    const newAppointmentData = {
      records: [
        {
          fields: {
            appointment_date: appointmentDate.value,
            appointment_address: appointmentAddress.value,
            contact_id: contactIds.value,
            agent_id: agentIds.value,
          },
        },
      ],
    }

    await store.createAppointment(newAppointmentData)
    closeModal()
  } catch (error) {
    errors.value.submit = error.message || 'Failed to create appointment. Please try again.'
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  emits('close')
  // Reset form fields
  appointmentDate.value = null
  appointmentAddress.value = ''
  contactIds.value = []
  agentIds.value = []
  errors.value = {}
}
</script>

<style scoped></style>
