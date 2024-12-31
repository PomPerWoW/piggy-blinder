import pino, { Logger as PinoLogger, LoggerOptions } from 'pino';

class Logger {
  private logger: PinoLogger;

  constructor(serviceName: string, options?: LoggerOptions) {
    this.logger = pino({
      name: serviceName,
      level: options?.level || 'info',
      ...options,
    });
  }

  info(message: string, meta?: Record<string, unknown>) {
    this.logger.info(meta || {}, message);
  }

  warn(message: string, meta?: Record<string, unknown>) {
    this.logger.warn(meta || {}, message);
  }

  error(message: string, meta?: Record<string, unknown>) {
    this.logger.error(meta || {}, message);
  }

  debug(message: string, meta?: Record<string, unknown>) {
    this.logger.debug(meta || {}, message);
  }
}

export default Logger;
