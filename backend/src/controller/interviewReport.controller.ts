import InterviewReportModel from "../models/InterviewReport.model";
import InterviewReport from "../services/ai.service";
import { PDFParse } from "pdf-parse";
import { Response, Request } from "express";

const InterviewReportCreate = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const file = req.file;
    let resume = "";
    if (file) {
      const parser = new PDFParse({ data: file.buffer });
      const resumeText = await parser.getText();
      resume = resumeText.text;
    }

    const { jobDescription, selfDescription } = req.body;
    if (!jobDescription || !selfDescription) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const aiReportGenerator = await InterviewReport(
      resume,
      selfDescription,
      jobDescription,
    );

    const savedReport = await InterviewReportModel.create({
      user: userId,
      resume,
      jobDescription,
      selfDescription,
      ...aiReportGenerator,
    });

    return res.status(201).json({
      message: "Report saved successfully!",
      Report: savedReport,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something is wrong!",
      Error: err instanceof Error ? err.message : "",
    });
  }
};

const GetOneInterviewReport = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Report ID required" });
    }

    const report = await InterviewReportModel.findOne({
      _id: id,
      user: userId,
    }).lean();

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).json({
      message: "Report fetched successfully!",
      report,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something is wrong!",
      Error: err instanceof Error ? err.message : "",
    });
  }
};

const AllInterviewReports = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const reports = await InterviewReportModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .select("title matchScore createdAt")
      .lean();

    return res.status(200).json({
      message: "All reports fetched successfully!",
      reports,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something is wrong!",
      Error: err instanceof Error ? err.message : "",
    });
  }
};

const editInterviewReport = async (req: Request, res: Response) => {
  const { title } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Report ID required" });
  }

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const editReport = await InterviewReportModel.findOneAndUpdate(
      { _id: id, user: userId },
      { title: title.trim() },
      { new: true, runValidators: true },
    );

    if (!editReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).json({
      message: "Report updated successfully",
      report: editReport,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteInterviewReport = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Report ID required" });
    }

    const deletedReport = await InterviewReportModel.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).json({
      message: "Report deleted successfully",
      id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export { InterviewReportCreate, GetOneInterviewReport, AllInterviewReports, deleteInterviewReport, editInterviewReport };
