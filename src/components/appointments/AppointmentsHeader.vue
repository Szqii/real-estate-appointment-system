<template>
  <div
    class="flex flex-col lg:flex-row gap-4 lg:gap-8 py-6 lg:py-8 lg:items-center lg:justify-between"
  >
    <!-- Left Section: Agents and Filters -->
    <div class="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center order-2 lg:order-1">
      <!-- Agents -->
      <div
        class="flex -space-x-2 items-center justify-start overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
      >
        <div
          v-for="agent in prioritizedAgents.slice(0, agentLimit)"
          :key="agent.id"
          @click="toggleAgentSelection(agent.id)"
        >
          <AgentAvatar
            :name="`${agent.fields.agent_name} ${agent.fields.agent_surname}`"
            :bgColor="agent.fields.color"
            :class="[
              'cursor-pointer transition flex-shrink-0',
              selectedAgents.includes(agent.id) ? 'ring-2 ring-primary' : '',
            ]"
          />
        </div>
        <div v-if="prioritizedAgents.length > agentLimit" class="relative flex-shrink-0">
          <AgentAvatar
            ref="popoverTrigger"
            :name="prioritizedAgents.length - agentLimit"
            class="cursor-pointer"
            @click="openPopover"
          />

          <AgentPopover
            :isOpen="isPopoverOpen"
            :agents="prioritizedAgents"
            :selectedAgents="selectedAgents"
            @close="closePopover"
            @agentClick="toggleAgentSelection"
          />
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-3 items-center">
        <StatusDropdown />
        <DateFilterDropdown />
      </div>
    </div>

    <!-- Right Section: Search Bar -->
    <div class="w-full lg:w-auto order-1 lg:order-2">
      <SearchInput />
    </div>
  </div>
</template>

<script setup>
import { AgentAvatar, AgentPopover } from '@/components/agents'
import { StatusDropdown, DateFilterDropdown } from '@/components/filters'
import { SearchInput } from '@/components/ui'
import { useAppointmentsStore } from '@/stores/appointments.js'
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  agents: {
    type: Array,
    required: true,
  },
})

const appointmentsStore = useAppointmentsStore()
const selectedAgents = computed(() => appointmentsStore.filters.agentIds || [])
const agentLimit = computed(() => 8) // Show more agents on mobile due to horizontal scroll

// Prioritize selected agents in the visible slots
const prioritizedAgents = computed(() => {
  const selected = props.agents.filter((agent) => selectedAgents.value.includes(agent.id))
  const unselected = props.agents.filter((agent) => !selectedAgents.value.includes(agent.id))
  return [...selected, ...unselected]
})

const isPopoverOpen = ref(false)
const popoverTrigger = ref(null)

const toggleAgentSelection = (id) => {
  if (appointmentsStore.filters.agentIds.includes(id)) {
    appointmentsStore.setFilter(
      'agentIds',
      appointmentsStore.filters.agentIds.filter((a) => a !== id),
    )
  } else {
    appointmentsStore.setFilter('agentIds', [...appointmentsStore.filters.agentIds, id])
  }
}

const openPopover = () => {
  isPopoverOpen.value = true
}

const closePopover = () => {
  isPopoverOpen.value = false
}

// Close popover when clicking outside
const handleClickOutside = (event) => {
  if (popoverTrigger.value && !popoverTrigger.value.$el.contains(event.target)) {
    const popover = document.querySelector('.absolute.top-full')
    if (popover && !popover.contains(event.target)) {
      closePopover()
    }
  }
}

// Close popover on escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    closePopover()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<style scoped></style>
