import { AppError, HttpCode } from '../exceptions/AppError';

const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;

export const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new AppError({
      description: 'Incorrect or missing value.',
      httpCode: HttpCode.BAD_REQUEST,
    });
  }

  return str;
};

const isObject = (param: unknown): param is object => typeof param === 'object';

export const parseObject = (object: unknown): object => {
  if (!object || !isObject(object)) {
    throw new AppError({
      description: 'Incorrect or missing data.',
      httpCode: HttpCode.BAD_REQUEST,
    });
  }

  return object;
};
