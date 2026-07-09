"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ChevronRight, Check, Headphones, MessageSquare, Mic, SpellCheck } from "lucide-react";
import { Card, PhoneShell } from "@/components/AppChrome";
import { levelCopy } from "@/lib/learningPlan";
import { useLearningProgress } from "@/lib/progress";

const questions = [
  { type: "词汇测评", icon: <SpellCheck className="h-8 w-8" />, color: "bg-[#27c0a6]", question: "Which phrase means “办理值机”？", options: ["check in", "check out", "get off", "turn down"], answer: "check in", desc: "评估词汇量与词汇运用能力" },
  { type: "听力理解", icon: <Headphones className="h-8 w-8" />, color: "bg-[#ff7a45]", question: "听到 “Could you make it less spicy?”，对方想表达什么？", options: ["少放辣", "多放盐", "换座位", "开发票"], answer: "少放辣", desc: "评估听懂日常对话和信息的能力" },
  { type: "句子理解", icon: <MessageSquare className="h-8 w-8" />, color: "bg-[#2f6fe4]", question: "“我会会后发送会议纪要”应该怎么说？", options: ["I will send the meeting minutes after this call.", "I will make the meeting after this call.", "I will close the meeting minutes.", "I will take the meeting to email."], answer: "I will send the meeting minutes after this call.", desc: "评估理解句子结构与语义的能力" },
  { type: "口语自评", icon: <Mic className="h-8 w-8" />, color: "bg-[#7457d8]", question: "你能否不看中文，说出一句外企会议里的下一步安排？", options: ["能完整说出", "能说关键词", "需要看提示", "完全不会"], answer: "能完整说出", desc: "评估口语表达与流利度" }
];

export function Assessment() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { actions } = useLearningProgress();
  const score = questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0);
  const normalizedScore = Math.round((score / questions.length) * 10);
  const level = normalizedScore <= 3 ? "A1" : normalizedScore <= 6 ? "A2" : normalizedScore <= 8 ? "B1" : "B2";

  function submit() {
    actions.saveAssessment(normalizedScore);
    setSubmitted(true);
  }

  return (
    <PhoneShell>
      <div className="flex-1 overflow-y-auto bg-white px-5 pb-8">
        <header className="grid grid-cols-[40px_1fr_40px] items-center pt-5">
          <Link href="/" className="text-slate-600">
            <ArrowLeft className="h-7 w-7" />
          </Link>
          <h1 className="text-center text-xl font-black">水平测评</h1>
          <span />
        </header>

        {!started ? (
          <>
            <section className="pt-14 text-center">
              <h2 className="text-2xl font-black">5 大维度 · 全面评估你的英语水平</h2>
              <p className="mt-3 text-sm font-semibold text-slate-400">约需 20 分钟，精准定位你的薄弱项</p>
            </section>

            <section className="mt-10 space-y-5">
              {questions.map((item) => (
                <button key={item.type} type="button" onClick={() => setStarted(true)} className="block w-full text-left">
                <Card className="flex items-center gap-5 p-5 transition active:scale-[0.99]">
                  <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-white ${item.color}`}>{item.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-black">{item.type}</span>
                    <span className="mt-1 block text-sm font-semibold text-slate-400">{item.desc}</span>
                  </span>
                  <ChevronRight className="h-6 w-6 shrink-0 text-slate-400" />
                </Card>
                </button>
              ))}
            </section>

            <button
              type="button"
              onClick={() => setStarted(true)}
              className="mt-10 flex h-16 w-full items-center justify-center rounded-xl bg-[#06999a] text-xl font-black text-white shadow-[0_12px_24px_rgba(6,153,154,0.28)]"
            >
              开始测评
            </button>
            <p className="mt-6 text-center text-sm font-semibold text-slate-400">测评结果仅自己可见</p>
          </>
        ) : (
          <>
            {submitted && (
              <Card className="mt-6 bg-[#f4fbfb] p-5">
                <p className="text-sm font-bold text-[#06999a]">测评结果：{score}/{questions.length}</p>
                <h2 className="mt-1 text-2xl font-black">{levelCopy[level].title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{levelCopy[level].description}</p>
                <Link href="/" className="mt-4 flex h-12 items-center justify-center rounded-xl bg-[#06999a] text-base font-black text-white">
                  查看今日学习任务
                </Link>
              </Card>
            )}

            <section className="mt-6 space-y-4">
              {questions.map((item, index) => (
                <Card key={item.question} className="p-5">
                  <p className="text-xs font-black text-[#06999a]">{item.type}</p>
                  <h2 className="mt-2 text-lg font-black leading-7">{index + 1}. {item.question}</h2>
                  <div className="mt-4 space-y-2">
                    {item.options.map((option) => {
                      const selected = answers[index] === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setAnswers((current) => ({ ...current, [index]: option }))}
                          className={`flex min-h-12 w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold ${
                            selected ? "bg-[#e7f6f6] text-[#06999a]" : "bg-slate-50 text-slate-600"
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
            </section>

            {!submitted && (
              <button
                type="button"
                disabled={Object.keys(answers).length < questions.length}
                onClick={submit}
                className="sticky bottom-5 mt-6 flex h-14 w-full items-center justify-center rounded-xl bg-[#06999a] text-lg font-black text-white shadow-lg disabled:bg-slate-300"
              >
                提交测评
              </button>
            )}
          </>
        )}
      </div>
    </PhoneShell>
  );
}
