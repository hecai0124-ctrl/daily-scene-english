"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, BookOpen, Cloud, Download, FileSearch, MessageSquareText, NotebookText, Star, Upload, WholeWord } from "lucide-react";
import { BottomNav, Card, PhoneShell } from "@/components/AppChrome";
import { getScenario } from "@/lib/content";
import { useLearningProgress } from "@/lib/progress";
import { createSyncCode, isCloudSyncConfigured, normalizeSyncCode, pullCloudProgress, pushCloudProgress } from "@/lib/cloudSync";
import { getWorkPlanDay, workPlanDays } from "@/lib/workPlan";

export function WeeklyReview() {
  const [reviewingMistakes, setReviewingMistakes] = useState(false);
  const [syncInput, setSyncInput] = useState("");
  const [syncMessage, setSyncMessage] = useState("");
  const [syncBusy, setSyncBusy] = useState(false);
  const { progress, actions } = useLearningProgress();
  const mistakes = progress.mistakes ?? [];
  const weekSummary = getCurrentWeekSummary(progress.checkInDates, progress.quizScores);
  const syncCode = progress.syncCode ?? "";

  return (
    <PhoneShell>
      <div className="flex-1 overflow-y-auto bg-white px-5 pb-5">
        <header className="grid grid-cols-[40px_1fr_40px] items-center pt-5">
          <Link href="/" className="text-slate-600">
            <ArrowLeft className="h-7 w-7" />
          </Link>
          <h1 className="text-center text-xl font-black">周测与复盘</h1>
          <span />
        </header>

        <Card className="mt-5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black">本周学习总结</h2>
              <p className="mt-1 text-xs font-bold text-slate-400">
                {weekSummary.days.length > 0 ? weekSummary.days.map((day) => `Day ${day}`).join("、") : "完成打卡后自动计入"}
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold text-slate-400">{weekSummary.range}</span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            <SummaryTile icon={<WholeWord className="h-5 w-5" />} label="单词" value={`${weekSummary.words} 个`} />
            <SummaryTile icon={<MessageSquareText className="h-5 w-5" />} label="句子" value={`${weekSummary.sentences} 句`} />
            <SummaryTile icon={<BookOpen className="h-5 w-5" />} label="对话" value={`${weekSummary.dialogueLines} 句`} />
            <SummaryTile icon={<NotebookText className="h-5 w-5" />} label="阅读" value={`${weekSummary.readings} 篇`} />
          </div>
          <div className="mt-3 grid grid-cols-[1fr_1fr_auto] items-center gap-2 rounded-2xl bg-[#f4fbfb] p-3">
            <div>
              <p className="text-xs font-bold text-slate-400">答对题目</p>
              <p className="text-lg font-black text-[#173c76]">{weekSummary.quizCorrect}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">回答题目</p>
              <p className="text-lg font-black text-[#173c76]">{weekSummary.quizAnswered}</p>
            </div>
            <div className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#06999a]">
              测验 {weekSummary.quizQuestions} 题
            </div>
          </div>
        </Card>

        <ReviewActionCard
          tone="danger"
          title="错题复习"
          description={mistakes.length > 0 ? "来自你提交过的场景测验" : "完成测验后，答错的题会自动进入这里"}
          metric={`共 ${mistakes.length} 道错题待复习`}
          icon={<FileSearch className="h-8 w-8" />}
          actionLabel="开始复习"
          disabled={mistakes.length === 0}
          onClick={() => setReviewingMistakes(true)}
        />

        {reviewingMistakes && (
          <section className="mt-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">错题记录</h2>
              <button type="button" onClick={() => setReviewingMistakes(false)} className="text-sm font-black text-[#06999a]">
                收起
              </button>
            </div>
            {mistakes.map((item) => (
              <Card key={item.id} className="p-4">
                <p className="text-xs font-black text-[#ff624f]">{item.source}</p>
                <h3 className="mt-2 font-black leading-7">{item.question}</h3>
                {item.userAnswer && <p className="mt-2 text-sm font-bold text-slate-400">你的答案：{item.userAnswer}</p>}
                <p className="mt-1 text-sm font-bold text-[#06999a]">正确答案：{item.answer}</p>
              </Card>
            ))}
          </section>
        )}

        <ReviewActionCard
          tone="warm"
          title="收藏复习"
          description="复习你收藏过的高频单词、句子和阅读"
          metric={`单词 ${progress.favoriteWords.length} 个 · 句子 ${progress.favoriteSentences.length} 句 · 阅读 ${progress.favoriteReadings.length} 篇`}
          icon={<Star className="h-8 w-8 fill-[#f6b73c]" />}
          actionLabel="查看收藏"
          href="/favorites"
        />

        <Card className="mt-5 bg-[#f4fbfb] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black text-[#06999a]">手机电脑同步</p>
              <h2 className="mt-1 text-xl font-black">同步码数据同步</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                两台设备输入同一个同步码，再上传或拉取数据，就能共用打卡、收藏、错题和测验记录。
              </p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#06999a] shadow-sm">
              <Cloud className="h-7 w-7" />
            </span>
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <input
              value={syncInput}
              onChange={(event) => setSyncInput(event.target.value)}
              placeholder={syncCode || "输入同步码"}
              className="h-12 rounded-xl bg-white px-3 text-sm font-black uppercase text-slate-700 outline-none ring-1 ring-slate-100 placeholder:text-slate-300"
            />
            <button
              type="button"
              onClick={() => {
                const nextCode = normalizeSyncCode(syncInput || createSyncCode());
                actions.setSyncCode(nextCode);
                setSyncInput("");
                setSyncMessage(`当前同步码：${nextCode}`);
              }}
              className="h-12 rounded-xl bg-[#173c76] px-4 text-sm font-black text-white"
            >
              {syncCode ? "更换" : "生成"}
            </button>
          </div>
          {syncCode && <p className="mt-2 text-sm font-black text-[#173c76]">当前同步码：{syncCode}</p>}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={syncBusy || !syncCode || !isCloudSyncConfigured()}
              onClick={async () => {
                setSyncBusy(true);
                setSyncMessage("");
                try {
                  await pushCloudProgress(syncCode, progress);
                  setSyncMessage("已上传本机学习数据");
                } catch (error) {
                  setSyncMessage(error instanceof Error ? error.message : "上传失败");
                } finally {
                  setSyncBusy(false);
                }
              }}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#06999a] text-sm font-black text-white disabled:bg-slate-300"
            >
              <Upload className="h-4 w-4" />
              上传
            </button>
            <button
              type="button"
              disabled={syncBusy || !syncCode || !isCloudSyncConfigured()}
              onClick={async () => {
                setSyncBusy(true);
                setSyncMessage("");
                try {
                  const result = await pullCloudProgress(syncCode);
                  if (!result.progress) {
                    setSyncMessage("云端还没有这个同步码的数据");
                    return;
                  }
                  actions.replaceProgress({ ...result.progress, syncCode });
                  setSyncMessage("已拉取云端学习数据");
                } catch (error) {
                  setSyncMessage(error instanceof Error ? error.message : "拉取失败");
                } finally {
                  setSyncBusy(false);
                }
              }}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white text-sm font-black text-[#06999a] ring-1 ring-[#d6eeee] disabled:bg-slate-100 disabled:text-slate-300"
            >
              <Download className="h-4 w-4" />
              拉取
            </button>
          </div>
          {!isCloudSyncConfigured() && <p className="mt-3 text-xs font-bold text-[#ff624f]">腾讯云同步接口部署后可用。</p>}
          {syncMessage && <p className="mt-3 text-xs font-bold text-slate-500">{syncMessage}</p>}
        </Card>
      </div>
      <BottomNav active="review" />
    </PhoneShell>
  );
}

function SummaryTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#06999a] shadow-sm">
        {icon}
      </span>
      <p className="mt-2 text-[11px] font-bold text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-black">{value}</p>
    </div>
  );
}

