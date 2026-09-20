import mongoose from "mongoose";


const connectDB =  async () => {
  await mongoose.connect(process.env.MOGNODB!)
  .then(res => {
    console.log("Mongodb connected successfully!")
  })
  .catch(err => {
    console.log(err)
  })
}

export default connectDB