<script setup>
import { AppLayout } from '@/layouts'
import { useAppointmentsStore } from '@/stores/appointments.js'
import { useAgentsStore } from '@/stores/agents.js'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

const appointmentStore = useAppointmentsStore()
const agentsStore = useAgentsStore()

onMounted(async () => {
  initFlowbite()
  await agentsStore.fetchAgents()
  await appointmentStore.fetchAppointments()
})
</script>

<template>
  <AppLayout class="bg-[#F9F9F9]" />
</template>

<style scoped></style>
