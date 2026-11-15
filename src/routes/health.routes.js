// Dependencies
import express from 'express';

// Controllers
import * as healthController from '../controllers/health.controller.js';

// Express Router
const router = express.Router();

// Health Routes
router.get('/', healthController.health);

// Export Health Routes
export default router;
