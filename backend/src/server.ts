import express, { Express } from 'express';
import config from '@piggy/core/config/config';
import Logger from '@piggy/core/logging/logger';
import { healthRoutes } from '@piggy/presentation/routes/health.route';
import {
  errorHandler,
  notFoundHandler,
} from '@piggy/presentation/middlewares/errors.middleware';

const PORT = config.SERVER_PORT;
const logger: Logger = new Logger('Server');

const app: Express = express();

app.use(express.json());
app.use('/api/v1', healthRoutes);

app.all('*', notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Piggy server running on port ${PORT}`);
});
