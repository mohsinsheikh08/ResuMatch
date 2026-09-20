import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
import InterviewReportRoutes from './routes/interviewReport.routes'
import cors from 'cors'
const app = express();
 app.use(express.json())
 app.use(cookieParser())
 app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
 }))
 app.use('/api/auth',authRoutes)
 app.use('/api/interview', InterviewReportRoutes)
export default app