import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Builder - Create Professional Resumes",
  description: "Build professional resumes in minutes with our easy-to-use resume builder. Multiple templates, PDF export, and more.",
  keywords: ["resume builder", "CV builder", "professional resume", "job application", "career", "Next.js", "TypeScript"],
  authors: [{ name: "Resume Builder Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Resume Builder - Create Professional Resumes",
    description: "Build professional resumes in minutes with our easy-to-use resume builder",
    url: "https://resume-builder.com",
    siteName: "Resume Builder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Builder - Create Professional Resumes",
    description: "Build professional resumes in minutes with our easy-to-use resume builder",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
