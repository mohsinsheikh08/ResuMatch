"use client";

import Main from "../components/Main";
import useReport from "../hooks/report.hook";
const Home = () => {
  const { isSidebarOpen, setIsSidebarOpen, setIsHistoryOpen } = useReport();
  return (
    <div  className="bg-[#1c1c1c] w-full flex flex-col overflow-hidden   ">
      <main onClick={() => {setIsHistoryOpen(false)}} className="   w-full">
        <Main />
      </main>
      <div
        onClick={() => {
          setIsSidebarOpen(false);
        }}
        className={`fixed inset-0  ${isSidebarOpen ? "bg-black/40" : "hidden"}`}
      ></div>
    </div>
  );
};

export default Home;
