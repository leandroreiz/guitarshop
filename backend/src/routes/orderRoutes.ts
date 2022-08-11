import express from 'express';

import protect from '../middleware/authMiddleware';
import {
  addOrderItems,
  getAllOrders,
  getOrderById,
} from '../controllers/orderController';

const router = express.Router();

router.route('/').get(protect, getAllOrders).post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

export default router;
