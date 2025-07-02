"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const permission_entity_1 = require("../../components/v1/platform/platformEntities/permission.entity");
const userAccess_entity_1 = __importDefault(require("../../components/v1/auth/authEntities/userAccess.entity"));
const platform_entity_1 = __importStar(require("../../components/v1/platform/platformEntities/platform.entity"));
const user_entity_1 = __importDefault(require("../../components/v1/user/user.entity"));
const platformConstants_1 = __importDefault(require("../platformConstants"));
const errorHandler_1 = require("../../utils/errorHandler");
const logger_1 = __importDefault(require("../../utils/logger"));
const __1 = __importDefault(require(".."));
const platform_services_1 = __importDefault(require("../../components/v1/platform/platformServices/platform.services"));
const utils_1 = require("../../utils");
const defaultRolesAndPermissions_1 = require("../defaultRolesAndPermissions");
const platform_utils_1 = require("../../components/v1/platform/platform.utils");
const free_email_1 = require("../../utils/free_email");
const initiateSeeding = async () => {
    const { seedData, platformConfig } = __1.default;
    try {
        logger_1.default.info('Check Seeding Data');
        const platformExists = await platform_services_1.default.findOneBy({
            name: platformConfig.name,
        });
        if (platformExists)
            return;
        logger_1.default.info('Initiating Seeding ⚙️');
        logger_1.default.info('Seeding started ⚙️');
        await (0, utils_1.executeTransaction)(async (tx) => {
            // Check if platform data exists
            // Seed Platform
            const platform = tx.create(platform_entity_1.default, {
                name: platformConfig.name,
                version: '1.0.0',
                description: platformConfig?.description || '',
                userTypes: platformConstants_1.default.userTypes,
                supportedCountries: platformConstants_1.default.supportedCountries,
                setups: platformConstants_1.default.kycSteps.map((setup) => ({
                    type: setup,
                    status: 'active',
                    activeCountries: [...platformConstants_1.default.supportedCountries],
                    cost: 0,
                })),
            });
            logger_1.default.info('Seeding in progress (platform user done) ⚙️');
            // Seed User
            const user = tx.create(user_entity_1.default, {
                phonePrefix: seedData.phonePrefix,
                firstName: seedData.firstName,
                lastName: seedData.lastName,
                email: seedData.email,
                phone: seedData.phone,
                isConfirmed: true,
                countryCode: 'gh',
                isSignupComplete: true,
                userType: 'platform-admin',
            });
            await tx.save(user);
            logger_1.default.info('Seeding in progress (seed user done) ⚙️');
            const savedPermissions = await tx.save(permission_entity_1.PermissionEntity, defaultRolesAndPermissions_1.defaultPermissions);
            const superAdminRole = tx.create(permission_entity_1.RoleEntity, {
                name: 'super-admin',
                permissions: [
                    {
                        value: 'supreme',
                        description: 'one_star_general',
                    },
                ],
                userType: 'platform-admin',
            });
            await tx.save(superAdminRole);
            const resolvedRoles = (0, platform_utils_1.resolveRolePermissions)(savedPermissions, defaultRolesAndPermissions_1.defaultRolesAndPermissions);
            await tx.save(permission_entity_1.RoleEntity, resolvedRoles);
            await tx.save(platform_entity_1.FreeDomainEntity, free_email_1.free_domains.map((domain) => ({ domain })));
            // Seed Access
            const userAccess = tx.create(userAccess_entity_1.default, {
                userId: user.id,
                password: seedData.password,
                Role: superAdminRole,
            });
            await tx.save([platform, userAccess]);
        });
        logger_1.default.info('Seeding in progress (seed access done) ⚙️');
        logger_1.default.info('Seeding complete ✅');
        return;
    }
    catch (err) {
        // logger.info('Error occurred in seeding:', err);
        const error = err;
        throw new errorHandler_1.AppError({
            name: error.name,
            message: error.message,
            httpCode: 500,
        });
    }
};
exports.default = initiateSeeding;
