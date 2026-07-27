"use client";

import Link from "next/link";
import { ArrowLeft, FileSearch } from "lucide-react";
import { BottomNav, Card, PhoneShell } from "@/components/AppChrome";
import { useLearningProgress } from "@/lib/progress";

export function MistakeReview() {
  const { progress } = useLearningProgress();
  const mistakes = progress.mistakes ?? [];

  return (
    <PhoneShell>
      <div className="flex-1 overflow-y-auto bg-white px-5 pb-8">
        <header className="grid grid-cols-[40px_1fr_40px] items-center pt-5">
          <Link href="/weekly" className="text-slate-600">
            <ArrowLeft className="h-7 w-7" />
          </Link>
          <h1 className="text-center text-xl font-black">错题复习</h1>
          <FileSearch className="h-7 w-7 text-[#ff624f]" />
        </header>

        <Card className="mt-8 bg-[#fff7f4] p-5">
          <p className="text-sm font-bold text-[#ff624f]">错题记录</p>
          <h2 className="mt-1 text-2xl font-black">{mistakes.length} 道待复习</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            来自你提交过的场景测验，复习时重点看误选原因和正确表达。
          </p>
        </Card>

        <section className="mt-6">
          <h2 className="text-xl font-black">全部错题</h2>
          <div className="mt-4 space-y-3">
            {mistakes.length === 0 && <Empty text="还没有错题，完成测验后会自动记录在这里" />}
            {mistakes.map((item, index) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black text-[#ff624f]">{item.source}</p>
                    <h3 className="mt-2 font-black leading-7">{index + 1}. {item.question}</h3>
                    {item.userAnswer && <p className="mt-3 text-sm font-bold text-slate-400">你的答案：{item.userAnswer}</p>}
                    <p className="mt-1 text-sm font-bold text-[#06999a]">正确答案：{item.answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <BottomNav active="review" />
    </PhoneShell>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="rounded-2xl bg-slate-50 p-5 text-center text-sm font-bold text-slate-400">{text}</div>;
}
