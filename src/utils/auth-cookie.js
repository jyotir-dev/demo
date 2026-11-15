// Environment
import env from '../config/env.js';

// Cookie Name
const COOKIE_NAME = 'token';

// Cookie Options
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

// Set Auth Cookie
export const setAuthCookie = (res, token) => {
    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
};

// Clear Auth Cookie
export const clearAuthCookie = (res) => {
    res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);
};