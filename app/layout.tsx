import type { Metadata } from "next";
import { RegisterServiceWorker } from "@/components/RegisterServiceWorker";
import "./globals.css";

export const metadata: Metadata = {
  title: "每日场景英语",
  description: "面向中国用户的旅行与工作场景英语学习 App",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "每日场景英语",
    statusBarStyle: "default"
  },
  formatDetection: {
    telephone: false
  },
  themeColor: "#06999a",
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
