import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}`);
    console.info(`Database Connected!`);
  } catch (error: unknown) {
    // source: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    console.error(`Failed to connect: ${message}`);
    process.exit(1);
  }
};

export default connectDB;
