"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const wallet_entity_1 = __importDefault(require("./wallet.entity"));
const data_source_1 = __importDefault(require("../../../config/persistence/data-source"));
class _WalletService {
    walletRepository;
    constructor(walletRepository) {
        this.walletRepository = walletRepository;
    }
}
const walletRepository = data_source_1.default.getRepository(wallet_entity_1.default);
exports.WalletService = new _WalletService(walletRepository);
exports.default = walletRepository;
