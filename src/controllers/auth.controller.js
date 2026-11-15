// Catch Async
import catchAsync from '../utils/catch-async.js';

// Auth Cookie
import * as authCookie from '../utils/auth-cookie.js';

// Services
import * as authService from '../services/auth.service.js';

// Signup
export const signup = catchAsync(async (req, res) => {
    const result = await authService.signup(req.body);
    authCookie.setAuthCookie(res, result.token);
    res.status(201).json(result.response);
});

// Login
export const login = catchAsync(async (req, res) => {
    const result = await authService.login(req.body);
    authCookie.setAuthCookie(res, result.token);
    res.status(200).json(result.response);
});

// Me
export const me = catchAsync(async (req, res) => {
    const result = await authService.me(req.user);
    res.status(200).json(result.response);
});

// Logout
export const logout = catchAsync(async (req, res) => {
    const result = await authService.logout();
    authCookie.clearAuthCookie(res);
    res.status(200).json(result.response);
});

// Change Password
export const changePassword = catchAsync(async (req, res) => {
    const result = await authService.changePassword(req.user, req.body);
    authCookie.clearAuthCookie(res);
    res.status(200).json(result.response);
});

// Verify Email
export const verifyEmail = catchAsync(async (req, res) => {
    const result = await authService.verifyEmail(req.body);
    res.status(200).json(result.response);
});

// Resend Verification Email
export const resendVerification = catchAsync(async (req, res) => {
    const result = await authService.resendVerification(req.user);
    res.status(200).json(result.response);
});

// Forgot Password
export const forgotPassword = catchAsync(async (req, res) => {
    const result = await authService.forgotPassword(req.body);
    res.status(200).json(result.response);
});

// Reset Password
export const resetPassword = catchAsync(async (req, res) => {
    const result = await authService.resetPassword(req.body);
    authCookie.clearAuthCookie(res);
    res.status(200).json(result.response);
});

// Verify Reset Token
export const verifyResetToken = catchAsync(async (req, res) => {
    const result = await authService.verifyResetToken(req.body);
    res.status(200).json(result.response);
});