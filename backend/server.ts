import dotenv from 'dotenv'
dotenv.config();
import app from "./src/app";
import connectDB from './src/config/db';

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server (port : ${port}) working successfully!`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB, server not started:", err);
    process.exit(1);
  });