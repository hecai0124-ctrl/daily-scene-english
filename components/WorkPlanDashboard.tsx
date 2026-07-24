"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpenText, BriefcaseBusiness, CheckCircle2, ChevronLeft, ChevronRight, Headphones, Lock, Mic, PenLine, Plane, Volume2 } from "lucide-react";
import { BottomNav, Card, PhoneShell } from "@/components/AppChrome";
import { getWorkPlanDay, workPlanDays } from "@/lib/workPlan";
import { useLearningProgress } from "@/lib/progress";
import { speakEnglish } from "@/lib/speech";

const totalDays = workPlanDays.length;

export function WorkPlanDashboard() {
  const { progress, loaded, actions } = useLearningProgress();
  const [selectedDay, setSelectedDay] = useState(1);
  const [visibleMonth, setVisibleMonth] = useState(0);
  const completedPlanDays = getCompletedPlanDays(progress.checkedDays, progress.completedWorkPlanDays, totalDays);
  const completedStreak = getCheckInStreak(completedPlanDays, totalDays);
  const todayDay = Math.min(completedStreak + 1, totalDays);
  const day = getWorkPlanDay(selectedDay);
  const completed = completedPlanDays.includes(day.day);
  const locked = day.day > todayDay;
  const completedCount = completedPlanDays.length;
  const completionRate = Math.round((completedCount / totalDays) * 100);
  const visibleDays = workPlanDays.slice(visibleMonth * 30, visibleMonth * 30 + 30);

  useEffect(() => {
    if (loaded && !progress.workPlanStartDate) {
      actions.startWorkPlan(toDateKey(new Date()));
    }
  }, [actions, loaded, progress.workPlanStartDate]);

  useEffect(() => {
    setSelectedDay(todayDay);
    setVisibleMonth(Math.floor((todayDay - 1) / 30));
  }, [todayDay]);

  return (
    <PhoneShell>
      <div className="flex-1 overflow-y-auto bg-white px-5 pb-5">
        <header className="grid grid-cols-[40px_1fr_40px] items-center pt-5">
          <Link href="/" className="text-slate-600">
            <ArrowLeft className="h-7 w-7" />
          </Link>
          <h1 className="text-center text-xl font-black">每日学习任务</h1>
          <span />
        </header>

        <Card className="mt-5 overflow-hidden p-0">
          <div className="bg-[#173c76] p-5 text-white">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-white/70">旅行 + 工作英语</p>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black">Day {todayDay}</span>
            </div>
            <h2 className="mt-3 text-2xl font-black leading-tight">出国敢开口，工作能表达</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
              每天 30-40 分钟，旅行英语解决真实出行沟通，工作英语覆盖会议、邮件、汇报、协作和面试。
            </p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-[#27c0a6]" style={{ width: `${completionRate}%` }} />
            </div>
            <p className="mt-2 text-xs font-bold text-white/65">已完成 {completedCount}/{totalDays} 天</p>
          </div>
        </Card>

        <section className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSelectedDay((value) => Math.max(1, value - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500"
            aria-label="前一天"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <p className="text-xs font-black text-[#06999a]">第 {day.week} 周 · {day.level}</p>
            <h2 className="mt-1 text-lg font-black">Day {day.day}</h2>
          </div>
          <button
            type="button"
            onClick={() => setSelectedDay((value) => Math.min(todayDay, value + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 disabled:text-slate-300"
            disabled={selectedDay >= todayDay}
            aria-label="后一天"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </section>

        <Card className="mt-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black text-[#06999a]">{day.travelPhase} + {day.workPhase}</p>
              <h2 className="mt-1 text-xl font-black leading-7">{day.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                旅行：{day.travelSituation}；工作：{day.workSituation}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (!locked) {
                  actions.toggleCheckIn(day.day);
                }
              }}
              disabled={locked}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                completed ? "bg-[#06999a] text-white" : "bg-slate-100 text-slate-400"
              } disabled:text-slate-300`}
              aria-pressed={completed}
              title={locked ? "完成前一天后解锁" : "标记完成"}
            >
              {locked ? <Lock className="h-5 w-5" /> : <CheckCircle2 className="h-6 w-6" />}
            </button>
          </div>
        </Card>

        <TaskSection title="今日词汇" icon={<BookOpenText className="h-5 w-5" />}>
          <WordGroup title="旅行英语" words={day.travelVocabulary} color="teal" />
          <WordGroup title="工作英语" words={day.workVocabulary} color="navy" />
        </TaskSection>

        <TaskSection title="必会表达" icon={<Volume2 className="h-5 w-5" />}>
          <ExpressionGroup title="旅行表达" expressions={day.travelExpressions} />
          <ExpressionGroup title="工作表达" expressions={day.workExpressions} />
        </TaskSection>

        <div className="mt-4 grid gap-3">
          <MiniTask icon={<Headphones className="h-5 w-5" />} title="听力" text={day.listening} />
          <MiniTask icon={<Mic className="h-5 w-5" />} title="口语" text={day.speaking} />
          <MiniTask icon={<BookOpenText className="h-5 w-5" />} title="阅读" text={day.reading} />
          <MiniTask icon={<PenLine className="h-5 w-5" />} title="今日产出" text={day.output} />
        </div>

        <Card className="mt-4 bg-[#fff9ed] p-4">
          <p className="text-sm font-black text-[#b98512]">复盘问题</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{day.review}</p>
        </Card>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            href="/scenes/travel"
            className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#06999a] px-3 text-sm font-black text-white"
          >
            <Plane className="h-5 w-5" />
            旅行练习
          </Link>
          <Link
            href="/scenes/work"
            className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#173c76] px-3 text-sm font-black text-white"
          >
            <BriefcaseBusiness className="h-5 w-5" />
            工作练习
          </Link>
        </div>

        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">30 天任务预览</h2>
            <span className="text-xs font-bold text-slate-400">点击切换天数</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1">
            {[
              { label: "1-30 天", value: 0 },
              { label: "31-60 天", value: 1 },
              { label: "61-90 天", value: 2 }
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setVisibleMonth(item.value)}
                className={`h-9 rounded-xl text-xs font-black ${
                  visibleMonth === item.value ? "bg-white text-[#06999a] shadow-sm" : "text-slate-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {visibleDays.map((item) => {
              const itemDone = completedPlanDays.includes(item.day);
              const active = item.day === selectedDay;
              const itemLocked = item.day > todayDay;
              return (
                <button
                  key={item.day}
                  type="button"
                  onClick={() => {
                    if (!itemLocked) {
                      setSelectedDay(item.day);
                    }
                  }}
                  disabled={itemLocked}
                  className={`flex h-10 items-center justify-center rounded-xl text-xs font-black ${
                    active
                      ? "bg-[#173c76] text-white"
                      : itemDone
                        ? "bg-[#e9f7f7] text-[#06999a]"
                        : "bg-slate-50 text-slate-400"
                  } disabled:text-slate-300`}
                  title={itemLocked ? "完成前一天后解锁" : `Day ${item.day}`}
                >
                  {itemLocked ? <Lock className="h-3.5 w-3.5" /> : item.day}
                </button>
              );
            })}
          </div>
        </section>
      </div>
      <BottomNav active="study" />
    </PhoneShell>
  );
}

function TaskSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card className="mt-4 p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9f7f7] text-[#06999a]">{icon}</span>
        <h3 className="font-black">{title}</h3>
      </div>
      {children}
    </Card>
  );
}

