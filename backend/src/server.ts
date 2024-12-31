import express, { Express } from 'express';
import config from '@piggy/config';
import logger from '@piggy/logger';

const PORT = config.SERVER_PORT;

const app: Express = express();

app.listen(PORT, () => {
  logger.info(`Piggy server running on port ${PORT}`);
});
