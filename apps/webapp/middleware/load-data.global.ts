import { useSlotStore } from '@/store/slot';

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(to, from);
  const slotStore = useSlotStore();
  await slotStore.getAllSlots();
  // if (to.params.id === '1') {
  //   return abortNavigation();
  // }
  // return navigateTo('/');
});
