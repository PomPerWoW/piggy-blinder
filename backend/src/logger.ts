import pino, { Logger } from 'pino';

const logger: Logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    ],
  },
});

export default logger;
