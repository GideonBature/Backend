import { NextFunction, Response } from 'express';
import crypto from 'crypto';

import { IRequest } from '../types/global';
import { getIpAddress } from '../utils';

const fingerprintMiddleware = (
    req: IRequest,
    _res: Response,
    next: NextFunction
) => {
    const userAgent = req.headers['user-agent'] || '';

    const accept = req.headers['accept'] || '';

    const acceptLanguage = req.headers['accept-language'] || '';

    const ipAddress = getIpAddress(req);

    const components = [userAgent, ipAddress, acceptLanguage, accept];

    const fingerprintString = components.join('||');

    const hash = crypto.createHash('sha256');

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

export default fingerprintMiddleware;
