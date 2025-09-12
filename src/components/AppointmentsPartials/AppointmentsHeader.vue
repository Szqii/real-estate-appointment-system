<template>
  <div class="flex gap-8 py-8 items-center justify-between">
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
          <AgentAvatar :name="agents.length - 5" class="cursor-pointer" @click="openPopover"/>
        </div>
      </div>
      <StatusDropdown/>
      <DateFilterDropdown/>
    </div>

    <SearchBar/>
  </div>
</template>

<script setup>
import AgentAvatar from '@/components/AgentAvatar.vue'
import StatusDropdown from '@/components/StatusDropdown.vue'
import DateFilterDropdown from '@/components/DateFilterDropdown.vue'
import SearchBar from '@/components/SearchBar.vue'
import {useAppointmentsStore} from '@/stores/appointments.js'
import {computed} from 'vue'

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
