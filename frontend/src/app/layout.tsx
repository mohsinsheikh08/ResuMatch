"use client";

import useAuth from "@/src/hooks/auth.hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Header from "./(protected)/components/Header";
import Loader from "./(protected)/components/Loader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;              // ✅ loading ke doran kuch mat karo
    if (!user) {
      navigate.replace("/login");
    }
  }, [user, loading, navigate]);

  // ✅ Loading ke doran kuch mat dikhao
  if (loading) {
    return (
      <div className="bg-[#1c1c1c] w-full min-h-screen flex items-center justify-center">
       <Loader />
      </div>
    );
  }

  // ✅ User nahi hai to kuch mat dikhao (redirect ho raha hai)
  if (!user) return null;

  // ✅ User hai to content dikhao
  return (
    <div className="bg-[#1c1c1c] w-full flex flex-col overflow-hidden min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
}