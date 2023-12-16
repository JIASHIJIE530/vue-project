import './assets/main.css'
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import {  setupRouter } from '@/router';
import { createPinia } from 'pinia'
import '@arco-design/web-vue/dist/arco.css';
import {setupI18n} from './locales'
import App from './App.vue'


async function bootstrap() {
    const app = createApp(App);
    setupRouter(app);
    await setupI18n(app)
    app.use(createPinia())

    app.use(ArcoVue)
    app.mount('#app');
  }
  
  bootstrap();
  
