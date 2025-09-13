<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Team Agents</h2>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        <FontAwesomeIcon :icon="faUserPlus" class="text-sm" />
        Add Agent
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <!-- Empty State -->
    <EmptyState v-else-if="agents.length === 0" type="agents" @action="openCreateModal" />

    <!-- Agents List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="agent in agents"
        :key="agent.id"
        class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
        @click="openEditModal(agent)"
      >
        <div class="text-center">
          <div
            class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <FontAwesomeIcon :icon="faUserTie" class="text-primary text-lg" />
          </div>
          <h3 class="font-medium text-gray-900 mb-1">{{ agent.name }}</h3>
          <p class="text-sm text-gray-600 mb-2">{{ agent.email }}</p>
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
          >
            Active
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserPlus, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { EmptyState } from '@/components/ui'
import { useAgentsStore } from '@/stores/agents'

const agentsStore = useAgentsStore()
const { agents, loading, error } = storeToRefs(agentsStore)

const openCreateModal = () => {
  // Implement create agent modal logic
  console.log('Opening create agent modal')
}

const openEditModal = (agent) => {
  // Implement edit agent modal logic
  console.log('Opening edit modal for agent:', agent)
}
</script>
