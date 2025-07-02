"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const appConfigs = {
    isProd: ['prod', 'production'].includes(process_1.env.NODE_ENV),
    isDev: ['dev', 'development'].includes(process_1.env.NODE_ENV),
    isLocalDev: 'local_dev' === process_1.env.NODE_ENV,
    isStaging: process_1.env.NODE_ENV === 'staging',
    isTestMode: ['test', 'testing'].includes(process_1.env.NODE_ENV),
    port: process_1.env.PORT || 8002,
    dbUrl: ['test', 'testing'].includes(process_1.env.NODE_ENV)
        ? process_1.env.TEST_DATABASE_URL
        : process_1.env.DATABASE_URL,
    dbName: process_1.env.DATABASE_NAME,
    dbConfigs: {
        DATABASE_URL: process_1.env.DATABASE_URL,
        DATABASE_NAME: process_1.env.DATABASE_NAME,
        DATABASE_HOST: process_1.env.DATABASE_HOST,
        DATABASE_PORT: process_1.env.DATABASE_PORT,
        DATABASE_USERNAME: process_1.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process_1.env.DATABASE_PASSWORD,
    },
    environment: process_1.env.NODE_ENV || 'dev',
    authConfig: {
        saltRound: 10,
        jwtSecret: process_1.env.JWT_SECRET || 'secret',
        hashPepper: process_1.env.HASH_PEPPER || '',
        sessionLifeSpan: '2 days',
        maxInactivity: '4 hours',
    },
    seedData: {
        firstName: process_1.env.SEED_FIRST_NAME,
        lastName: process_1.env.SEED_LAST_NAME,
        email: process_1.env.SEED_EMAIL,
        password: process_1.env.SEED_PASSWORD,
        phonePrefix: process_1.env.SEED_PHONE_PREFIX,
        phone: process_1.env.SEED_PHONE,
    },
    platformConfig: {
        name: 'fundable-server',
        description: process_1.env.PLATFORM_DESCRIPTION ?? '',
    },
};
exports.default = appConfigs;
