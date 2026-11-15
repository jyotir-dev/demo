// Errors
import ApiError from '../errors/api.error.js';
import { BadRequestError } from '../errors/http.errors.js';

// Validate Request
function validateRequest(validator) {
    return function validateRequest(req, res, next) {
        try {
            validator(req.params, req.body, req.query);
            next();
        } catch (error) {
            next(error instanceof ApiError ? error : new BadRequestError('Invalid request data.'));
        }
    };
}

// Export Validate Request
export default validateRequest;