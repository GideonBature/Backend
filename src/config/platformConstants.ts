const platformConstants = {
    userTypes: ['organization-user', 'platform-user'] as const,
    platformRoleTypes: ['super-admin', 'admin'] as const,
    emailStatus: ['delivered', 'failed', 'queued', 'accepted'] as const,
    emailType: ['automatic', 'manual'] as const,
    user2faStatus: [
        'pending',
        'confirm-login',
        'login-confirmed',
        'completed',
    ] as const,
    systemMode: ['test', 'production'] as const,
    supportedCountries: ['ng'] as const,
    otpResendWaitingMinutes: 10,
    paginationConfig: {
        perPage: 20,
        allowedPerPageValues: [20, 30, 50, 100] as const,
    },
    supportedImgTypes: ['.png', '.jpg', '.jpeg', '.webp'],
};

export default platformConstants;
