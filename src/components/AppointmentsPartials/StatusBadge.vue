<template>
  <div class="w-full bg-[#EA439C] rounded-2xl text-sm font-medium flex justify-center items-center gap-2 px-2 py-2">
    <div class="flex-1">
      <div class="bg-[#F9F9F9] text-md flex items-center rounded-full px-4 py-2"
           :class="left ? 'justify-around' : 'justify-center'"
      >
        <span class="font-bold" :class="statusColors[status] || 'text-gray-800'">{{ status }}</span>
        <span v-if="left"> {{ left }}</span>
      </div>
    </div>

    <div class="flex-1 text-white">
      {{ formatDate(appointmentDate) }}
    </div>
  </div>
</template>

<script setup>
import formatDate from "@/utils/formatDate.js";
import compareDateToToday from "@/utils/compareDateToToday.js";
import {computed} from "vue";

const props = defineProps({
  appointmentDate: String,
  isCancelled: Boolean,
});

const statusAndLeftObj = computed(() => {
  if (props.isCancelled) {
    return {status: 'Cancelled', left: ''};
  }
  return compareDateToToday(props.appointmentDate);
});

const status = computed(() => statusAndLeftObj.value.status);
const left = computed(() => statusAndLeftObj.value.left);

const statusColors = {
  'Cancelled': 'text-red-500',
  'Upcoming': 'text-yellow-500',
  'Completed': 'text-green-500',
};

</script>

<style scoped>

</style>
