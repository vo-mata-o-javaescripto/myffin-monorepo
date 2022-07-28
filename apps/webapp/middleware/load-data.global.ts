import { useSlotStore } from '@/store/slot';
import { useAuthStore } from '@/store/auth';

export default defineNuxtRouteMiddleware((to, _from) => {
  const authStore = useAuthStore();

  if (authStore.isLogged) {
    const slotStore = useSlotStore();
    slotStore.getAllSlots();

    if (to.name === 'login') {
      return navigateTo({ name: 'index' });
    }
  }
});
