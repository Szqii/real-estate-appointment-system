<template>
  <div class="p-8 space-y-12 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">Empty State Component Demo</h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Appointments Empty State -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Appointments</h2>
          <EmptyState type="appointments" @action="handleAction('Create Appointment')" />
        </div>

        <!-- Contacts Empty State -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Contacts</h2>
          <EmptyState type="contacts" @action="handleAction('Add Contact')" />
        </div>

        <!-- Agents Empty State -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Agents</h2>
          <EmptyState type="agents" @action="handleAction('Add Agent')" />
        </div>

        <!-- Search Empty State -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Search Results</h2>
          <EmptyState
            type="search"
            @action="handleAction('Clear Search')"
            secondary-action-text="Browse All"
            :show-secondary-action="true"
            @secondary-action="handleAction('Browse All')"
          />
        </div>

        <!-- Filter Empty State -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Filtered Results</h2>
          <EmptyState
            type="filter"
            @action="handleAction('Clear Filters')"
            secondary-action-text="Create New"
            :show-secondary-action="true"
            @secondary-action="handleAction('Create New')"
          />
        </div>

        <!-- Custom Empty State -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Custom Configuration</h2>
          <EmptyState
            type="appointments"
            title="Custom Title Here"
            description="This is a custom description that overrides the default text. You can customize any aspect of the empty state."
            action-text="Custom Action"
            @action="handleAction('Custom Action')"
            secondary-action-text="Secondary"
            :show-secondary-action="true"
            @secondary-action="handleAction('Secondary Action')"
          />
        </div>
      </div>

      <!-- Action Log -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
        <h2 class="text-lg font-semibold mb-4 text-gray-800">Action Log</h2>
        <div class="space-y-2 max-h-40 overflow-y-auto">
          <div
            v-for="(action, index) in actionLog"
            :key="index"
            class="text-sm text-gray-600 p-2 bg-gray-50 rounded"
          >
            {{ action.timestamp }}: {{ action.action }}
          </div>
          <div v-if="actionLog.length === 0" class="text-gray-500 text-sm italic">
            Click any action button to see it logged here...
          </div>
        </div>
        <button
          v-if="actionLog.length > 0"
          @click="clearLog"
          class="mt-4 text-sm text-red-600 hover:text-red-800"
        >
          Clear Log
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { EmptyState } from '@/components/ui'

const actionLog = ref([])

const handleAction = (actionName) => {
  const timestamp = new Date().toLocaleTimeString()
  actionLog.value.unshift({
    action: actionName,
    timestamp,
  })

  // Keep only last 10 actions
  if (actionLog.value.length > 10) {
    actionLog.value = actionLog.value.slice(0, 10)
  }
}

const clearLog = () => {
  actionLog.value = []
}
</script>
