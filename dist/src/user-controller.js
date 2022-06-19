"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = exports.users = void 0;
const crypto_1 = require("crypto");
exports.users = [
    { username: "asd", age: 25, hobbies: ['basketball', 'swimming'], id: "d89b77f3-f86c-4c6f-8823-aabe750a64a7", },
    { username: "zxc", age: 15, hobbies: ['dota', 'cs:go'], id: "fc80110b-0c87-4bd2-882a-ffe3c397d645", }
];
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(exports.users);
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    if (user.age && typeof user.age === 'number' && user.username && typeof user.username === 'string' && user.hobbies && Array.isArray(user.hobbies) && (typeof user.hobbies[0] === 'string' || typeof user.hobbies[0] === 'undefined')) {
        user.id = (0, crypto_1.randomUUID)();
        exports.users.push(user);
        res.send(user);
    }
    else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Body does not contain required fields or fields are invalid. Username should be string, age - number, hobbies - array of strings or empty array" }));
    }
});
exports.createUser = createUser;
