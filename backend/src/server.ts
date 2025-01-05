import { Server } from 'http';

import express, { Express } from 'express';
import config from '@piggy/core/config/config';
import Logger from '@piggy/core/logging/logger';
import { healthRoutes } from '@piggy/presentation/routes/health.route';
import { errorHandler, notFoundHandler } from '@piggy/presentation/middlewares/errors.middleware';
import Prisma from '@piggy/infrastructure/adapters/prisma.client';

const PORT = config.SERVER_PORT;
const logger: Logger = new Logger('Server');
const prisma = Prisma.getInstance();

const app: Express = express();
let server: Server;

app.use(express.json());
app.use('/api/v1', healthRoutes);

app.all('*', notFoundHandler);
app.use(errorHandler);

async function gracefulShutdown(signal: string) {
	logger.info(`Received ${signal}. Starting graceful shutdown...`);

	try {
		// Close Express server first (stop accepting new requests)
		if (server) {
			await new Promise<void>((resolve, reject) => {
				server.close((err) => {
					if (err) {
						logger.error('Error closing HTTP server:', { error: err });
						reject(err);
					}
					logger.info('HTTP server closed successfully');
					resolve();
				});
			});
		}

		// Disconnect Prisma
		await prisma.$disconnect();
		logger.info('Database connections closed successfully');

		// Exit process
		process.exit(0);
	} catch (error) {
		logger.error('Error during graceful shutdown:', { error });
		process.exit(1);
	}
}

// Register shutdown handlers
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error) => {
	logger.error('Uncaught Exception:', { error });
	gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
	logger.error('Unhandled Rejection:', { reason, promise });
	gracefulShutdown('unhandledRejection');
});

// Start server
server = app.listen(PORT, () => {
	logger.info(`Piggy server running on port ${PORT}`);
});
