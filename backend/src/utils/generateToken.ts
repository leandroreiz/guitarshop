import jwt from 'jsonwebtoken';

/**
 * Generate a Json Web Token (JWT)
 *  @param id   take user's `id` (type: string)
 */
const generateToken = (id: string) => {
  return jwt.sign({ id }, String(process.env.JWT_SECRET), {
    expiresIn: '30d',
  });
};

export default generateToken;
