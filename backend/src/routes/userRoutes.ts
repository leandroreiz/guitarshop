import express from 'express';
import {
  login,
  getUsers,
  createUser,
  getUserProfile,
} from '../controllers/userController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/login').post(login);
router.route('/profile').get(protect, getUserProfile);

export default router;
