<template>
  <div>
    <Loading v-if="loading"/>
    <div v-else-if="error" class="error-message">
      <p>Error loading appointments: {{ error }}</p>
    </div>
    <div v-else class="px-2">
      <h2>Total Appointments: {{ totalAppointments }}</h2>
      <div v-for="appointment in appointments" :key="appointment.id"
           class="flex justify-between items-center px-6 py-2 border rounded-xl mb-2 odd:bg-[#EDF0F5] even:bg-[#F9F9F9]">
        <AppointmentCard :appointment="appointment"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import AppointmentCard from "@/components/AppointmentsPartials/AppointmentCard.vue";

interface Appointment {
  id: number;

  [key: string]: any; // Other appointment properties
}

const props = defineProps<{
  appointments: Appointment[];
  totalAppointments: number;
  loading: boolean;
  error: string | null;
}>();
</script>
