export type WorkExpression = {
  en: string;
  zh: string;
};

export type WorkPlanDay = {
  day: number;
  week: number;
  workPhase: string;
  travelPhase: string;
  title: string;
  workSituation: string;
  travelSituation: string;
  level: "基础" | "进阶" | "实战";
  workVocabulary: string[];
  travelVocabulary: string[];
  workExpressions: WorkExpression[];
  travelExpressions: WorkExpression[];
  listening: string;
  speaking: string;
  reading: string;
  output: string;
  review: string;
  scenario: string;
  travelScenario: string;
  workScenarios: string[];
  travelScenarios: string[];
};

type WeekModule = {
  phase: string;
  situation: string;
  scenario: string;
  vocabulary: string[];
  expressions: WorkExpression[];
};

type TravelModule = {
  phase: string;
  situation: string;
  scenario: string;
  vocabulary: string[];
  expressions: WorkExpression[];
};

const weekModules: WeekModule[] = [
  {
    phase: "入职与自我介绍",
    situation: "认识团队、介绍背景、说明职责",
    scenario: "meeting",
    vocabulary: ["onboarding", "role", "responsibility", "background", "strength", "handover", "stakeholder"],
    expressions: [
      { en: "I recently joined the team as a business analyst.", zh: "我最近以业务分析师的身份加入团队。" },
      { en: "My main responsibility is to support e-commerce operations.", zh: "我的主要职责是支持电商运营。" },
      { en: "I am still getting familiar with the workflow.", zh: "我还在熟悉工作流程。" }
    ]
  },
  {
    phase: "会议表达",
    situation: "开会、插话、确认结论和下一步",
    scenario: "meeting",
    vocabulary: ["agenda", "priority", "decision", "alignment", "action item", "timeline", "blocker"],
    expressions: [
      { en: "Could we align on the key priorities first?", zh: "我们可以先对齐关键优先级吗？" },
      { en: "Let me clarify the next steps.", zh: "我来确认一下下一步。" },
      { en: "I have one concern about the timeline.", zh: "我对时间线有一个担忧。" }
    ]
  },
  {
    phase: "商务邮件",
    situation: "写清目的、背景、请求和截止时间",
    scenario: "email",
    vocabulary: ["subject line", "attachment", "deadline", "request", "follow-up", "confirmation", "context"],
    expressions: [
      { en: "I am writing to follow up on the campaign plan.", zh: "我写邮件是想跟进活动计划。" },
      { en: "Please find the latest report attached.", zh: "请查看附件中的最新报告。" },
      { en: "Could you confirm by Friday?", zh: "你可以在周五前确认吗？" }
    ]
  },
  {
    phase: "数据汇报",
    situation: "解释销售、流量、转化和异常波动",
    scenario: "reporting",
    vocabulary: ["revenue", "conversion rate", "traffic", "average order value", "drop", "increase", "insight"],
    expressions: [
      { en: "Revenue increased by twelve percent week over week.", zh: "收入环比增长了 12%。" },
      { en: "The conversion rate dropped mainly because of lower traffic quality.", zh: "转化率下降主要是因为流量质量降低。" },
      { en: "The key insight is that repeat buyers performed better.", zh: "关键洞察是复购用户表现更好。" }
    ]
  },
  {
    phase: "跨团队协作",
    situation: "和产品、设计、运营、供应链协同推进",
    scenario: "meeting",
    vocabulary: ["collaboration", "dependency", "owner", "scope", "handoff", "feedback", "trade-off"],
    expressions: [
      { en: "Who will be the owner for this task?", zh: "这个任务由谁负责？" },
      { en: "This depends on the product team's timeline.", zh: "这取决于产品团队的时间线。" },
      { en: "We may need to make a trade-off here.", zh: "这里我们可能需要做一个取舍。" }
    ]
  },
  {
    phase: "项目推进",
    situation: "拆解任务、同步进度、暴露风险",
    scenario: "meeting",
    vocabulary: ["milestone", "risk", "status update", "launch", "delay", "resource", "scope creep"],
    expressions: [
      { en: "We are on track for the launch.", zh: "我们按计划推进上线。" },
      { en: "The main risk is limited design resources.", zh: "主要风险是设计资源有限。" },
      { en: "Can we reduce the scope for the first version?", zh: "我们可以缩小第一版范围吗？" }
    ]
  },
  {
    phase: "电商运营",
    situation: "活动、商品、库存、订单和店铺表现",
    scenario: "reporting",
    vocabulary: ["campaign", "promotion", "inventory", "stockout", "order volume", "listing", "refund rate"],
    expressions: [
      { en: "The promotion drove a clear increase in order volume.", zh: "促销明显带动了订单量增长。" },
      { en: "We need to monitor inventory more closely.", zh: "我们需要更密切地监控库存。" },
      { en: "The refund rate is higher than expected.", zh: "退款率高于预期。" }
    ]
  },
  {
    phase: "客户与供应商沟通",
    situation: "处理需求、投诉、报价和交付承诺",
    scenario: "client",
    vocabulary: ["requirement", "complaint", "quotation", "delivery", "compensation", "resolution", "expectation"],
    expressions: [
      { en: "I understand your concern, and we are looking into it.", zh: "我理解你的担忧，我们正在调查。" },
      { en: "Could you share more details about your requirements?", zh: "你可以分享更多需求细节吗？" },
      { en: "We will provide a resolution by tomorrow.", zh: "我们明天前会提供解决方案。" }
    ]
  },
  {
    phase: "数据分析与建议",
    situation: "从现象到原因，再到业务动作",
    scenario: "reporting",
    vocabulary: ["hypothesis", "segment", "benchmark", "root cause", "recommendation", "impact", "trend"],
    expressions: [
      { en: "My hypothesis is that price sensitivity increased.", zh: "我的假设是价格敏感度上升了。" },
      { en: "Compared with the benchmark, this segment underperformed.", zh: "和基准相比，这个人群表现较弱。" },
      { en: "My recommendation is to test a smaller discount first.", zh: "我的建议是先测试一个较小的折扣。" }
    ]
  },
  {
    phase: "外企面试准备",
    situation: "回答经历、项目、优势和职业动机",
    scenario: "meeting",
    vocabulary: ["achievement", "challenge", "ownership", "impact", "leadership", "adaptability", "career goal"],
    expressions: [
      { en: "One project I am proud of is a marketplace campaign.", zh: "我比较自豪的一个项目是平台活动。" },
      { en: "I took ownership of the reporting process.", zh: "我负责了汇报流程。" },
      { en: "I want to work in a more international environment.", zh: "我希望在更国际化的环境中工作。" }
    ]
  },
  {
    phase: "冲突与谈判",
    situation: "礼貌表达不同意见、争取资源和推动共识",
    scenario: "client",
    vocabulary: ["concern", "constraint", "alternative", "negotiate", "compromise", "escalate", "mutual agreement"],
    expressions: [
      { en: "I see your point, but I have a different view.", zh: "我理解你的观点，但我有不同看法。" },
      { en: "Given the constraint, could we consider an alternative?", zh: "考虑到限制，我们可以考虑一个替代方案吗？" },
      { en: "Let's find a solution that works for both sides.", zh: "我们找一个双方都可接受的方案。" }
    ]
  },
  {
    phase: "综合实战",
    situation: "用英语完成完整工作闭环",
    scenario: "meeting",
    vocabulary: ["business case", "proposal", "execution", "result", "learning", "next step", "retrospective"],
    expressions: [
      { en: "Here is the business case behind this proposal.", zh: "这是这个方案背后的业务理由。" },
      { en: "The result was positive, but we still have room to improve.", zh: "结果是正向的，但仍有优化空间。" },
      { en: "For the next step, I suggest we scale the test.", zh: "下一步我建议扩大测试。" }
    ]
  }
];

