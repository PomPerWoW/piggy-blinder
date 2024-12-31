import pino, { Logger as PinoLogger, LoggerOptions } from 'pino';

class Logger {
  private static instance: Logger;
  private logger: PinoLogger;

  private constructor(serviceName: string, options?: LoggerOptions) {
    this.logger = pino({
      name: serviceName,
      level: options?.level || 'info',
      ...options,
    });
  }

  static initialize(serviceName: string, options?: LoggerOptions): void {
    Logger.instance = new Logger(serviceName, options);
  }

  static getInstance(serviceName: string, options?: LoggerOptions): Logger {
    if (!Logger.instance) {
      this.initialize(serviceName, options);
      console.log('This call once');
    }
    return Logger.instance;
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
