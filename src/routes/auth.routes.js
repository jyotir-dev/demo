// Dependencies
import express from 'express';

// Limits
import * as authLimits from '../limits/auth.limits.js';

// Validators
import * as authValidator from '../validators/auth.validator.js';

// Controllers
import * as authController from '../controllers/auth.controller.js';

// Middlewares
import requireAuth from '../middlewares/auth.middleware.js';
import rateLimit from '../middlewares/ratelimit.middleware.js';
import validateRequest from '../middlewares/validation.middleware.js';

// Express Router
const router = express.Router();

// Auth Routes
router.post('/signup', rateLimit(authLimits.signup), validateRequest(authValidator.signup), authController.signup);

router.post('/login', rateLimit(authLimits.login), validateRequest(authValidator.login), authController.login);

router.get('/me', requireAuth(), authController.me);

router.post('/logout', authController.logout);

router.patch(
    '/password',
    rateLimit(authLimits.changePassword),
    requireAuth(),
    validateRequest(authValidator.changePassword),
    authController.changePassword
);

router.post(
    '/verify-email',
    rateLimit(authLimits.token),
    validateRequest(authValidator.verifyEmail),
    authController.verifyEmail
);

router.post('/verify-email/resend', rateLimit(authLimits.email), requireAuth(), authController.resendVerification);

router.post(
    '/forgot-password',
    rateLimit(authLimits.email),
    validateRequest(authValidator.forgotPassword),
    authController.forgotPassword
);

router.post(
    '/reset-password',
    rateLimit(authLimits.token),
    validateRequest(authValidator.resetPassword),
    authController.resetPassword
);

router.post(
    '/reset-password/verify',
    rateLimit(authLimits.token),
    validateRequest(authValidator.verifyResetToken),
    authController.verifyResetToken
);

// Export Auth Routes
export default router;
