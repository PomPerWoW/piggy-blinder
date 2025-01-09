import { BadRequestError } from '@piggy/core/interfaces/error-handler.interface';
import Logger from '@piggy/core/logging/logger';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class HealthController {
	private _logger: Logger = new Logger('HealthController');

	public get = (_req: Request, res: Response): void => {
		this._logger.info('GET: health');
		res.status(StatusCodes.OK).send('Piggy server is healthy and OK.');
	};

	public error = (): void => {
		this._logger.warn('GET: health error');
		throw new BadRequestError('Throw Error', 'HealthController');
	};
}
