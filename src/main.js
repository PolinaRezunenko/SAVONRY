// import './assets/main.css'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'

// const app = createApp(App)
// app.use(router)
// app.mount('#app')  //обязательно в этом порядке 

createApp(App).use(router).mount('#app')