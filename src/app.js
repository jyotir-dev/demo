// Dependencies
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import cookieParser from 'cookie-parser';

// Environment
import env from './config/env.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import escrowRoutes from './routes/escrow.routes.js';
import healthRoutes from './routes/health.routes.js';

// Middlewares
import logRequest from './middlewares/logger.middleware.js';
import handleError from './middlewares/error.middleware.js';
import handleNotFound from './middlewares/notfound.middleware.js';

// Express App
const app = express();

// Trust Proxy
if (env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Security Headers
app.use(helmet());

// JSON Parser
app.use(express.json({ limit: '10kb' }));

// Cookie Parser
app.use(cookieParser());

// CORS Policy
app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true
    })
);

// Request Logger
app.use(logRequest());

// Health Routes
app.use('/api/health', healthRoutes);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/escrow', escrowRoutes);

// Not Found Handler
app.use(handleNotFound());

// Error Handler
app.use(handleError());

// Export Express App
export default app;
