"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enhancedRouter_1 = __importDefault(require("../../../utils/enhancedRouter"));
const walletRouter = new enhancedRouter_1.default();
// walletRouter.get('/');
exports.default = walletRouter.getRouter();
