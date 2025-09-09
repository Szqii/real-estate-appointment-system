<script setup>
import DefaultLayout from "@/layout/DefaultLayout.vue";
import {useAppointmentsStore} from "@/stores/appointments.js";
import {onMounted} from "vue";

const appointmentStore = useAppointmentsStore();

onMounted(() => {
  appointmentStore.fetchAppointments();
})
</script>

<template>
  <DefaultLayout class="bg-[#F9F9F9]"/>
</template>

<style scoped></style>
