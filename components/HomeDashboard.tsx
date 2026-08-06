"use client";

import {
  Check,
  CheckCircle2,
  Bell,
  ChevronLeft,
  ChevronRight,
  Languages,
  Star,
  Volume2
} from "lucide-react";
import { BottomNav, Card, PhoneShell } from "@/components/AppChrome";
import { useEffect, useState } from "react";
import { getScenario, type Category, type DayPlan, type Scenario } from "@/lib/content";
import { getDailyQuiz, getDailyQuizKey, getDailySentences, getDailyWords, getScenarioVisitIndex, getShuffledQuizOptions } from "@/lib/dailyContent";
import { getDailyDialogue } from "@/lib/dialogues";
import { useLearningProgress } from "@/lib/progress";
import { getLongReading } from "@/lib/readings";
import { speakEnglish, speakEnglishDialogue } from "@/lib/speech";
import { getWorkPlanDay, workPlanDays, type WorkPlanDay } from "@/lib/workPlan";

type HomeDashboardProps = {
  today: DayPlan;
};

export function HomeDashboard({ today }: HomeDashboardProps) {
  const { progress, actions } = useLearningProgress();
  const totalDays = workPlanDays.length;
  const completedPlanDays = getCompletedPlanDays(progress.checkedDays, progress.completedWorkPlanDays, totalDays);
  const completedDays = completedPlanDays.length;
  const streak = getCheckInStreak(completedPlanDays, totalDays);
  const allDone = streak >= totalDays;
  const currentDay = allDone ? totalDays : streak + 1;
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const progressRate = Math.round((completedDays / totalDays) * 100);
  const currentPlan = getWorkPlanDay(selectedDay);
  const [visibleWeekStart, setVisibleWeekStart] = useState(getWeekStart(currentDay));
  const visibleDays = getVisibleDays(visibleWeekStart, totalDays);

  useEffect(() => {
    setSelectedDay(currentDay);
    setVisibleWeekStart(getWeekStart(currentDay));
  }, [currentDay]);

  return (
    <PhoneShell>
      <div className="flex-1 overflow-y-auto bg-white px-4 pb-4">
        <header className="flex items-start justify-between pt-4">
          <div>
            <h1 className="text-[26px] font-black tracking-tight">每日场景英语</h1>
            <p className="text-xs font-semibold text-slate-400">三个月打卡 · 旅行 + 工作</p>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-100" title="通知">
            <Bell className="h-5 w-5" />
          </button>
        </header>

        <Card className="mt-4 overflow-hidden p-0">
          <div className="bg-[#06999a] p-5 text-white">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-white/75">三个月打卡</p>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black">连续 {streak} 天</span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-4xl font-black">{completedDays}<span className="text-xl text-white/60">/{totalDays}</span></h2>
                <p className="mt-1 text-sm font-semibold text-white/75">今天完成 Day {allDone ? totalDays : currentDay}</p>
              </div>
              <ProgressDonut value={progressRate} />
            </div>
            <button
              type="button"
              disabled={allDone}
              onClick={() => actions.toggleCheckIn(currentDay)}
              className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 text-base font-black text-[#06999a] disabled:bg-white/35 disabled:text-white"
            >
              <CheckCircle2 className="h-5 w-5" />
              {allDone ? "三个月已完成" : `完成今日打卡`}
            </button>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-white/65">查看学习内容</p>
                <p className="text-[11px] font-black text-white/75">Day {visibleWeekStart}-{Math.min(visibleWeekStart + 6, totalDays)}</p>
              </div>
              <div className="mt-2 grid grid-cols-[28px_1fr_28px] items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVisibleWeekStart((start) => Math.max(1, start - 7))}
                  disabled={visibleWeekStart <= 1}
                  className="flex h-9 items-center justify-center rounded-lg bg-white/12 text-white disabled:text-white/30"
                  aria-label="上一周"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-7 gap-1.5">
                  {visibleDays.map((day) => {
                    const selected = selectedDay === day;
                    const finished = completedPlanDays.includes(day);
                    const today = currentDay === day;
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`flex h-9 items-center justify-center rounded-lg text-xs font-black ${
                          selected
                            ? "bg-white text-[#06999a]"
                            : finished
                              ? "bg-white/25 text-white"
                              : today
                                ? "bg-[#173c76] text-white"
                                : "bg-white/12 text-white/70"
                        }`}
                        aria-pressed={selected}
                        title={`查看 Day ${day}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => setVisibleWeekStart((start) => Math.min(getWeekStart(totalDays), start + 7))}
                  disabled={visibleWeekStart >= getWeekStart(totalDays)}
                  className="flex h-9 items-center justify-center rounded-lg bg-white/12 text-white disabled:text-white/30"
                  aria-label="下一周"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Card>

        <LearningModule currentDay={selectedDay} currentPlan={currentPlan} />
      </div>
      <BottomNav active="home" />
    </PhoneShell>
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

function ProgressDonut({ value }: { value: number }) {
  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white/15">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{ background: `conic-gradient(#ffffff ${value * 3.6}deg, rgba(255,255,255,0.22) 0deg)` }}
      >
        <div className="flex h-[76%] w-[76%] flex-col items-center justify-center rounded-full bg-[#06999a]">
          <span className="text-xl font-black text-white">{value}%</span>
          <span className="text-[10px] font-bold text-white/70">完成</span>
        </div>
      </div>
    </div>
  );
}

function getWeekStart(day: number) {
  return Math.floor((day - 1) / 7) * 7 + 1;
}

function getVisibleDays(weekStart: number, totalDays: number) {
  const windowSize = 7;
  const start = Math.min(Math.max(1, weekStart), Math.max(1, totalDays - windowSize + 1));
  return Array.from({ length: Math.min(windowSize, totalDays) }, (_, index) => start + index);
}

type Tab = "words" | "sentences" | "dialogue" | "reading" | "quiz";

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "words", label: "单词" },
  { id: "sentences", label: "句子" },
  { id: "dialogue", label: "对话" },
  { id: "reading", label: "阅读" },
  { id: "quiz", label: "测验" }
];

function LearningModule({ currentDay, currentPlan }: { currentDay: number; currentPlan: WorkPlanDay }) {
  const { progress, actions } = useLearningProgress();
  const [category, setCategory] = useState<Category>("travel");
  const scenarios = (category === "travel" ? currentPlan.travelScenarios : currentPlan.workScenarios)
    .map((id) => getScenario(id))
    .filter(Boolean);
  const [activeIds, setActiveIds] = useState<Record<Category, string>>({
    travel: currentPlan.travelScenario,
    work: currentPlan.scenario
  });
  const [tab, setTab] = useState<Tab>("sentences");
  const [showZh, setShowZh] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [savedScore, setSavedScore] = useState<number | null>(null);
  const active = scenarios.find((scenario) => scenario.id === activeIds[category]) ?? scenarios[0];
  const scenarioVisitIndex = getScenarioVisitIndex(currentDay, active.id);
  const dailyWords = getDailyWords(active, currentDay);
  const dailySentences = getDailySentences(active, currentDay);
  const dailyQuiz = getDailyQuiz(active, currentDay);
  const dailyQuizKey = getDailyQuizKey(active.id, currentDay);
  const dialogue = getDailyDialogue(active, currentDay);
  const score = dailyQuiz.filter(({ item }) => answers[item.id] === item.answer).length;
  const allAnswered = dailyQuiz.every(({ item }) => answers[item.id]);
  const canSaveQuiz = dailyQuiz.length > 0 && allAnswered;
  const wrongQuizItems = dailyQuiz
    .map(({ item }, index) => ({ item, index, userAnswer: answers[item.id] }))
    .filter(({ item, userAnswer }) => userAnswer !== item.answer);
  const reading = getLongReading(active, currentDay);

  useEffect(() => {
    setActiveIds({
      travel: currentPlan.travelScenarios[0] ?? currentPlan.travelScenario,
      work: currentPlan.workScenarios[0] ?? currentPlan.scenario
    });
    setAnswers({});
    setSavedScore(null);
  }, [currentPlan.scenario, currentPlan.travelScenario, currentPlan.travelScenarios, currentPlan.workScenarios]);

  function chooseCategory(next: Category) {
    setCategory(next);
    setAnswers({});
    setSavedScore(null);
  }

  function chooseScenario(scenario: Scenario) {
    setActiveIds((current) => ({ ...current, [category]: scenario.id }));
    setAnswers({});
    setSavedScore(null);
  }

  function saveQuiz() {
    const mistakes = dailyQuiz
      .filter(({ item }) => answers[item.id] !== item.answer)
      .map(({ item }) => ({
        id: `${dailyQuizKey}:${item.id}`,
        source: `${active.title}测验`,
        question: item.question,
        answer: item.answer,
        userAnswer: answers[item.id]
      }));
    actions.saveQuizScore(dailyQuizKey, score, mistakes);
    setSavedScore(score);
  }

  return (
    <section id="study" className="mt-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black">学习</h2>
          <p className="text-xs font-bold text-slate-400">Day {currentDay} · 今日 3 旅行 + 3 工作</p>
        </div>
        <button
          type="button"
          onClick={() => setShowZh((value) => !value)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-black ${
            showZh ? "bg-[#e9f7f7] text-[#06999a]" : "bg-slate-100 text-slate-400"
          }`}
          aria-pressed={showZh}
          title="译文开关"
        >
          <Languages className="h-4 w-4" />
          译文
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
        {[
          { id: "travel" as const, label: "旅行英语" },
          { id: "work" as const, label: "工作英语" }
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => chooseCategory(item.id)}
            className={`h-10 rounded-xl text-sm font-black ${
              category === item.id ? "bg-white text-[#06999a] shadow-sm" : "text-slate-400"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => chooseScenario(scenario)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${
              active.id === scenario.id ? "bg-[#06999a] text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            {scenario.title}
          </button>
        ))}
      </div>

      <nav className="mt-3 grid grid-cols-5 border-b border-slate-100">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`relative h-12 text-base font-black ${tab === item.id ? "text-[#06999a]" : "text-slate-400"}`}
          >
            {item.label}
            {tab === item.id && <span className="absolute inset-x-5 bottom-0 h-1 rounded-full bg-[#06999a]" />}
          </button>
        ))}
      </nav>

      {tab === "sentences" && (
        <div className="mt-4 space-y-4">
          {dailySentences.length === 0 && <EmptyLearningState module="句子" />}
          {dailySentences.map((sentence) => {
            const id = `sentence:${active.id}:${sentence.index}`;
            const legacyId = `${active.id}-${sentence.index}`;
            const favorited = progress.favoriteSentences.includes(id) || progress.favoriteSentences.includes(legacyId);
            return (
              <SentenceCard
                key={id}
                en={sentence.item.en}
                zh={sentence.item.zh}
                showZh={showZh}
                onSpeak={() => speakEnglish(sentence.item.en)}
                favorited={favorited}
                onFavorite={() => actions.toggleFavorite(id)}
              />
            );
          })}
        </div>
      )}

      {tab === "words" && (
        <div className="mt-4 space-y-3">
          {dailyWords.length === 0 && <EmptyLearningState module="单词" />}
          {dailyWords.map((word) => {
            const wordId = `word:${active.id}:${word.index}`;
            const favorited = progress.favoriteWords.includes(wordId);
            return (
              <Card key={`${active.id}-${word.index}`} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <h2 className="text-lg font-black">{word.item.en}</h2>
                  {showZh && <p className="mt-1 text-sm font-bold text-slate-400">{word.item.zh}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => speakEnglish(word.item.en, "word")}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9f7f7] text-[#06999a]"
                    aria-label="朗读单词"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => actions.toggleFavoriteWord(wordId)} className="text-slate-400" aria-label="收藏单词">
                    <Star className={`h-7 w-7 ${favorited ? "fill-[#f6b73c] text-[#f6b73c]" : ""}`} />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "dialogue" && (
        <div className="mt-4 space-y-3">
          <button
            type="button"
            onClick={() => speakEnglishDialogue(dialogue.map((line) => line.en))}
            className="mb-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#06999a] text-base font-black text-white"
          >
            <Volume2 className="h-5 w-5" />
            播放整段对话
          </button>
          {dialogue.map((line, index) => (
            <div key={`${line.speaker}-${index}`} className={`flex ${line.speaker === "B" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[86%] rounded-2xl p-4 ${line.speaker === "B" ? "bg-[#06999a] text-white" : "bg-slate-100"}`}>
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-black">{line.en}</p>
                    {showZh && <p className={`mt-2 text-sm font-semibold ${line.speaker === "B" ? "text-white/75" : "text-slate-500"}`}>{line.zh}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => speakEnglish(line.en, "dialogue")}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      line.speaker === "B" ? "bg-white/20 text-white" : "bg-white text-[#06999a]"
                    }`}
                    aria-label="播放本句"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "reading" && (
        <ReadingCard
          title={`${active.title}长篇阅读`}
          en={reading.en}
          zh={reading.zh}
          showZh={showZh}
          favorited={progress.favoriteReadings.includes(`reading:${active.id}`)}
          onFavorite={() => actions.toggleFavoriteReading(`reading:${active.id}`)}
          onSpeak={() => speakEnglish(reading.en, "dialogue")}
        />
      )}

      {tab === "quiz" && (
        <div className="mt-4 space-y-4">
          <Card className="bg-[#f4fbfb] p-5">
            <p className="text-sm font-bold text-[#06999a]">当前得分</p>
            <h2 className="mt-1 text-3xl font-black">{score}/{dailyQuiz.length}</h2>
            {savedScore !== null && <p className="mt-2 text-sm font-black text-[#06999a]">已保存，本次 {savedScore}/{dailyQuiz.length} 分</p>}
          </Card>
          {savedScore !== null && (
            <Card className={`p-5 ${wrongQuizItems.length === 0 ? "bg-[#f4fbfb]" : "bg-[#fff7f4]"}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`text-sm font-black ${wrongQuizItems.length === 0 ? "text-[#06999a]" : "text-[#ff624f]"}`}>
                    {wrongQuizItems.length === 0 ? "全部答对" : `答错 ${wrongQuizItems.length} 题`}
                  </p>
                  <h3 className="mt-1 text-lg font-black">{wrongQuizItems.length === 0 ? "这组测验已经掌握" : "需要复习的题目"}</h3>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-black ${wrongQuizItems.length === 0 ? "bg-white text-[#06999a]" : "bg-white text-[#ff624f]"}`}>
                  {savedScore}/{dailyQuiz.length}
                </span>
              </div>
              {wrongQuizItems.length > 0 && (
                <div className="mt-4 space-y-3">
                  {wrongQuizItems.map(({ item, index, userAnswer }) => (
                    <div key={item.id} className="rounded-xl bg-white p-3">
                      <p className="text-sm font-black text-slate-900">{index + 1}. {item.question}</p>
                      <p className="mt-2 text-xs font-bold text-slate-400">你的答案：<span className="text-[#ff624f]">{userAnswer}</span></p>
                      <p className="mt-1 text-xs font-bold text-slate-400">正确答案：<span className="text-[#06999a]">{item.answer}</span></p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
          {dailyQuiz.length === 0 && <EmptyLearningState module="测验" />}
          {dailyQuiz.map(({ item }, index) => (
            <Card key={item.id} className="p-4">
              <h3 className="font-black">{index + 1}. {item.question}</h3>
              <div className="mt-3 space-y-2">
                {getShuffledQuizOptions(item, active.id, currentDay).map((option) => {
                  const selected = answers[item.id] === option;
                  const isSaved = savedScore !== null;
                  const isCorrect = option === item.answer;
                  const isWrongSelected = isSaved && selected && !isCorrect;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setAnswers((current) => ({ ...current, [item.id]: option }));
                        setSavedScore(null);
                      }}
                      className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-bold ${
                        isSaved && isCorrect
                          ? "bg-[#e9f7f7] text-[#06999a]"
                          : isWrongSelected
                            ? "bg-[#fff7f4] text-[#ff624f]"
                            : selected
                              ? "bg-[#e9f7f7] text-[#06999a]"
                              : "bg-slate-50 text-slate-600"
                      }`}
                    >
                      {option}
                      {(selected || (isSaved && isCorrect)) && <Check className="h-4 w-4" />}
                    </button>
                  );
                })}
              </div>
              {savedScore !== null && answers[item.id] !== item.answer && (
                <div className="mt-3 rounded-xl bg-[#fff7f4] p-3 text-xs font-bold text-slate-500">
                  你选了 <span className="text-[#ff624f]">{answers[item.id]}</span>，正确答案是 <span className="text-[#06999a]">{item.answer}</span>
                </div>
              )}
            </Card>
          ))}
          <button
            type="button"
            disabled={!canSaveQuiz}
            onClick={saveQuiz}
            className="h-14 w-full rounded-xl bg-[#06999a] text-lg font-black text-white disabled:bg-slate-300"
          >
            保存测验成绩
          </button>
          {!canSaveQuiz && <p className="text-center text-xs font-bold text-slate-400">答完全部题目后才能保存成绩</p>}
        </div>
      )}
    </section>
  );
}

