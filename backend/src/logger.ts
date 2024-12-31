import pino, { Logger } from 'pino';
import config from '@piggy/config';

const logger: Logger = pino({
  level: config.PINO_LOG_LEVEL || 'info',
});

export default logger;
