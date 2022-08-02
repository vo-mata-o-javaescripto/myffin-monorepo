import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

interface PostInput {
  path: string;
  payload: any;
  headers?: HeadersInit;
  queryString?: string; // TODO: refatorar para object
}

interface GetInput {
  path: string;
  headers?: HeadersInit;
  queryString?: string; // TODO: refatorar para object
}

async function renewToken() {
  const refreshToken = window.localStorage.getItem('refreshToken');

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

  authStore.authToken = json.access_token;

  window.localStorage.setItem('refreshToken', json.refresh_token);
  window.localStorage.setItem('accessTokenExp', json.expires.toString());
}

export class HttpAdapter {
  private host;

  constructor(host: string) {
    this.host = host;
  }

  async get(input: GetInput): Promise<any> {
    const url = input.queryString
      ? `${this.host}${input.path}?${input.queryString}`
      : `${this.host}${input.path}`;

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

  async post(input: PostInput): Promise<any> {
    const url = input.queryString
      ? `${this.host}${input.path}?${input.queryString}`
      : `${this.host}${input.path}`;

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
}
