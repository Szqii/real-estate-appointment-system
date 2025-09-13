<template>
  <div class="relative inline-block text-left">
    <!-- Dropdown Button -->
    <button
      @click="toggle"
      type="button"
      class="w-36 sm:w-44 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:outline-none px-3 sm:px-6 py-2 text-center flex items-center justify-between"
      aria-haspopup="listbox"
      :aria-expanded="open"
    >
      <FontAwesomeIcon
        v-if="selectedLabel !== APPOINTMENT_STATUS.ALL"
        :icon="faCircle"
        class="mr-2"
        :class="{
          'text-upcoming': selectedLabel === APPOINTMENT_STATUS.UPCOMING,
          'text-completed': selectedLabel === APPOINTMENT_STATUS.COMPLETED,
          'text-cancelled': selectedLabel === APPOINTMENT_STATUS.CANCELLED,
        }"
      />
      {{ selectedLabel }}
      <FontAwesomeIcon
        :icon="faChevronDown"
        class="ml-2 transition-transform duration-200"
        :class="{ '-rotate-180': open }"
      />
    </button>

    <!-- Dropdown Menu -->
    <transition name="fade">
      <div
        v-if="open"
        class="z-10 absolute mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm"
      >
        <ul class="py-2 text-sm text-gray-700" role="listbox">
          <li
            v-for="option in APPOINTMENT_STATUS_OPTIONS"
            :key="option.value"
            @click="select(option.value)"
            class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <FontAwesomeIcon
              v-if="option.value !== APPOINTMENT_STATUS.ALL"
              :icon="faCircle"
              class="mr-2"
              :class="{
                'text-upcoming': option.value === APPOINTMENT_STATUS.UPCOMING,
                'text-completed': option.value === APPOINTMENT_STATUS.COMPLETED,
                'text-cancelled': option.value === APPOINTMENT_STATUS.CANCELLED,
              }"
            />
            {{ option.label }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAppointmentsStore } from '@/stores/appointments.js'
import { APPOINTMENT_STATUS, APPOINTMENT_STATUS_OPTIONS } from '@/constants'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown, faCircle } from '@fortawesome/free-solid-svg-icons'

const store = useAppointmentsStore()
const open = ref(false)

const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)

const selectedLabel = computed(() => store.filters.status ?? APPOINTMENT_STATUS.ALL)

const select = (val) => {
  store.setFilter('status', val)
  close()
}

const onWindowClick = (e) => {
  if (!e.target.closest || !e.target.closest('.relative')) {
    close()
  }
}

onMounted(() => window.addEventListener('click', onWindowClick))
onBeforeUnmount(() => window.removeEventListener('click', onWindowClick))
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
