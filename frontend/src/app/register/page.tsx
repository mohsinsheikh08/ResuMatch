"use client"
import RegisterPage from "@/src/components/RegisterPage"
import Link from "next/link"
const RegisterRouter = () => {
  return (
    <div className='bg-[#1c1c1c] w-full flex  justify-center items-center h-screen'>
        <div className=' h-[90%] mx-10 w-100 px-4 flex flex-col justify-center  py-3 '>
         <h1 className='text-2xl font-semibold justify-center flex  text-[#FF7F00]'>Create Your Account</h1>
         <RegisterPage />

       <Link href='/login'> <p className="text-white flex justify-center gap-1">If you have already account! <span className="text-[#FF7F00] underline cursor-pointer">Login</span></p></Link>
        </div>  
    </div>
  )
}

export default RegisterRouter