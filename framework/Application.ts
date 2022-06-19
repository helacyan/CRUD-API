import http from 'http'
import EventEmitter from 'events'


export class Application {
  emitter: EventEmitter
  server: http.Server
  middlewares: Function[] = []
  constructor() {
    this.emitter = new EventEmitter()
    this.server = this._createServer()
    this.middlewares = []
  }

  use(middleware: Function) {
    this.middlewares.push(middleware);
  }

  addRouter(router: any) {
    Object.keys(router.endpoints).forEach(path => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach(method => {
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method];
          handler(req, res)
        })
      })
    })
  }

  _createServer() {
    return http.createServer((req: any, res) => {
        let body = "";

        req.on('data', (chunk: string) => {
           body += chunk;
        })

        req.on('end', () => {
            if(body) {
                req.body = JSON.parse(body);
            }
            this.middlewares.forEach((middleware: any) => middleware(req, res))

            const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res)
            if (!emitted) {
                res.end()
            }
        })
    })
  }

  _getRouteMask(path: string, method: string) {
    return `[${path}]:[${method}]`
  }

  listen(port: string, callback: any) {
    this.server.listen(port, callback)
  }

  close() {
    this.server.close()
  }
}