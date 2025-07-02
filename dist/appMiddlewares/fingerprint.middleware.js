"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const utils_1 = require("../utils");
const fingerprintMiddleware = (req, _res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    const accept = req.headers['accept'] || '';
    const acceptLanguage = req.headers['accept-language'] || '';
    const ipAddress = (0, utils_1.getIpAddress)(req);
    const components = [userAgent, ipAddress, acceptLanguage, accept];
    const fingerprintString = components.join('||');
    const hash = crypto_1.default.createHash('sha256');
    hash.update(fingerprintString);
    const fingerprint = hash.digest('hex');
    req.fingerprint = {
        hash: fingerprint,
        components: {
            userAgent: components[0] || '',
            language: components[2] || '',
            ip: ipAddress,
        },
    };
    return next();
};
exports.default = fingerprintMiddleware;
