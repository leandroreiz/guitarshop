import Product from '../models/productModel';
import asyncHandler from 'express-async-handler';

/**
 * Fetch all products
 * @route   GET /api/v1/products
 * @access  Public
 */
export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json(products);
});

/**
 * Fetch a single product by `id`
 * @route   GET /api/v1/products/:id
 * @access  Public
 */
export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});
