import api from "../lib/report.api";
import {
  UserData,
  UserReport,
  ReportListItem,
  DeleteReportResponse,
} from "../types/report.types";

const reportService = {
  createReport: async (data: UserData): Promise<UserReport> => {
    const formData = new FormData();
    if (data.file) {
      formData.append("resume", data.file);
    }
    formData.append("jobDescription", data.jobDescription);
    formData.append("selfDescription", data.selfDescription);

    const response = await api.post("/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.Report;
  },

  allReports: async (): Promise<ReportListItem[]> => {
    const response = await api.get("/reports");
    return response.data.reports;
  },

  userInterviewReport: async (id: string): Promise<UserReport> => {
    const response = await api.get(`/${id}`);
    return response.data.report;
  },

  editReport: async (id: string, title: string): Promise<UserReport> => {
    const response = await api.patch(`/report/${id}`, { title });
    return response.data.report;
  },

  deleteReport: async (id: string): Promise<DeleteReportResponse> => {
    const response = await api.delete(`/report/${id}`);
    return response.data;
  },
};

export { reportService };