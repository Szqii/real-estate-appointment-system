<template>
  <div class="flex flex-col md:flex-row w-full gap-3 md:gap-0">
    <!-- Contact Info Section -->
    <div class="flex flex-col gap-2 flex-1">
      <div class="font-semibold">
        <FontAwesomeIcon
          :icon="appointment.contacts.length > 1 ? faUsers : faUser"
          class="text-gray-400 mr-2"
        />
        <span v-html="highlightContacts"></span>
      </div>
      <div class="text-gray-900 text-sm">
        <FontAwesomeIcon :icon="faEnvelope" class="text-gray-400 mr-2" />
        <span v-html="highlightEmails"></span>
      </div>
      <div class="text-gray-900 text-sm">
        <FontAwesomeIcon :icon="faPhone" class="text-gray-400 mr-2" />
        <span v-html="highlightPhones"></span>
      </div>
    </div>

    <!-- Address Section -->
    <div class="flex md:flex-1 justify-start items-start md:items-center">
      <FontAwesomeIcon :icon="faHome" class="text-gray-400 mr-2 mt-1 md:mt-0" />
      <span v-html="highlightAddress" class="text-sm md:text-base"></span>
    </div>

    <!-- Status Section -->
    <div
      class="flex md:flex-1 md:flex-col items-start md:items-center justify-start md:justify-center md:min-w-48 md:text-center gap-2"
    >
      <StatusBadge
        :status="appointment.status"
        :left="appointment.left"
        :appointmentDate="appointment.appointmentDate"
      />
    </div>

    <!-- Agents Section -->
    <div
      class="flex md:flex-1 -space-x-2 items-center justify-start md:justify-center relative overflow-x-auto md:overflow-visible pb-2 md:pb-0"
    >
      <!-- Mobile: Show all agents with horizontal scroll -->
      <template v-if="isMobile">
        <AgentAvatar
          v-for="(agent, index) in appointment.agents"
          :key="index"
          :name="agent.name"
          :bg-color="agent.color"
          :class="[avatarSize, 'flex-shrink-0']"
        />
      </template>

      <!-- Desktop: Show limited agents with popover -->
      <template v-else>
        <AgentAvatar
          v-for="(agent, index) in appointment.agents.slice(0, agentLimit)"
          :key="index"
          :name="agent.name"
          :bg-color="agent.color"
          :class="avatarSize"
        />
        <div v-if="appointment.agents.length > agentLimit" class="relative">
          <AgentAvatar
            ref="agentPopoverTrigger"
            :name="appointment.agents.length - agentLimit"
            :class="[avatarSize, 'cursor-pointer']"
            @click.stop="toggleAgentPopover"
          />

          <!-- Agent Popover -->
          <div
            v-if="isAgentPopoverOpen"
            class="absolute top-full right-0 mt-2 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px] max-w-[320px]"
            @click.stop
          >
            <!-- Popover Header -->
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <h3 class="text-sm font-medium text-gray-900">All Agents</h3>
              <button
                @click="closeAgentPopover"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon :icon="faTimes" class="w-4 h-4" />
              </button>
            </div>

            <!-- All Agents Grid -->
            <div class="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
              <div
                v-for="(agent, index) in appointment.agents"
                :key="index"
                class="flex flex-col items-center gap-1 p-2 rounded-lg"
              >
                <AgentAvatar :name="agent.name" :bg-color="agent.color" size="sm" />
                <span class="text-xs text-gray-600 text-center leading-tight break-words">
                  {{ agent.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import StatusBadge from './StatusBadge.vue'
import { AgentAvatar } from '@/components/agents'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUser,
  faEnvelope,
  faPhone,
  faUsers,
  faHome,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { highlightText } from '@/utils'

import { useAppointmentsStore } from '@/stores/appointments.js'
import { computed, ref, onMounted, onUnmounted } from 'vue'

// Mobile detection
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768 // md breakpoint
}

const handleResize = () => {
  checkMobile()
}

// Props
const props = defineProps({
  appointment: {
    type: Object,
    required: true,
  },
})

const store = useAppointmentsStore()
const highlight = (text) => highlightText(text, store.filters.search)

// Computed fields
const highlightContacts = computed(() =>
  props.appointment.contacts.map((c) => highlight(c.name)).join(', '),
)
const highlightEmails = computed(() =>
  props.appointment.contacts.map((c) => highlight(c.email)).join(', '),
)
const highlightPhones = computed(() =>
  props.appointment.contacts.map((c) => highlight(c.phone)).join('   '),
)
const highlightAddress = computed(() => highlight(props.appointment.appointmentAddress))

// Responsive properties
const agentLimit = computed(() => 5) // Could be made responsive: window.innerWidth < 768 ? 3 : 5
const avatarSize = computed(() => 'w-8 h-8 md:w-10 md:h-10')

// Agent popover state
const isAgentPopoverOpen = ref(false)
const agentPopoverTrigger = ref(null)

const toggleAgentPopover = () => {
  isAgentPopoverOpen.value = !isAgentPopoverOpen.value
}

const closeAgentPopover = () => {
  isAgentPopoverOpen.value = false
}

// Close popover when clicking outside
const handleClickOutside = (event) => {
  if (agentPopoverTrigger.value && !agentPopoverTrigger.value.$el.contains(event.target)) {
    const popover = event.target.closest('.absolute.top-full')
    if (!popover) {
      closeAgentPopover()
    }
  }
}

// Close popover on escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    closeAgentPopover()
  }
}

onMounted(() => {
  checkMobile()
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscapeKey)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscapeKey)
  window.removeEventListener('resize', handleResize)
})
</script>
