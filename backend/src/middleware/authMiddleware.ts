import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel';

/**
 * Middleware to protect routes using jwt
 */
const protect: RequestHandler = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      interface DecodedPayload extends JwtPayload {
        _id: string;
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as DecodedPayload;

      req.user = await User.findById(decoded._id).select('-password');
    } catch (error) {
      res.status(401);
      throw new Error('Invalid user credentials');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Invalid user credentials');
  }

  next();
});

export default protect;
