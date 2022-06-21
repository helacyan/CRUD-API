"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const Router_1 = require("../framework/Router");
const user_controller_1 = require("./user-controller");
exports.router = new Router_1.Router();
exports.router.get('/api/users', user_controller_1.getUsers);
exports.router.post('/api/users', user_controller_1.createUser);
