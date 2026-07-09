"use client";

import { useEffect, useMemo, useState } from "react";

export type LearningProgress = {
  checkedDays: number[];
  favoriteWords: string[];
  favoriteSentences: string[];
  quizScores: Record<string, number>;
  completedScenarios: string[];
  level?: "A1" | "A2" | "B1" | "B2";
  assessmentScore?: number;
  assessmentDate?: string;
  dailyChecks: Record<string, number>;
  weeklyScore?: number;
};

const STORAGE_KEY = "daily-english-learning-progress";

const initialProgress: LearningProgress = {
  checkedDays: [],
  favoriteWords: [],
  favoriteSentences: [],
  quizScores: {},
  completedScenarios: [],
  dailyChecks: {}
};

function readProgress(): LearningProgress {
  if (typeof window === "undefined") {
    return initialProgress;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? { ...initialProgress, ...JSON.parse(stored) } : initialProgress;
  } catch {
    return initialProgress;
  }
}

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(initialProgress);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [loaded, progress]);

  const actions = useMemo(
    () => ({
      toggleCheckIn(day: number) {
        setProgress((current) => ({
          ...current,
          checkedDays: current.checkedDays.includes(day)
            ? current.checkedDays.filter((item) => item !== day)
            : [...current.checkedDays, day].sort((a, b) => a - b)
        }));
      },
      toggleFavorite(sentenceId: string) {
        setProgress((current) => ({
          ...current,
          favoriteSentences: current.favoriteSentences.includes(sentenceId)
            ? current.favoriteSentences.filter((item) => item !== sentenceId)
            : [...current.favoriteSentences, sentenceId]
        }));
      },
      toggleFavoriteWord(wordId: string) {
        setProgress((current) => ({
          ...current,
          favoriteWords: current.favoriteWords.includes(wordId)
            ? current.favoriteWords.filter((item) => item !== wordId)
            : [...current.favoriteWords, wordId]
        }));
      },
      saveQuizScore(scenarioId: string, score: number) {
        setProgress((current) => ({
          ...current,
          quizScores: { ...current.quizScores, [scenarioId]: score },
          completedScenarios: score >= 8 && !current.completedScenarios.includes(scenarioId)
            ? [...current.completedScenarios, scenarioId]
            : current.completedScenarios
        }));
      },
      saveAssessment(score: number) {
        const level = score <= 3 ? "A1" : score <= 6 ? "A2" : score <= 8 ? "B1" : "B2";
        setProgress((current) => ({
          ...current,
          level,
          assessmentScore: score,
          assessmentDate: new Date().toISOString()
        }));
      },
      saveDailyCheck(day: number, score: number) {
        setProgress((current) => ({
          ...current,
          dailyChecks: { ...current.dailyChecks, [day]: score }
        }));
      },
      saveWeeklyScore(score: number) {
        setProgress((current) => ({
          ...current,
          weeklyScore: score
        }));
      }
    }),
    []
  );

  return { progress, loaded, actions };
}
