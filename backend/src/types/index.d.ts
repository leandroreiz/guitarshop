import { IUser } from '../models/userModel';

export {};

declare global {
  namespace Express {
    interface Request {
      // @TODO check type
      user: any;
    }
  }
}
