import { NextFunction, Request, Response } from 'express';

export const verifyAllowedMethods = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.method === 'OPTIONS') {
            res.header(
                'Access-Control-Allow-Methods',
                'POST, PUT, PATCH, GET, DELETE'
            );

            return res.status(403).json('Invalid header method');
        } else return next();
    } catch (err) {
        return next(err);
    }
};
