import { createRouter, createWebHistory } from 'vue-router'
import App from '../components/Main.vue'
import Login from '@/components/Login.vue'
import Logout from '@/components/Logout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component : App
    },
    {
      path: '/login',
      name : 'login',
      component : Login,
    },
    {
      path: '/logout',
      name : 'logout',
      component : Logout,
    },
  ]
})

export default router
