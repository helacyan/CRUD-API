"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const PORT = process.env.PORT;
module.exports = index_1.default.listen(PORT, () => console.log(`running on port ${PORT}`));
