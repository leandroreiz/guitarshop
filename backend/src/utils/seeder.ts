import dotenv from 'dotenv';
import users from '../data/users';
import products from '../data/products';
import User from '../models/userModel';
import Product from '../models/productModel';
import Order from '../models/orderModel';
import connectDB from '../config/db';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear the DB before importing
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Create users' documents on DB
    const createdUsers = await User.insertMany(users);

    // Get the admin user
    const adminUser = createdUsers[0]._id;

    // Attach the admin to the products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Create products' documents
    await Product.insertMany(sampleProducts);

    console.log('Data successfully imported!');
    process.exit();
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    console.error(message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data successfully DELETED!');
    process.exit();
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    console.error(message);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