function ReviewActionCard({
  tone,
  title,
  description,
  metric,
  icon,
  actionLabel,
  disabled,
  href,
  onClick
}: {
  tone: "danger" | "warm";
  title: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
  actionLabel: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const danger = tone === "danger";
  const content = (
    <Card className={`mt-5 p-5 ${danger ? "bg-[#fff7f4]" : "bg-[#fff9ed]"}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-black">{title}</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">{metric}</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{description}</p>
          {href ? (
            <span className={`mt-5 inline-flex rounded-lg px-8 py-3 text-base font-black text-white ${danger ? "bg-[#ff624f]" : "bg-[#f6b73c]"}`}>
              {actionLabel}
            </span>
          ) : (
            <button
              type="button"
              disabled={disabled}
              onClick={onClick}
              className={`mt-5 rounded-lg px-8 py-3 text-base font-black text-white disabled:bg-slate-300 ${danger ? "bg-[#ff624f]" : "bg-[#f6b73c]"}`}
            >
              {actionLabel}
            </button>
          )}
        </div>
        <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ${danger ? "text-[#ff624f]" : "text-[#f6b73c]"}`}>
          {icon}
        </span>
      </div>
    </Card>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

function getCurrentWeekSummary(checkInDates: Record<string, number>, quizScores: Record<string, number>) {
  const today = new Date();
  const weekStart = getMonday(today);
  const weekDates = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const weekKeys = new Set(weekDates.map(toDateKey));
  const days = Array.from(new Set(
    Object.entries(checkInDates)
      .filter(([date]) => weekKeys.has(date))
      .map(([, day]) => day)
      .filter((day) => day >= 1 && day <= workPlanDays.length)
  )).sort((a, b) => a - b);

  const totals = days.reduce(
    (current, day) => {
      const plan = getWorkPlanDay(day);
      const travel = getScenario(plan.travelScenario);
      const work = getScenario(plan.scenario);
      const scoredQuizzes = [travel, work]
        .map((scenario) => ({
          score: quizScores[scenario.id],
          total: scenario.quiz.length
        }))
        .filter((item) => typeof item.score === "number");
      return {
        words: current.words + Math.min(10, travel.words.length) + Math.min(10, work.words.length),
        sentences: current.sentences + Math.min(6, travel.sentences.length) + Math.min(6, work.sentences.length),
        dialogueLines: current.dialogueLines + travel.dialogue.length + work.dialogue.length,
        readings: current.readings + 2,
        quizQuestions: current.quizQuestions + travel.quiz.length + work.quiz.length,
        quizCorrect: current.quizCorrect + scoredQuizzes.reduce((total, item) => total + item.score, 0),
        quizAnswered: current.quizAnswered + scoredQuizzes.reduce((total, item) => total + item.total, 0)
      };
    },
    { words: 0, sentences: 0, dialogueLines: 0, readings: 0, quizQuestions: 0, quizCorrect: 0, quizAnswered: 0 }
  );

  return {
    ...totals,
    days,
    range: `${formatMonthDay(weekDates[0])} - ${formatMonthDay(weekDates[6])}`
  };
}

function getMonday(date: Date) {
  const day = date.getDay() === 0 ? 7 : date.getDay();
  return addDays(new Date(date.getFullYear(), date.getMonth(), date.getDate()), 1 - day);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatMonthDay(date: Date) {
  return `${date.getMonth() + 1}.${date.getDate()}`;
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}
