<template>
  <div>
    <AppointmentsHeader :agents="agents" />
    <AppointmentsBody
      :appointments="paginatedAppointments"
      :appointmentsLength="filteredAppointments.length"
      :loading="loading"
      :error="error"
    />
    <AppointmentsFooter />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppointmentsStore } from '@/stores/appointments.js'
import { AppointmentsHeader, AppointmentsBody, AppointmentsFooter } from '@/components/appointments'
import { useAgentsStore } from '@/stores/agents.js'

const appointmentStore = useAppointmentsStore()
const { paginatedAppointments, filteredAppointments, loading, error } =
  storeToRefs(appointmentStore)

const agentsStore = useAgentsStore()
const { agents } = storeToRefs(agentsStore)
</script>

<style scoped></style>
