import { Prisma } from '@prisma/client';

const PrismaRecordNotFoundErrorCode = 'P2025';

const isPrismaRecordNotFoundError = (error: Error): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === PrismaRecordNotFoundErrorCode;
};

const isPrismaForeignKeyConstraintFailedError = (error: Error): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003';
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
