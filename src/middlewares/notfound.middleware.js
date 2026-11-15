// Errors
import { NotFoundError } from '../errors/http.errors.js';

// Handle Not Found
function handleNotFound() {
    return function handleNotFound(req, res, next) {
        next(new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`, 'ROUTE_NOT_FOUND'));
    };
}

// Export Handle Not Found
export default handleNotFound;