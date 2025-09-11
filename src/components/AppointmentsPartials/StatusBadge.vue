<template>
  <div class="w-full bg-primary rounded-2xl text-sm font-medium flex justify-center items-center gap-2 px-2 py-2">
    <div class="flex-1">
      <div class="bg-[#F9F9F9] text-md flex items-center rounded-full px-4 py-2"
           :class="left ? 'justify-around' : 'justify-center'"
      >
        <span class="font-bold" :class="statusColors[status] || 'text-gray-800'">{{ status }}</span>
        <span v-if="left"> {{ left }}</span>
      </div>
    </div>

    <div class="flex-1 text-white">
      <FontAwesomeIcon :icon="faClock"/>
      {{ formatDate(appointmentDate) }}
    </div>
  </div>
</template>

<script setup>
import formatDate from "@/utils/formatDate.js";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";

defineProps({
  appointmentDate: String,
  status: String,
  left: [String, Number, null],
});

const statusColors = {
  'Cancelled': 'text-red-500',
  'Upcoming': 'text-yellow-500',
  'Completed': 'text-green-500',
};

</script>

<style scoped>

</style>