const travelModules: TravelModule[] = [
  {
    phase: "机场出行",
    situation: "值机、安检、登机、转机和行李问题",
    scenario: "airport",
    vocabulary: ["boarding pass", "check-in counter", "gate", "delay", "transfer", "baggage claim", "aisle seat"],
    expressions: [
      { en: "I'd like to check in for my flight.", zh: "我想办理航班值机。" },
      { en: "Could you tell me where the security checkpoint is?", zh: "请问安检口在哪里？" },
      { en: "My suitcase has not arrived yet.", zh: "我的行李箱还没有到。" }
    ]
  },
  {
    phase: "酒店住宿",
    situation: "入住、设施、维修、续住和退房",
    scenario: "hotel",
    vocabulary: ["reservation", "front desk", "room key", "amenity", "checkout", "housekeeping", "deposit"],
    expressions: [
      { en: "I have a reservation under Wang.", zh: "我用王先生的名字预订了房间。" },
      { en: "The air conditioner in my room is not working.", zh: "我房间的空调坏了。" },
      { en: "Could I get a late checkout?", zh: "我可以延迟退房吗？" }
    ]
  },
  {
    phase: "餐厅点餐",
    situation: "入座、推荐、口味、过敏、结账和打包",
    scenario: "restaurant",
    vocabulary: ["menu", "reservation", "recommendation", "spicy", "allergy", "bill", "receipt"],
    expressions: [
      { en: "Do you have a table for two?", zh: "有两人桌吗？" },
      { en: "Could you make it less spicy?", zh: "可以少放辣吗？" },
      { en: "Could we have the bill, please?", zh: "请给我们账单好吗？" }
    ]
  },
  {
    phase: "问路交通",
    situation: "问路、地铁、公交、换乘和确认方向",
    scenario: "directions",
    vocabulary: ["direction", "subway station", "bus stop", "transfer", "intersection", "landmark", "walking distance"],
    expressions: [
      { en: "Excuse me, how do I get to the station?", zh: "打扰一下，我怎么去车站？" },
      { en: "Which subway line should I take?", zh: "我应该坐哪条地铁线？" },
      { en: "Could you show me on the map?", zh: "你能在地图上指给我看吗？" }
    ]
  }
];

