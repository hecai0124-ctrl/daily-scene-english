"use client";

import Link from "next/link";
import { ClipboardList, Home } from "lucide-react";

export function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#eef0f3] px-0 py-0 text-[#172033] sm:px-4 sm:py-6">
      <div className="mx-auto flex h-screen w-full max-w-[480px] flex-col overflow-hidden bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] sm:h-[900px] sm:rounded-[30px]">
        <div className="flex h-9 shrink-0 items-center justify-between px-7 pt-2 text-sm font-black text-[#111827]">
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-4 rounded-[3px] border border-[#111827]" />
            <span className="h-2.5 w-3 rounded-full bg-[#111827]" />
            <span className="h-2.5 w-5 rounded-[4px] border-2 border-[#111827]" />
          </span>
        </div>
        {children}
      </div>
    </main>
  );
}

export function BottomNav({ active }: { active: "home" | "study" | "review" }) {
  const items = [
    { key: "home", label: "首页", href: "/", icon: <Home className="h-6 w-6" /> },
    { key: "review", label: "复盘", href: "/weekly", icon: <ClipboardList className="h-6 w-6" /> }
  ] as const;

  return (
    <nav className="z-20 shrink-0 border-t border-slate-100 bg-white/95 px-6 pb-6 pt-3 backdrop-blur">
      <div className="grid grid-cols-2">
        {items.map((item) => {
          const selected = active === item.key;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs font-bold ${selected ? "text-[#06999a]" : "text-slate-400"}`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-[18px] border border-slate-100 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.08)] ${className}`}>
      {children}
    </section>
  );
}
