"use client";

import Link from "next/link";
import {
  BookOpenText,
  CheckCircle2,
  Headphones,
  Mic,
  Plane,
  Bell,
  BriefcaseBusiness,
  ArrowRight
} from "lucide-react";
import { BottomNav, Card, PhoneShell } from "@/components/AppChrome";
import { content, getScenario, type DayPlan } from "@/lib/content";
import { useLearningProgress } from "@/lib/progress";

type HomeDashboardProps = {
  today: DayPlan;
};

export function HomeDashboard({ today }: HomeDashboardProps) {
  const { progress } = useLearningProgress();
  const travel = getScenario(today.travel);
  const work = getScenario(today.work);
  const level = progress.assessmentDate ? progress.level : undefined;
  const travelScore = progress.quizScores[today.travel];
  const workScore = progress.quizScores[today.work];
  const travelDone = typeof travelScore === "number";
  const workDone = typeof workScore === "number";
  const streak = getLearningStreakFromProgress(progress.completedScenarios);
  const totalWords = travel.words.length + work.words.length;
  const totalSentences = travel.sentences.length + work.sentences.length;
  const totalDialogueLines = travel.dialogue.length + work.dialogue.length;
  const totalQuiz = travel.quiz.length + work.quiz.length;
  const totalListening = totalSentences + totalDialogueLines;
  const learnedWords = (travelDone ? travel.words.length : 0) + (workDone ? work.words.length : 0);
  const learnedSentences = (travelDone ? travel.sentences.length : 0) + (workDone ? work.sentences.length : 0);
  const learnedListening = (travelDone ? travel.sentences.length + travel.dialogue.length : 0) + (workDone ? work.sentences.length + work.dialogue.length : 0);
  const learnedQuiz = (travelDone ? travel.quiz.length : 0) + (workDone ? work.quiz.length : 0);
  const totalUnits = totalWords + totalSentences + totalListening + totalSentences + totalQuiz;
  const learnedUnits = learnedWords + learnedSentences + learnedListening + learnedSentences + learnedQuiz;
  const taskProgress = Math.round((learnedUnits / totalUnits) * 100);

  if (!level) {
    return (
      <PhoneShell>
        <div className="min-h-[calc(100vh-36px)] bg-white px-5 pb-1">
          <header className="flex items-start justify-between pt-6">
            <div>
              <h1 className="text-2xl font-black tracking-tight">每日场景英语</h1>
              <p className="mt-1 text-sm font-semibold text-slate-400">先测水平，再生成任务</p>
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-100" title="通知">
              <Bell className="h-6 w-6" />
            </button>
          </header>

          <Card className="mt-8 overflow-hidden p-0">
            <div className="bg-[#06999a] p-6 text-white">
              <p className="text-sm font-bold text-white/75">Start here</p>
              <h2 className="mt-2 text-3xl font-black leading-tight">先完成水平测评</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-white/80">
                我会根据你的测评结果判断 A1/A2/B1/B2 难度，再生成旅行 + 工作英语的每日学习任务。
              </p>
            </div>
            <div className="space-y-3 p-5">
              <GuideRow label="1" title="评估词汇、听力、句子和口语" />
              <GuideRow label="2" title="确定适合你的学习难度" />
              <GuideRow label="3" title="生成今日旅行 + 工作英语任务" />
              <Link href="/assessment" className="mt-5 flex h-14 items-center justify-center gap-2 rounded-xl bg-[#06999a] text-lg font-black text-white">
                开始测评
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Card>

          <section className="mt-6 grid grid-cols-2 gap-3">
            <PreviewCard title="旅行英语" desc="机场、酒店、点餐、问路" />
            <PreviewCard title="工作英语" desc="会议、邮件、汇报、客户沟通" />
          </section>
        </div>
        <BottomNav active="home" />
      </PhoneShell>
    );
  }

  return (
    <PhoneShell>
      <div className="min-h-[calc(100vh-36px)] bg-white px-5 pb-1">
        <header className="flex items-start justify-between pt-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight">每日场景英语</h1>
            <p className="mt-1 text-sm font-semibold text-slate-400">每天进步一点点</p>
          </div>
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-100" title="通知">
            <Bell className="h-6 w-6" />
          </button>
        </header>

        <Card className="mt-6 p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">今日学习任务</h2>
            <span className="shrink-0 rounded-full bg-[#f4fbfb] px-3 py-1.5 text-xs font-black text-[#06999a]">
              连续 {streak} 天
            </span>
          </div>
          <div className="mt-5 grid grid-cols-[150px_1fr] items-center gap-4">
            <ProgressDonut value={taskProgress} />
            <div className="space-y-3">
              <TaskMini icon={<BookOpenText className="h-4 w-4" />} label="词汇学习" value={`${learnedWords}/${totalWords}`} done={learnedWords === totalWords} />
              <TaskMini icon={<BookOpenText className="h-4 w-4" />} label="句子学习" value={`${learnedSentences}/${totalSentences}`} done={learnedSentences === totalSentences} />
              <TaskMini icon={<Headphones className="h-4 w-4" />} label="听力练习" value={`${learnedListening}/${totalListening}`} done={learnedListening === totalListening} />
              <TaskMini icon={<Mic className="h-4 w-4" />} label="跟读练习" value={`${learnedSentences}/${totalSentences}`} done={learnedSentences === totalSentences} />
              <TaskMini icon={<CheckCircle2 className="h-4 w-4" />} label="小测验" value={`${learnedQuiz}/${totalQuiz}`} done={learnedQuiz === totalQuiz} />
            </div>
          </div>
        </Card>

        <section className="mt-7">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">场景学习入口</h2>
            <Link href="/scenes/travel" className="text-sm font-bold text-slate-400">
              全部场景 ›
            </Link>
          </div>
          <div className="mt-4 space-y-4">
            <SceneEntry
              href="/scenes/travel"
              variant="travel"
              title="旅行英语"
              subtitle="出发 · 机场 · 酒店 · 观光"
              progress="35%"
              scene={travel.title}
            />
            <SceneEntry
              href="/scenes/work"
              variant="work"
              title="工作英语"
              subtitle="会议 · 邮件 · 汇报 · 社交"
              progress="20%"
              scene={work.title}
            />
          </div>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3">
          <Link href="/assessment" className="rounded-2xl bg-[#f4fbfb] p-4">
            <p className="text-sm font-bold text-[#06999a]">水平测评</p>
            <p className="mt-2 text-xl font-black">{level}</p>
            <p className="mt-1 text-xs font-semibold text-slate-400">校准学习难度</p>
          </Link>
          <Link href="/weekly" className="rounded-2xl bg-[#fff5f2] p-4">
            <p className="text-sm font-bold text-[#ff624f]">周测复盘</p>
            <p className="mt-2 text-xl font-black">听说读</p>
            <p className="mt-1 text-xs font-semibold text-slate-400">检查掌握效果</p>
          </Link>
        </section>
      </div>
      <BottomNav active="home" />
    </PhoneShell>
  );
}

