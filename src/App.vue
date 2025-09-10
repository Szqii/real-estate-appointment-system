<script setup>
import DefaultLayout from "@/layout/DefaultLayout.vue";
import {useAppointmentsStore} from "@/stores/appointments.js";
import {useAgentsStore} from "@/stores/agents.js";
import {onMounted} from "vue";

const appointmentStore = useAppointmentsStore();
const agentsStore = useAgentsStore();

onMounted(async () => {
  await agentsStore.fetchAgents();
  await appointmentStore.fetchAppointments();
})
</script>

<template>
  <DefaultLayout class="bg-[#F9F9F9]"/>
</template>

<style scoped></style>
