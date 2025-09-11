<template>
  <div class="w-full text-sm">

    <VueDatePicker v-model="date"
                   format="dd/MM/yyyy HH:mm"
                   auto-apply
                   placeholder="Select date"
                   @cleared="resetDates"
                   required
    />
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue"

const date = ref<Date | null>(null)
const emit = defineEmits(['update:selectedDate'])

const resetDates = () => {
  date.value = null
}

watch(date, (newDate) => {
  console.log('date', newDate, typeof newDate)
  emit('update:selectedDate', newDate)
})
</script>


<style scoped>

</style>
