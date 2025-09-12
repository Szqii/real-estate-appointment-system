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

<script setup>
import {ref, watch} from "vue"

const props = defineProps({
  initialSelected: {
    type: [String, Date],
    default: null
  }
});

const date = ref(null)
const emit = defineEmits(['update:selectedDate'])

// Initialize date
watch(() => props.initialSelected, (newInitialSelected) => {
  if (newInitialSelected) {
    date.value = new Date(newInitialSelected);
  }
}, { immediate: true });

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
