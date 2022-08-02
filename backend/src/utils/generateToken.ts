import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

/**
 * Generates a Json Web Token (JWT)
 * @param _id  take user's `_id: string` as parameter
 * @return     returns a `string` with the JWT
 */
const generateToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export default generateToken;
