import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Teacher from './views/Teacher.vue'
import Course from './views/Course.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/global.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/t/:id', component: Teacher },
    { path: '/c/:name', component: Course }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app') 
