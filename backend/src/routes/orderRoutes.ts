import express from 'express';

import protect from '../middleware/authMiddleware';
import {
  addOrderItems,
  getActiveUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderPaymentStatus,
} from '../controllers/orderController';

const router = express.Router();

router.route('/myorders').get(protect, getActiveUserOrders); // must come before '/:id'
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderPaymentStatus);
router.route('/').get(protect, getAllOrders).post(protect, addOrderItems);

export default router;
