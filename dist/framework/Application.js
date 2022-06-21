"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const http_1 = __importDefault(require("http"));
const events_1 = __importDefault(require("events"));
class Application {
    constructor() {
        this.middlewares = [];
        this.emitter = new events_1.default();
        this.server = this._createServer();
        this.middlewares = [];
    }
    use(middleware) {
        this.middlewares.push(middleware);
    }
    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach(method => {
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    const handler = endpoint[method];
                    handler(req, res);
                });
            });
        });
    }
    _createServer() {
        return http_1.default.createServer((req, res) => {
            let body = "";
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                if (body) {
                    // console.log(body)
                    req.body = JSON.parse(body);
                }
                this.middlewares.forEach((middleware) => middleware(req, res));
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res);
                if (!emitted) {
                    res.end();
                }
            });
        });
    }
    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`;
    }
    listen(port, callback) {
        this.server.listen(port, callback);
    }
}
exports.Application = Application;
