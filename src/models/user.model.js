// Dependencies
const mongoose = require('mongoose');

// Enums
const { USER_ROLE } = require('../enums/user.enums');

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        default: USER_ROLE.USER
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    },
    tokenVersion: {
        type: Number,
        default: 0
    },
    emailVerificationTokenHash: {
        type: String,
        select: false
    },
    emailVerificationExpires: {
        type: Date,
        select: false
    },
    passwordResetTokenHash: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    }
},  { timestamps: true });

// User Model
const User = mongoose.model('User', userSchema);

// Export User Model
module.exports = User;