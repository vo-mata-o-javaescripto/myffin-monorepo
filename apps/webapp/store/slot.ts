import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

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
    getAllSlots() {
      const authStore = useAuthStore();

      try {
        fetch('http://localhost:8055/items/slot', {
          headers: {
            Authorization: `Bearer ${authStore.authToken}`
          }
        })
          .then(response => response.json())
          .then(data => {
            this.all = data.data;
          });
      } catch (error) {
        return error;
      }
    }
  }
});
