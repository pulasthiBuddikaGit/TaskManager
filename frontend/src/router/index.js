//This file defines your Vue Router configuration — the URLs and their corresponding components.

import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import store from '@/store'

// Lazy loading for better performance(Dashboard code isn't downloaded until needed)
const DashboardView = () => import('@/views/DashboardView.vue')

const router = createRouter({
                            //built-in Vite environment variable
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public routes
    {
      path: '/',
      name: 'Signup',
      component: SignupView,
      meta: { requiresGuest: true } // Only accessible when not logged in
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { requiresGuest: true } // Only accessible when not logged in
    },

    // Protected routes
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true } // Only accessible when logged in
    },

    // Redirect route - if user goes to unknown route
    {
      path: '/:pathMatch(.*)*',
      redirect: to => {
        console.log('Redirecting from unknown route:')
        // Redirect based on auth status
        //isLoggedIn is a getter from the auth module in Vuex store
        return store.getters['auth/isLoggedIn'] ? '/dashboard' : '/login'
      }
    }
  ],
})

// Navigation guards
// This function runs before each route change
router.beforeEach(async(to, from, next) => {

  //methana tma ara user endpoint eka call karanne
    // Initialize auth on first navigation or refresh
  if (!store.getters['auth/isInitialized']) {
    try {
      await store.dispatch('auth/initializeAuth')
    } catch (error) {
      console.error('Failed to initialize auth:', error)
    }
  }

  //access the
  const isLoggedIn = store.getters['auth/isLoggedIn']

  // Routes that require authentication
  // If the route requires auth and user is not logged in, redirect to login
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
    return
  }

  // Routes that require guest (not logged in) - like login, signup
  // If the route requires guest and user is logged in, redirect to dashboard
  // This prevents logged-in users from accessing login/signup pages
  if (to.meta.requiresGuest && isLoggedIn) {
    next('/dashboard')
    return
  }

  next()
})

export default router
