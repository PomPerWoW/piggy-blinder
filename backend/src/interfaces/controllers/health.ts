import Logger from '@piggy/infrastructure/logging/Logger';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class HealthController {
  logger: Logger = new Logger('HealthController');

  public get = (_req: Request, res: Response): void => {
    this.logger.info('GET: health');
    res.status(StatusCodes.OK).send('Piggy server is healthy and OK.');
  };
}
