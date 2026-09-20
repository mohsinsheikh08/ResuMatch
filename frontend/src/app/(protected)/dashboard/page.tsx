import React from 'react'
import {ArrowLeft} from 'lucide-react'
import InfoPage from '../components/InfoPage'
import Link from 'next/link'
const DashboardRouter = () => {
  return (
   <div className="bg-[#1c1c1c] absolute top-0 z-2 sm:p-0  pt-10 w-full min-h-screen  flex items-center justify-center">
    <Link href='/'><p className="text-white absolute top-5  hover:text-[#FF7F00]  active:text-[#FF7F00] active:bg-[#252525] hover:bg-[#252525] bg-[#161616] text-sm transition-all duration-300 ease-in-out cursor-pointer font-semibold px-3 py-2 rounded-lg left-5 sm:top-10 flex gap-1 sm:left-10" ><ArrowLeft /> Back to Home Page </p> </Link>
      <div className="w-full flex justify-center items-center min-h-screen">
        <InfoPage />
      </div>
    </div>
  )
}

export default DashboardRouter  