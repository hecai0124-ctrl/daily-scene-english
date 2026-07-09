"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, BookOpen, CalendarDays, Check, FileSearch, Headphones, Mic, Star } from "lucide-react";
import { BottomNav, Card, PhoneShell } from "@/components/AppChrome";
import { content } from "@/lib/content";
import { useLearningProgress } from "@/lib/progress";

const weeklyQuestions = [
  { skill: "听力", question: "听到 “Where is the nearest subway station?”，对方在问什么？", options: ["最近的地铁站在哪里", "最近的酒店在哪里", "哪里可以点餐", "哪里可以退货"], answer: "最近的地铁站在哪里" },
  { skill: "阅读", question: "“Please find the launch plan attached.” 适合用在哪类工作场景？", options: ["邮件发送附件", "机场登机", "餐厅结账", "酒店退房"], answer: "邮件发送附件" },
  { skill: "口语", question: "如果客户说商品损坏，你最适合先说哪一句？", options: ["We are sorry that the item arrived damaged.", "This is not my problem.", "You should wait.", "The product is expensive."], answer: "We are sorry that the item arrived damaged." }
];

export function WeeklyReview() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { progress, actions } = useLearningProgress();
  const score = weeklyQuestions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0);
  const scorePercent = Math.round((score / weeklyQuestions.length) * 100);

  function submit() {
    actions.saveWeeklyScore(scorePercent);
  }

  return (
    <PhoneShell>
      <div className="min-h-[calc(100vh-36px)] bg-white px-5 pb-1">
        <header className="grid grid-cols-[40px_1fr_40px] items-center pt-6">
          <Link href="/" className="text-slate-600">
            <ArrowLeft className="h-7 w-7" />
          </Link>
          <h1 className="text-center text-xl font-black">周测与复盘</h1>
          <span />
        </header>

        <Card className="mt-8 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">本周学习总结</h2>
            <span className="text-sm font-bold text-slate-400">5.12 - 5.18</span>
          </div>
          <div className="mt-6 space-y-6">
            <ScoreRow icon={<Headphones className="h-7 w-7" />} color="#06999a" bg="bg-[#f4f2ff]" label="听力理解" value={85} />
            <ScoreRow icon={<BookOpen className="h-7 w-7" />} color="#ff624f" bg="bg-[#fff0ed]" label="阅读理解" value={78} />
            <ScoreRow icon={<Mic className="h-7 w-7" />} color="#173c76" bg="bg-[#eef4ff]" label="口读表达" value={72} />
          </div>
        </Card>

        <Card className="mt-5 bg-[#fff7f4] p-5">
          <div className="grid grid-cols-[1fr_90px] gap-4">
            <div>
              <h2 className="text-xl font-black">错题复习</h2>
              <p className="mt-2 text-sm font-semibold text-slate-500">共 12 道错题待复习</p>
              <p className="mt-2 text-sm font-semibold text-slate-500">涉及：词汇（5） 句子（4） 听力（3）</p>
              <button className="mt-5 rounded-lg bg-[#ff624f] px-8 py-3 text-base font-black text-white">开始复习</button>
            </div>
            <div className="relative">
              <div className="absolute right-0 top-6 h-24 w-20 rounded-2xl bg-slate-100" />
              <FileSearch className="absolute right-0 top-14 h-14 w-14 text-[#173c76]" />
            </div>
          </div>
        </Card>

        <Link href="/favorites">
          <Card className="mt-5 bg-[#fff9ed] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">收藏复习</h2>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  单词 {progress.favoriteWords.length} 个 · 句子 {progress.favoriteSentences.length} 句
                </p>
              </div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#f6b73c] shadow-sm">
                <Star className="h-8 w-8 fill-[#f6b73c]" />
              </span>
            </div>
          </Card>
        </Link>

        <Card className="mt-5 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">下周学习计划</h2>
            <span className="text-sm font-bold text-slate-400">5.19 - 5.25</span>
          </div>
          <div className="mt-5 space-y-4">
            <PlanRow icon={<BookOpen className="h-5 w-5" />} label="完成 5 个场景学习" value="0/5" />
            <PlanRow icon={<span className="text-sm font-black">Aa</span>} label="学习词汇 100 个" value="0/100" />
            <PlanRow icon={<Mic className="h-5 w-5" />} label="跟读练习 15 分钟" value="0/15min" />
            <PlanRow icon={<CalendarDays className="h-5 w-5" />} label="完成周测" value="0/1" />
          </div>
        </Card>

        {!started ? (
          <button onClick={() => setStarted(true)} className="mt-5 h-14 w-full rounded-xl bg-[#06999a] text-lg font-black text-white">
            开始本周抽查
          </button>
        ) : (
          <section className="mt-5 space-y-4">
            {weeklyQuestions.map((item, index) => (
              <Card key={item.question} className="p-4">
                <p className="text-xs font-black text-[#06999a]">{item.skill}</p>
                <h3 className="mt-2 font-black leading-7">{index + 1}. {item.question}</h3>
                <div className="mt-3 space-y-2">
                  {item.options.map((option) => {
                    const selected = answers[index] === option;
                    return (
                      <button
                        key={option}
                        onClick={() => setAnswers((current) => ({ ...current, [index]: option }))}
                        className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-bold ${
                          selected ? "bg-[#e9f7f7] text-[#06999a]" : "bg-slate-50 text-slate-600"
                        }`}
                      >
                        {option}
                        {selected && <Check className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
              </Card>
            ))}
            <button onClick={submit} className="h-14 w-full rounded-xl bg-[#06999a] text-lg font-black text-white">
              提交周测
            </button>
          </section>
        )}
      </div>
      <BottomNav active="review" />
    </PhoneShell>
  );
}

function ScoreRow({ icon, bg, color, label, value }: { icon: React.ReactNode; bg: string; color: string; label: string; value: number }) {
  return (
    <div className="grid grid-cols-[54px_1fr_64px] items-center gap-4">
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg}`} style={{ color }}>
        {icon}
      </span>
      <div>
        <p className="font-black">{label}</p>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
        </div>
      </div>
      <p className="text-right text-xl font-black" style={{ color }}>
        {value}<span className="text-sm text-slate-400"> /100</span>
      </p>
    </div>
  );
}

function PlanRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9f7f7] text-[#06999a]">{icon}</span>
      <span className="flex-1 font-bold text-slate-700">{label}</span>
      <span className="font-bold text-slate-400">{value}</span>
    </div>
  );
}
