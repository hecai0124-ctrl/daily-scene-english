"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, Languages, Star, Volume2 } from "lucide-react";
import { BottomNav, Card, PhoneShell } from "@/components/AppChrome";
import { type Category, type Scenario } from "@/lib/content";
import { getDailyQuiz, getDailyQuizKey, getDailySentences, getDailyWords, getScenarioVisitIndex, getShuffledQuizOptions } from "@/lib/dailyContent";
import { getDailyDialogue } from "@/lib/dialogues";
import { useLearningProgress } from "@/lib/progress";
import { getLongReading } from "@/lib/readings";
import { speakEnglish, speakEnglishDialogue } from "@/lib/speech";
import { getWorkPlanDay, workPlanDays } from "@/lib/workPlan";

type SceneStudyProps = {
  category: Category;
  scenarios: Scenario[];
};

type Tab = "words" | "sentences" | "dialogue" | "reading" | "quiz";

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "words", label: "单词" },
  { id: "sentences", label: "句子" },
  { id: "dialogue", label: "对话" },
  { id: "reading", label: "阅读" },
  { id: "quiz", label: "测验" }
];

export function SceneStudy({ category, scenarios }: SceneStudyProps) {
  const { progress, actions } = useLearningProgress();
  const completedPlanDays = getCompletedPlanDays(progress.checkedDays, progress.completedWorkPlanDays, workPlanDays.length);
  const completedStreak = getCheckInStreak(completedPlanDays, workPlanDays.length);
  const currentDay = Math.min(completedStreak + 1, workPlanDays.length);
  const currentPlan = getWorkPlanDay(currentDay);
  const defaultScenarioId = category === "travel" ? currentPlan.travelScenario : currentPlan.scenario;
  const [activeId, setActiveId] = useState<string>(defaultScenarioId);
  const [tab, setTab] = useState<Tab>("sentences");
  const [showZh, setShowZh] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [savedScore, setSavedScore] = useState<number | null>(null);
  const active = scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0];
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

  function speak(text: string) {
    speakEnglish(text);
  }

  return (
    <PhoneShell>
      <div className="flex-1 overflow-y-auto bg-white pb-1">
        <header className="grid grid-cols-[40px_1fr_auto] items-center gap-3 px-5 pt-5">
          <Link href="/" className="text-slate-600">
            <ArrowLeft className="h-7 w-7" />
          </Link>
          <h1 className="truncate text-center text-xl font-black">{active.title}场景</h1>
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
        </header>

        <div className="mt-5 flex gap-3 overflow-x-auto px-5 pb-1">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => {
                setActiveId(scenario.id);
                setAnswers({});
                setSavedScore(null);
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${
                active.id === scenario.id ? "bg-[#06999a] text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {scenario.title}
            </button>
          ))}
        </div>

        <nav className="mt-3 grid grid-cols-5 border-b border-slate-100 px-5">
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

        <div className="px-5 pb-6">
          {tab === "sentences" && (
            <>
              <div className="mt-5 space-y-4">
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
                      onSpeak={() => speak(sentence.item.en)}
                      favorited={favorited}
                      onFavorite={() => actions.toggleFavorite(id)}
                    />
                  );
                })}
              </div>
            </>
          )}

          {tab === "words" && (
            <div className="mt-5 space-y-3">
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
                      <button onClick={() => speakEnglish(word.item.en, "word")} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9f7f7] text-[#06999a]">
                        <Volume2 className="h-5 w-5" />
                      </button>
                      <button onClick={() => actions.toggleFavoriteWord(wordId)} className="text-slate-400">
                        <Star className={`h-7 w-7 ${favorited ? "fill-[#f6b73c] text-[#f6b73c]" : ""}`} />
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {tab === "dialogue" && (
            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={() => speakEnglishDialogue(dialogue.map((line) => line.en))}
                className="mb-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#06999a] text-base font-black text-white"
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
                        title="播放本句"
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
            <div className="mt-5 space-y-4">
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
                disabled={!canSaveQuiz}
                onClick={() => {
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
                }}
                className="h-14 w-full rounded-xl bg-[#06999a] text-lg font-black text-white disabled:bg-slate-300"
              >
                保存测验成绩
              </button>
              {!canSaveQuiz && <p className="text-center text-xs font-bold text-slate-400">答完全部题目后才能保存成绩</p>}
            </div>
          )}
        </div>
      </div>
      <BottomNav active="study" />
    </PhoneShell>
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
    <Card className="mt-5 p-5">
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
          <button onClick={onSpeak} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9f7f7] text-[#06999a]">
            <Volume2 className="h-6 w-6" />
          </button>
          <button onClick={onFavorite} className="text-slate-400">
            <Star className={`h-8 w-8 ${favorited ? "fill-[#f6b73c] text-[#f6b73c]" : ""}`} />
          </button>
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
