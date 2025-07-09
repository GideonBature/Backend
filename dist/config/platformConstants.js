"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platformConstants = {
    userTypes: ['organization-user', 'platform-user'],
    platformRoleTypes: ['super-admin', 'admin'],
    emailStatus: ['delivered', 'failed', 'queued', 'accepted'],
    emailType: ['automatic', 'manual'],
    user2faStatus: [
        'pending',
        'confirm-login',
        'login-confirmed',
        'completed',
    ],
    systemMode: ['test', 'production'],
    supportedCountries: ['ng'],
    otpResendWaitingMinutes: 10,
    paginationConfig: {
        perPage: 20,
        allowedPerPageValues: [20, 30, 50, 100],
    },
    supportedImgTypes: ['.png', '.jpg', '.jpeg', '.webp'],
};
exports.default = platformConstants;
