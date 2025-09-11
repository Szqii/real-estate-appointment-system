<template>
  <div v-show="isModalOpen"
       id="crud-modal"
       tabindex="-1"
       aria-hidden="true"
       class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
    <div class="relative p-4 w-full max-w-xl max-h-[80vh]">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-sm">
        <!-- Modal header -->
        <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            Create an Appointment
          </h3>
          <button type="button"
                  @click="closeModal"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
                  data-modal-toggle="crud-modal">
            <FontAwesomeIcon :icon="faXmark"/>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <ContactMultiSelect class="col-span-2" @update:selectedContacts="(ids) => contactIds = ids"/>

            <div class="col-span-2">
              <input type="text" name="address" id="address"
                     v-model="appointmentAddress"
                     class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                     placeholder="Address" required>
            </div>

            <AgentSelect class="col-span-2" @update:selectedAgents="(ids) => agentIds = ids"/>

            <DateSelect class="col-span-2" @update:selectedDate="(date) => appointmentDate = date"/>
          </div>
          <button
              type="button"
              @click="createAppointment"
              class="text-white inline-flex items-center bg-primary hover:shadow focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">
            <FontAwesomeIcon :icon="faPlus" class="me-2"/>
            Create Appointment
          </button>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";
import ContactMultiSelect from "@/components/ContactMultiSelect.vue";
import AgentSelect from "@/components/AgentSelect.vue";
import DateSelect from "@/components/DateSelect.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useAppointmentsStore} from "@/stores/appointments.js";

defineProps({
  isModalOpen: Boolean,
})
const emits = defineEmits(['close'])

const appointmentDate = ref(null)
const appointmentAddress = ref("")
const contactIds = ref([])
const agentIds = ref([])

const store = useAppointmentsStore()

const createAppointment = async () => {
  if (!appointmentDate.value || !appointmentAddress.value || contactIds.value.length === 0 || agentIds.value.length === 0) {
    console.log(appointmentDate.value, appointmentAddress.value, contactIds.value, agentIds.value)
    alert("Please fill in all fields.")
    return
  }
  const newAppointmentData = {
    "records": [
      {
        "fields": {
          "appointment_date": appointmentDate.value,
          "appointment_address": appointmentAddress.value,
          "contact_id": contactIds.value,
          "agent_id": agentIds.value
        }
      }
    ]
  }
  store.createAppointment(newAppointmentData)
  // Reset form fields
  appointmentDate.value = null
  appointmentAddress.value = ""
  contactIds.value = []
  agentIds.value = []

  // Close the modal after creation
  closeModal()
}

const closeModal = () => {
  emits('close')
}

</script>

<style scoped>

</style>
