import express, { Express } from 'express';
import config from '@piggy/infrastructure/config/config';
import Logger from '@piggy/infrastructure/logger';

const PORT = config.SERVER_PORT;
const logger: Logger = Logger.getInstance('Server');

const app: Express = express();

app.use(express.json());

app.listen(PORT, () => {
  logger.info(`Piggy server running on port ${PORT}`);
});
