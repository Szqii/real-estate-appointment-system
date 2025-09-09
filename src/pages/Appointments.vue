<template>
  <div>
    <AppointmentsHeader/>
    <AppointmentsBody :appointments="appointments" :totalAppointments="totalAppointments" :loading="loading"
                      :error="error"/>
  </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useAppointmentsStore} from "@/stores/appointments.js";
import AppointmentsHeader from "@/components/AppointmentsPartials/AppointmentsHeader.vue";
import AppointmentsBody from "@/components/AppointmentsPartials/AppointmentsBody.vue";

const appointmentStore = useAppointmentsStore();
const {appointments, totalAppointments, loading, error} = storeToRefs(appointmentStore);
</script>

<style scoped></style>
