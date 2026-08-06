import type { QuizItem, Scenario } from "@/lib/content";
import { workPlanDays } from "@/lib/workPlan";

export type DailyItem<T> = {
  item: T;
  index: number;
};

export function getScenarioVisitIndex(currentDay: number, scenarioId: string) {
  const day = Math.min(Math.max(currentDay, 1), workPlanDays.length);
  let visits = 0;

  for (const plan of workPlanDays.slice(0, day)) {
    const dayScenarios = [
      ...(plan.travelScenarios ?? [plan.travelScenario]),
      ...(plan.workScenarios ?? [plan.scenario])
    ];

    if (dayScenarios.includes(scenarioId)) {
      visits += 1;
    }
  }

  return Math.max(visits, 1);
}

export function getScenarioTotalVisits(scenarioId: string) {
  return Math.max(
    workPlanDays.filter((plan) => {
      const dayScenarios = [
        ...(plan.travelScenarios ?? [plan.travelScenario]),
        ...(plan.workScenarios ?? [plan.scenario])
      ];
      return dayScenarios.includes(scenarioId);
    }).length,
    1
  );
}

export function getDailyItems<T>(items: T[], visitIndex: number, count: number, totalVisits = 1): DailyItem<T>[] {
  if (items.length === 0) {
    return [];
  }

  const safeVisitIndex = Math.min(Math.max(visitIndex, 1), Math.max(totalVisits, 1));
  const enoughForFixedGroups = items.length >= totalVisits * count;
  const start = enoughForFixedGroups
    ? (safeVisitIndex - 1) * count
    : Math.floor(((safeVisitIndex - 1) * items.length) / totalVisits);
  const end = enoughForFixedGroups
    ? start + count
    : Math.floor((safeVisitIndex * items.length) / totalVisits);
  const dailyItems = items.slice(start, Math.max(end, start + 1));

  return dailyItems.map((item, offset) => ({
    item,
    index: start + offset
  }));
}

export function getDailyWords(scenario: Scenario, currentDay: number) {
  return getDailyItems(scenario.words, getScenarioVisitIndex(currentDay, scenario.id), 10, getScenarioTotalVisits(scenario.id));
}

export function getDailySentences(scenario: Scenario, currentDay: number) {
  return getDailyItems(scenario.sentences, getScenarioVisitIndex(currentDay, scenario.id), 5, getScenarioTotalVisits(scenario.id));
}

export function getDailyQuiz(scenario: Scenario, currentDay: number) {
  return getDailyItems(scenario.quiz, getScenarioVisitIndex(currentDay, scenario.id), 5, getScenarioTotalVisits(scenario.id));
}

export function getDailyQuizKey(scenarioId: string, currentDay: number) {
  return `${scenarioId}:day-${currentDay}`;
}

export function getShuffledQuizOptions(item: QuizItem, scenarioId: string, currentDay: number) {
  return shuffleWithSeed(item.options, `${scenarioId}:${currentDay}:${item.id}`);
}

function shuffleWithSeed<T>(items: T[], seed: string) {
  const result = [...items];
  let state = hashSeed(seed);

  for (let index = result.length - 1; index > 0; index -= 1) {
    state = nextRandomState(state);
    const swapIndex = state % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function hashSeed(seed: string) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function nextRandomState(state: number) {
  return (Math.imul(state, 1664525) + 1013904223) >>> 0;
}
