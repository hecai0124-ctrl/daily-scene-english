import type { DialogueLine, Scenario } from "@/lib/content";
import { getScenarioVisitIndex } from "@/lib/dailyContent";

const dialogueSets: Record<string, DialogueLine[][]> = {
  airport: [
    [
      { speaker: "A", en: "Hi, I'd like to check in for my flight to Singapore.", zh: "你好，我想办理去新加坡的航班值机。" },
      { speaker: "B", en: "Sure. May I see your passport and booking reference?", zh: "当然。请给我看一下您的护照和预订编号好吗？" },
      { speaker: "A", en: "Here they are. I also have one checked bag.", zh: "给您。我还有一件托运行李。" },
      { speaker: "B", en: "Your bag is within the limit. Would you prefer a window or an aisle seat?", zh: "您的行李没有超重。您想要靠窗还是靠过道的座位？" },
      { speaker: "A", en: "An aisle seat would be great, please.", zh: "请给我靠过道的座位。" },
      { speaker: "B", en: "No problem. Here is your boarding pass. Boarding starts at Gate 18 at 10:20.", zh: "没问题。这是您的登机牌。10 点 20 分在 18 号登机口开始登机。" }
    ],
    [
      { speaker: "A", en: "Excuse me, my flight has been delayed. Do you know the new boarding time?", zh: "打扰一下，我的航班延误了。您知道新的登机时间吗？" },
      { speaker: "B", en: "Let me check the system. The new boarding time is 3:45 p.m.", zh: "我查一下系统。新的登机时间是下午 3 点 45 分。" },
      { speaker: "A", en: "Thank you. Will the gate stay the same?", zh: "谢谢。登机口还是原来的吗？" },
      { speaker: "B", en: "It is still Gate 12 for now, but please check the screen again before boarding.", zh: "目前还是 12 号登机口，但请在登机前再次查看屏幕。" },
      { speaker: "A", en: "Got it. Is there a meal voucher for the delay?", zh: "明白了。延误有餐券吗？" },
      { speaker: "B", en: "Yes. You can collect it at the service counter next to Gate 10.", zh: "有的。您可以到 10 号登机口旁边的服务台领取。" }
    ],
    [
      { speaker: "A", en: "Hi, I have a connecting flight in two hours. Do I need to collect my baggage?", zh: "你好，我两小时后要转机。需要提取行李吗？" },
      { speaker: "B", en: "May I see your baggage tag?", zh: "我可以看一下您的行李条吗？" },
      { speaker: "A", en: "Sure. The final destination says London.", zh: "当然。上面写的最终目的地是伦敦。" },
      { speaker: "B", en: "Then your bag will be checked through. Please follow the Transfer signs.", zh: "那您的行李会直挂。请跟着 Transfer 标识走。" },
      { speaker: "A", en: "Do I need to go through security again?", zh: "我需要重新过安检吗？" },
      { speaker: "B", en: "Yes, after security, check the screen for your next gate.", zh: "需要。安检后请查看屏幕确认下一段航班的登机口。" }
    ],
    [
      { speaker: "A", en: "Excuse me, my suitcase did not arrive at baggage claim.", zh: "打扰一下，我的行李箱没有出现在行李提取处。" },
      { speaker: "B", en: "I'm sorry about that. May I have your baggage tag and flight number?", zh: "很抱歉。请给我您的行李条和航班号好吗？" },
      { speaker: "A", en: "Here you go. It is a black suitcase with a yellow tag.", zh: "给您。是一个带黄色标签的黑色行李箱。" },
      { speaker: "B", en: "Thank you. I will file a report and check the tracking record.", zh: "谢谢。我会登记报告并查询追踪记录。" },
      { speaker: "A", en: "How long does it usually take to locate it?", zh: "通常多久能找到？" },
      { speaker: "B", en: "Most bags are located within twenty-four hours. We will contact you as soon as we have an update.", zh: "大多数行李会在 24 小时内找到。一有更新我们会马上联系您。" }
    ]
  ],
  hotel: [
    [
      { speaker: "A", en: "Hello, I have a reservation under the name Chen.", zh: "你好，我用 Chen 的名字订了房间。" },
      { speaker: "B", en: "Welcome. May I see your passport, please?", zh: "欢迎入住。请给我看一下您的护照好吗？" },
      { speaker: "A", en: "Sure. Is breakfast included in my booking?", zh: "当然。我的预订包含早餐吗？" },
      { speaker: "B", en: "Yes, breakfast is served on the second floor from 6:30 to 10:00.", zh: "包含。早餐在二楼供应，时间是 6 点 30 到 10 点。" },
      { speaker: "A", en: "Great. Could I also have the Wi-Fi password?", zh: "太好了。我也可以要一下 Wi-Fi 密码吗？" },
      { speaker: "B", en: "Of course. It is printed on your room key holder.", zh: "当然。密码印在您的房卡套上。" }
    ],
    [
      { speaker: "A", en: "Hi, the air conditioner in my room is not working.", zh: "你好，我房间的空调坏了。" },
      { speaker: "B", en: "I'm sorry for the inconvenience. What is your room number?", zh: "给您带来不便很抱歉。您的房间号是多少？" },
      { speaker: "A", en: "Room 806. It has been very warm since I checked in.", zh: "806 房间。我入住后房间一直很热。" },
      { speaker: "B", en: "I will send maintenance to your room in ten minutes.", zh: "我会在十分钟内安排维修人员到您房间。" },
      { speaker: "A", en: "If it cannot be fixed, could I change rooms?", zh: "如果修不好，我可以换房间吗？" },
      { speaker: "B", en: "Yes. If the issue remains, we will move you to another room.", zh: "可以。如果问题仍然存在，我们会给您换房间。" }
    ],
    [
      { speaker: "A", en: "Good morning. Could I get a late checkout today?", zh: "早上好。我今天可以延迟退房吗？" },
      { speaker: "B", en: "Let me check availability. What time would you like to check out?", zh: "我查一下房态。您想几点退房？" },
      { speaker: "A", en: "Around 2 p.m., if possible.", zh: "如果可以的话，大概下午 2 点。" },
      { speaker: "B", en: "We can extend it to 1 p.m. for free. After that, there is an extra charge.", zh: "我们可以免费延到下午 1 点。之后会收取额外费用。" },
      { speaker: "A", en: "One o'clock works for me. Thank you.", zh: "一点可以，谢谢。" },
      { speaker: "B", en: "You're welcome. I have updated your checkout time.", zh: "不客气。我已经更新了您的退房时间。" }
    ],
    [
      { speaker: "A", en: "Hi, could you recommend a quiet room away from the elevator?", zh: "你好，可以推荐一个远离电梯的安静房间吗？" },
      { speaker: "B", en: "Yes. We have a room at the end of the hallway on the tenth floor.", zh: "可以。十楼走廊尽头有一间房。" },
      { speaker: "A", en: "That sounds good. Does it have a city view?", zh: "听起来不错。那个房间有城市景观吗？" },
      { speaker: "B", en: "It has a partial city view and it is one of our quieter rooms.", zh: "有部分城市景观，也是我们比较安静的房间之一。" },
      { speaker: "A", en: "Perfect. I'll take it.", zh: "很好。我就要这间。" },
      { speaker: "B", en: "Great. I will prepare the room key for you now.", zh: "好的。我现在为您准备房卡。" }
    ]
  ],
  restaurant: [
    [
      { speaker: "A", en: "Hi, do you have a table for two?", zh: "你好，有两人桌吗？" },
      { speaker: "B", en: "Yes. Would you prefer a table by the window?", zh: "有的。您想坐靠窗的位置吗？" },
      { speaker: "A", en: "That would be nice. Could we see the menu?", zh: "那很好。可以给我们菜单吗？" },
      { speaker: "B", en: "Of course. Today's special is grilled salmon with seasonal vegetables.", zh: "当然。今天的特色菜是烤三文鱼配时令蔬菜。" },
      { speaker: "A", en: "Sounds good. Is it spicy?", zh: "听起来不错。辣吗？" },
      { speaker: "B", en: "No, it is mild. We can also serve the sauce on the side.", zh: "不辣，口味比较清淡。我们也可以把酱汁单独放。" }
    ],
    [
      { speaker: "A", en: "Excuse me, I am allergic to peanuts. Which dishes should I avoid?", zh: "打扰一下，我对花生过敏。哪些菜需要避免？" },
      { speaker: "B", en: "Thank you for telling me. Please avoid the satay noodles and the house salad dressing.", zh: "谢谢您告知。请避免沙爹面和本店沙拉酱。" },
      { speaker: "A", en: "Could the chicken rice be made without peanut oil?", zh: "鸡肉饭可以不用花生油做吗？" },
      { speaker: "B", en: "Yes, I will mark it clearly for the kitchen.", zh: "可以，我会给厨房清楚标注。" },
      { speaker: "A", en: "Thank you. I really appreciate it.", zh: "谢谢，非常感谢。" },
      { speaker: "B", en: "No problem. I will double-check before serving it.", zh: "没问题。上菜前我会再确认一次。" }
    ],
    [
      { speaker: "A", en: "Could you make this dish less spicy?", zh: "这道菜可以少辣吗？" },
      { speaker: "B", en: "Certainly. We can make it mild or put the chili sauce on the side.", zh: "当然。我们可以做微辣，或者把辣酱单独放。" },
      { speaker: "A", en: "Please put the sauce on the side.", zh: "请把酱汁单独放。" },
      { speaker: "B", en: "No problem. Would you like rice or noodles with it?", zh: "没问题。您想配米饭还是面条？" },
      { speaker: "A", en: "Rice, please. And could we have two glasses of water?", zh: "米饭，谢谢。再给我们两杯水好吗？" },
      { speaker: "B", en: "Sure. I will bring the water right away.", zh: "当然。我马上把水送来。" }
    ],
    [
      { speaker: "A", en: "Could we have the bill, please?", zh: "请给我们账单好吗？" },
      { speaker: "B", en: "Sure. Would you like to pay together or separately?", zh: "当然。您想一起付还是分开付？" },
      { speaker: "A", en: "Together, please. Can I pay by card?", zh: "一起付。可以刷卡吗？" },
      { speaker: "B", en: "Yes. Please insert your card when the amount appears.", zh: "可以。金额出现后请插入银行卡。" },
      { speaker: "A", en: "Could you also pack the leftovers to go?", zh: "也可以把剩菜打包吗？" },
      { speaker: "B", en: "Of course. I will bring a takeaway box for you.", zh: "当然。我给您拿一个打包盒。" }
    ]
  ],
  directions: [
    [
      { speaker: "A", en: "Excuse me, how do I get to Central Station?", zh: "打扰一下，我怎么去中央车站？" },
      { speaker: "B", en: "Walk straight for two blocks, then turn left at the traffic light.", zh: "直走两个街区，然后在红绿灯处左转。" },
      { speaker: "A", en: "Is it within walking distance?", zh: "步行能到吗？" },
      { speaker: "B", en: "Yes, it takes about ten minutes on foot.", zh: "可以，步行大约十分钟。" },
      { speaker: "A", en: "Great. Is there a sign for the station?", zh: "太好了。有车站标识吗？" },
      { speaker: "B", en: "Yes, you will see a blue station sign after the post office.", zh: "有，经过邮局后您会看到蓝色的车站标识。" }
    ],
    [
      { speaker: "A", en: "Which subway line should I take to the museum?", zh: "去博物馆应该坐哪条地铁？" },
      { speaker: "B", en: "Take Line 2 toward East Market and get off at Museum Park.", zh: "坐 2 号线往 East Market 方向，在 Museum Park 下车。" },
      { speaker: "A", en: "Do I need to transfer?", zh: "需要换乘吗？" },
      { speaker: "B", en: "No, it is a direct ride. The museum is three stops away.", zh: "不需要，直达。博物馆在三站之后。" },
      { speaker: "A", en: "Which exit should I use?", zh: "我应该走哪个出口？" },
      { speaker: "B", en: "Use Exit B. It is closest to the main entrance.", zh: "走 B 出口，离主入口最近。" }
    ],
    [
      { speaker: "A", en: "Excuse me, is this bus going to the airport?", zh: "打扰一下，这辆公交去机场吗？" },
      { speaker: "B", en: "No, this bus goes downtown. You need the airport express bus.", zh: "不去，这辆车去市中心。您需要坐机场快线巴士。" },
      { speaker: "A", en: "Where is the airport bus stop?", zh: "机场巴士站在哪里？" },
      { speaker: "B", en: "It is across the street, next to the hotel entrance.", zh: "在街对面，酒店入口旁边。" },
      { speaker: "A", en: "How often does it run?", zh: "多久一班？" },
      { speaker: "B", en: "Every twenty minutes during the day.", zh: "白天每二十分钟一班。" }
    ],
    [
      { speaker: "A", en: "Could you show me this address on the map?", zh: "您能在地图上帮我指出这个地址吗？" },
      { speaker: "B", en: "Sure. You are here, and the address is near the river.", zh: "当然。您在这里，这个地址在河边附近。" },
      { speaker: "A", en: "Should I take a taxi or the subway?", zh: "我应该打车还是坐地铁？" },
      { speaker: "B", en: "The subway is faster at this time because traffic is heavy.", zh: "这个时间地铁更快，因为路上很堵。" },
      { speaker: "A", en: "Thanks. Which station should I get off at?", zh: "谢谢。我应该在哪站下车？" },
      { speaker: "B", en: "Get off at Riverfront Station and walk five minutes east.", zh: "在 Riverfront Station 下车，然后向东走五分钟。" }
    ]
  ],
  meeting: [
    [
      { speaker: "A", en: "Let's start with the campaign performance from last week.", zh: "我们先看上周活动表现。" },
      { speaker: "B", en: "Sure. Traffic increased, but checkout conversion dropped slightly.", zh: "好的。流量上升了，但结账转化率略有下降。" },
      { speaker: "A", en: "Do we know what caused the drop?", zh: "我们知道下降的原因吗？" },
      { speaker: "B", en: "The main issue seems to be shipping cost shown late in checkout.", zh: "主要问题似乎是运费在结账后段才显示。" },
      { speaker: "A", en: "Then let's test showing shipping cost earlier.", zh: "那我们测试一下更早展示运费。" },
      { speaker: "B", en: "Agreed. I will prepare the test plan by tomorrow.", zh: "同意。我明天前准备测试方案。" }
    ],
    [
      { speaker: "A", en: "Could we align on today's top priority first?", zh: "我们可以先对齐今天最高优先级吗？" },
      { speaker: "B", en: "Yes. The urgent item is fixing the product detail page issue.", zh: "可以。紧急事项是修复商品详情页问题。" },
      { speaker: "A", en: "What impact does it have on users?", zh: "它对用户有什么影响？" },
      { speaker: "B", en: "Some users cannot select size before adding items to the cart.", zh: "部分用户加入购物车前无法选择尺码。" },
      { speaker: "A", en: "Let's make that the first action item.", zh: "那把它作为第一个行动项。" },
      { speaker: "B", en: "I'll follow up with product and share the timeline today.", zh: "我会跟进产品团队，并在今天同步时间线。" }
    ]
  ],
  email: [
    [
      { speaker: "A", en: "I need to send a follow-up email about the campaign assets.", zh: "我需要发一封关于活动素材的跟进邮件。" },
      { speaker: "B", en: "Start with the purpose, then mention the deadline clearly.", zh: "先写清目的，然后明确截止时间。" },
      { speaker: "A", en: "Should I include the missing banner and product images?", zh: "我应该写上缺少的横幅和商品图片吗？" },
      { speaker: "B", en: "Yes, list them as bullet points so the request is easy to scan.", zh: "是的，用项目符号列出来，方便快速阅读。" },
      { speaker: "A", en: "Good idea. I will also attach the latest brief.", zh: "好主意。我也会附上最新版简报。" },
      { speaker: "B", en: "Great. Ask them to confirm by Thursday afternoon.", zh: "很好。请他们在周四下午前确认。" }
    ],
    [
      { speaker: "A", en: "Can you review my email before I send it to the regional team?", zh: "我发给区域团队前，你能帮我看一下邮件吗？" },
      { speaker: "B", en: "Of course. The message is clear, but the action request could be stronger.", zh: "当然。信息很清楚，但行动请求可以更明确。" },
      { speaker: "A", en: "How should I phrase it?", zh: "我应该怎么表达？" },
      { speaker: "B", en: "Try: Could you confirm the launch date and owner by Friday?", zh: "可以写：请在周五前确认上线日期和负责人好吗？" },
      { speaker: "A", en: "That sounds better. I will update the last paragraph.", zh: "这样更好。我会更新最后一段。" },
      { speaker: "B", en: "Nice. Keep the subject line specific as well.", zh: "不错。邮件标题也保持具体。" }
    ]
  ],
  reporting: [
    [
      { speaker: "A", en: "Can you walk us through the weekend promotion results?", zh: "你能带我们看一下周末促销结果吗？" },
      { speaker: "B", en: "Sure. Revenue increased by eighteen percent compared with last weekend.", zh: "当然。收入比上个周末增长了 18%。" },
      { speaker: "A", en: "What was the main driver?", zh: "主要驱动因素是什么？" },
      { speaker: "B", en: "Paid search brought more high-intent traffic, especially for travel accessories.", zh: "付费搜索带来了更多高意向流量，尤其是旅行配件。" },
      { speaker: "A", en: "Any risks we should watch?", zh: "有什么风险需要关注吗？" },
      { speaker: "B", en: "Inventory is low for three popular items, so replenishment is the next priority.", zh: "三款热销商品库存偏低，所以补货是下一个优先事项。" }
    ],
    [
      { speaker: "A", en: "The conversion rate dropped this week. Do we understand why?", zh: "本周转化率下降了。我们知道原因吗？" },
      { speaker: "B", en: "The data suggests the drop came mainly from mobile users.", zh: "数据显示下降主要来自移动端用户。" },
      { speaker: "A", en: "Is it related to page speed?", zh: "和页面速度有关吗？" },
      { speaker: "B", en: "Most likely. The product page loaded two seconds slower after the update.", zh: "很可能。更新后商品页加载慢了两秒。" },
      { speaker: "A", en: "Then let's compare it with last week's version.", zh: "那我们和上周版本对比一下。" },
      { speaker: "B", en: "I will prepare a before-and-after report this afternoon.", zh: "我今天下午准备一份前后对比报告。" }
    ]
  ],
  client: [
    [
      { speaker: "A", en: "Thanks for contacting us. Could you share your order number?", zh: "感谢联系我们。您可以提供订单号吗？" },
      { speaker: "B", en: "Sure. The order number is EC2048, and the package is delayed.", zh: "可以。订单号是 EC2048，包裹延误了。" },
      { speaker: "A", en: "I'm sorry about the delay. Let me check the tracking details.", zh: "很抱歉延误了。我来查一下物流详情。" },
      { speaker: "B", en: "I need it before Friday for a campaign shoot.", zh: "我周五前需要它用于活动拍摄。" },
      { speaker: "A", en: "Understood. I will ask the carrier for a delivery window today.", zh: "明白。我今天会向承运商确认配送时间窗口。" },
      { speaker: "B", en: "Thank you. Please keep me updated.", zh: "谢谢。请随时同步进展。" }
    ],
    [
      { speaker: "A", en: "I understand you are unhappy with the refund process.", zh: "我理解您对退款流程不满意。" },
      { speaker: "B", en: "Yes, I submitted the request last week and have not received confirmation.", zh: "是的，我上周提交了申请，但还没有收到确认。" },
      { speaker: "A", en: "Let me check the case record. It looks like one receipt is missing.", zh: "我查看一下工单记录。看起来缺少一张收据。" },
      { speaker: "B", en: "I can upload it again right now.", zh: "我现在可以重新上传。" },
      { speaker: "A", en: "Thank you. Once we receive it, we can process the refund within three business days.", zh: "谢谢。收到后，我们可以在三个工作日内处理退款。" },
      { speaker: "B", en: "That works. I will upload it today.", zh: "可以。我今天上传。" }
    ]
  ]
};

