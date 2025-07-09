"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlingMiddleware = exports.errorHandler = exports.ForbiddenError = exports.UnAuthorizedError = exports.ConflictError = exports.NotFoundError = exports.InvalidRequestError = exports.BadRequestError = exports.AppError = void 0;
const responseMessages_1 = __importDefault(require("./responseMessages"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("./logger"));
// Custom Error Class
class AppError extends Error {
    name;
    httpCode;
    type;
    extra;
    constructor({ name, httpCode = 500, message, type = 'OPERATIONAL', extra = {}, }) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name || 'Error';
        this.httpCode = httpCode;
        this.type = type;
        this.extra = extra || {};
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(message, extra = {}) {
        super({
            name: 'BadRequestError',
            httpCode: 400,
            message,
            type: 'API',
            extra,
        });
    }
}
exports.BadRequestError = BadRequestError;
class InvalidRequestError extends AppError {
    constructor(message, statusCode, extra = {}) {
        super({
            name: 'InvalidRequestError',
            httpCode: statusCode || 401,
            message: message || responseMessages_1.default.invalidRequest,
            type: 'API',
            extra,
        });
    }
}
exports.InvalidRequestError = InvalidRequestError;
class NotFoundError extends AppError {
    constructor(message, statusCode, extra = {}) {
        super({
            name: 'NotFoundError',
            httpCode: statusCode || 404,
            message,
            type: 'API',
            extra,
        });
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(message, extra = {}) {
        super({
            name: 'ConflictError',
            httpCode: 409,
            message,
            type: 'API',
            extra,
        });
    }
}
exports.ConflictError = ConflictError;
class UnAuthorizedError extends AppError {
    constructor(message, statusCode, extra = {}) {
        super({
            name: 'UnAuthorizedError',
            httpCode: statusCode || 401,
            message,
            type: 'API',
            extra,
        });
    }
}
exports.UnAuthorizedError = UnAuthorizedError;
class ForbiddenError extends AppError {
    constructor(message, statusCode, extra = {}) {
        super({
            name: 'ForbiddenError',
            httpCode: statusCode || 403,
            message: message || 'Forbidden.',
            type: 'API',
            extra,
        });
    }
}
exports.ForbiddenError = ForbiddenError;
// Error Handler Class
class ErrorHandler {
    constructor() {
        this.handleError = this.handleError.bind(this);
        this.handleErrorResponse = this.handleErrorResponse.bind(this);
    }
    isOperationalError(error) {
        return error instanceof AppError && error.type === 'OPERATIONAL';
    }
    isApiError(error) {
        return error instanceof AppError && error.type === 'API';
    }
    async processOperationalError(error, req) {
        if (config_1.default.isDev ||
            config_1.default.isLocalDev ||
            config_1.default.isTestMode) {
            await this.logError(error, req);
        }
    }
    async processCriticalError(error, req) {
        await this.logError(error, req);
        setTimeout(() => {
            process.exit(1);
        }, 500);
    }
    async logError(error, req) {
        const errorDetails = {
            name: error.name,
            message: error.message,
            path1: error.stack?.split('\n')[1].trim(),
            path2: error.stack?.split('\n')[2].trim(),
            ...(req?.originalUrl && { url: req.originalUrl }),
            ...(req?.method && { method: req.method }),
            ...(req?.body && { body: req.body }),
            ...(req?.params && { params: req.params }),
            ...(req?.query && { query: req.query }),
        };
        logger_1.default.error(JSON.stringify(errorDetails));
        // Add any additional logging to an external service here if needed
    }
    async handleError(error, req) {
        switch (true) {
            case this.isOperationalError(error):
                await this.processOperationalError(error, req);
                return;
            case this.isApiError(error):
                return;
            default:
                await this.processCriticalError(error, req);
                break;
        }
    }
    handleErrorResponse(error, statusCode) {
        let { message, httpCode, type } = error;
        const { name, extra } = error;
        console.info(message, name);
        switch (name) {
            case 'ValidationError':
                httpCode = 400;
                type = 'OPERATIONAL';
                break;
            case 'JsonWebTokenError':
                message = 'Invalid token';
                httpCode = 401;
                break;
            case 'TokenExpiredError':
                message = 'Token expired';
                httpCode = 401;
                break;
            case 'SyntaxError':
                httpCode = 400;
                type = 'API';
                break;
            case 'MulterError':
                httpCode = 400;
                type = 'API';
                break;
            // Redis-related error handling
            // case 'ECONNREFUSED':
            // case 'ETIMEDOUT':
            // case 'ECONNRESET':
            // case 'NR_CLOSED':
            // case 'WRONGTYPE':
            // case 'READONLY':
            //     //  logger.error(`Redis error occurred: ${name} - ${message}`, { extra }); // Log the detailed error
            //     message = responseMessages.tryAgain;
            //     httpCode = 503;
            //     type = 'API';
            //     break;
            default:
                message = type === 'API' ? message : responseMessages_1.default.tryAgain;
                httpCode = statusCode || httpCode || 500;
                break;
        }
        throw new AppError({
            name,
            message,
            httpCode,
            extra,
            type: type || 'API',
        });
    }
}
exports.errorHandler = new ErrorHandler();
// Express Error Handling Middleware
const errorHandlingMiddleware = async (err, _req, res, _next) => {
    try {
        exports.errorHandler.handleErrorResponse(err);
    }
    catch (error) {
        exports.errorHandler.handleError(error);
        if (error instanceof AppError && error.type === 'API') {
            const { httpCode, message, extra } = error;
            return res.status(httpCode || 500).json({
                success: false,
                message,
                ...(Object.values(extra)?.length && { extra }),
            });
        }
        else {
            return res
                .status(500)
                .json({ success: false, message: responseMessages_1.default.tryAgain });
        }
    }
};
exports.errorHandlingMiddleware = errorHandlingMiddleware;
