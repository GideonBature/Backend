import { Response } from 'express';
import { z } from 'zod';

import { validCustomIdString } from '../types/general-policy';

export const handleResponse = (res: Response, data: unknown, status = 200) => {
    const success = status >= 400 ? false : true;

    if (typeof data === 'string') {
        return res.status(status).json({ success, message: data });
    }
    return res.status(status).json({
        success,
        message: 'Ok',
        ...(data as Record<string, unknown>),
    });
};

export function capitalizeString(input: string): string {
    return input?.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const isValidPlatformId = (val: string) =>
    val?.toLowerCase() === 'system' || z.string().uuid().safeParse(val).success;

export const isValidUserId = (userId: string) => {
    const isValidUUID = z.string().uuid().safeParse(userId).success;
    const isValidULID = z.string().ulid().safeParse(userId).success;
    const isValidCustomId = validCustomIdString.safeParse(userId).success;

    return isValidUUID || isValidULID || isValidCustomId;
};

export function isValidBase64String(field: string) {
    // Regular expression for Base64 validation
    const base64Pattern =
        /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    // Check if it's a valid Base64 string
    const isBase64 = base64Pattern.test(field);

    return isBase64;
}
