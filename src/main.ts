import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

// Vytvoření instance Pinia a přidání do aplikace
const pinia = createPinia()
app.use(pinia)

app.mount('#app')

