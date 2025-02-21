import winston from 'winston';
import appConfigs from '../config';

// Logger Configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (appConfigs.isDev || appConfigs.isTestMode || appConfigs.isLocalDev) {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

export default logger;
