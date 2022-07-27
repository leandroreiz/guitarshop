import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 8000;
const environment = process.env.NODE_ENV;

app.get('/', (req, res) => {
  res.send('The API is listening for requests...');
});

app.use('/api/v1/products', productRoutes);

app.listen(port, () =>
  console.log(`Server running in ${environment} mode on port ${port}`)
);
