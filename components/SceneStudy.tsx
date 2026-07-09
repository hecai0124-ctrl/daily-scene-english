"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, Languages, Star, Volume2 } from "lucide-react";
import { BottomNav, Card, PhoneShell } from "@/components/AppChrome";
import { type Category, type Scenario } from "@/lib/content";
import { useLearningProgress } from "@/lib/progress";
import { speakEnglish, speakEnglishDialogue } from "@/lib/speech";

type SceneStudyProps = {
  category: Category;
  scenarios: Scenario[];
};

type Tab = "words" | "sentences" | "dialogue" | "quiz";

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "words", label: "单词" },
  { id: "sentences", label: "句子" },
  { id: "dialogue", label: "对话" },
  { id: "quiz", label: "测验" }
];

export function SceneStudy({ scenarios }: SceneStudyProps) {
  const [activeId, setActiveId] = useState(scenarios[0]?.id);
  const [tab, setTab] = useState<Tab>("sentences");
  const [showZh, setShowZh] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { progress, actions } = useLearningProgress();
  const active = scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0];
  const score = active.quiz.filter((item) => answers[item.id] === item.answer).length;
  const allAnswered = active.quiz.every((item) => answers[item.id]);

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
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${
                active.id === scenario.id ? "bg-[#06999a] text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {scenario.title}
            </button>
          ))}
        </div>

        <nav className="mt-3 grid grid-cols-4 border-b border-slate-100 px-5">
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
                {active.sentences.slice(0, 8).map((sentence, index) => {
                  const id = `sentence:${active.id}:${index}`;
                  const legacyId = `${active.id}-${index}`;
                  const favorited = progress.favoriteSentences.includes(id) || progress.favoriteSentences.includes(legacyId);
                  return (
                    <SentenceCard
                      key={id}
                      en={sentence.en}
                      zh={sentence.zh}
                      showZh={showZh}
                      onSpeak={() => speak(sentence.en)}
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
              {active.words.slice(0, 20).map((word, index) => {
                const wordId = `word:${active.id}:${index}`;
                const favorited = progress.favoriteWords.includes(wordId);
                return (
                <Card key={word.en} className="flex items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <h2 className="text-lg font-black">{word.en}</h2>
                      {showZh && <p className="mt-1 text-sm font-bold text-slate-400">{word.zh}</p>}
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <button onClick={() => speakEnglish(word.en, "word")} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9f7f7] text-[#06999a]">
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
                onClick={() => speakEnglishDialogue(active.dialogue.map((line) => line.en))}
                className="mb-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#06999a] text-base font-black text-white"
              >
                <Volume2 className="h-5 w-5" />
                播放整段对话
              </button>
              {active.dialogue.map((line, index) => (
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

          {tab === "quiz" && (
            <div className="mt-5 space-y-4">
              <Card className="bg-[#f4fbfb] p-5">
                <p className="text-sm font-bold text-[#06999a]">当前得分</p>
                <h2 className="mt-1 text-3xl font-black">{score}/{active.quiz.length}</h2>
              </Card>
              {active.quiz.map((item, index) => (
                <Card key={item.id} className="p-4">
                  <h3 className="font-black">{index + 1}. {item.question}</h3>
                  <div className="mt-3 space-y-2">
                    {item.options.map((option) => {
                      const selected = answers[item.id] === option;
                      return (
                        <button
                          key={option}
                          onClick={() => setAnswers((current) => ({ ...current, [item.id]: option }))}
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
              <button
                disabled={!allAnswered}
                onClick={() => {
                  const mistakes = active.quiz
                    .filter((item) => answers[item.id] !== item.answer)
                    .map((item) => ({
                      id: `${active.id}:${item.id}`,
                      source: `${active.title}测验`,
                      question: item.question,
                      answer: item.answer,
                      userAnswer: answers[item.id]
                    }));
                  actions.saveQuizScore(active.id, score, mistakes);
                }}
                className="h-14 w-full rounded-xl bg-[#06999a] text-lg font-black text-white disabled:bg-slate-300"
              >
                保存测验成绩
              </button>
              {!allAnswered && <p className="text-center text-xs font-bold text-slate-400">答完全部题目后才能保存成绩</p>}
            </div>
          )}
        </div>
      </div>
      <BottomNav active="study" />
    </PhoneShell>
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
