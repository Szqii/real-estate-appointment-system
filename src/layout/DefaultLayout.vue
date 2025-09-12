<template>
  <div class="app-container flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
    <main class="app-main flex-grow pb-6">
      <router-view />
    </main>
    <footer class="app-footer text-center py-4 mt-auto border-t">
      <p class="text-sm text-gray-600">&copy; Iceberg Digital | Real Estate Appointment System</p>
    </footer>
  </div>
</template>

<script setup></script>

<style scoped></style>
