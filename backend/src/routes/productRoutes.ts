import express from 'express';
import Product from '../models/productModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json(products);
  })
);

// @desc    Fetch a single product
// @route   GET /api/v1/products/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found!' });
    }
  })
);

export default router;
