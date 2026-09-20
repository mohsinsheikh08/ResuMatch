"use client"
import LoginPage from "@/src/components/LoginPage"
import Link from "next/link"
const LoginRouter = () => {
 return (
    <div className='bg-[#1c1c1c] w-full flex justify-center items-center  h-screen'>
        <div className=' h-[90%] mx-10 w-100 px-4  flex justify-center  flex-col   py-3 '>
         <h1 className='text-2xl font-semibold justify-center flex  text-[#FF7F00]'>Create Your Account</h1>
         <LoginPage />
       <Link href='/register'> <p className="text-white flex justify-center gap-1">If you do not have account! <span className="text-[#FF7F00] underline cursor-pointer">Register</span></p></Link>
        </div>  
    </div>
  )
}

export default LoginRouter