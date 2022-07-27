import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}`);
    console.info(`Database Connected!`);
  } catch (err: unknown) {
    // source: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
    // @TODO Error Handler
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);

    console.error(`Failed to connect: ${message}`);
    process.exit(1);
  }
};

export default connectDB;
