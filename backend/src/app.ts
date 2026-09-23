import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import InterviewReportRoutes from "./routes/interviewReport.routes";
import cors from "cors";

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/interview", InterviewReportRoutes);

export default app;