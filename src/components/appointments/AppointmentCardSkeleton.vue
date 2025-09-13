<template>
  <div class="w-full">
    <!-- Card Skeleton -->
    <div
      class="flex items-center justify-between px-6 py-6 border border-gray-300 rounded-xl mb-2 bg-[#F9F9F9] shadow animate-pulse"
    >
      <!-- Contact Skeleton -->
      <div class="flex items-center gap-4">
        <div class="flex flex-col gap-2">
          <!-- Name -->
          <div class="w-32 h-4 bg-gray-300 rounded"></div>
          <!-- Email -->
          <div class="w-48 h-3 bg-gray-300 rounded"></div>
          <!-- Phone -->
          <div class="w-36 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
      <!-- Address Skeleton-->
      <div class="w-64 h-3 bg-gray-300 rounded"></div>
      <!-- Status Skeleton -->
      <div class="w-64 h-8 bg-gray-300 rounded-full"></div>
      <!-- Initials Skeleton -->
      <div class="flex -space-x-2 items-center justify-center">
        <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
