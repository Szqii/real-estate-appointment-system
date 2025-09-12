<template>
  <div class="relative">
    <!-- Popover -->
    <div
      v-if="isOpen"
      class="absolute top-full left-0 mt-2 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[320px] max-w-[380px] lg:max-w-[480px]"
      @click.stop
    >
      <!-- Popover Header -->
      <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
        <h3 class="text-sm font-medium text-gray-900">All Agents</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <FontAwesomeIcon :icon="faTimes" class="w-4 h-4" />
        </button>
      </div>

      <!-- All Agents Grid -->
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(70px,1fr))] gap-3 max-h-64 overflow-y-auto"
      >
        <div
          v-for="agent in agents"
          :key="agent.id"
          @click="$emit('agentClick', agent.id)"
          class="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer min-w-[70px]"
        >
          <AgentAvatar
            :name="`${agent.fields.agent_name} ${agent.fields.agent_surname}`"
            :bgColor="agent.fields.color"
            :class="['transition', selectedAgents.includes(agent.id) ? 'ring-2 ring-primary' : '']"
            size="sm"
          />
          <span
            class="text-xs text-gray-600 text-center leading-tight max-w-full break-words hyphens-auto"
          >
            {{ agent.fields.agent_name }} {{ agent.fields.agent_surname }}
          </span>
        </div>
      </div>
    </div>

    <!-- Backdrop for mobile -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
      @click="$emit('close')"
    ></div>
  </div>
</template>

<script setup>
import AgentAvatar from '@/components/AgentAvatar.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  agents: {
    type: Array,
    required: true,
  },
  selectedAgents: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['close', 'agentClick'])
</script>
