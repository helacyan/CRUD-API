export class Router {
  endpoints: any
  constructor() {
    this.endpoints = {}
  }

  request(method = "GET", path: string, handler: Function) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {}
    }

    const endpoint = this.endpoints[path];
    if (endpoint[method]) {
      throw new Error(`[${method}] по адресу ${path} уже существует`)
    }

    endpoint[method] = handler
  }

  get(path: string, handler: Function) {
    this.request('GET', path, handler)
  }

  post(path: string, handler: Function) {
    this.request('POST', path, handler)
  }

}