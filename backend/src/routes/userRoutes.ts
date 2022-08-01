import express from 'express';
import { authUser, getUsers } from '../controllers/userController';

const router = express.Router();

router.route('/').get(getUsers);
router.route('/login').post(authUser);

export default router;
