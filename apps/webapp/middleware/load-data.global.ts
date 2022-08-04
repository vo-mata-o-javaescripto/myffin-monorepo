import { useNuxtApp } from 'nuxt/app';
import { useSlotStore } from '@/store/slot';
import { useAuthStore } from '@/store/auth';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const authStore = useAuthStore();
  const nuxtApp = useNuxtApp();

  await nuxtApp.$renewToken();

  if (authStore.isLogged) {
    const slotStore = useSlotStore();
    slotStore.getAllSlots();

    if (to.name === 'login') {
      return navigateTo({ name: 'index' });
    }
  } else if (to.name !== 'login') {
    return navigateTo({ name: 'login' });
  }
});
