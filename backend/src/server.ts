import express, { Express } from 'express';
import config from '@piggy/infrastructure/config/config';
import Logger from '@piggy/infrastructure/logging/Logger';
import { healthRoutes } from '@piggy/interfaces/routes/health';
import { docsRoutes } from '@piggy/interfaces/routes/docs';

const PORT = config.SERVER_PORT;
const logger: Logger = new Logger('Server');

const app: Express = express();

app.use(express.json());
app.use('/api/v1', healthRoutes);
app.use('/api/v1/docs', docsRoutes);

app.listen(PORT, () => {
  logger.info(`Piggy server running on port ${PORT}`);
});
