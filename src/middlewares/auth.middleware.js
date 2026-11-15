// Security
import * as JWT from '../security/jwt.js';

// Models
import User from '../models/user.model.js';

// Errors
import { UnauthorizedError } from '../errors/http.errors.js';

// Require Auth
function requireAuth() {
    return async function requireAuth(req, res, next) {
        try {
            const token = req.cookies?.token;

            if (!token) {
                throw new UnauthorizedError('Authentication required.', 'AUTH_REQUIRED');
            }

            let decoded;

            try {
                decoded = JWT.verifyToken(token);
            } catch {
                throw new UnauthorizedError('Invalid or expired authentication token.', 'INVALID_TOKEN');
            }

            const user = await User.findById(decoded.id);

            if (!user || user.tokenVersion !== decoded.version) {
                throw new UnauthorizedError('Your session has expired. Please log in again.', 'SESSION_EXPIRED');
            }

            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    };
}

// Export Require Auth
export default requireAuth;