function WordGroup({ title, words, color }: { title: string; words: string[]; color: "teal" | "navy" }) {
  return (
    <div className="mt-3 first:mt-0">
      <p className={`mb-2 text-xs font-black ${color === "teal" ? "text-[#06999a]" : "text-[#173c76]"}`}>{title}</p>
      <div className="flex flex-wrap gap-2">
        {words.map((word) => (
          <button
            key={`${title}-${word}`}
            type="button"
            onClick={() => speakEnglish(word, "word")}
            className={`rounded-full px-3 py-2 text-sm font-black ${
              color === "teal" ? "bg-[#f4fbfb] text-[#06999a]" : "bg-[#eef4ff] text-[#173c76]"
            }`}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}

function ExpressionGroup({ title, expressions }: { title: string; expressions: Array<{ en: string; zh: string }> }) {
  return (
    <div className="mt-4 first:mt-0">
      <p className="mb-2 text-xs font-black text-slate-400">{title}</p>
      <div className="space-y-3">
        {expressions.map((expression) => (
          <div key={`${title}-${expression.en}`} className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-black leading-6">{expression.en}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">{expression.zh}</p>
              </div>
              <button
                type="button"
                onClick={() => speakEnglish(expression.en)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#06999a]"
                aria-label="朗读表达"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniTask({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <Card className="p-4">
      <div className="flex gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#173c76]">{icon}</span>
        <div>
          <p className="font-black">{title}</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{text}</p>
        </div>
      </div>
    </Card>
  );
}

function getCompletedPlanDays(checkedDays: number[], completedWorkPlanDays: number[], totalDays: number) {
  return Array.from(new Set([...checkedDays, ...completedWorkPlanDays].filter((day) => day >= 1 && day <= totalDays))).sort((a, b) => a - b);
}

function getCheckInStreak(checkedDays: number[], totalDays: number) {
  const sorted = Array.from(new Set(checkedDays.filter((day) => day >= 1 && day <= totalDays))).sort((a, b) => a - b);
  let streak = 0;
  for (const day of sorted) {
    if (day === streak + 1) {
      streak = day;
    }
  }
  return streak;
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}
