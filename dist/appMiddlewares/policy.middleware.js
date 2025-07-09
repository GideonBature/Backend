"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const policyMiddleware = (schema, fieldType = 'body') => (req, _res, next) => {
    try {
        const parsedData = schema.parse(req[fieldType]);
        req[fieldType] = parsedData;
        return next();
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            const issue = err.issues[0];
            const message = `${issue.path.join('.')} ${issue.message}`.toLowerCase();
            const error = {
                name: 'BadRequestError',
                httpCode: 400,
                type: 'API',
                message,
            };
            return next(error);
        }
        next(err);
    }
};
exports.default = policyMiddleware;
