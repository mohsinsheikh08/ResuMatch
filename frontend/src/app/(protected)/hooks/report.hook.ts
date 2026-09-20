"use client"
import { useContext } from "react";
import { reportContext } from "../context/ReportProvider";

const useReport = () => {
   const context = useContext(reportContext);
   if(!context){
    throw new Error("Report is not available!")
   }
   return context
}
export default useReport