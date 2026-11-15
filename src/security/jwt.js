// Dependencies
const jwt = require('jsonwebtoken');

// Environment
const env = require('../config/env');

// Constants
const JWT_SECRET = env.JWT_SECRET;
const TOKEN_TTL = 7 * 24 * 60 * 60;

// Sign Token
exports.signToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            version: user.tokenVersion
        },
        JWT_SECRET,
        { expiresIn: TOKEN_TTL }
    );
};

//  Verify Token
exports.verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}