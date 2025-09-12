<template>
  <div class="w-full sm:w-120 text-sm">
    <VueDatePicker
      v-model="dates"
      :format="format"
      range
      auto-apply
      placeholder="Select date range"
      @cleared="resetDates"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAppointmentsStore } from '@/stores/appointments.js'

const store = useAppointmentsStore()

const dates = ref([])
watch(dates, (newDate) => {
  if (newDate.length === 2) {
    const [from, to] = newDate
    store.setFilter('dateRange', { from, to })
  } else {
    store.setFilter('dateRange', null)
  }
})

const resetDates = () => {
  dates.value = []
}

const format = (dates) => {
  if (dates.length !== 2) return ''
  const [from, to] = dates
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }
  return `From: ${from.toLocaleDateString('en-US', options)} - To: ${to.toLocaleDateString('en-US', options)}`
}
</script>

<style scoped></style>
