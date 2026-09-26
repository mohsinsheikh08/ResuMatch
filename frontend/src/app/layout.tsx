import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "../contexts/AuthProvider";
import ReportProvider from "./(protected)/context/ReportProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResuMatch — AI Resume Analyzer",
  description: "Match your resume to any job in seconds with AI",
  icons: {
   icon: [
      { url: "/icon.png", type: "image/png", sizes: "any" },
    ],
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ReportProvider>
            {children}
          </ReportProvider>
          </AuthProvider> 
      </body>
    </html>
  );
}
