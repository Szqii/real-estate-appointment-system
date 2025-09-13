import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'flowbite/dist/flowbite.js'

import App from './App.vue'
import router from './router'
import { config } from './config'

// Third-party components
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// Create Vue app
const app = createApp(App)

// Global components
app.component('VueDatePicker', VueDatePicker)

// Plugins
app.use(createPinia())
app.use(router)

// Global properties
app.config.globalProperties.$config = config

// Mount app
app.mount('#app')
