import { useAuthStore } from "#imports";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    const isAuthenticated = authStore.isAuth
    // isAuthenticated() is an example method verifying if a user is authenticated
    if (isAuthenticated === false) {
      return navigateTo('/login')
    }
  })