"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validCustomIdString = exports.validCountryCodeString = exports.validUserId = exports.validPageMetaNo = exports.validPositiveNumber = exports.validNumber = exports.validUrlString = exports.validEmailString = exports.validPinString = exports.validPasswordString = exports.validString = exports.stringPattern = void 0;
const zod_1 = require("zod");
const helper_1 = require("../utils/helper");
const stringPattern = zod_1.z.string().trim();
exports.stringPattern = stringPattern;
const validString = stringPattern
    .min(2, 'Field cannot be empty')
    .max(255, 'Character is too long');
exports.validString = validString;
const validCustomIdString = stringPattern.regex(/^[a-zA-Z0-9]+$/, 'invalid id');
exports.validCustomIdString = validCustomIdString;
const validPasswordString = zod_1.z
    .string()
    .min(8, 'must be at least 8 characters long') // Length check
    .regex(/[a-z]/, 'must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'must contain at least one uppercase letter')
    .regex(/\d/, 'must contain at least one digit')
    .regex(/[@_$!-.]/, 'must contain at least one special character between @$!&.');
exports.validPasswordString = validPasswordString;
const validPinString = zod_1.z
    .string()
    .length(4, 'must be 4 digit') // Length check
    .regex(/\d/, 'must contain 4 digit');
exports.validPinString = validPinString;
const validEmailString = stringPattern.email().trim().min(3);
exports.validEmailString = validEmailString;
const validUrlString = stringPattern.url().min(3);
exports.validUrlString = validUrlString;
const validNumber = zod_1.z.number().int().nonnegative();
exports.validNumber = validNumber;
const validPositiveNumber = zod_1.z.number().int().positive();
exports.validPositiveNumber = validPositiveNumber;
const validPageMetaNo = validString
    .transform((val) => +val)
    .refine((val) => val >= 1)
    .optional();
exports.validPageMetaNo = validPageMetaNo;
const validUserId = stringPattern.refine((userId) => (0, helper_1.isValidUserId)(userId), 'Invalid user Id');
exports.validUserId = validUserId;
const validCountryCodeString = validString.trim().toLowerCase().length(2);
exports.validCountryCodeString = validCountryCodeString;
