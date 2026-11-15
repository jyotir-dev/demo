// Dependencies
import jwt from 'jsonwebtoken';

// Environment
import env from '../config/env.js';

// Constants
const TOKEN_TTL = 7 * 24 * 60 * 60;

// Sign Token
export const signToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            version: user.tokenVersion
        },
        env.JWT_SECRET,
        { expiresIn: TOKEN_TTL }
    );
};

// Verify Token
export const verifyToken = (token) => {
    return jwt.verify(token, env.JWT_SECRET);
};