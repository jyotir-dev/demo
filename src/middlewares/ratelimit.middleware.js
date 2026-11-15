// Dependencies
import expressRateLimit from 'express-rate-limit';

// Errors
import { TooManyRequestsError } from '../errors/http.errors.js';

// Handle Rate Limited
function handleRateLimited(req, res, next, options) {
    next(new TooManyRequestsError(options.message));
}

// Rate Limit
function rateLimit({ windowMs, limit, message, skipSuccessfulRequests = false }) {
    return expressRateLimit({
        windowMs,
        limit,
        message,
        skipSuccessfulRequests,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
        handler: handleRateLimited
    });
}

// Export Rate Limit
export default rateLimit;
