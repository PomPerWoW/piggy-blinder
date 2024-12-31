import express, { Router } from 'express';
import { HealthController } from '@piggy/interfaces/controllers/health';

const router: Router = express.Router();

const healthController: HealthController = new HealthController();

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Application is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Piggy server is healthy and OK.
 */
router.get('/health', healthController.get);

export { router as healthRoutes };