function getLearningStreakFromProgress(completedScenarios: string[]) {
  if (completedScenarios.length === 0) {
    return 0;
  }
  const completedDays = content.days
    .filter((day) => completedScenarios.includes(day.travel) || completedScenarios.includes(day.work))
    .map((day) => day.day);
  if (completedDays.length === 0) {
    return 0;
  }
  const uniqueDays = Array.from(new Set(completedDays)).sort((a, b) => a - b);
  let longest = 1;
  let current = 1;
  for (let index = 1; index < uniqueDays.length; index += 1) {
    if (uniqueDays[index] === uniqueDays[index - 1] + 1) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
}

function GuideRow({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#06999a] text-sm font-black text-white">{label}</span>
      <span className="font-bold text-slate-700">{title}</span>
    </div>
  );
}

function PreviewCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="font-black">{title}</p>
      <p className="mt-2 text-xs font-semibold leading-5 text-slate-400">{desc}</p>
    </div>
  );
}

function ProgressDonut({ value }: { value: number }) {
  return (
    <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#eaf8f8]">
      <div
        className="flex h-32 w-32 items-center justify-center rounded-full"
        style={{ background: `conic-gradient(#06999a ${value * 3.6}deg, #e8eeee 0deg)` }}
      >
        <div className="flex h-[76%] w-[76%] flex-col items-center justify-center rounded-full bg-white">
          <span className="text-4xl font-black">{value}%</span>
          <span className="mt-1 text-sm font-bold text-slate-400">已完成</span>
        </div>
      </div>
    </div>
  );
}

