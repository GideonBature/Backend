"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleSchema = exports.editdRoleSchema = exports.addRoleSchema = exports.deletePermissionSchema = exports.addPermissionSchema = void 0;
const zod_1 = require("zod");
const general_policy_1 = require("../../../types/general-policy");
const platform_utils_1 = require("./platform.utils");
const platformConstants_1 = __importDefault(require("../../../config/platformConstants"));
const permission = zod_1.z.object({
    name: general_policy_1.validString.toLowerCase(),
    values: zod_1.z.array(zod_1.z.object({
        value: general_policy_1.validString.refine(platform_utils_1.validatePermissionValue, 'Invalid permission value or format, expected format is action_feature-name, eg view_transaction.'),
        description: general_policy_1.validString,
    })),
});
exports.addPermissionSchema = zod_1.z.object({
    permissions: zod_1.z.array(permission),
});
exports.deletePermissionSchema = zod_1.z.object({
    permissionId: general_policy_1.validCustomIdString,
});
exports.addRoleSchema = zod_1.z.object({
    name: general_policy_1.validString.toLowerCase(),
    userType: zod_1.z.enum(platformConstants_1.default.userTypes),
    permissions: zod_1.z.array(zod_1.z.object({
        id: general_policy_1.validPositiveNumber,
        value: general_policy_1.validString
            .toLowerCase()
            .refine(platform_utils_1.validatePermissionValue, 'contains invalid value(s) or format, expected format is action_feature-name, eg view_order.'),
    })),
});
exports.editdRoleSchema = exports.addRoleSchema
    .pick({ permissions: true })
    .extend({
    roleId: general_policy_1.validPositiveNumber,
});
exports.deleteRoleSchema = zod_1.z.object({
    roleId: general_policy_1.validCustomIdString,
});
