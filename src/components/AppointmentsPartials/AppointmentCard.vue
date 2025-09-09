<template>
  <div class="flex flex-col gap-2 flex-1">
    <div class="font-semibold">
      {{ appointment.contacts.map(contact => contact.name).join(', ') }}
    </div>

    <div class="text-gray-900 text-sm">
      {{ appointment.contacts.map(contact => contact.email).join(', ') }}
    </div>

    <div class="text-gray-900 text-sm">
      {{ appointment.contacts.map(contact => contact.phone).join('   ') }}
    </div>
  </div>

  <div class="flex flex-1 justify-start items-center">
    {{ appointment.appointmentAddress }}
  </div>

  <div
      class="flex flex-1 flex-col items-center justify-center min-w-48 text-center gap-2"
  >
    <StatusBadge
        :appointmentDate="appointment.appointmentDate"
        :isCancelled="appointment.isCancelled"/>
  </div>

  <div class="flex flex-1 -space-x-2 items-center justify-center">
    <AgentAvatar
        v-for="(agent, index) in appointment.agents.slice(0, 5)"
        :key="index"
        :name="agent.name"/>
    <AgentAvatar :name="appointment.agents.length - 5" v-if="appointment.agents.length > 5"/>

  </div>
</template>

<script setup lang="ts">

import StatusBadge from "@/components/AppointmentsPartials/StatusBadge.vue";
import AgentAvatar from "@/components/AgentAvatar.vue";

defineProps<{
  appointment: {
    [key: string]: any;
  };
}>();
</script>

<style scoped>

</style>