function EmptyLearningState({ module }: { module: string }) {
  return (
    <Card className="p-5 text-center">
      <p className="text-sm font-black text-slate-900">这一天暂无{module}内容</p>
      <p className="mt-2 text-xs font-bold leading-5 text-slate-400">当前真实素材还没有覆盖到这个场景进度，我会继续补充词库，避免用模板硬凑内容。</p>
    </Card>
  );
}

function ReadingCard({
  title,
  en,
  zh,
  showZh,
  favorited,
  onFavorite,
  onSpeak
}: {
  title: string;
  en: string;
  zh: string;
  showZh: boolean;
  favorited: boolean;
  onFavorite: () => void;
  onSpeak: () => void;
}) {
  return (
    <Card className="mt-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-[#06999a]">长篇阅读</p>
          <h3 className="mt-1 text-lg font-black">{title}</h3>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onSpeak}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9f7f7] text-[#06999a]"
            aria-label="朗读长篇阅读"
          >
            <Volume2 className="h-5 w-5" />
          </button>
          <button type="button" onClick={onFavorite} className="text-slate-400" aria-label="收藏阅读">
            <Star className={`h-9 w-9 ${favorited ? "fill-[#f6b73c] text-[#f6b73c]" : ""}`} />
          </button>
        </div>
      </div>
      <p className="mt-4 whitespace-pre-line text-base font-semibold leading-8 text-slate-800">{en}</p>
      {showZh && <p className="mt-4 whitespace-pre-line rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-500">{zh}</p>}
    </Card>
  );
}

function SentenceCard({
  en,
  zh,
  showZh,
  onSpeak,
  favorited,
  onFavorite
}: {
  en: string;
  zh: string;
  showZh: boolean;
  onSpeak: () => void;
  favorited: boolean;
  onFavorite: () => void;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-black leading-7">{en}</h2>
          {showZh && <p className="mt-2 text-base font-semibold text-slate-500">{zh}</p>}
        </div>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={onSpeak} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9f7f7] text-[#06999a]" aria-label="朗读句子">
            <Volume2 className="h-6 w-6" />
          </button>
          <button type="button" onClick={onFavorite} className="text-slate-400" aria-label="收藏句子">
            <Star className={`h-8 w-8 ${favorited ? "fill-[#f6b73c] text-[#f6b73c]" : ""}`} />
          </button>
        </div>
      </div>
    </Card>
  );
}
