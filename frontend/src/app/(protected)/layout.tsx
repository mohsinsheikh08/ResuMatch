"use client";
import useAuth from "@/src/hooks/auth.hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Header from "./components/Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useRouter();
  const { user, loading } = useAuth();
  useEffect(() => {
    console.log(user)
    if (!user  && !loading) {
      console.log("Redirecting to /login");
      navigate.replace("/login");
    }
  }, [user, navigate, loading]);
  return (
    <div className="bg-[#1c1c1c] w-full flex flex-col overflow-hidden  min-h-screen  ">
      <Header />
      <main>
        
        {children}
        </main>
    </div>
  );
}
