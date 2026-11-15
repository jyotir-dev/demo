// Dependencies
import crypto from 'node:crypto';

// Hash Token
export const hash = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

// Generate Token
export const generate = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString('hex');
};
