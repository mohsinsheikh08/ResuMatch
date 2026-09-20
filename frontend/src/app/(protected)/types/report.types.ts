import React, { ComponentType, ReactNode } from "react";

export interface UserData {
  file: File | null;
  jobDescription: string;
  selfDescription: string;
}

export interface TechnicalQuestion {
  question: string;
  intention: string;
  answer: string;
}

export interface BehavioralQuestion {
  question: string;
  intention: string;
  answer: string;
}

export interface SkillGap {
  skill: string;
  severity: "low" | "medium" | "high";
}

export interface PreparationPlan {
  day: number;
  focus: string;
  tasks: string[];
}

export interface UserReport extends UserData {
  _id: string;
  user: string;
  title: string;
  matchScore: number;
  technicalQuestions: TechnicalQuestion[];
  behavioralQuestions: BehavioralQuestion[];
  skillGaps: SkillGap[];
  preparationPlan: PreparationPlan[];
  createdAt: string;
  updatedAt: string;
}

export interface ReportStructure {
  report: UserReport | null;
  setReport: React.Dispatch<React.SetStateAction<UserReport | null>>;
  error?: string;
  ReportGenerator: (data: UserData) => Promise<void>;
  AllReports: () => Promise<void>;
  submitting: boolean;
  allReports: ReportListItem[] | null;
  setAllReports: React.Dispatch<React.SetStateAction<ReportListItem[] | null>>;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
  isSidebarOpen: boolean | null;
  isHistoryOpen: boolean;
  setIsHistoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userReportById: UserReport | null;
  setUserReportById: React.Dispatch<React.SetStateAction<UserReport | null>>;
  UserInterviewReport: (id: string) => Promise<void>;
  infoSections: number | null;
  setInfoSections: React.Dispatch<React.SetStateAction<number | null>>;
  EditReport: (id: string, title: string) => Promise<void>;
  DeleteReport: (id: string) => Promise<void>;
  loading: boolean
}

export interface ReportProviderProps {
  children: ReactNode;
}

export interface ReportListItem {
  _id: string;
  matchScore: number;
  title: string;
  createdAt: string;
}

export interface AnalysisReportStructure {
  name: string;
}

export interface DeleteReportResponse {
  message: string;
  id: string;
}