const dailyRoutines = [
  {
    title: "输入日：建立语感",
    listening: "旅行和工作各听 5 分钟，重点抓关键词，不暂停逐句翻译。",
    speaking: "旅行句和工作句各跟读 3 句，每句 3 遍，注意重音和停顿。",
    reading: "阅读一段旅行提示或职场材料，划出目的、动作和关键信息。",
    output: "各写 2 句今天能直接使用的旅行/工作英文。"
  },
  {
    title: "表达日：说清楚观点",
    listening: "听一段旅行问答和一段会议/访谈，记录 3 个高频句。",
    speaking: "各用 45 秒完成一个旅行求助和一个工作说明。",
    reading: "读一封英文邮件或一段出行说明，标出请求、原因和下一步。",
    output: "录一段 90 秒英文口述，覆盖旅行 + 工作两个场景。"
  },
  {
    title: "邮件日：写清楚请求",
    listening: "听 5 分钟商务英语，再听 3 分钟旅行服务对话。",
    speaking: "把今天的表达改成自己的旅行和工作版本并读出来。",
    reading: "阅读一封英文邮件或一段酒店/航班通知。",
    output: "写一封 80-120 词英文邮件，另写 3 句旅行需求。"
  },
  {
    title: "会议日：参与讨论",
    listening: "听会议片段，外加一个旅行服务对话，记录确认信息的表达。",
    speaking: "练习 3 轮：旅行问询、工作提问、确认下一步。",
    reading: "阅读一份会议纪要或一段交通说明，找出关键动作。",
    output: "写一段 5 行会议纪要，再写 2 句路线/服务确认。"
  },
  {
    title: "汇报日：用数据讲业务",
    listening: "听一段数据汇报，再听一段航班/酒店信息，记录数字和时间。",
    speaking: "用 90 秒汇报一个工作指标，再用 45 秒说明旅行需求。",
    reading: "阅读一段电商数据或旅行规则，拆成信息、原因、动作。",
    output: "写 4 句数据汇报英文，再写 2 句旅行安排。"
  },
  {
    title: "复盘日：纠正卡点",
    listening: "重听本周最难的旅行和工作材料，补齐没听懂的关键词。",
    speaking: "重录本周最难的旅行/工作表达，和第一遍对比。",
    reading: "复读本周材料，整理 8 个高频搭配。",
    output: "整理本周错词、错句和替代表达，分旅行/工作两栏。"
  },
  {
    title: "模拟日：真实场景演练",
    listening: "先听后说：听旅行和工作各一个问题，立即用英文回应。",
    speaking: "完成 3 分钟角色扮演：一次出行沟通 + 一次同事/客户沟通。",
    reading: "快速读一段业务背景或旅行说明，用英文总结重点。",
    output: "完成一个小测或写一段英文复盘。"
  }
];

