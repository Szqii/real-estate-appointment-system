<template>
  <div class="w-full text-sm">
    <VueDatePicker
        v-model="internalDate"
        format="dd/MM/yyyy HH:mm"
        auto-apply
        placeholder="Select date"
        @cleared="resetDate"
        required
    />
  </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Date],
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

// Local state synced with v-model
const internalDate = computed({
  get: () => props.modelValue ? new Date(props.modelValue) : null,
  set: (val) => emit('update:modelValue', val),
})

// Clear date
const resetDate = () => {
  internalDate.value = null
}
</script>

<style scoped></style>
