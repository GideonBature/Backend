"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listWallets = void 0;
const wallet_services_1 = __importDefault(require("./wallet.services"));
const helper_1 = require("../../../utils/helper");
const listWallets = async (req, res) => {
    const queryObject = {};
    const wallets = await wallet_services_1.default.findBy(queryObject);
    return (0, helper_1.handleResponse)(res, {
        data: wallets,
    });
};
exports.listWallets = listWallets;
