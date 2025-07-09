"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enhancedRouter_1 = __importDefault(require("../../../utils/enhancedRouter"));
const platformRouter = new enhancedRouter_1.default();
exports.default = platformRouter.getRouter();
