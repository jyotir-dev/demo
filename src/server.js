// Environment Variables
const env = require('./config/env');

// Express App
const app = require('./app');

// Logger
const logger = require('./lib/logger');

// Database
const connectDatabase = require('./config/database');

// Start Server
const startServer = async () => {

    try {
        await connectDatabase();
    } catch {
        process.exit(1);
    }

    const server = app.listen(env.PORT, () => {
        logger.success('SERVER', `Listening on port ${env.PORT}`, `${Math.round(process.uptime() * 1000)}ms`);
    });

    server.on('error', (error) => {
        logger.warn('SERVER', error.code === 'EADDRINUSE' ? `Port ${env.PORT} is already in use.` : error.message);
        process.exit(1);
    });
};

// Start Server
startServer();