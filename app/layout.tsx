import type { Metadata } from "next";
import { RegisterServiceWorker } from "@/components/RegisterServiceWorker";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "每日场景英语",
  description: "面向中国用户的旅行与工作场景英语学习 App",
  manifest: `${basePath}/manifest.webmanifest`,
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
    icon: [
      { url: `${basePath}/icons/icon-192.png`, sizes: "192x192", type: "image/png" },
      { url: `${basePath}/icons/icon-512.png`, sizes: "512x512", type: "image/png" }
    ],
    apple: `${basePath}/icons/icon-192.png`
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
