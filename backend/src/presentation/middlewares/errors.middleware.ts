import {
  CustomError,
  IErrorResponse,
  NotFoundError,
} from '@piggy/core/interfaces/error-handler.interface';
import Logger from '@piggy/core/logging/logger';
import { Request, Response, NextFunction } from 'express';

const logger: Logger = new Logger('ErrorMiddleware');

export const notFoundHandler = (
  req: Request,
  _res: Response,
  _next: NextFunction
) => {
  throw new NotFoundError(
    `Can't find ${req.method}:${req.originalUrl} on this server!`,
    'Server'
  );
};

export const errorHandler = (
  error: IErrorResponse,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${error.comingFrom} ${error.message}.`);
  if (error instanceof CustomError) {
    res.status(error.statusCode).json(error.serializeErrors());
  }
  next();
};
