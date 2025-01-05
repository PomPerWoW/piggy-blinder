import http, { Server as HttpServer } from 'http';

import express, { Express } from 'express';
import Logger from '@piggy/core/logging/logger';
import { errorHandler, notFoundHandler } from '@piggy/presentation/middlewares/errors.middleware';
import { prisma } from '@piggy/infrastructure/adapters/prisma.client';
import { healthRoutes } from '@piggy/presentation/routes/health.route';
import { shutdownTestRoutes } from '@piggy/presentation/routes/shutdown-test.route';

export class Server {
	private readonly app: Express;
	private readonly server: HttpServer;
	private readonly logger: Logger;
	private readonly port: string | number;

	constructor(port: string | number) {
		this.app = express();
		this.server = http.createServer(this.app);
		this.logger = new Logger('Server');
		this.port = port;

		this.setupMiddlewares();
		this.setupRoutes();
		this.setupErrorHandling();
		this.setupShutdownHandlers();
	}

	private setupMiddlewares(): void {
		this.app.use(express.json());
	}

	private setupRoutes(): void {
		this.app.use('/api/v1', healthRoutes);
		this.app.use('/api/v1/shutdown-test', shutdownTestRoutes);
	}

	private setupErrorHandling(): void {
		this.app.all('*', notFoundHandler);
		this.app.use(errorHandler);
	}

	private setupShutdownHandlers(): void {
		process.on('SIGTERM', () => this.gracefulShutdown('SIGTERM'));
		process.on('SIGINT', () => this.gracefulShutdown('SIGINT'));

		process.on('uncaughtException', (error) => {
			this.logger.error('Uncaught Exception:', { error });
			this.gracefulShutdown('uncaughtException');
		});

		process.on('unhandledRejection', (reason, promise) => {
			this.logger.error('Unhandled Rejection:', { reason, promise });
			this.gracefulShutdown('unhandledRejection');
		});
	}

	private async gracefulShutdown(signal: string): Promise<void> {
		this.logger.info(`Received ${signal}. Starting graceful shutdown...`);

		try {
			await this.closeHttpServer();
			await this.closeDbConnection();

			this.logger.info('Graceful shutdown completed');
			process.exit(0);
		} catch (error) {
			this.logger.error('Error during graceful shutdown:', { error });
			process.exit(1);
		}
	}

	private async closeHttpServer(): Promise<void> {
		if (!this.server) return;

		await new Promise<void>((resolve, reject) => {
			this.server.close((err) => {
				if (err) {
					this.logger.error('Error closing HTTP server:', { error: err });
					reject(err);
					return;
				}
				this.logger.info('HTTP server closed successfully');
				resolve();
			});
		});
	}

	private async closeDbConnection(): Promise<void> {
		await prisma.$disconnect();
		this.logger.info('Database connections closed successfully');
	}

	public start(): void {
		this.server.listen(this.port, () => {
			this.logger.info(`Piggy server running on port ${this.port}`);
		});
	}
}
