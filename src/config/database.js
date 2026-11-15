// Dependencies
import mongoose from 'mongoose';

// Environment
import env from './env.js';

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
export const connect = async () => {
    const start = Date.now();

    await mongoose.connect(env.MONGO_URI, CONNECTION_OPTIONS);

    logger.success('DATABASE', `Connected to "${mongoose.connection.name}"`, `${Date.now() - start}ms`);
};

// Disconnect Database
export const disconnect = () => mongoose.disconnect();
