// Dependencies
import express from 'express';

// Limits
import * as escrowLimits from '../limits/escrow.limits.js';

// Validators
import * as escrowValidator from '../validators/escrow.validator.js';

// Controllers
import * as escrowController from '../controllers/escrow.controller.js';

// Middlewares
import requireAuth from '../middlewares/auth.middleware.js';
import rateLimit from '../middlewares/ratelimit.middleware.js';
import validateRequest from '../middlewares/validation.middleware.js';
import requireVerified from '../middlewares/verification.middleware.js';

// Express Router
const router = express.Router();

// Escrow Routes
router.post(
    '/create',
    rateLimit(escrowLimits.create),
    requireAuth(),
    requireVerified(),
    validateRequest(escrowValidator.create),
    escrowController.create
);

router.get(
    '/escrows',
    requireAuth(),
    escrowController.escrows
);

router.get(
    '/:publicID',
    requireAuth(),
    validateRequest(escrowValidator.publicID),
    escrowController.escrow
);

router.patch(
    '/:publicID/respond',
    rateLimit(escrowLimits.respond),
    requireAuth(),
    requireVerified(),
    validateRequest(escrowValidator.respond),
    escrowController.respond
);

router.patch(
    '/:publicID/release',
    rateLimit(escrowLimits.payout),
    requireAuth(),
    validateRequest(escrowValidator.release),
    escrowController.release
);

router.patch(
    '/:publicID/withdraw',
    rateLimit(escrowLimits.payout),
    requireAuth(),
    validateRequest(escrowValidator.withdraw),
    escrowController.withdraw
);

// Export Escrow Routes
export default router;