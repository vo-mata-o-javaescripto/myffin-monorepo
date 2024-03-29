import { defineStore } from 'pinia';
import { useNuxtApp } from 'nuxt/app';

// import { HttpAdapter } from '@/adapters/http-adapter';

// const httpAdapter = new HttpAdapter('http://localhost:3005');

export type RootState = {
  user: string | undefined;
  pass: string | undefined;
  authToken: string | undefined;
};

export const useAuthStore = defineStore({
  id: 'auth',
  // persist: true,
  persist: {
    key: 'pinia.auth',
    // storage: window.sessionStorage,
    paths: ['authToken'],
    beforeRestore: _context => {
      console.log('Before hydration...');
    },
    afterRestore: _context => {
      console.log('After hydration...');
    }
  },
  state: () =>
    ({
      user: undefined,
      pass: undefined,
      authToken: undefined
    } as RootState),
  getters: {
    isLogged: state => {
      return !!state.authToken;
    }
  },
  actions: {
    async doLogin(): Promise<void> {
      const email = this.user;
      const password = this.pass;

      if (email !== undefined && password !== undefined) {
        try {
          const { $post } = useNuxtApp();

          const call = await $post({
            host: 'http://localhost:3005',
            path: '/login',
            payload: { user: email, pass: password },
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
          });
          console.log(call);
          this.authToken = call.access_token;
          window.localStorage.setItem('refreshToken', call.refresh_token);
          window.localStorage.setItem(
            'accessTokenExp',
            new Date(new Date().getTime() + call.expires).toISOString()
          );
          this.user = undefined;
          this.pass = undefined;
        } catch (err) {
          console.log(err);
          window.alert('Invalid credentials');
        }
      }
    },
    async doLogout(): Promise<void> {
      return await fetch('http://localhost:3005/logout', {
        method: 'POST'
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.authToken = undefined;
          this.user = undefined;
          this.pass = undefined;
          window.localStorage.removeItem('refreshToken');
          window.localStorage.removeItem('accessTokenExp');
        })
        .catch(err => {
          console.log(err);
          window.alert('Invalid credentials');
        });
    }
  }
});