const levels: WorkPlanDay["level"][] = ["基础", "基础", "进阶", "进阶", "进阶", "实战", "实战"];
const travelScenarioIds = ["airport", "hotel", "restaurant", "directions", "shopping", "sightseeing", "pharmacy", "payment", "phone", "emergency", "car_rental", "services"];
const workScenarioIds = ["meeting", "email", "reporting", "client", "interview", "onboarding", "project", "ecommerce", "collaboration", "performance", "workplace_social", "remote"];

export const workPlanDays: WorkPlanDay[] = Array.from({ length: 30 }, (_, index) => {
  const day = index + 1;
  const module = weekModules[Math.min(Math.floor(index / 7), weekModules.length - 1)];
  const travelModule = travelModules[index % travelModules.length];
  const routine = dailyRoutines[index % dailyRoutines.length];
  const week = Math.min(Math.floor(index / 7) + 1, 5);
  const travelScenarios = pickDailyScenarios(travelScenarioIds, index);
  const workScenarios = pickDailyScenarios(workScenarioIds, index);
  const vocabStart = index % module.vocabulary.length;
  const vocabulary = Array.from({ length: 5 }, (__, offset) => module.vocabulary[(vocabStart + offset) % module.vocabulary.length]);
  const expressionStart = index % module.expressions.length;
  const expressions = Array.from({ length: 3 }, (__, offset) => module.expressions[(expressionStart + offset) % module.expressions.length]);
  const travelVocabStart = index % travelModule.vocabulary.length;
  const travelVocabulary = Array.from({ length: 4 }, (__, offset) => travelModule.vocabulary[(travelVocabStart + offset) % travelModule.vocabulary.length]);
  const travelExpressionStart = index % travelModule.expressions.length;
  const travelExpressions = Array.from({ length: 2 }, (__, offset) => travelModule.expressions[(travelExpressionStart + offset) % travelModule.expressions.length]);

  return {
    day,
    week,
    workPhase: module.phase,
    travelPhase: travelModule.phase,
    title: `${routine.title} · 旅行 + 工作`,
    workSituation: module.situation,
    travelSituation: travelModule.situation,
    level: levels[index % levels.length],
    workVocabulary: vocabulary,
    travelVocabulary,
    workExpressions: expressions,
    travelExpressions,
    listening: routine.listening,
    speaking: routine.speaking,
    reading: routine.reading,
    output: routine.output,
    review: day % 7 === 0 ? "完成本周复盘：挑 1 个旅行场景和 1 个工作场景，用英文各说 90 秒。" : "睡前用英文复述今天最有用的旅行句和工作句各 2 句。",
    scenario: workScenarios[0],
    travelScenario: travelScenarios[0],
    workScenarios,
    travelScenarios
  };
});

function pickDailyScenarios(ids: string[], dayIndex: number) {
  return Array.from({ length: 3 }, (_, offset) => ids[(dayIndex * 3 + offset) % ids.length]);
}

export function getWorkPlanDay(day: number) {
  return workPlanDays[Math.min(Math.max(day, 1), workPlanDays.length) - 1];
}

export function getWeekDays(week: number) {
  return workPlanDays.filter((item) => item.week === week);
}
