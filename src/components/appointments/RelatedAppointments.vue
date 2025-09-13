<template>
  <div class="mt-6">
    <h4 class="text-sm font-medium text-gray-700 mb-3">Related Appointments:</h4>

    <div v-if="loading" class="flex justify-center py-4">
      <LoadingSpinner size="sm" />
    </div>

    <div v-else-if="relatedAppointments.length === 0" class="text-sm text-gray-500 py-2">
      No other appointments found for the selected contacts.
    </div>

    <div v-else class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
      <div
        v-for="appointment in relatedAppointments"
        :key="appointment.id"
        class="p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <!-- Address with home icon -->
            <div class="flex items-center text-gray-700 mb-3">
              <FontAwesomeIcon :icon="faHome" class="w-4 h-4 mr-2 text-gray-500" />
              <span class="text-sm font-medium">{{ appointment.appointmentAddress }}</span>
            </div>

            <!-- Status and Date row -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <!-- Status Badge -->
                <span
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="getStatusClasses(appointment.status)"
                >
                  {{ appointment.status }}
                </span>

                <!-- Date with clock icon -->
                <div class="flex items-center text-gray-500 text-xs">
                  <FontAwesomeIcon :icon="faClock" class="w-3 h-3 mr-1" />
                  {{ formatDate(appointment.appointmentDate) }}
                </div>
              </div>

              <!-- Agent Avatars -->
              <div class="flex -space-x-1">
                <AgentAvatar
                  v-for="agent in appointment.agents.slice(0, 2)"
                  :key="agent.id"
                  :name="agent.name"
                  :bg-color="agent.color || '#f59e0b'"
                  :title="agent.name"
                  class="!w-8 !h-8 !text-xs shadow-sm"
                />
                <AgentAvatar
                  v-if="appointment.agents.length > 2"
                  :name="appointment.agents.length - 2"
                  bg-color="#d1d5db"
                  :title="`+${appointment.agents.length - 2} more agents`"
                  class="!w-8 !h-8 !text-xs shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faClock } from '@fortawesome/free-solid-svg-icons'
import { useAppointmentsStore } from '@/stores/appointments.js'
import { formatDate } from '@/utils'
import { LoadingSpinner } from '@/components/ui'
import AgentAvatar from '@/components/agents/AgentAvatar.vue'

const props = defineProps({
  contactIds: {
    type: Array,
    default: () => [],
  },
  currentAppointmentId: {
    type: [String, Number],
    default: null,
  },
})

const store = useAppointmentsStore()
const loading = ref(false)

// Compute related appointments based on shared contacts
const relatedAppointments = computed(() => {
  if (!props.contactIds.length) return []

  return store.appointments
    .filter((appointment) => {
      // Exclude current appointment
      if (appointment.id === props.currentAppointmentId) return false

      // Check if appointment has any shared contacts
      return appointment.contacts.some((contact) => props.contactIds.includes(contact.id))
    })
    .slice(0, 10) // Limit to 10 most recent related appointments
})

// Helper function to get status badge classes
const getStatusClasses = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'upcoming':
      return 'bg-blue-100 text-blue-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Watch for contact changes to update related appointments
watch(
  () => props.contactIds,
  () => {
    // Could add additional loading logic here if needed
  },
  { immediate: true },
)
</script>