function TaskMini({ icon, label, value, done }: { icon: React.ReactNode; label: string; value: string; done?: boolean }) {
  return (
    <div className="grid grid-cols-[18px_1fr_auto_16px] items-center gap-2 text-sm font-bold">
      <span className="text-[#2f6fe4]">{icon}</span>
      <span className="min-w-0 truncate text-slate-700">{label}</span>
      <span className="whitespace-nowrap text-slate-500">{value}</span>
      <span className={`h-4 w-4 rounded-full ${done ? "bg-[#06999a]" : "border-2 border-slate-200"}`}>
        {done && <CheckCircle2 className="h-4 w-4 text-white" />}
      </span>
    </div>
  );
}

function SceneEntry({
  href,
  variant,
  title,
  subtitle,
  progress,
  scene
}: {
  href: string;
  variant: "travel" | "work";
  title: string;
  subtitle: string;
  progress: string;
  scene: string;
}) {
  const travel = variant === "travel";

  return (
    <Link
      href={href}
      className={`grid min-h-40 grid-cols-[168px_1fr] overflow-hidden rounded-2xl shadow-sm ${
        travel ? "bg-[#d8f3f2]" : "bg-[#173c76] text-white"
      }`}
    >
      <div className={`relative overflow-hidden ${travel ? "bg-[#9ededa]" : "bg-[#0b2345]"}`}>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-black/10" />
        {travel ? <TravelIllustration /> : <WorkIllustration />}
      </div>
      <div className="p-5">
        <p className={`text-xs font-black ${travel ? "text-[#06999a]" : "text-white/70"}`}>{scene}</p>
        <h3 className="mt-1 text-2xl font-black">{title}</h3>
        <p className={`mt-2 text-sm font-semibold ${travel ? "text-slate-600" : "text-white/75"}`}>{subtitle}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className={`rounded-lg px-3 py-1.5 text-sm font-black ${travel ? "bg-[#06999a] text-white" : "bg-white text-[#173c76]"}`}>
            继续学习
          </span>
          <span className={`text-sm font-bold ${travel ? "text-slate-500" : "text-white/75"}`}>进度 {progress}</span>
        </div>
        <div className={`mt-3 h-1.5 overflow-hidden rounded-full ${travel ? "bg-white/80" : "bg-white/25"}`}>
          <div className={`h-full rounded-full ${travel ? "bg-[#06999a]" : "bg-white"}`} style={{ width: progress }} />
        </div>
      </div>
    </Link>
  );
}

function TravelIllustration() {
  return (
    <div className="absolute inset-0">
      <Plane className="absolute left-10 top-7 h-16 w-16 -rotate-12 text-white" />
      <div className="absolute bottom-0 left-0 h-12 w-full bg-[#5bb8c0]" />
      <div className="absolute bottom-2 left-10 h-14 w-10 rounded-t-xl bg-[#f59e0b]" />
      <div className="absolute bottom-2 left-4 h-9 w-12 rounded-xl bg-[#223b53]" />
      <div className="absolute bottom-14 left-5 h-2 w-10 rounded-full bg-white/70" />
      <div className="absolute bottom-20 right-5 h-2 w-9 rounded-full bg-white/70" />
    </div>
  );
}

function WorkIllustration() {
  return (
    <div className="absolute inset-0">
      <div className="absolute bottom-0 h-20 w-full bg-[#102b52]" />
      <div className="absolute bottom-6 left-9 h-12 w-20 rounded-lg bg-[#dbeafe] shadow-lg" />
      <div className="absolute bottom-9 left-12 h-7 w-14 rounded bg-[#60a5fa]" />
      <div className="absolute bottom-4 left-5 h-4 w-28 rounded-full bg-[#8b5e34]" />
      <BriefcaseBusiness className="absolute right-8 top-8 h-12 w-12 text-white/80" />
    </div>
  );
}
