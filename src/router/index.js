import { createRouter, createWebHistory } from 'vue-router'
import AppointmentsView from '@/views/AppointmentsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'appointments',
      component: AppointmentsView,
      path: '/',
      meta: {
        title: 'Appointments',
      },
    },
  ],
})

export default router
