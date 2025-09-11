<template>
  <div class="flex flex-col gap-2 flex-1">
    <!-- Contacts -->
    <div class="font-semibold">
      <FontAwesomeIcon :icon="appointment.contacts.length > 1 ? faUsers : faUser" class="text-gray-400 mr-2"/>
      <span v-html="highlightContacts"></span>
    </div>

    <!-- Emails -->
    <div class="text-gray-900 text-sm">
      <FontAwesomeIcon :icon="faEnvelope" class="text-gray-400 mr-2"/>
      <span v-html="highlightEmails"></span>
    </div>

    <!-- Phones -->
    <div class="text-gray-900 text-sm">
      <FontAwesomeIcon :icon="faPhone" class="text-gray-400 mr-2"/>
      <span v-html="highlightPhones"></span>
    </div>
  </div>

  <!-- Address -->
  <div class="flex flex-1 justify-start items-center">
    <FontAwesomeIcon :icon="faHome" class="text-gray-400 mr-2"/>
    <span v-html="highlightAddress"></span>
  </div>

  <!-- Status -->
  <div
      class="flex flex-1 flex-col items-center justify-center min-w-48 text-center gap-2"
  >
    <StatusBadge
        :status="appointment.status"
        :left="appointment.left"
        :appointmentDate="appointment.appointmentDate"/>
  </div>

  <!-- Agents -->
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
import highlightText from "@/utils/highlightText.js";

import {useAppointmentsStore} from "@/stores/appointments.js";
import {computed} from "vue";


// Props
const props = defineProps<{
  appointment: {
    [key: string]: any;
  };
}>();

const store = useAppointmentsStore();
const highlight = (text: string | undefined) => highlightText(text, store.filters.search);

// Computed fields
const highlightContacts = computed(() => props.appointment.contacts.map(c => highlight(c.name)).join(', '))
const highlightEmails = computed(() => props.appointment.contacts.map(c => highlight(c.email)).join(', '))
const highlightPhones = computed(() => props.appointment.contacts.map(c => highlight(c.phone)).join('   '))
const highlightAddress = computed(() => highlight(props.appointment.appointmentAddress))
</script>
