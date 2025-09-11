<script setup>
import {computed} from "vue";
import {useAppointmentsStore} from "@/stores/appointments.js";
import {usePagination} from "@/composables/usePagination";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

const store = useAppointmentsStore();

const totalPages = computed(() => store.totalPages);
const currentPage = computed(() => store.currentPage);

const {paginationRange} = usePagination(totalPages, currentPage);

const goToPage = (page) => {
  store.setCurrentPage(page);
  window.scrollTo({top: 0, behavior: 'smooth'});
};
</script>

<template>
  <div class="flex justify-end mt-4 gap-2 cursor-pointer">
    <button
        class="px-2 py-2 border rounded"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
    >
      <FontAwesomeIcon :icon="faChevronLeft" class="text-xs"/>
    </button>

    <button
        v-for="(page, idx) in paginationRange"
        :key="idx"
        class="px-2 py-2 border rounded"
        :class="page === currentPage ? 'bg-white text-blue-500 border-blue-500' : ''"
        :disabled="page === '...'"
        @click="page !== '...' && goToPage(page)"
    >
      {{ page }}
    </button>

    <button
        class="px-2 py-2 border rounded"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
    >
      <FontAwesomeIcon :icon="faChevronRight" class="text-xs"/>
    </button>
  </div>
</template>
