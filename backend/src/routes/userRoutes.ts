import express from 'express';
import {
  authUser,
  getUsers,
  getUserProfile,
} from '../controllers/userController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
