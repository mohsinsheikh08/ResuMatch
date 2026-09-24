"use client";

import useAuth from "@/src/hooks/auth.hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";

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
     <Loader />
      </div>
    );
  }

  if (!user) return null;
  return (
    <div className="bg-[#1c1c1c] w-full flex flex-col overflow-hidden min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
}