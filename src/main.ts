import './assets/main.css'
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';

import { createPinia } from 'pinia'
import '@arco-design/web-vue/dist/arco.css';
import i18n from './locales'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ArcoVue)
app.use(i18n)
app.mount('#app')
