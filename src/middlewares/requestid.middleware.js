// Dependencies
import crypto from 'node:crypto';

// Request ID
function requestId() {
    return function requestId(req, res, next) {
        req.id = crypto.randomUUID();
        res.set('X-Request-Id', req.id);

        next();
    };
}

// Export Request ID
export default requestId;
