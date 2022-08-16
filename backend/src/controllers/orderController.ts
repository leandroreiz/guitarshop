import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Order from '../models/orderModel';

/**
 * Create new order
 * @route   POST /api/v1/orders
 * @access  Private
 */
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: req.user._id,
    });

    const createdOrder = await order.save();
    res.status(200).json(createdOrder);
  }
});

/**
 * Get all orders
 * @route   Get /api/v1/orders
 * @access  Private
 */
export const getAllOrders = asyncHandler(async (_, res) => {
  const order = await Order.find();

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('There are no orders to be fecthed!');
  }
});

/**
 * Get order by Id
 * @route   Get /api/v1/orders/:id
 * @access  Private
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

/**
 * Set an order payment status
 * @route   Get /api/v1/orders/:id/pay
 * @access  Private
 */
export const updateOrderPaymentStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = new Date(Date.now());
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

/**
 * Get logged in user orders
 * @route   Get /api/v1/orders/myorders
 * @access  Private
 */
export const getActiveUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});
