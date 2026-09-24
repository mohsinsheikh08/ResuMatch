"use client";

import { createContext, useState, useCallback, ReactNode, useEffect } from "react";
import {
  ReportStructure,
  UserReport,
  UserData,
  ReportListItem,
} from "../types/report.types";
import { reportService } from "../service/report.service";
import axios from "axios";

export const reportContext = createContext<ReportStructure | undefined>(
  undefined,
);

const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [report, setReport] = useState<UserReport | null>(null);
  const [allReports, setAllReports] = useState<ReportListItem[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [userReportById, setUserReportById] = useState<UserReport | null>(null);
  const [infoSections, setInfoSections] = useState<number | null>(0);
  const [loading, setLoading] = useState(true)
useEffect(() => {
  console.log(submitting)
}, [submitting])

  const ReportGenerator = async (data: UserData) => {
    setError(undefined);
    try {
      setSubmitting(true);
      const result = await reportService.createReport(data);
      setReport(result);
      alert("Report generated successfully!");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || "Something went wrong");
        console.log(err);
        alert("Report generating failed!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const AllReports = useCallback(async () => {
    try {
      setLoading(false)
      const result = await reportService.allReports();
      setAllReports(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message);
      }
    }finally{
      setLoading(true)
    }
  }, []);

  const UserInterviewReport = async (id: string) => {
    try {
      setLoading(false)
      const result = await reportService.userInterviewReport(id);
      setUserReportById(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message);
      }
    }finally {
      setLoading(true)
    }
  };

  const EditReport = async (id: string, title: string) => {
    try {
     await reportService.editReport(
      id,
      title
     )
     
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message);
      }
      throw err;
    }
  };

  const DeleteReport = async (id: string) => {
    try {
      await reportService.deleteReport(id);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message);
      }
      throw err;
    }
  };

  const value: ReportStructure = {
    report,
    setReport,
    error,
    ReportGenerator,
    submitting,
    AllReports,
    allReports,
    setAllReports,
    setIsSidebarOpen,
    isSidebarOpen,
    isHistoryOpen,
    setIsHistoryOpen,
    userReportById,
    setUserReportById,
    UserInterviewReport,
    infoSections,
    setInfoSections,
    EditReport,
    DeleteReport,
    loading
  };

  return (
    <reportContext.Provider value={value}>{children}</reportContext.Provider>
  );
};

export default ReportProvider;