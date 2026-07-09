"use client";

type SpeechTone = "word" | "sentence" | "dialogue";

let speechRunId = 0;

export function speakEnglish(text: string, tone: SpeechTone = "sentence") {
  void speakEnglishQueue([text], tone);
}

export function speakEnglishDialogue(lines: string[]) {
  void speakEnglishQueue(lines, "dialogue");
}

async function speakEnglishQueue(lines: string[], tone: SpeechTone) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  const currentRunId = speechRunId + 1;
  speechRunId = currentRunId;
  window.speechSynthesis.cancel();

  const voice = await getPreferredExpressiveEnglishVoice();

  for (const line of lines) {
    if (speechRunId !== currentRunId) {
      return;
    }

    const chunks = splitIntoNaturalChunks(line);
    for (const chunk of chunks) {
      if (speechRunId !== currentRunId) {
        return;
      }
      await speakChunk(chunk, tone, voice);
      await wait(tone === "dialogue" ? 180 : 80);
    }

    if (tone === "dialogue") {
      await wait(320);
    }
  }
}

function speakChunk(text: string, tone: SpeechTone, voice?: SpeechSynthesisVoice) {
  return new Promise<void>((resolve) => {
    const utterance = new SpeechSynthesisUtterance(cleanSpeechText(text));
    const prosody = getProsody(text, tone);

    utterance.lang = "en-US";
    utterance.rate = prosody.rate;
    utterance.pitch = prosody.pitch;
    utterance.volume = 1;

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

function getProsody(text: string, tone: SpeechTone) {
  const lowerText = text.toLowerCase();
  const isQuestion = text.trim().endsWith("?");
  const isPoliteRequest = /\b(could|would|may|can|please|i'd like|i would like|may i|could i)\b/.test(lowerText);
  const isShortWord = tone === "word" || text.trim().split(/\s+/).length <= 2;

  if (isShortWord) {
    return { rate: 0.72, pitch: 1.08 };
  }

  if (isQuestion) {
    return { rate: 0.78, pitch: 1.18 };
  }

  if (isPoliteRequest) {
    return { rate: 0.76, pitch: 1.12 };
  }

  if (tone === "dialogue") {
    return { rate: 0.8, pitch: 1.1 };
  }

  return { rate: 0.82, pitch: 1.08 };
}

function splitIntoNaturalChunks(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  const chunks = normalized.match(/[^.!?]+[.!?]?/g) ?? [normalized];
  return chunks.map((chunk) => chunk.trim()).filter(Boolean);
}

function cleanSpeechText(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/([,;:])/g, "$1 ")
    .trim();
}

async function getPreferredExpressiveEnglishVoice() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return undefined;
  }

  let voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    await wait(120);
    voices = window.speechSynthesis.getVoices();
  }

  const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));
  const preferredNames = [
    "neural",
    "natural",
    "enhanced",
    "premium",
    "jenny",
    "aria",
    "ava",
    "emma",
    "joanna",
    "salli",
    "samantha",
    "victoria",
    "karen",
    "susan",
    "zira",
    "serena"
  ];

  return (
    englishVoices.find((voice) => preferredNames.some((name) => voice.name.toLowerCase().includes(name))) ??
    englishVoices.find((voice) => voice.lang.toLowerCase() === "en-us") ??
    englishVoices[0]
  );
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
