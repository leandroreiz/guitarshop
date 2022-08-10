import express from 'express';

import protect from '../middleware/authMiddleware';
import { addOrderItems } from '../controllers/orderController';

const router = express.Router();

router.route('/').post(protect, addOrderItems);

export default router;
