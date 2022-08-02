import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
// import { HttpAdapter } from '~~/adapters/http-adapter';

// const httpAdapter = new HttpAdapter('http://localhost:8055');

export type RootState = {
  all: any[];
};

export const useSlotStore = defineStore({
  id: 'slot',
  state: () =>
    ({
      all: []
    } as RootState),
  getters: {
    getMainSlots: state => state.all.filter(item => !item.parent_id),
    getSlotsByParentId: state => (parentId: string) => {
      return state.all.filter(item => item.parent_id === parentId);
    }
  },
  actions: {
    async getAllSlots() {
      const { $get } = useNuxtApp();
      const authStore = useAuthStore();

      const call = await $get({
        host: 'http://localhost:8055',
        path: '/items/slot',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${authStore.authToken}`
        }
      });
      console.log(call);
      this.all = call.data;

      // try {
      //   fetch('http://localhost:8055/items/slot', {
      //     headers: {
      //       Authorization: `Bearer ${authStore.authToken}`
      //     }
      //   })
      //     .then(response => response.json())
      //     .then(data => {
      //       this.all = data.data;
      //     });
      // } catch (error) {
      //   return error;
      // }
    }
  }
});
