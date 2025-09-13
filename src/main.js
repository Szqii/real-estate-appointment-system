import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'flowbite/dist/flowbite.js'

import App from './App.vue'
import router from './router'
import { config } from './config'

// Third-party components
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// Toast notifications
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// Create Vue app
const app = createApp(App)

// Global components
app.component('VueDatePicker', VueDatePicker)

// Plugins
app.use(createPinia())
app.use(router)

// Global properties
app.config.globalProperties.$config = config
app.config.globalProperties.$toast = toast

// Mount app
app.mount('#app')
