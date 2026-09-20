import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MOGNODB!, {
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    .then((res) => {
      console.log("Mongodb connected successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
