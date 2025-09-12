<template>
  <div class="relative w-full sm:w-80 group">
    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <FontAwesomeIcon
        :icon="faMagnifyingGlass"
        class="text-gray-400 group-focus-within:text-primary transition-colors duration-200"
      />
    </div>
    <input
      type="search"
      id="default-search"
      v-model="searchQuery"
      class="block w-full py-2 ps-10 pe-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-primary focus:border-primary"
      placeholder="Search..."
      required
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAppointmentsStore } from '@/stores/appointments.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const store = useAppointmentsStore()
const searchQuery = ref('')

watch(searchQuery, (val) => {
  store.setFilter('search', val)
})
</script>
