import dotenv from 'dotenv'
dotenv.config();
import app from "./src/app";
import connectDB from './src/config/db';
import InterviewReport from './src/services/ai.service';
connectDB()

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server (port : ${port}) working successfully!`)
})