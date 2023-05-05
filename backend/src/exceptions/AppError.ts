// Place HTTP codes into an enum for easier usage
export enum HttpCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

type AppErrorArgs = {
  name?: string;
  httpCode: HttpCode;
  description: string;
  isOperational?: boolean;
};

export class AppError extends Error {
  public readonly name: string;

  public readonly httpCode: HttpCode;

  public readonly isOperational: boolean = true;

  constructor(args: AppErrorArgs) {
    // Call parent class with given description
    super(args.description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || 'Error';
    this.httpCode = args.httpCode;

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }

    Error.captureStackTrace(this);
  }
}
