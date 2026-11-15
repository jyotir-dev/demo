// Environment
import env from '../config/env.js';

// Services
import * as emailService from '../services/email.service.js';

// Emails
import resetEmail from '../emails/reset.email.js';
import securityEmail from '../emails/security.email.js';
import verificationEmail from '../emails/verification.email.js';

// Send Verification Email
export const sendVerificationEmail = (user, rawToken) => {

    const verificationURL = `${env.CLIENT_URL}/verify-email?token=${rawToken}`;

    emailService.sendEmail({
        to: user.email,
        ...verificationEmail({ user, verificationURL })
    });
};

// Send Reset Email
export const sendResetEmail = (user, rawToken) => {

    const resetURL = `${env.CLIENT_URL}/reset-password?token=${rawToken}`;

    emailService.sendEmail({
        to: user.email,
        ...resetEmail({ user, resetURL })
    });
};

// Send Security Email
export const sendSecurityEmail = (user) => {

    const secureAccountURL = `${env.CLIENT_URL}/forgot-password`;

    emailService.sendEmail({
        to: user.email,
        ...securityEmail({ user, secureAccountURL })
    });
};