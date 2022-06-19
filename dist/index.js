"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./framework/Application");
const user_router_1 = require("./src/user-router");
const parseJson_1 = __importDefault(require("./framework/parseJson"));
const parseUrl_1 = __importDefault(require("./framework/parseUrl"));
require("dotenv/config");
const app = new Application_1.Application();
app.use(parseJson_1.default);
app.use((0, parseUrl_1.default)('http://localhost:5000'));
app.addRouter(user_router_1.router);
exports.default = app;
