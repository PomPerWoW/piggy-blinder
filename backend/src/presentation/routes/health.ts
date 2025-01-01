import express, { Router } from 'express';
import { HealthController } from '@piggy/presentation/controllers/health';

const router: Router = express.Router();

const healthController: HealthController = new HealthController();
router.get('/health', healthController.get);

export { router as healthRoutes };