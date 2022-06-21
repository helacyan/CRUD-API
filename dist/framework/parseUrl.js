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
const user_controller_1 = require("./../src/user-controller");
module.exports = (baseUrl) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedUrl = new URL(req.url, baseUrl);
        const params = {};
        parsedUrl.searchParams.forEach((value, key) => params[key] = value);
        if (req.url.match(/\/api\/users\/([0-9A-Fa-f]{8}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]+)/) && req.method === "GET") {
            const user = user_controller_1.users.find((user) => user.id === req.url.split('/')[3]);
            if (user)
                res.end(JSON.stringify(user));
            else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "User not found" }));
            }
        }
        else if (req.url.match(/\/api\/users\/([0-9A-Fa-f]{8}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]+)/) && req.method === "PUT") {
            const user = user_controller_1.users.find((u) => u.id === req.url.split('/')[3]);
            if (user.age && typeof user.age === 'number' && user.username && typeof user.username === 'string' && user.hobbies && Array.isArray(user.hobbies) && (typeof user.hobbies[0] === 'string' || typeof user.hobbies[0] === 'undefined')) {
                user.username = req.body.username;
                user.age = req.body.age;
                user.hobbies = req.body.hobbies;
                res.end(JSON.stringify(user));
            }
            else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Fail reasons: 1. Body does not contain required fields 2. fields are invalid. Username should be string, age - number, hobbies - array of strings or empty array. 3. User not found" }));
            }
        }
        else if (req.url.match(/\/api\/users\/([0-9A-Fa-f]{8}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]+)/) && req.method === "DELETE") {
            const id = req.url.split("/")[3];
            const userIndex = user_controller_1.users.findIndex((u) => u.id === id);
            if (userIndex > -1) {
                const user = user_controller_1.users.splice(userIndex, 1)[0];
                res.end(JSON.stringify(user));
            }
            else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "User not found" }));
            }
        }
        else if (!req.url.match(/\/api\/users\/([0-9A-Fa-f]{8}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]+)/) && req.url.includes('users/')) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "userId is invalid" }));
        }
        else if (!req.url.split('/').includes('users') && !req.url.match(/\/api\/users\/([0-9A-Fa-f]{8}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]+)/)) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Non-existing endpoint" }));
        }
        req.pathname = parsedUrl.pathname;
        req.params = params;
    }
    catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong", error }));
    }
});
