import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type IdRouteParam = { id: string };

const isInArray = <T, A extends T>(item: T, array: ReadonlyArray<A>): item is A => array.includes(item as A);

const PrismaRecordNotFoundErrorCode = 'P2025';

const isPrismaRecordNotFoundError = (error: Error): error is PrismaClientKnownRequestError => {
  return error instanceof PrismaClientKnownRequestError && error.code === PrismaRecordNotFoundErrorCode;
};

const isPrismaForeignKeyConstraintFailedError = (error: Error): error is PrismaClientKnownRequestError => {
  return error instanceof PrismaClientKnownRequestError && error.code === 'P2003';
};

export { isInArray, isPrismaRecordNotFoundError, isPrismaForeignKeyConstraintFailedError };
export type { IdRouteParam };
