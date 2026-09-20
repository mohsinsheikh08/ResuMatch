"use client";

import { Upload, FileText } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import useReport from "@/src/app/(protected)/hooks/report.hook";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

const InfoPage = () => {
  const navigate = useRouter()
  const { submitting, ReportGenerator } = useReport();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [selfDescription, setSelfDescription] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobDescription.trim() || !selfDescription.trim()) {
      alert("Please fill in job description and self description!.");
      return;
    }

    try {
      await ReportGenerator({ file, jobDescription, selfDescription });
      setFile(null);
      setJobDescription("");
      setSelfDescription("");
      navigate.push('/')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
        alert(err.response?.data?.Error);
      }
    }
  };
    if(submitting){
     return <Loader />
  }

  return (
    <form
      onSubmit={(e) => {
        submitHandler(e);
      }}
      className="w-full px-5 h-full sm:flex sm:justify-center"
      action=""
    >
      
      <div className="h-full w-full lg:w-1/3 px-2 pt-3">
      
        <div className="w-full">
          {file ? (
            <label
              className="cursor-pointer flex justify-center text-[#FF7F00] transition-all duration-300 ease-in-out hover:text-white hover:bg-[#FF7F00] bg-white gap-2 py-2 rounded-md"
              htmlFor="resume-upload"
            >
              <FileText size={20} />
              <span className="text-sm truncate font-semibold">
                {file.name}
              </span>
            </label>
          ) : (
            <label
              className="cursor-pointer flex justify-center text-[#FF7F00] transition-all duration-300 ease-in-out hover:text-white hover:bg-[#FF7F00] bg-white gap-2 py-2 rounded-md"
              htmlFor="resume-upload"
            >
              <Upload className="" />
              <p className="font-semibold">Upload Resume</p>
            </label>
          )}
          <input
            onChange={(e) => {
              setFile(e?.target?.files?.[0] || null);
            }}
            id="resume-upload"
            type="file"
            accept="application/pdf"
            className="hidden"
          />
        </div>
        <div className="pt-3 flex flex-col justify-center gap-3">
          <p className="text-white text-lg font-semibold">
            Job Description <span className="text-[#FF7F00]">*</span>
          </p>
          <textarea
            onChange={(e) => {
              setJobDescription(e?.target?.value);
            }}
            value={jobDescription}
            name="jobDescription"
            placeholder="Write Job Description!"
            className="bg-white leading-6 font-[550] px-2 py-2 outline-none rounded-md w-full max-h-70 min-h-70"
            id="job-description"
          />
        </div>
      </div>
      <div className="px-2 h-full lg:w-1/3 w-full">
        <div className="pt-3 flex flex-col justify-center gap-3">
          <p className="text-white text-lg font-semibold">
            Self Description <span className="text-[#FF7F00]">*</span>
          </p>
          <textarea
            onChange={(e) => {
              setSelfDescription(e?.target?.value);
            }}
            value={selfDescription}
            name="selfDescription"
            placeholder="Write Self Description!"
            className="bg-white px-2 leading-6 font-[550] py-2 outline-none rounded-md w-full max-h-70 min-h-70"
            id="self-description"
          />
        </div>
        <div className="w-full pt-3">
          {submitting ? (
            <button className="cursor-pointer active:scale-105 font-semibold flex justify-center text-[#FF7F00] transition-all duration-300 ease-in-out hover:text-white hover:bg-[#FF7F00] bg-white w-full gap-2 py-2 rounded-md">
              Analysing....
            </button>
          ) : (
            <button className="cursor-pointer active:scale-105 font-semibold flex justify-center text-[#FF7F00] transition-all duration-300 ease-in-out hover:text-white hover:bg-[#FF7F00] bg-white w-full gap-2 py-2 rounded-md">
              Analyze Resume
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default InfoPage;
