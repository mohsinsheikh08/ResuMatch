import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const uri = process.env.MOGNODB;
  if (!uri) {
    throw new Error("MOGNODB_URI environment variable is not set");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(uri, {
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
};

export default connectDB; 