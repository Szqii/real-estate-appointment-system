<template>
  <!-- Mobile Layout -->
  <div class="lg:hidden">
    <div class="space-y-4 py-6">
      <!-- Search Bar (Full width on mobile) -->
      <SearchBar />

      <!-- Filters Row 1: Agents -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-gray-700">Filter by Agents:</h4>
        <div class="flex flex-wrap gap-2 items-center">
          <div
            v-for="agent in agents.slice(0, 8)"
            :key="agent.id"
            @click="toggleAgentSelection(agent.id)"
          >
            <AgentAvatar
              :name="`${agent.fields.agent_name} ${agent.fields.agent_surname}`"
              :bgColor="agent.fields.color"
              :class="[
                'cursor-pointer transition w-8 h-8 text-xs',
                selectedAgents.includes(agent.id) ? 'ring-2 ring-primary' : '',
              ]"
            />
          </div>
          <div v-if="agents.length > 8" class="text-sm text-gray-500">
            +{{ agents.length - 8 }} more
          </div>
        </div>
      </div>

      <!-- Filters Row 2: Status and Date -->
      <div class="flex gap-3">
        <div class="flex-1">
          <StatusDropdown />
        </div>
        <div class="flex-1">
          <DateFilterDropdown />
        </div>
      </div>
    </div>
  </div>

  <!-- Desktop Layout -->
  <div class="hidden lg:flex gap-8 py-8 items-center justify-between">
    <div class="flex gap-6 items-center">
      <div class="flex -space-x-2 items-center justify-start">
        <div
          v-for="agent in agents.slice(0, 5)"
          :key="agent.id"
          @click="toggleAgentSelection(agent.id)"
        >
          <AgentAvatar
            :name="`${agent.fields.agent_name} ${agent.fields.agent_surname}`"
            :bgColor="agent.fields.color"
            :class="[
              'cursor-pointer transition',
              selectedAgents.includes(agent.id) ? 'ring-2 ring-primary' : '',
            ]"
          />
        </div>
        <div v-if="agents.length > 5" class="relative">
          <AgentAvatar :name="agents.length - 5" class="cursor-pointer" @click="openPopover" />
        </div>
      </div>
      <StatusDropdown />
      <DateFilterDropdown />
    </div>

    <SearchBar />
  </div>
</template>

<script setup>
import AgentAvatar from '@/components/AgentAvatar.vue'
import StatusDropdown from '@/components/StatusDropdown.vue'
import DateFilterDropdown from '@/components/DateFilterDropdown.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useAppointmentsStore } from '@/stores/appointments.js'
import { computed } from 'vue'

defineProps({
  agents: {
    type: Array,
    required: true,
  },
})

const appointmentsStore = useAppointmentsStore()
const selectedAgents = computed(() => appointmentsStore.filters.agentIds || [])

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
</script>

<style scoped></style>
