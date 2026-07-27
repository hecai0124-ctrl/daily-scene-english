import type { Scenario } from "@/lib/content";
import { workPlanDays } from "@/lib/workPlan";

export type DailyItem<T> = {
  item: T;
  index: number;
};

export function getScenarioVisitIndex(currentDay: number, scenarioId: string) {
  const day = Math.min(Math.max(currentDay, 1), workPlanDays.length);
  const visits = workPlanDays
    .slice(0, day)
    .filter((plan) => plan.scenario === scenarioId || plan.travelScenario === scenarioId)
    .length;

  return Math.max(visits, 1);
}

export function getDailyItems<T>(items: T[], visitIndex: number, count: number): DailyItem<T>[] {
  if (items.length === 0) {
    return [];
  }

  const safeCount = Math.min(count, items.length);
  const start = ((visitIndex - 1) * safeCount) % items.length;
  return Array.from({ length: safeCount }, (_, offset) => {
    const index = (start + offset) % items.length;
    return { item: items[index], index };
  });
}

export function getDailyWords(scenario: Scenario, currentDay: number) {
  return getDailyItems(scenario.words, getScenarioVisitIndex(currentDay, scenario.id), 10);
}

export function getDailySentences(scenario: Scenario, currentDay: number) {
  return getDailyItems(scenario.sentences, getScenarioVisitIndex(currentDay, scenario.id), 5);
}

export function getDailyQuiz(scenario: Scenario, currentDay: number) {
  return getDailyItems(scenario.quiz, getScenarioVisitIndex(currentDay, scenario.id), 5);
}

export function getDailyQuizKey(scenarioId: string, currentDay: number) {
  return `${scenarioId}:day-${currentDay}`;
}
