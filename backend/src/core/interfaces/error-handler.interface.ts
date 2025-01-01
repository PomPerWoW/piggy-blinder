import { StatusCodes } from 'http-status-codes';

export interface IError {
  statusCode: number;
  status: string;
  comingFrom: string;
  message: string;
}

export interface IErrorResponse {
  statusCode: number;
  status: string;
  comingFrom: string;
  message: string;
  serializeErrors(): IError;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;
  comingFrom: string;

  constructor(message: string, comingFrom: string) {
    super(message);
    this.comingFrom = comingFrom;
  }

  serializeErrors(): IError {
    return {
      statusCode: this.statusCode,
      status: this.status,
      comingFrom: this.comingFrom,
      message: this.message,
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  status = 'BAD_REQUEST';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = 'NOT_FOUND';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}
