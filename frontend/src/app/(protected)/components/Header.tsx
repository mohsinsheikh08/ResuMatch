"use client";
import { createPortal } from "react-dom";
import {
  Logs,
  PanelRightClose,
  LogOut,
  EllipsisVertical,
  X,
  Sparkles,
} from "lucide-react";
import { RotateCcwClock } from "lucide-react";
import Image from "next/image";
import ResuMatch from "@/src/images/ResuMatch.png";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import useReport from "@/src/app/(protected)/hooks/report.hook";
import { AnalysisReportStructure } from "../types/report.types";
import Circle from "@/src/app/(protected)/components/Circle";
import useAuth from "@/src/hooks/auth.hooks";
import { useParams, useRouter } from "next/navigation";
import { title } from "process";
import axios from "axios";
const Header = () => {
  const params = useParams();
  const id = params?.id as string;
  const navigate = useRouter();
  const [resume, setResume] = useState<string>("");

  const {
    setIsSidebarOpen,
    isSidebarOpen,
    allReports,
    AllReports,
    setIsHistoryOpen,
    isHistoryOpen,
    UserInterviewReport,
    userReportById,
    setInfoSections,
    infoSections,
    EditReport,
    DeleteReport,
  } = useReport();
  const { logout } = useAuth();

  useEffect(() => {
    AllReports();
  }, [AllReports]);
  const [menu, setMenu] = useState<{
    top: number;
    left: number;
    id: string;
  } | null>(null);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const Structure: AnalysisReportStructure[] = [
    {
      name: "Technical Questions",
    },
    {
      name: "Behavioral Questions",
    },
    {
      name: "Skill Gaps",
    },
    {
      name: "Preparation Plan",
    },
  ];

  useEffect(() => {
    console.log("userReportById:", userReportById);
  }, [userReportById]);

  const percentage =
    typeof userReportById?.matchScore === "number"
      ? userReportById?.matchScore
      : 0;

  const filterResume = useMemo(() => {
    if (!resume.trim()) return allReports;
    return allReports?.filter((report) =>
      report.title.toLocaleLowerCase().includes(resume.toLocaleLowerCase()),
    );
  }, [allReports, resume]);

  const editReport = async () => {
    try {
      if (!menu?.id) {
        return;
      }
      await EditReport(menu.id, resume);
      setMenu(null);
      setIsInputOpen(false);
      await AllReports();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data.message);
      }
    }
  };

  const deleteReport = async () => {
    try {
      if (!menu?.id) {
        return;
      }
      console.log(menu.id);
      if (!confirm("Are you sure you want to delte this report")) return;
      await DeleteReport(menu.id);
      setMenu(null);
      alert("Report delted successfully!");
      await AllReports();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data.message);
      }
    }
  };
  return (
    <div className="flex justify-between w-full">
      <div className="">
        <div className="relative inline-block group">
          <button
            onClick={() => {
              setIsSidebarOpen(true);
              setIsHistoryOpen(false);
            }}
            className="  cursor-pointer text-white p-2 hover:bg-[#1A1D24] active:bg-[#1A1D24] rounded-md transition"
          >
            <Logs size={25} />
          </button>
          <p className="text-white group-hover:opacity-100 opacity-0 absolute top-10  transition-all text-white  bg-[#161616] text-sm transition-all duration-300 ease-in-out cursor-pointer font-semibold  px-3 py-1 rounded-lg  duration-300 ease-in-out left-2">
            Sidebar
          </p>
        </div>
        <aside
          className={`fixed  px-2 pt-2 left-0 top-0 h-screen w-70 bg-[#0A0D12] border-r border-[#2A2E37] z-20 transition-transform duration-150 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <section className="flex pt-1 justify-between items-center">
            <Image
              width={200}
              height={200}
              className="w-30"
              src={ResuMatch}
              alt=""
            ></Image>

            <div className="">
              <button
                onClick={() => {
                  setIsSidebarOpen(false);
                }}
                className="text-white cursor-pointer   px-2 py-2 hover:bg-[#1A1D24] active:bg-[#1A1D24]  rounded-md transition"
              >
                <PanelRightClose size={25} />
              </button>
            </div>
          </section>

          <section className=" w-full  mt-3">
            <Link href="/dashboard">
              <button
                onClick={() => {
                  setIsSidebarOpen(false);
                }}
                className="w-full py-2 flex transition-all duration-300 ease-in-out cursor-pointer active:text-white active:bg-[#FF7F00] hover:text-white hover:bg-[#FF7F00] text-[#FF7F00] justify-center items-center gap-3 rounded-full font-semibold   bg-white"
              >
                {" "}
                <Sparkles size={20} /> Analyse Resume
              </button>
            </Link>
            <h1 className="text-white  pt-3 text-lg font-semibold tracking-wide ">
              Analysis Report
            </h1>
            <section className=" w-full min-h-screen flex  flex-col gap-4 py-3">
              {Structure.map((btn, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setInfoSections(idx);
                      setIsSidebarOpen(false);
                    }}
                    className="text-white hover:text-[#FF7F00]  active:text-[#FF7F00] active:bg-[#252525] hover:bg-[#252525] bg-[#161616] text-sm transition-all duration-300 ease-in-out cursor-pointer font-semibold w-full py-2 rounded-lg"
                  >
                    {btn.name}
                  </button>
                );
              })}
              <div className="flex justify-center pt-3 ">
                <Circle percentage={percentage} />
              </div>
              <p className="text-white font-semibold tracking-wide text-center">
                Match Score
              </p>
            </section>
          </section>
        </aside>
      </div>
      <div className="min-h-creen w-full">
        <nav className="text-white h-10 flex items-center">
          <div
            className="text-sm w-60 min-[475px]:w-full pl-3 font-semibold truncate"
            title={userReportById?.title}
          >
            {userReportById?.title}
          </div>
        </nav>
      </div>
      <div className="relative inline-block group">
        <button
          onClick={async () => {
            await logout();
            navigate.replace("/login");
          }}
          className="text-white p-2 hover:text-red-500 hover:bg-red-500/50 rounded-lg transition"
          title="Logout"
        >
          <LogOut className="cursor-pointer" size={20} />
        </button>
        <p className="text-white group-hover:opacity-100 opacity-0 absolute top-10  transition-all text-white  bg-[#161616] text-sm transition-all duration-300 ease-in-out cursor-pointer font-semibold  px-3 py-1 rounded-lg  duration-300 ease-in-out right-0">
          Logout
        </p>
      </div>
      <div className=" relative h-full">
        <button
          onClick={() => {
            setIsHistoryOpen(!isHistoryOpen);
          }}
          className=" text-white p-2 hover:bg-[#1A1D24] active:bg-[#1A1D24] rounded-lg transition "
        >
          {!isHistoryOpen ? (
           <div className="group inlin-block relative">
             <RotateCcwClock className="cursor-pointer" size={25} />
              <p className="text-white group-hover:opacity-100 opacity-0 absolute top-8  transition-all text-white  bg-[#161616] text-sm transition-all duration-300 ease-in-out cursor-pointer font-semibold  px-3 py-1 rounded-lg  duration-300 ease-in-out right-0">
          History
        </p>
           </div>
          ) : (
           <div>
             <X className="cursor-pointer" size={25} />
           </div>
          )}
        </button>
        <div
        
          className={`fixed px-2 pt-2 right-7 scrollbar-none transition-all duration-300 overflow-y-auto z-10  top-8 h-70 w-70 bg-[#0A0D12] border border-[#2A2E37] rounded-lg  ${!isHistoryOpen ? "-translate-y-4 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"} `}
        >
          <div className="flex flex-col gap-3 z-[999] pt-1">
            <div className=" flex items-center w-full h-10">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setResume(e.target.value);
                }}
                className="bg-white w-full pl-2 rounded-md py-0.5 outline-none placeholder:font-semibold font-semibold"
                type="text"
                placeholder="Search your resume!"
              />
            </div>
            {filterResume?.map((report) => {
              
              return (
                <div onClick={() => {setIsHistoryOpen(false)}} key={report._id} className="relative flex z-10 w-full">
                  {isInputOpen ? (
                    ""
                  ) : (
                    <div className="flex">
                      <Link href={`/${report._id}`}>
                        <button
                          onClick={() => UserInterviewReport(report._id)}
                          className="text-white truncate  z-10 w-60   pl-2 active:bg-[#252525] active:text-[#FF7F00] hover:text-[#FF7F00] hover:bg-[#252525] bg-[#161616] text-sm transition-all duration-300 ease-in-out cursor-pointer font-semibold py-2 rounded-r-none rounded-lg text-left"
                        >
                          {report.title}
                        </button>
                      </Link>
                      <button
                        onClick={(e) => {
                          const r = e.currentTarget.getBoundingClientRect();
                          console.log(r);
                          setMenu({
                            top: r.bottom,
                            left: r.right - 60,
                            id: report._id,
                          });
                        }}
                        className="text-white w-8 h-9 p-2 rounded-md rounded-l-none bg-[#161616] hover:bg-[#252525] hover:text-[#FF7F00] transition-all duration-300 cursor-pointer"
                      >
                        <EllipsisVertical size={16} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {menu &&
            createPortal(
              <>
                <div
                  className="fixed inset-0 z-[9998]"
                  onClick={() => setMenu(null)}
                />
                <div
                  style={{ top: menu.top, left: menu.left }}
                  className=" text-white fixed z-[9999] "
                >
                  <button
                    onClick={() => {
                      deleteReport();
                    }}
                    className="text-white hover:text-red-500   p-2 active:text-red-500  active:bg-[#252525] hover:bg-[#252525] bg-[#161616] text-sm transition-all duration-300 ease-in-out cursor-pointer font-semibold w-full py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </>,
              document.body,
            )}
        </div>
      </div>
    </div>
  );
};

export default Header;
