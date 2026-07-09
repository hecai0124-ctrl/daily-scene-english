import { content, getScenario, type DayPlan } from "@/lib/content";

export type TaskItem = {
  label: string;
  minutes: string;
  detail: string;
};

export const levelCopy = {
  A1: {
    title: "A1 基础生存英语",
    description: "先把高频词和固定句型说顺，重点解决开口和听懂关键词。"
  },
  A2: {
    title: "A2 常见场景沟通",
    description: "能完成旅行基本沟通，并开始适应外企日常表达。"
  },
  B1: {
    title: "B1 独立处理任务",
    description: "能围绕旅行突发情况、会议和客户沟通做较完整表达。"
  },
  B2: {
    title: "B2 职场进阶表达",
    description: "训练更自然、更有逻辑的外企会议、汇报和协商表达。"
  }
} as const;

export function getDailyTasks(day: DayPlan, level: keyof typeof levelCopy = "A2"): TaskItem[] {
  const travel = getScenario(day.travel);
  const work = getScenario(day.work);
  const wordCount = level === "A1" ? 10 : level === "A2" ? 14 : 18;
  const sentenceCount = level === "A1" ? 6 : level === "A2" ? 8 : 12;

  return [
    {
      label: "词汇",
      minutes: "8 分钟",
      detail: `学习 ${wordCount} 个词：${travel.title} + ${work.title} 高频表达`
    },
    {
      label: "句子",
      minutes: "10 分钟",
      detail: `掌握 ${sentenceCount} 个可直接开口的句子，先读懂再跟读`
    },
    {
      label: "听力",
      minutes: "6 分钟",
      detail: "播放英文句子和对话，先听关键词，再看中文确认"
    },
    {
      label: "口语",
      minutes: "6 分钟",
      detail: "跟读 3 轮，然后用自己的信息替换句子里的关键词"
    },
    {
      label: "小测",
      minutes: "5 分钟",
      detail: "完成 5-10 题抽查，低于 80% 自动进入复习"
    }
  ];
}

export function getWeeklyReviewItems() {
  return [
    "旅行：机场、酒店、点餐、问路能否不看中文完成核心表达",
    "工作：会议、邮件、汇报、客户沟通是否能说明目的和下一步",
    "听力：是否能听出关键词、数字、时间、地点和请求",
    "口语：是否能用完整句回答，而不是只说单词"
  ];
}

export function getSevenDayRoadmap() {
  return content.days.map((day) => ({
    ...day,
    travelTitle: getScenario(day.travel).title,
    workTitle: getScenario(day.work).title
  }));
}
