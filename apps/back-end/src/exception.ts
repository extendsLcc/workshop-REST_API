import type { HttpStatus } from 'http-status';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const PrismaRecordNotFoundErrorCode = 'P2025';

const isPrismaRecordNotFoundError = (error: Error): error is PrismaClientKnownRequestError => {
  return error instanceof PrismaClientKnownRequestError && error.code === PrismaRecordNotFoundErrorCode;
};

const isPrismaForeignKeyConstraintFailedError = (error: Error): error is PrismaClientKnownRequestError => {
  return error instanceof PrismaClientKnownRequestError && error.code === 'P2003';
};

abstract class Exception extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Exception);
    }
  }
}

class ResourceNotFoundException extends Exception {}

export { Exception, ResourceNotFoundException, isPrismaRecordNotFoundError, isPrismaForeignKeyConstraintFailedError };
