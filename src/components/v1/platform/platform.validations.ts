import { z } from 'zod';

import {
    validCustomIdString,
    validPositiveNumber,
    validString,
} from '../../../types/general-policy';
import { validatePermissionValue } from './platform.utils';
import platformConstants from '../../../config/platformConstants';

const permission = z.object({
    name: validString.toLowerCase(),
    values: z.array(
        z.object({
            value: validString.refine(
                validatePermissionValue,
                'Invalid permission value or format, expected format is action_feature-name, eg view_transaction.'
            ),
            description: validString,
        })
    ),
});

export const addPermissionSchema = z.object({
    permissions: z.array(permission),
});

export const deletePermissionSchema = z.object({
    permissionId: validCustomIdString,
});

export const addRoleSchema = z.object({
    name: validString.toLowerCase(),
    userType: z.enum(platformConstants.userTypes),
    permissions: z.array(
        z.object({
            id: validPositiveNumber,
            value: validString
                .toLowerCase()
                .refine(
                    validatePermissionValue,
                    'contains invalid value(s) or format, expected format is action_feature-name, eg view_order.'
                ),
        })
    ),
});

export const editdRoleSchema = addRoleSchema
    .pick({ permissions: true })
    .extend({
        roleId: validPositiveNumber,
    });

export const deleteRoleSchema = z.object({
    roleId: validCustomIdString,
});
