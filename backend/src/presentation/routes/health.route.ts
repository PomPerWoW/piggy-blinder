import express, { Router } from 'express';
import { HealthController } from '@piggy/presentation/controllers/health.controller';

const router: Router = express.Router();

const healthController: HealthController = new HealthController();
router.get('/health', healthController.get);
router.get('/error', healthController.error);

export { router as healthRoutes };
