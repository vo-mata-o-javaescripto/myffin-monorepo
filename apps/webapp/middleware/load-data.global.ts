import { useSlotStore } from '@/store/slot';
import { useAuthStore } from '@/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (authStore.isLogged) {
    const slotStore = useSlotStore();
    slotStore.getAllSlots();
  }

  // if (to.params.id === '1') {
  //   return abortNavigation();
  // }
  // return navigateTo('/');
});
