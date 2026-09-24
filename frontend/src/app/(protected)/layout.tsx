"use client";

import useAuth from "@/src/hooks/auth.hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Header from "./components/Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate.replace("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="bg-[#1c1c1c] w-full min-h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  // ✅ User nahi — kuch mat dikhao (redirect ho raha hai)
  if (!user) return null;

  // ✅ User hai — content dikhao
  return (
    <div className="bg-[#1c1c1c] w-full flex flex-col overflow-hidden min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
}