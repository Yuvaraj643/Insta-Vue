import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import HomeView from '../views/HomeView.vue'
import Login from '@/components/Login.vue'
import ProfileView from '../components/Profile.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'App',
      component: !localStorage.getItem("token") ? Login : HomeView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/Register.vue')
    },
    {
      path : "/profile/:id",
      name : 'Profile',
      component : ProfileView
    }
    // {
    //   path: '/home',
    //   name: 'home',
    //   component : Home
    // },
    // {
    //   path:  '/',
    //   name : 'login',
    //   component : Login,
    // },
    // {
    //   path: '/login',
    //   name : 'login',
    //   component : Login,

    // },
    // {
    //   path: '/register',
    //   name : 'Register',
    //   component : Register,
    // },
    // {
    //   path: '/profile/:id',
    //   name : 'Profile',
    //   component : Profie,
    // }
  ]
})

export default router
