interface PostInput {
  path: string;
  payload: any;
  headers?: HeadersInit;
  queryString?: string; // TODO: refatorar para object
}

export class HttpAdapter {
  private host;

  constructor(host: string) {
    this.host = host;
  }

  get() {}

  async post(input: PostInput): Promise<any> {
    const url = input.queryString
      ? `${this.host}${input.path}?${input.queryString}`
      : `${this.host}${input.path}`;

    try {
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
