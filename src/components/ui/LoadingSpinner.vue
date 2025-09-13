<template>
  <div class="flex flex-col gap-2">
    <AppointmentCardSkeleton v-for="n in 4" :key="n" />
  </div>
</template>

<script setup>
import AppointmentCardSkeleton from '@/components/appointments/AppointmentCardSkeleton.vue'
</script>

<style></style>
