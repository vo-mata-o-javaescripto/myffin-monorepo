import { useAuthStore } from '@/store/auth';

export default defineNuxtPlugin(_nuxtApp => {
  const authStore = useAuthStore();

  interface PostInput {
    host: string;
    path: string;
    payload: any;
    headers?: HeadersInit;
    queryString?: string; // TODO: refatorar para object
  }

  interface GetInput {
    host: string;
    path: string;
    headers?: HeadersInit;
    queryString?: string; // TODO: refatorar para object
  }

  async function renewToken() {
    const refreshToken = window.localStorage.getItem('refreshToken');
    if (refreshToken !== 'undefined' && refreshToken) {
      try {
        const response = await fetch('http://localhost:3005/login/refresh', {
          method: 'POST',
          body: JSON.stringify({ refreshToken }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });

        const json: {
          access_token: string;
          refresh_token: string;
          expires: number;
        } = await response.json();

        if (response.ok) {
          authStore.authToken = json.access_token;

          window.localStorage.setItem('refreshToken', json.refresh_token);
          window.localStorage.setItem(
            'accessTokenExp',
            json.expires.toString()
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function get(input: GetInput): Promise<any> {
    const url = input.queryString
      ? `${input.host}${input.path}?${input.queryString}`
      : `${input.host}${input.path}`;

    try {
      if (
        input.headers &&
        Object.keys(input.headers).includes('Authorization')
      ) {
        const exp = window.localStorage.getItem('accessTokenExp');

        if (exp && new Date(exp) < new Date()) {
          await renewToken();
          // @ts-ignore
          input.headers.Authorization = authStore.authToken;
        }
      }

      const response = await fetch(url, {
        headers: input.headers
      });

      const json = await response.json();
      return json;
    } catch (err) {
      return err;
    }
  }

  async function post(input: PostInput): Promise<any> {
    const url = input.queryString
      ? `${input.host}${input.path}?${input.queryString}`
      : `${input.host}${input.path}`;

    try {
      if (
        input.headers &&
        Object.keys(input.headers).includes('Authorization')
      ) {
        const exp = window.localStorage.getItem('accessTokenExp');

        if (exp && new Date(exp) < new Date()) {
          await renewToken();
          // @ts-ignore
          input.headers.Authorization = authStore.authToken;
        }
      }

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(input.payload),
        headers: input.headers
      });

      const json = await response.json();
      return json;
    } catch (err) {
      return err;
    }
  }

  return {
    provide: {
      hello: (msg: string) => `Hello ${msg}!`,
      post,
      get,
      renewToken
    }
  };
});
