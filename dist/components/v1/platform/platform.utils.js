"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveRolePermissions = exports.transformPermissions = exports.mapPermissions = exports.getPlatformMiddleware = void 0;
exports.validatePermissionValue = validatePermissionValue;
const errorHandler_1 = require("../../../utils/errorHandler");
const platform_services_1 = __importDefault(require("./platformServices/platform.services"));
function validatePermissionValue(word) {
    const regex = /^(view|add|edit|delete)_[a-z]+(_[a-z]+)*$/;
    return regex.test(word);
}
const getPlatformMiddleware = async (req, _res, next) => {
    const platform = await platform_services_1.default.findOne({});
    if (!platform)
        throw new errorHandler_1.InvalidRequestError();
    req.platform = platform;
    return next();
};
exports.getPlatformMiddleware = getPlatformMiddleware;
const mapPermissions = (permissions) => {
    const valueToPermission = new Map();
    for (const { id, values } of permissions) {
        // perm.values is an array of objects with a "value" property.
        values.forEach(({ value, description }) => {
            valueToPermission.set(value, {
                id,
                description,
            });
        });
    }
    return valueToPermission;
};
exports.mapPermissions = mapPermissions;
const transformPermissions = (permissionMap, rolePermissions) => {
    const invalidPermissions = [];
    const refinedPermission = rolePermissions
        .map((rolePerm) => {
        const value = rolePerm?.value ?? rolePerm;
        const permission = permissionMap.get(value);
        if (!permission?.id) {
            invalidPermissions.push(value);
            return null;
        }
        return {
            value,
            id: permission.id,
            description: permission.description,
        };
    })
        .filter(Boolean);
    return { refinedPermission, invalidPermissions };
};
exports.transformPermissions = transformPermissions;
const resolveRolePermissions = (permissions, roles) => {
    const permissionMap = (0, exports.mapPermissions)(permissions);
    // Map over the default roles to build a new rolesPermissions array with permission ids included.
    const transformedRoles = roles.map((role) => {
        const { name, userType, permissions: rolePermissions } = role;
        // Map each permission in the role to include its id (using the lookup).
        const { refinedPermission } = (0, exports.transformPermissions)(permissionMap, rolePermissions);
        return {
            name,
            userType,
            permissions: refinedPermission,
        };
    });
    return transformedRoles;
};
exports.resolveRolePermissions = resolveRolePermissions;
