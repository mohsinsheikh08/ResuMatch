import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useReport from "@/src/app/(protected)/hooks/report.hook";
import { ChevronDown} from "lucide-react";

import Loader from "./Loader";
const Main = () => {
  const {
    infoSections,
    submitting,
    userReportById,
    UserInterviewReport,
    loading,

  } = useReport();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const params = useParams();

  const id = params?.slug?.[0] || params?.id;
  useEffect(() => {
    if (id && typeof id === "string") {
      UserInterviewReport(id);
    }
  }, [id]);
  if(submitting){
   return <div className="flex items-center justify-center h-screen">
    <Loader />
    </div>
  }
  // if (userReportById === null) {
    
  //   return (
  //     <div className="w-full flex flex-col gap-3 justify-center items-center h-screen">
  //       <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
  //         Analyse or choose your resume!
  //       </h1>
  //       <Link href="/dashboard">
  //         <button className="w-full py-2 px-8 flex transition-all duration-300 ease-in-out cursor-pointer active:text-white active:bg-[#FF7F00] hover:text-white hover:bg-[#FF7F00] text-[#FF7F00] justify-center items-center gap-3 rounded-full font-semibold   bg-white">
  //           {" "}
  //           <Sparkles size={20} /> Analyse Resume
  //         </button>
  //       </Link>
  //     </div>
  //   );
  // }
  if (infoSections === 0) {
      if(!loading){
     return  <div className="flex items-center justify-center h-screen">
    <Loader />
    </div>
  }
    return (
 <div>        
      <div className="flex flex-col gap-5 px-3">
     
        <h1 className="text-3xl font-bold px-1 text-white">
          Technical Questions
        </h1>
        {userReportById?.technicalQuestions.map((info, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              className="px-3  text-white hover:text-[#FF7F00]  active:text-[#FF7F00j] active:bg-[#252525] hover:bg-[#252525] bg-[#161616] text-sm transition-all duration-300 ease-in-out cursor-pointer font-semibold w-full py-2 rounded-lg"
              key={idx}
            >
              <div className="transition-all duration-300 ease-in-out">
                <p
                  onClick={() => {
                    setOpenIndex(idx);
                  }}
                  className="text-xs sm:text-sm pr-7 leading-6  transition-all duration-300 ease-in-out relative justify-between"
                >
                  <span> Question : </span>
                  {info.question}{" "}
                  <ChevronDown
                    className={`absolute duration-300 sm:top-0 transition-all ease-in-out top-2 right-0 ${isOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </p>
              </div>
              {isOpen && (
                <div className=" flex flex-col gap-3 pt-3 transition-all duration-300 ease-in-out">
                  <p
                    className={`${isOpen ? "" : "text-[#FF7F00]"} leading-6 text-xs sm:text-sm transition-all duration-300 ease-in-out`}
                  >
                    <span> Intention : </span>
                    {info.intention}
                  </p>
                  <p
                    className={`${isOpen ? "" : "text-[#FF7F00]"} leading-6 text-xs sm:text-sm transition-all duration-300 ease-in-out`}
                  >
                    <span> Answer : </span>
                    {info.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div></div>
    );
  }

  if (infoSections === 1) {
      if(!loading){
     return  <div className="flex items-center justify-center h-screen">
    <Loader />
    </div>
  }
    return (
      <div className="flex flex-col gap-5 px-3">
        <h1 className="text-3xl font-bold px-1 text-white">
          Behavioral Questions
        </h1>
        {userReportById?.behavioralQuestions.map((info, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              className="px-3  text-white hover:text-[#FF7F00]  active:text-[#FF7F00] active:bg-[#252525] hover:bg-[#252525] bg-[#161616] text-sm transition-all duration-300 ease-in-out cursor-pointer font-semibold w-full py-2 rounded-lg"
              key={idx}
            >
              <div className="transition-all duration-300 ease-in-out">
                <p
                  onClick={() => {
                    setOpenIndex(idx);
                  }}
                  className="text-xs sm:text-sm pr-7 leading-6  transition-all duration-300 ease-in-out relative justify-between"
                >
                  <span> Question : </span>
                  {info.question}{" "}
                  <ChevronDown
                    className={`absolute duration-300 sm:top-0 transition-all ease-in-out top-2 right-0 ${isOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </p>
              </div>
              {isOpen && (
                <div className=" flex flex-col gap-3 pt-3 transition-all duration-300 ease-in-out">
                  <p
                    className={`${isOpen ? "" : "text-[#FF7F00]"} leading-6 text-xs  sm:text-sm transition-all duration-300 ease-in-out`}
                  >
                    <span> Intention : </span>
                    {info.intention}
                  </p>
                  <p
                    className={`${isOpen ? "" : "text-[#FF7F00]"} leading-6 text-xs sm:text-sm transition-all duration-300 ease-in-out`}
                  >
                    <span> Answer : </span>
                    {info.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (infoSections === 2) {
      if(!loading){
     return  <div className="flex items-center justify-center h-screen">
    <Loader />
    </div>
  }
    return (
      <div className="flex flex-col gap-5 px-3">
        <h1 className="text-3xl font-bold px-1 text-white">Skill Gaps</h1>
        {userReportById?.skillGaps.map((info, idx) => {
          return (
            <div
              className="px-3 grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]  sm:text-md  text-white hover:text-[#FF7F00]  active:text-[#FF7F00] active:bg-[#252525] hover:bg-[#252525] bg-[#161616] text-sm transition-all duration-300  ease-in-out cursor-pointer font-semibold w-full py-2 rounded-lg"
              key={idx}
            >
              <p>{info.severity}</p>
              <p>{info.skill}</p>
            </div>
          );
        })}
      </div>
    );
  }

  if (infoSections === 3) {
      if(!loading){
     return  <div className="flex items-center justify-center h-screen">
    <Loader />
    </div>
  }
    return (
      <div className="flex flex-col gap-5 px-3">
        <h1 className="text-3xl font-bold px-1 text-white">Preperation Plan</h1>
        {userReportById?.preparationPlan.map((info, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              className="px-3  text-white hover:text-[#FF7F00]  active:text-[#FF7F00] active:bg-[#252525] hover:bg-[#252525] bg-[#161616] text-sm transition-all duration-300 ease-in-out cursor-pointer font-semibold w-full py-2 rounded-lg"
              key={idx}
            >
              <div className="transition-all duration-300 ease-in-out">
                <p
                  onClick={() => {
                    setOpenIndex(idx);
                  }}
                  className="text-xs sm:text-sm pr-7 leading-6  transition-all duration-300 ease-in-out relative justify-between"
                >
                  <span className="pr-1"> Day : </span>
                  {info.day}{" "}
                  <ChevronDown
                    className={`absolute duration-300 sm:top-0 transition-all ease-in-out top-2 right-0 ${isOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </p>
              </div>
              {isOpen && (
                <div className=" flex flex-col gap-3 pt-3 transition-all duration-300 ease-in-out">
                  <p
                    className={`${isOpen ? "" : "text-[#FF7F00]"} leading-6 gap-1 text-xs sm:text-sm transition-all duration-300 ease-in-out`}
                  >
                    <span> Focus : </span>
                    {info.focus}
                  </p>
                  <p
                    className={`${isOpen ? "" : "text-[#FF7F00]"} leading-6 gap-1 text-xs sm:text-sm transition-all duration-300 ease-in-out`}
                  >
                    <span> Task : </span>
                    {info.tasks}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if(!loading){
     return  <div className="flex items-center justify-center h-screen">
    <Loader />
    </div>
  }

  if(submitting){
    return <div className="flex items-center justify-center h-screen">
    <Loader />
    </div>
  }
  return null
};

export default Main;
