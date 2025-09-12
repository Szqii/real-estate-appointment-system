<template>
  <div
      v-show="isModalOpen"
      id="edit-modal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-sm">
        <!-- Modal header -->
        <div
            class="flex items-center justify-between p-4 border-b rounded-t border-gray-200"
        >
          <h3 class="text-lg font-semibold text-gray-900">Edit Appointment</h3>
          <button
              type="button"
              @click="closeModal"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
          >
            <FontAwesomeIcon :icon="faXmark"/>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <!-- Modal body -->
        <form class="p-4" @submit.prevent="updateAppointment">
          <div class="grid gap-4 mb-4">
            <!-- Contact Selection -->
            <div class="col-span-2">
              <label class="block mb-2 text-sm font-medium text-gray-900">Contact</label>
              <ContactMultiSelect
                  v-model="contactIds"
              />
            </div>

            <!-- Address -->
            <div class="col-span-2">
              <label class="block mb-2 text-sm font-medium text-gray-900">Property Address</label>
              <input
                  type="text"
                  v-model="appointmentAddress"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Property address"
                  required
              />
              <div v-if="errors.address" class="text-red-500 text-sm mt-1">
                {{ errors.address }}
              </div>
            </div>

            <!-- Agent Selection -->
            <div class="col-span-2">
              <label class="block mb-2 text-sm font-medium text-gray-900">Assigned Agent(s)</label>
              <AgentSelect
                  v-model="agentIds"
              />
            </div>

            <!-- Date & Time -->
            <div class="col-span-2">
              <label class="block mb-2 text-sm font-medium text-gray-900"
              >Appointment Date & Time</label
              >
              <DateSelect
                  v-model="appointmentDate"
              />
            </div>

            <!-- Status -->
            <div class="col-span-2">
              <label class="block mb-2 text-sm font-medium text-gray-900">Status</label>
              <select
                  v-model="appointmentStatus"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                <option v-for="status in availableStatuses" :key="status" :value="status">
                  {{ status }}
                </option>
              </select>
            </div>

            <!-- Related Appointments -->
            <div v-if="relatedAppointments.length > 0" class="col-span-2">
              <label class="block mb-2 text-sm font-medium text-gray-900"
              >Related Appointments</label
              >
              <div class="max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                <div
                    v-for="relatedApp in relatedAppointments"
                    :key="relatedApp.id"
                    class="text-sm py-1 border-b border-gray-100 last:border-b-0"
                >
                  <span class="font-medium">{{ formatDate(relatedApp.appointmentDate) }}</span> -
                  <span>{{ relatedApp.appointmentAddress }}</span> -
                  <span class="text-gray-600">{{ relatedApp.status }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Validation Errors -->
          <div
              v-if="Object.keys(errors).length > 0"
              class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <p class="text-red-800 text-sm font-medium">Please fix the following errors:</p>
            <ul class="text-red-700 text-sm mt-1 ml-4 list-disc">
              <li v-for="(error, field) in errors" :key="field">{{ error }}</li>
            </ul>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
                type="submit"
                :disabled="loading"
                class="text-white inline-flex items-center bg-primary hover:shadow focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer disabled:opacity-50"
            >
              <FontAwesomeIcon :icon="faSave" class="me-2"/>
              {{ loading ? 'Saving...' : 'Update Appointment' }}
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
import {ref, computed, watch} from 'vue'
import ContactMultiSelect from '@/components/ContactMultiSelect.vue'
import AgentSelect from '@/components/AgentSelect.vue'
import DateSelect from '@/components/DateSelect.vue'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faSave, faXmark} from '@fortawesome/free-solid-svg-icons'
import {useAppointmentsStore} from '@/stores/appointments.js'
import compareDateToToday from '@/utils/compareDateToToday.js'
import formatDate from '@/utils/formatDate.js'

const props = defineProps({
  isModalOpen: Boolean,
  appointment: Object,
})

const emits = defineEmits(['close'])

// Form state
const appointmentDate = ref(null)
const appointmentAddress = ref('')
const contactIds = ref([])
const agentIds = ref([])
const appointmentStatus = ref('')
const loading = ref(false)
const errors = ref({})

const store = useAppointmentsStore()

watch(
    () => props.isModalOpen,
    (open) => {
      if (open && props.appointment) {
        appointmentDate.value = props.appointment.appointmentDate || null
        appointmentAddress.value = props.appointment.appointmentAddress || ''
        contactIds.value = props.appointment.contacts?.map(c => c.id) || []
        agentIds.value = props.appointment.agents?.map(a => a.id) || []
        appointmentStatus.value = props.appointment.status || ''
      }
    }
)

// Related appointments for the same contact
const relatedAppointments = computed(() => {
  if (!contactIds.value.length) return []

  return store.appointments
      .filter(
          (app) =>
              app.id !== props.appointment?.id &&
              app.contacts.some((contact) => contactIds.value.includes(contact.id)),
      )
      .slice(0, 5) // Limit to 5 related appointments
})

// Available status options based on appointment date
const availableStatuses = computed(() => {
  if (!appointmentDate.value) return ['Upcoming', 'Cancelled', 'Completed']

  const {status} = compareDateToToday(appointmentDate.value)
  if (status === 'Upcoming') {
    return ['Upcoming', 'Cancelled']
  } else {
    return ['Completed', 'Cancelled']
  }
})

// Validation
const validateForm = () => {
  errors.value = {}

  if (!appointmentDate.value) {
    errors.value.date = 'Appointment date is required'
  }

  if (!appointmentAddress.value?.trim()) {
    errors.value.address = 'Property address is required'
  }

  if (!contactIds.value.length) {
    errors.value.contacts = 'At least one contact must be selected'
  }

  if (!agentIds.value.length) {
    errors.value.agents = 'At least one agent must be selected'
  }

  if (!appointmentStatus.value) {
    errors.value.status = 'Status is required'
  }

  return Object.keys(errors.value).length === 0
}

// Update appointment
const updateAppointment = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true
  try {
    const appointmentData = {
      records: [
        {
          id: props.appointment.id,
          fields: {
            appointment_date: appointmentDate.value,
            appointment_address: appointmentAddress.value,
            contact_id: contactIds.value,
            agent_id: agentIds.value,
            is_cancelled: appointmentStatus.value === 'Cancelled',
          },
        },
      ],
    }

    await store.updateAppointment(props.appointment.id, appointmentData)
    closeModal()
  } catch (error) {
    errors.value.submit = error.message || 'Failed to update appointment'
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  emits('close')
  // Reset form
  appointmentDate.value = null
  appointmentAddress.value = ''
  contactIds.value = []
  agentIds.value = []
  appointmentStatus.value = ''
  errors.value = {}
}
</script>

<style scoped></style>
