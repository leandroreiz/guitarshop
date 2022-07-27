import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import products from './data/products';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 8000;
const environment = process.env.NODE_ENV;

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.get('/api/v1/products', (req, res) => {
  res.json(products);
});

app.get('/api/v1/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

app.listen(port, () =>
  console.log(`Server running in ${environment} mode on port ${port}`)
);
