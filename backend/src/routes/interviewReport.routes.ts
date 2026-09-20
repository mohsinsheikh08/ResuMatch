import { Router } from "express";
import multer from "multer";
import { Request } from "express";
import {
  AllInterviewReports,
  GetOneInterviewReport,
  InterviewReportCreate,
  editInterviewReport,
  deleteInterviewReport
} from "../controller/interviewReport.controller";
import TokenChecker from "../middleware/auth.middleware"; 

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const allowedMimeTypes = [
      "application/pdf",
      "application/x-pdf",
      "application/octet-stream",
    ];
    const isPDF = file.originalname.toLowerCase().endsWith(".pdf");
    if (allowedMimeTypes.includes(file.mimetype) || isPDF) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

router.post("/", TokenChecker, upload.single("resume"), InterviewReportCreate);
router.get("/reports", TokenChecker, AllInterviewReports);
router.get("/:id", TokenChecker, GetOneInterviewReport);
router.patch("/report/:id", TokenChecker, editInterviewReport);
router.delete("/report/:id", TokenChecker, deleteInterviewReport);
export default router;