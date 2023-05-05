import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface Request {
      token?: string;
      user?: string | JwtPayload;
    }
  }
}
