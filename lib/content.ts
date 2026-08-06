import rawContent from "@/data/content.json";
import { expandContent } from "@/lib/contentExpansion";

export type Category = "travel" | "work";

export type WordItem = {
  en: string;
  zh: string;
  example: string;
};

export type SentenceItem = {
  en: string;
  zh: string;
  scene: string;
};

export type DialogueLine = {
  speaker: "A" | "B";
  en: string;
  zh: string;
};

export type QuizItem = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

export type Scenario = {
  id: string;
  category: Category;
  title: string;
  subtitle: string;
  words: WordItem[];
  sentences: SentenceItem[];
  dialogue: DialogueLine[];
  quiz: QuizItem[];
};

export type DayPlan = {
  day: number;
  title: string;
  focus: string;
  travel: string;
  work: string;
};

type Content = {
  days: DayPlan[];
  scenarios: Record<string, Scenario>;
};

export type { Content };

export const content = expandContent(rawContent as Content);

export function getTodayPlan() {
  const index = new Date().getDay() % content.days.length;
  return content.days[index];
}

export function getScenario(id: string) {
  return content.scenarios[id];
}

export function getScenariosByCategory(category: Category) {
  return Object.values(content.scenarios).filter((scenario) => scenario.category === category);
}

export function getCategoryLabel(category: Category) {
  return category === "travel" ? "旅行英语" : "工作英语";
}
