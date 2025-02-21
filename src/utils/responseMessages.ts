const responseMessages = {
    unsupportedMethod:
        'Either Auth type is unsupported or invalid, Please contact support.',
    invalidCredentialCombination:
        'Invalid credential and authType combination.',
    otpResponse:
        'If your account exists, you will receive an OTP via email or SMS.',
    passwordResetMsg:
        'Your password has been reset successfully, kindly login.',
    requestReceived:
        'Your request has been received, kindly check your email for verification code.',
    blockedAccount:
        'Your account has been temporarily blocked. Please contact support.',
    acctNotExist: 'Account does not exist.',
    roleNotExist: 'Role does not exist.',
    acctConfirmed: 'Your account has been confirmed.',
    tryAgain:
        'We are unable to complete your request at this time. Please try again later or contact support if the problem persists.',
    newAcctTryAgain:
        'Account created, but we were unable to send the confirmation email. Please contact support or try again later.',
    newAcct:
        'Your account has been created successfully, kindly check your email for verification code.',
    emailExists: 'This email is already in use. Kindly use a new one.',
    phoneNoExists: 'This phone number is already in use. Kindly use a new one.',
    phoneNoIsRequired: 'Phone prefix and phone number are required',
    fieldRequired: (field: string) =>
        `Unable to complete the request. Please use a different ${field}.`,
    missingField: (field: string) =>
        `Unable to complete the request. Please provide a valid ${field}.`,
    failedAttempts: (waitMinutes: number) =>
        `Too many failed login attempts. Please wait for ${waitMinutes} minutes and try again.`,
    requireAcctConfirmation:
        'Your account has not been confirmed. Kindly check your email for Otp code.',
    emailOrPhone:
        'Either email or phonePrefix and phoneNumber should be supplied.',
    pinOrPassword: 'Either pin or password should be supplied.',
    invalidRequest: 'Invalid request.',
    invalidOtpCode: 'Invalid Otp code',
    otpCodeExpired: 'Otp code has expired.',
    unconfirmedOtpCode: 'Otp code is unverified.',
    invalidLoginCred: 'Invalid login credentials',
    unValidatedCode: 'Otp code could not be validated.',
    accountBlocked:
        'Your account has been disabled. If you think this was a mistake, please contact us.',
    signInMailSuccess:
        'Login successful. A verification code has been sent to your email inbox. Please check to complete the process.',
    signOut: 'You have successfully signed out. See you soon!',
    login2faSuccess:
        'Login successful. Please verify your 2fa to complete the process.',
    loginMailFailure:
        'There was an issue sending the login verification code. Please try again later.',
    requiredAuthFields:
        'Only one of the following should be provided: userId, email, or phonePrefix and phoneNumber.',
    unconfirmedAcct:
        'Your account has not been confirmed. Kindly check your email for a verification code.',
    invalidCredentials: 'Invalid credentials',
    require2faToken: 'Please provide a valid two-factor authentication token.',
    invalid2faToken:
        'The provided two-factor authentication token is invalid. Please try again.',
    requireAuth: 'Authentication is required.',
    failedAuth: 'Authorization failed',
    confirmAcct: 'You need to confirm your account.',
    invalidSession: 'Invalid session. Kindly login again',
    expiredSession: 'expired session. Kindly login again',
    hasExistingroleInvite:
        'This user has already been sent an invitation for another role.',
    inviteAccepted: 'Invite already accepted.',
    acctExist: 'Account already exists.',
    inviteResentSuccess:
        'Invitation has been resent successfully. Please check your email, including your spam or junk folder, for the invite.',
    inviteSent: 'Invitation sent ✉️',
    inviteMailFailure:
        'We encountered an issue while sending the invitation email. Please try again later or contact support if the problem persists.',
    invalidInviteCode: 'Either the invite code or email provided is invalid.',
    acceptedInviteCode:
        'The invite code has already been used. Please request a new one if needed.',
    expiredInviteCode: 'The invite code has expired. Please request a new one.',
    onboardingInviteCode:
        'The invite code has been verified. Please proceed to onboarding.',
    onboardingCompleted:
        'Onboarding completed successfully. Welcome aboard! You can now start using the application.',
    permissionsExist: 'Either one or all permission(s) exists.',
    permissionsRequired:
        'You do not have the permission to perform this operation.',
    roleExists: 'Role already exists.',
    fieldSuccessAction: (
        field: string,
        action: 'added' | 'updated' | 'deleted'
    ) => `${field} ${action} successfully.`,
    dataNotExist: (field: string) => `${field} does not exist.`,
    dataExist: (field: string) => `${field} already exist.`,
    errorMsg:
        'Oops! Something went wrong. Please try again shortly, or contact support if the problem persists.',
};

export default responseMessages;
