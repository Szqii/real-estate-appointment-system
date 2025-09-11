<template>
  <div>
    <Loading v-if="loading"/>
    <div v-else-if="error" class="error-message">
      <p>Error loading appointments: {{ error }}</p>
    </div>
    <div v-else class="flex flex-col gap-8">
      <div class="flex items-center justify-between">
        <span class="font-bold">{{ appointmentsLength }} appointments found.</span>
        <button type="button"
                class="flex items-center gap-2 text-white bg-primary hover:text-primary hover:bg-transparent border border-primary focus:outline-none font-medium rounded-lg text-sm px-6 py-3 text-center transition duration-200">
          <FontAwesomeIcon :icon="faCalendarPlus" class="me-2 text-lg"/>
          Create Appointment
        </button>
      </div>
      <div>
        <div v-for="appointment in appointments" :key="appointment.id"
             class="flex justify-between items-center px-6 py-2 border border-gray-300 rounded-xl mb-2 odd:bg-[#EDF0F5] even:bg-[#F9F9F9]">
          <AppointmentCard :appointment="appointment"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import AppointmentCard from "@/components/AppointmentsPartials/AppointmentCard.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCalendarPlus} from "@fortawesome/free-solid-svg-icons";

interface Appointment {
  id: number;

  [key: string]: any; // Other appointment properties
}

defineProps<{
  appointments: Appointment[];
  appointmentsLength: number;
  loading: boolean;
  error: string | null;
}>();
</script>
