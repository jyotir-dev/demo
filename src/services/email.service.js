// Dependencies
import nodemailer from 'nodemailer';

// Environment
import env from '../config/env.js';

// Logger
import * as logger from '../lib/logger.js';

// Transporter
const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    pool: true,
    connectionTimeout: 10000,
    socketTimeout: 20000,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
    }
});

// Send Email
export const sendEmail = ({ to, subject, html, text }) => {
    transporter
        .sendMail({
            from: env.EMAIL_FROM,
            to,
            subject,
            html,
            text
        })
        .catch((error) => {
            logger.error('EMAIL', `Failed to send "${subject}"`, error.message);
        });
};
