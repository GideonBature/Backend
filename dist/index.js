"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const fingerprint_middleware_1 = __importDefault(require("./appMiddlewares/fingerprint.middleware"));
const appMiddlewares_1 = require("./appMiddlewares");
const routes_v1_1 = __importDefault(require("./components/v1/routes.v1"));
const errorHandler_1 = require("./utils/errorHandler");
const data_source_1 = __importDefault(require("./config/persistence/data-source"));
const seeder_1 = __importDefault(require("./config/persistence/seeder"));
const logger_1 = __importDefault(require("./utils/logger"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: 'draft-6',
    legacyHeaders: false,
});
const initializeDb = () => {
    data_source_1.default.initialize()
        .then(() => {
        logger_1.default.info('DB Connected Successfully!!!');
        (0, seeder_1.default)();
    })
        .catch(errorHandler_1.errorHandler.handleError);
};
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
    origin: function (origin, callback) {
        if (config_1.default.isDev ||
            config_1.default.isLocalDev ||
            allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new errorHandler_1.AppError({
                name: 'CorsError',
                httpCode: 401,
                message: 'Not allowed by CORS',
                type: 'API',
            }));
        }
    },
    credentials: true,
};
const initializeMiddlewares = () => {
    app.use((0, cors_1.default)(corsOptions))
        .use((0, helmet_1.default)())
        .use(rateLimiter)
        .use(fingerprint_middleware_1.default)
        .use(express_1.default.json())
        .use(express_1.default.urlencoded({ limit: '50kb', extended: false }))
        .use(appMiddlewares_1.verifyAllowedMethods);
};
const initializeRoutes = () => {
    app.use('/v1/', routes_v1_1.default);
    // if (appConfigs.isProd || appConfigs.isStaging) {
    //     app.use(Sentry.Handlers.errorHandler());
    // }
    app.get('/', (_req, res) => res.json({
        success: false,
        message: 'Up and running in ' + config_1.default.environment,
    }));
    app.all('*', (_req, res) => res.status(404).json({
        success: false,
        message: 'You have used an invalid method or hit an invalid route',
    }));
    // Use the error handling middleware
    app.use(errorHandler_1.errorHandlingMiddleware);
};
try {
    initializeDb();
    initializeMiddlewares();
    initializeRoutes();
}
catch (error) {
    errorHandler_1.errorHandler.handleError(error);
}
const port = config_1.default.port;
app.listen(port, () => {
    logger_1.default.info('[+]Logging Service Started');
    logger_1.default.info(`[+] CLOUD Server Running ... on Port -> ${port}`);
});
process.on('uncaughtException', async (err) => {
    try {
        logger_1.default.log('error', '❌❌❌ ➡ ⬇⬇⬇ An Error occured -> UNCAUGHT EXCEPTION ERROR ⬇⬇⬇');
        const error = {
            name: err.name,
            message: err.message,
            stack: err.stack,
        };
        logger_1.default.log('error', error.message);
    }
    catch (shutdownError) {
        logger_1.default.error('Error during shutdown:', shutdownError?.message);
    }
    finally {
        logger_1.default.info('Initiating graceful shutdown...');
        setTimeout(() => process.exit(1), 100);
    }
});
