import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleware';

// Config and variables
dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8000;
const environment = process.env.NODE_ENV;

// Body parser
app.use(express.json());

// Routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);

// Middlewares
app.use(notFound);
app.use(errorHandler);

// Server initialization
app.listen(port, () =>
  console.log(`Server running in ${environment} mode on port ${port}`)
);
