<template>
  <div class="flex flex-col gap-2 flex-1">
    <div class="font-semibold">
      <FontAwesomeIcon :icon="appointment.contacts.length > 1 ? faUsers : faUser" class="text-gray-400 mr-2"/>
      {{ appointment.contacts.map(contact => contact.name).join(', ') || '-' }}
    </div>

    <div class="text-gray-900 text-sm">
      <FontAwesomeIcon :icon="faEnvelope" class="text-gray-400 mr-2"/>

      {{ appointment.contacts.map(contact => contact.email).join(', ') || '-' }}
    </div>

    <div class="text-gray-900 text-sm">
      <FontAwesomeIcon :icon="faPhone" class="text-gray-400 mr-2"/>

      {{ appointment.contacts.map(contact => contact.phone).join('   ') || '-' }}
    </div>
  </div>

  <div class="flex flex-1 justify-start items-center">
    <FontAwesomeIcon :icon="faHome" class="text-gray-400 mr-2"/>
    {{ appointment.appointmentAddress }}
  </div>

  <div
      class="flex flex-1 flex-col items-center justify-center min-w-48 text-center gap-2"
  >
    <StatusBadge
        :status="appointment.status"
        :left="appointment.left"
        :appointmentDate="appointment.appointmentDate"/>
  </div>

  <div class="flex flex-1 -space-x-2 items-center justify-center">
    <AgentAvatar
        v-for="(agent, index) in appointment.agents.slice(0, 5)"
        :key="index"
        :name="agent.name"
        :bg-color="agent.color"
    />
    <AgentAvatar :name="appointment.agents.length - 5" v-if="appointment.agents.length > 5"/>
  </div>
</template>

<script setup lang="ts">

import StatusBadge from "@/components/AppointmentsPartials/StatusBadge.vue";
import AgentAvatar from "@/components/AgentAvatar.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faUser, faEnvelope, faPhone, faUsers, faHome} from "@fortawesome/free-solid-svg-icons";

defineProps<{
  appointment: {
    [key: string]: any;
  };
}>();
</script>

<style scoped>

</style>
