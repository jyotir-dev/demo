// Logger
import * as logger from '../lib/logger.js';

// Errors
import ApiError from '../errors/api.error.js';

// Body Errors
const BODY_ERRORS = {
    'entity.parse.failed': {
        statusCode: 400,
        code: 'INVALID_JSON',
        message: 'Request body must be valid JSON.'
    },
    'entity.too.large': {
        statusCode: 413,
        code: 'PAYLOAD_TOO_LARGE',
        message: 'Request body is too large.'
    }
};

// Handle Error
function handleError() {
    return function handleError(error, req, res, next) {
        if (res.headersSent) {
            return next(error);
        }

        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                code: error.code,
                message: error.message
            });
        }

        const bodyError = BODY_ERRORS[error.type];

        if (bodyError) {
            return res.status(bodyError.statusCode).json({
                success: false,
                code: bodyError.code,
                message: bodyError.message
            });
        }

        const stack = error instanceof Error ? error.stack : String(error);
        logger.error('REQUEST', `${req.method} ${req.originalUrl} ${req.id}`, stack);

        return res.status(500).json({
            success: false,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal server error.'
        });
    };
}

// Export Handle Error
export default handleError;
