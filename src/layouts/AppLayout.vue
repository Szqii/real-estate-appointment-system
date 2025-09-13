<template>
  <div class="app-container flex flex-col min-h-screen px-3 sm:px-4 md:px-6 lg:px-8">
    <main class="app-main flex-grow pb-6">
      <router-view />
    </main>
    <footer class="app-footer text-center py-4 mt-auto border-t">
      <p class="text-xs sm:text-sm text-gray-600">
        &copy; {{ new Date().getFullYear() }} {{ config.app.name }} v{{ config.app.version }}
      </p>
    </footer>
  </div>
</template>

<script setup>
import { config } from '@/config'
</script>

<style scoped></style>