export function getDailyDialogue(scenario: Scenario, currentDay: number) {
  const options = dialogueSets[scenario.id] ?? [scenario.dialogue];
  const visitIndex = getScenarioVisitIndex(currentDay, scenario.id);
  return options[visitIndex - 1] ?? generateDialogue(scenario, visitIndex);
}

const dialogueTopics: Record<string, Array<{ topic: string; zhTopic: string; request: string; zhRequest: string; detail: string; zhDetail: string }>> = {
  airport: [
    { topic: "check-in", zhTopic: "值机", request: "check in for my flight", zhRequest: "办理航班值机", detail: "I have one checked bag and one carry-on bag.", zhDetail: "我有一件托运行李和一件随身行李。" },
    { topic: "a gate change", zhTopic: "登机口变更", request: "confirm the new gate", zhRequest: "确认新的登机口", detail: "The screen shows a different gate from my boarding pass.", zhDetail: "屏幕显示的登机口和我的登机牌不一样。" },
    { topic: "a tight transfer", zhTopic: "紧张转机", request: "make my connection on time", zhRequest: "按时赶上转机", detail: "My next flight boards in forty minutes.", zhDetail: "我的下一段航班四十分钟后登机。" },
    { topic: "lost baggage", zhTopic: "行李丢失", request: "file a baggage report", zhRequest: "登记行李报告", detail: "My suitcase did not arrive at baggage claim.", zhDetail: "我的行李箱没有出现在行李提取处。" }
  ],
  hotel: [
    { topic: "check-in", zhTopic: "入住", request: "check in under my reservation", zhRequest: "按预订办理入住", detail: "The booking should include breakfast.", zhDetail: "这个预订应该包含早餐。" },
    { topic: "room maintenance", zhTopic: "客房维修", request: "send someone to check the room", zhRequest: "安排人员检查房间", detail: "The air conditioner has not worked since I arrived.", zhDetail: "我到达后空调一直不能用。" },
    { topic: "late checkout", zhTopic: "延迟退房", request: "extend my checkout time", zhRequest: "延长退房时间", detail: "My flight leaves late in the afternoon.", zhDetail: "我的航班下午较晚起飞。" },
    { topic: "invoice details", zhTopic: "发票信息", request: "update the invoice details", zhRequest: "更新发票信息", detail: "The company name needs to be corrected.", zhDetail: "公司名称需要更正。" }
  ],
  restaurant: [
    { topic: "a table request", zhTopic: "订桌需求", request: "get a table for two", zhRequest: "安排两人桌", detail: "We do not have a reservation.", zhDetail: "我们没有预订。" },
    { topic: "food allergies", zhTopic: "食物过敏", request: "check the ingredients", zhRequest: "确认配料", detail: "I am allergic to peanuts and seafood.", zhDetail: "我对花生和海鲜过敏。" },
    { topic: "taste preference", zhTopic: "口味偏好", request: "make the dish less spicy", zhRequest: "把菜做得少辣", detail: "Please put the sauce on the side.", zhDetail: "请把酱汁单独放。" },
    { topic: "the bill", zhTopic: "结账", request: "pay the bill by card", zhRequest: "刷卡结账", detail: "Could you also pack the leftovers?", zhDetail: "也可以把剩菜打包吗？" }
  ],
  directions: [
    { topic: "subway directions", zhTopic: "地铁路线", request: "find the right subway line", zhRequest: "找到正确的地铁线路", detail: "I need to get to the museum before noon.", zhDetail: "我需要中午前到博物馆。" },
    { topic: "bus directions", zhTopic: "公交路线", request: "find the airport bus stop", zhRequest: "找到机场巴士站", detail: "I am carrying two suitcases.", zhDetail: "我带着两个行李箱。" },
    { topic: "walking route", zhTopic: "步行路线", request: "walk to Central Square", zhRequest: "步行去中央广场", detail: "I would like to avoid crowded streets.", zhDetail: "我想避开拥挤的街道。" },
    { topic: "a closed exit", zhTopic: "出口关闭", request: "find another station exit", zhRequest: "找到另一个车站出口", detail: "Exit A is closed for construction.", zhDetail: "A 出口因施工关闭。" }
  ],
  meeting: [
    { topic: "campaign priorities", zhTopic: "活动优先级", request: "align on the top priority", zhRequest: "对齐最高优先级", detail: "The launch date is getting close.", zhDetail: "上线日期越来越近。" },
    { topic: "checkout conversion", zhTopic: "结账转化", request: "review the conversion drop", zhRequest: "复盘转化下降", detail: "Mobile users dropped more than desktop users.", zhDetail: "移动端用户下降比桌面端更多。" },
    { topic: "project blockers", zhTopic: "项目阻碍", request: "clarify the main blocker", zhRequest: "明确主要阻碍", detail: "Design resources are still limited this week.", zhDetail: "本周设计资源仍然有限。" },
    { topic: "next steps", zhTopic: "下一步", request: "confirm owners and deadlines", zhRequest: "确认负责人和截止时间", detail: "We need a written summary after the meeting.", zhDetail: "会后我们需要一份书面总结。" }
  ],
  email: [
    { topic: "asset follow-up", zhTopic: "素材跟进", request: "follow up on campaign assets", zhRequest: "跟进活动素材", detail: "The hero banner is still missing.", zhDetail: "主视觉横幅仍然缺失。" },
    { topic: "approval", zhTopic: "审批", request: "request approval for the launch plan", zhRequest: "请求审批上线计划", detail: "The campaign is planned for next Monday.", zhDetail: "活动计划下周一上线。" },
    { topic: "regional feedback", zhTopic: "区域反馈", request: "ask for regional feedback", zhRequest: "请求区域反馈", detail: "We need replies by Friday noon.", zhDetail: "我们需要周五中午前回复。" },
    { topic: "meeting summary", zhTopic: "会议总结", request: "summarize the decision in writing", zhRequest: "用书面形式总结决策", detail: "Several owners changed during the meeting.", zhDetail: "会议中几个负责人发生了变化。" }
  ],
  reporting: [
    { topic: "revenue growth", zhTopic: "收入增长", request: "explain the revenue increase", zhRequest: "解释收入增长", detail: "Paid search drove most of the traffic.", zhDetail: "付费搜索带来了大部分流量。" },
    { topic: "conversion drop", zhTopic: "转化下降", request: "identify the root cause", zhRequest: "识别根因", detail: "The product page loaded more slowly after the update.", zhDetail: "更新后商品页加载更慢。" },
    { topic: "inventory risk", zhTopic: "库存风险", request: "highlight the inventory risk", zhRequest: "强调库存风险", detail: "Three popular items may stock out this week.", zhDetail: "三款热销商品本周可能缺货。" },
    { topic: "refund trend", zhTopic: "退款趋势", request: "review the refund trend", zhRequest: "复盘退款趋势", detail: "Sizing questions increased after the campaign.", zhDetail: "活动后尺码问题增加了。" }
  ],
  client: [
    { topic: "delivery delay", zhTopic: "配送延误", request: "provide a delivery update", zhRequest: "提供配送更新", detail: "The package is already at the local warehouse.", zhDetail: "包裹已经到达本地仓库。" },
    { topic: "refund request", zhTopic: "退款申请", request: "process the refund request", zhRequest: "处理退款申请", detail: "One receipt is still missing from the case.", zhDetail: "工单里仍缺一张收据。" },
    { topic: "replacement shipment", zhTopic: "补发货件", request: "arrange a replacement shipment", zhRequest: "安排补发", detail: "The client needs the product before Friday.", zhDetail: "客户周五前需要商品。" },
    { topic: "requirement change", zhTopic: "需求变更", request: "confirm the updated requirement", zhRequest: "确认更新后的需求", detail: "The requested quantity changed this morning.", zhDetail: "今天早上请求数量发生了变化。" }
  ]
};

function generateDialogue(scenario: Scenario, visitIndex: number): DialogueLine[] {
  const topics = dialogueTopics[scenario.id] ?? dialogueTopics.meeting;
  const topic = topics[(visitIndex - 1) % topics.length];
  const detailNumber = Math.floor((visitIndex - 1) / topics.length) + 1;

  return [
    { speaker: "A", en: `Hi, I need help with ${topic.topic}.`, zh: `你好，我需要处理${topic.zhTopic}。` },
    { speaker: "B", en: `Sure. What exactly would you like to do?`, zh: `当然。你具体想做什么？` },
    { speaker: "A", en: `I need to ${topic.request}.`, zh: `我需要${topic.zhRequest}。` },
    { speaker: "B", en: `Understood. Could you share one more detail first?`, zh: `明白。你能先补充一个细节吗？` },
    { speaker: "A", en: `${topic.detail} This is my practice case ${detailNumber}.`, zh: `${topic.zhDetail}这是我的第 ${detailNumber} 个练习案例。` },
    { speaker: "B", en: `Thanks. Based on that, the next step is clear. I will help you handle it now.`, zh: `谢谢。根据这个信息，下一步很清楚。我现在帮你处理。` }
  ];
}
