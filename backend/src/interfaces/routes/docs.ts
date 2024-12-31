import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from '@piggy/infrastructure/docs/swagger/swagger';

const router: Router = express.Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(specs));

export { router as docsRoutes };
