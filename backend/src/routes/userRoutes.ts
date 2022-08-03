import express from 'express';
import {
  login,
  getUsers,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getUsers).post(registerUser);
router.route('/login').post(login);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
