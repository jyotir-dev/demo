// Environment
import env from './config/env.js';

// Express App
import app from './app.js';

// Logger
import * as logger from './lib/logger.js';

// Database
import * as database from './config/database.js';

// Constants
const SHUTDOWN_TIMEOUT_MS = 10000;

// Process Errors
process.on('unhandledRejection', (reason) => {
    logger.error('PROCESS', 'Unhandled promise rejection.', reason instanceof Error ? reason.stack : String(reason));
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    logger.error('PROCESS', 'Uncaught exception.', error.stack);
    process.exit(1);
});

// Connect Database
try {
    await database.connect();
} catch (error) {
    logger.error('DATABASE', `Failed to connect: ${error.message}`);
    process.exit(1);
}

// Start Server
const server = app.listen(env.PORT, () => {
    logger.success('SERVER', `Listening on port ${env.PORT}`, `${Math.round(process.uptime() * 1000)}ms`);
});

server.on('error', (error) => {
    logger.error('SERVER', error.code === 'EADDRINUSE' ? `Port ${env.PORT} is already in use.` : error.message);
    process.exit(1);
});

// Shutdown
const shutdown = (signal) => {

    logger.warn('SERVER', `${signal} received, shutting down.`);

    setTimeout(() => {
        logger.error('SERVER', 'Shutdown timed out, forcing exit.');
        process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS).unref();

    server.close(async () => {
        await database.disconnect();
        logger.success('SERVER', 'Shut down executed.');
        process.exit(0);
    });
};

// Shutdown Signals
process.once('SIGTERM', () => shutdown('SIGTERM'));
process.once('SIGINT', () => shutdown('SIGINT'));