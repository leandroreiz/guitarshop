import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleware';

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 8000;
const environment = process.env.NODE_ENV;

// --------------------------------------
// Routes
// --------------------------------------
app.use('/api/v1/products', productRoutes);

// --------------------------------------
// Middlewares
// --------------------------------------
app.use(notFound);
app.use(errorHandler);

// --------------------------------------
// Server start
// --------------------------------------
app.listen(port, () =>
  console.log(`Server running in ${environment} mode on port ${port}`)
);
