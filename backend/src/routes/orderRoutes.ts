import express from 'express';

import protect from '../middleware/authMiddleware';
import {
  addOrderItems,
  getAllOrders,
  getOrderById,
  updateOrderPaymentStatus,
} from '../controllers/orderController';

const router = express.Router();

router.route('/').get(protect, getAllOrders).post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderPaymentStatus);

export default router;
