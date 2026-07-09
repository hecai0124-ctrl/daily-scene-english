"use client";

import Link from "next/link";
import { ArrowLeft, Star, Volume2 } from "lucide-react";
import { BottomNav, Card, PhoneShell } from "@/components/AppChrome";
import { content } from "@/lib/content";
import { useLearningProgress } from "@/lib/progress";
import { speakEnglish } from "@/lib/speech";

export function FavoriteReview() {
  const { progress } = useLearningProgress();
  const words = getFavoriteWords(progress.favoriteWords);
  const sentences = getFavoriteSentences(progress.favoriteSentences);

  function speak(text: string) {
    speakEnglish(text);
  }

  return (
    <PhoneShell>
      <div className="flex-1 overflow-y-auto bg-white px-5 pb-8">
        <header className="grid grid-cols-[40px_1fr_40px] items-center pt-5">
          <Link href="/weekly" className="text-slate-600">
            <ArrowLeft className="h-7 w-7" />
          </Link>
          <h1 className="text-center text-xl font-black">收藏复习</h1>
          <Star className="h-7 w-7 fill-[#f6b73c] text-[#f6b73c]" />
        </header>

        <Card className="mt-8 bg-[#fff9ed] p-5">
          <p className="text-sm font-bold text-[#b98512]">收藏内容</p>
          <h2 className="mt-1 text-2xl font-black">{words.length + sentences.length} 个待复习</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">包含单词 {words.length} 个，句子 {sentences.length} 句</p>
        </Card>

        <section className="mt-6">
          <h2 className="text-xl font-black">收藏单词</h2>
          <div className="mt-4 space-y-3">
            {words.length === 0 && <Empty text="还没有收藏单词" />}
            {words.map((word) => (
              <Card key={word.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-xs font-black text-[#06999a]">{word.scenario}</p>
                  <h3 className="mt-1 text-lg font-black">{word.en}</h3>
                  <p className="mt-1 text-sm font-bold text-slate-400">{word.zh}</p>
                </div>
                <button onClick={() => speak(word.en)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9f7f7] text-[#06999a]">
                  <Volume2 className="h-5 w-5" />
                </button>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-xl font-black">收藏句子</h2>
          <div className="mt-4 space-y-3">
            {sentences.length === 0 && <Empty text="还没有收藏句子" />}
            {sentences.map((sentence) => (
              <Card key={sentence.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-[#06999a]">{sentence.scenario}</p>
                    <h3 className="mt-2 text-lg font-black leading-7">{sentence.en}</h3>
                    <p className="mt-2 text-sm font-bold text-slate-400">{sentence.zh}</p>
                  </div>
                  <button onClick={() => speak(sentence.en)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9f7f7] text-[#06999a]">
                    <Volume2 className="h-5 w-5" />
                  </button>
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

function getFavoriteWords(ids: string[]) {
  return ids.flatMap((id) => {
    const [, scenarioId, indexValue] = id.split(":");
    const scenario = content.scenarios[scenarioId];
    const index = Number(indexValue);
    const word = scenario?.words[index];
    return word ? [{ id, scenario: scenario.title, ...word }] : [];
  });
}

function getFavoriteSentences(ids: string[]) {
  return ids.flatMap((id) => {
    const parts = id.includes(":") ? id.split(":") : ["sentence", ...id.split("-")];
    const [, scenarioId, indexValue] = parts;
    const scenario = content.scenarios[scenarioId];
    const index = Number(indexValue);
    const sentence = scenario?.sentences[index];
    return sentence ? [{ id, scenario: scenario.title, ...sentence }] : [];
  });
}
