/*This is the entry point of your Vue app. It:
Initializes the Vue app
Mounts it to a DOM element (usually #app)
Imports and uses things like the router or store */

import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// const app = createApp(App)

// app.use(router)

// app.mount('#app')

createApp(App).use(store).use(router).mount('#app')
