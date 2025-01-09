import http, { Server as HttpServer } from 'http';

import express, { Express } from 'express';
import Logger from '@piggy/core/logging/logger';
import { errorHandler, notFoundHandler } from '@piggy/presentation/middlewares/errors.middleware';
import { healthRoutes } from '@piggy/presentation/routes/health.route';
import config from '@piggy/core/config/config';

export class Server {
	private readonly app: Express;
	private readonly server: HttpServer;
	private readonly logger: Logger;
	private readonly port: string | undefined;

	constructor(port: string | undefined) {
		this.app = express();
		this.server = http.createServer(this.app);
		this.logger = new Logger('Server');
		this.port = port;

		this.setupMiddlewares();
		this.setupRoutes();
		this.setupErrorHandlers();
		this.setupShutdownHandlers();
	}

	private setupMiddlewares(): void {
		this.app.use(express.json());
	}

	private setupRoutes(): void {
		this.app.use('/api/v1', healthRoutes);
	}

	private setupErrorHandlers(): void {
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
		this.logger.info('Graceful shutdown completed');
		process.exit(0);
	}

	public start(): void {
		this.server.listen(this.port, () => {
			this.logger.info(`Piggy server running on port ${this.port}`);
		});
	}
}

const server: Server = new Server(config.SERVER_PORT);
server.start();
