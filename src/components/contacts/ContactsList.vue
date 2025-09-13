<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Contacts</h2>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        <FontAwesomeIcon :icon="faUserPlus" class="text-sm" />
        Add Contact
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
    <EmptyState v-else-if="contacts.length === 0" type="contacts" @action="openCreateModal" />

    <!-- Contacts List -->
    <div v-else class="space-y-3">
      <div
        v-for="contact in contacts"
        :key="contact.id"
        class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
        @click="openEditModal(contact)"
      >
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900">{{ contact.name }}</h3>
            <p class="text-sm text-gray-600">{{ contact.email }}</p>
            <p class="text-sm text-gray-600">{{ contact.phone }}</p>
          </div>
          <div class="text-right">
            <span class="text-xs text-gray-500">
              {{ contact.appointmentsCount || 0 }} appointments
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { EmptyState } from '@/components/ui'
import { useAppointmentsStore } from '@/stores/appointments'

const appointmentsStore = useAppointmentsStore()

// Mock data - replace with actual store/API calls
const loading = ref(false)
const error = ref(null)

// Get unique contacts from appointments store
const contacts = computed(() => appointmentsStore.uniqueContacts)

const openCreateModal = () => {
  // Implement create contact modal logic
  console.log('Opening create contact modal')
}

const openEditModal = (contact) => {
  // Implement edit contact modal logic
  console.log('Opening edit modal for contact:', contact)
}
</script>
