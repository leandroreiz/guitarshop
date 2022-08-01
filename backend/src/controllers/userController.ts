import asyncHandler from 'express-async-handler';
import User from '../models/userModel';

/**
 * Get all users
 * @route   GET /api/v1/users/
 * @access  Public
 * */
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

/**
 * Auth user & get token
 * @route   POST /api/v1/users/login
 * @access  Public
 */
export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});
