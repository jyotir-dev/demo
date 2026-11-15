// Environment
import env from './env.js';

// Dependencies
import mongoose from 'mongoose';

// Logger
import * as logger from '../lib/logger.js';

// Connection Options
const CONNECTION_OPTIONS = {
    appName: 'kairo',
    serverSelectionTimeoutMS: 10000
};

// Settings
mongoose.set('strictQuery', true);

// Connection Events
mongoose.connection.on('disconnected', () => {
    logger.warn('DATABASE', 'Disconnected from MongoDB.');
});

mongoose.connection.on('reconnected', () => {
    logger.success('DATABASE', 'Reconnected to MongoDB.');
});

// Connect Database
const connectDatabase = async () => {

    const start = Date.now();

    try {
        await mongoose.connect(env.MONGO_URI, CONNECTION_OPTIONS);
        logger.success('DATABASE', `Connected to "${mongoose.connection.name}"`, `${Date.now() - start}ms`);
    } catch (error) {
        logger.error('DATABASE', `Failed to connect: ${error.message}`);
        throw error;
    }
};

// Export Connect Database
export default connectDatabase;