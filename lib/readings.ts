import type { Scenario } from "@/lib/content";
import { getScenarioVisitIndex } from "@/lib/dailyContent";

type Reading = {
  en: string;
  zh: string;
};

const readings: Record<string, Reading> = {
  airport: {
    en: `Travel Notice: Flight Connection and Baggage Information

Passengers connecting to international flights should follow the purple Transfer signs after arrival. If your boarding pass for the next flight has already been issued, proceed directly to security screening and then check the gate number on the departure screens. Gates may change with limited notice, so please check the screen again at least thirty minutes before boarding.

If your baggage was checked through to your final destination, you do not need to collect it during the connection. If your baggage tag shows this airport as the final stop, please go to baggage claim first and then visit the airline transfer counter. Passengers who need special assistance should speak to ground staff near Gate 18.`,
    zh: `旅行通知：转机与行李信息

需要转乘国际航班的旅客，到达后请沿紫色 Transfer 标识前往转机区域。如果你已经拿到下一段航班的登机牌，可以直接前往安检，然后在出发屏幕上确认登机口。登机口可能临时变更，所以请在登机前至少三十分钟再次查看屏幕。

如果你的行李已经直挂最终目的地，转机时不需要提取行李。如果行李条显示本站为终点，请先前往行李提取处，再去航空公司转机柜台。需要特殊协助的旅客，可以联系 18 号登机口附近的地勤人员。`
  },
  hotel: {
    en: `Hotel Welcome Letter

Welcome to Riverside Hotel. Your room is available from 3:00 p.m., and checkout is before 11:00 a.m. Breakfast is served on the second floor from 6:30 to 10:00 every morning. Please bring your room key with you, as staff may ask to confirm your room number.

Housekeeping is available daily between 9:00 a.m. and 4:00 p.m. If you prefer not to be disturbed, please place the sign outside your door. For extra towels, bottled water, or help with the air conditioner, call the front desk by pressing 0 on the room phone. A refundable deposit may be held on your card and released after checkout.`,
    zh: `酒店欢迎信

欢迎入住 Riverside Hotel。客房从下午 3 点开始可入住，退房时间为上午 11 点前。早餐每天早上 6:30 到 10:00 在二楼供应。请随身携带房卡，因为工作人员可能会确认你的房间号。

客房清洁时间为每天上午 9 点到下午 4 点。如果你不希望被打扰，请把提示牌挂在门外。如需额外毛巾、瓶装水，或需要处理空调问题，请用房间电话按 0 联系前台。酒店可能会从你的银行卡中预授权一笔可退押金，并在退房后释放。`
  },
  restaurant: {
    en: `Restaurant Menu Note and Service Policy

Our lunch set includes one main dish, one side dish, and a drink. Please tell your server before ordering if you have any food allergies or dietary restrictions. Some sauces contain peanuts, dairy, or seafood, and not every ingredient is listed on the menu.

During busy hours, dishes may arrive at different times because they are prepared by different kitchen stations. If you need to leave soon, let us know and we can recommend faster options. Leftovers can be packed to go, but cold dishes and desserts should be eaten on the same day. A service charge may be added for groups of six or more.`,
    zh: `餐厅菜单说明与服务政策

午餐套餐包含一份主菜、一份配菜和一杯饮品。如果你有食物过敏或饮食限制，请在点餐前告知服务员。部分酱料含有花生、奶制品或海鲜，菜单上不一定列出所有配料。

高峰时段，不同菜品可能因为由不同厨房区域制作而分批上桌。如果你很快要离开，请提前说明，服务员可以推荐出餐更快的选项。剩菜可以打包，但冷盘和甜点建议当天食用。六人及以上用餐可能会加收服务费。`
  },
  directions: {
    en: `Station Route Update

Due to construction near the main entrance, passengers should use Exit B for the museum, the shopping street, and the airport bus stop. Exit A is open only for local residents and taxi pickup. Please allow five extra minutes if you are walking with luggage.

To reach Central Square, take Line 2 toward East Market and get off after three stops. Transfer is not required. After leaving the station, turn right at the first intersection and walk past the post office. The square will be on your left. If you are unsure, ask station staff to mark the route on your map before you exit.`,
    zh: `车站路线更新

由于主入口附近施工，前往博物馆、商业街和机场巴士站的乘客请使用 B 出口。A 出口仅供附近居民和出租车上客使用。如果你带着行李步行，请预留额外五分钟。

前往 Central Square，请乘坐 2 号线往 East Market 方向，三站后下车，不需要换乘。出站后在第一个路口右转，经过邮局后，广场就在左侧。如果不确定路线，可以在出站前请车站工作人员帮你在地图上标出路线。`
  },
  meeting: {
    en: `Meeting Brief: Weekly Marketplace Operations Sync

The purpose of today's meeting is to align on campaign performance, inventory risk, and next week's priorities. The marketing team will first share traffic and conversion results from the weekend promotion. The operations team will then explain which product listings had the highest order volume and which items are close to stockout.

Please keep updates short and focus on decisions. If a topic requires deeper discussion, note it as a follow-up item with an owner and a deadline. By the end of the meeting, we should confirm three things: whether to extend the promotion, which products need inventory support, and what message should be sent to the regional sales team.`,
    zh: `会议简报：每周平台运营同步

今天会议的目的是对齐活动表现、库存风险和下周优先事项。市场团队会先分享周末促销的流量和转化结果。运营团队随后说明哪些商品链接订单量最高，以及哪些商品接近缺货。

请保持更新简洁，并聚焦需要决策的事项。如果某个话题需要深入讨论，请把它记录为后续事项，并明确负责人和截止时间。会议结束前，我们需要确认三件事：是否延长促销、哪些商品需要库存支持，以及应该向区域销售团队同步什么信息。`
  },
  email: {
    en: `Email Draft: Follow-up on Campaign Assets

Hi team,

I am writing to follow up on the product images and banner copy for next week's summer campaign. We are planning to launch the campaign next Monday, so the final assets need to be ready by Thursday afternoon for review and upload.

Could you please confirm whether the hero banner, product detail images, and social media captions are on track? If there are any blockers, let me know today so we can adjust the timeline or reduce the scope. I have attached the latest campaign brief and the product priority list for your reference.

Best regards,
Mia`,
    zh: `邮件草稿：跟进活动素材

大家好，

我写这封邮件是想跟进下周夏季活动的商品图片和横幅文案。我们计划下周一上线活动，所以最终素材需要在周四下午前准备好，以便审核和上传。

请确认主视觉横幅、商品详情图和社媒文案是否能按计划完成。如果有任何阻碍，请今天告诉我，这样我们可以调整时间线或缩小范围。我已附上最新版活动简报和商品优先级列表，供大家参考。

祝好，
Mia`
  },
  reporting: {
    en: `Performance Summary: Weekend Promotion

Total revenue increased by 18 percent compared with the previous weekend, mainly driven by higher traffic from paid search and email subscribers. The conversion rate improved slightly, from 3.2 percent to 3.6 percent, while average order value stayed almost flat.

The strongest category was travel accessories, especially compact chargers and packing cubes. However, three popular items reached low inventory by Sunday evening, which may limit sales next week. Refund requests also increased in one product line because the size information was unclear on the product page.

Recommended next steps: keep paid search active for high-converting keywords, update the size guide, and ask the supply chain team to confirm replenishment timing.`,
    zh: `表现总结：周末促销

总收入较上个周末增长 18%，主要由付费搜索和邮件订阅用户带来的更高流量推动。转化率从 3.2% 小幅提升到 3.6%，客单价基本持平。

表现最强的品类是旅行配件，尤其是便携充电器和收纳袋。不过，三款热门商品到周日晚上库存偏低，可能限制下周销售。某个产品线的退款申请也有所增加，原因是商品页尺码信息不够清晰。

建议下一步：继续投放高转化关键词的付费搜索，更新尺码指南，并请供应链团队确认补货时间。`
  },
  client: {
    en: `Client Message: Delivery Delay Resolution

Thank you for sharing the order details. We understand that the delayed delivery has affected your campaign schedule, and we are sorry for the inconvenience. Our logistics partner has confirmed that the shipment arrived at the local warehouse this morning, but the final delivery scan has not been updated yet.

We are now asking the carrier to prioritize this order and provide a delivery window by 5:00 p.m. today. If the package cannot be delivered by tomorrow morning, we can arrange a replacement shipment or discuss partial compensation. I will keep you updated as soon as we receive confirmation from the carrier.`,
    zh: `客户消息：配送延误处理

感谢你提供订单详情。我们理解配送延误已经影响到你的活动排期，也对由此造成的不便表示抱歉。我们的物流合作方确认货件今天早上已到达当地仓库，但最终配送扫描信息尚未更新。

我们正在要求承运商优先处理该订单，并在今天下午 5 点前提供配送时间窗口。如果包裹无法在明天上午前送达，我们可以安排补发，或讨论部分补偿。承运商一确认信息，我会马上同步给你。`
  }
};

const extraReadings: Record<string, Reading[]> = {
  airport: [
    {
      en: `Boarding Update: Gate Change and Final Call

Passengers on Flight CX218 should note that the departure gate has changed from Gate 12 to Gate 16. The boarding time remains 10:20 a.m., but passengers are advised to move to the new gate as soon as possible. Priority boarding will begin first, followed by families with young children and then the remaining boarding groups.

If you are still at security screening or in the duty-free area, please allow enough walking time. The airline will make a final call ten minutes before the gate closes. Passengers who miss the final call may need to rebook their flight at the transfer counter.`,
      zh: `登机更新：登机口变更与最后广播

乘坐 CX218 航班的旅客请注意，登机口已从 12 号改为 16 号。登机时间仍为上午 10 点 20 分，但建议旅客尽快前往新登机口。优先登机旅客会先登机，然后是携带幼儿的家庭，最后是其他登机组。

如果你还在安检区或免税店，请预留足够步行时间。航空公司会在登机口关闭前十分钟进行最后广播。错过最后广播的旅客可能需要到转机柜台重新订票。`
    }
  ],
  hotel: [
    {
      en: `Hotel Notice: Room Maintenance Schedule

The hotel will carry out routine water system maintenance between 1:00 p.m. and 3:00 p.m. tomorrow. During this time, hot water may be temporarily unavailable on floors eight to twelve. Cold water, electricity, Wi-Fi, and elevator service will not be affected.

Guests who need to shower during this period may contact the front desk for access to a temporary guest room on the fifth floor. If the maintenance affects your schedule, please speak with the front desk before noon so staff can help arrange a suitable solution.`,
      zh: `酒店通知：客房维修安排

酒店将于明天下午 1 点至 3 点进行例行供水系统维护。在此期间，8 至 12 楼可能暂时无法使用热水。冷水、电力、Wi-Fi 和电梯服务不受影响。

如果住客需要在该时段洗浴，可以联系前台，使用五楼的临时客房。如果维护影响你的安排，请在中午前联系前台，工作人员会协助安排合适方案。`
    }
  ],
  restaurant: [
    {
      en: `Restaurant Notice: Peak-Hour Ordering

During dinner rush, the kitchen prepares grilled dishes, noodles, and desserts at separate stations. For this reason, dishes from the same table may not arrive at exactly the same time. If you have a train to catch or another time limit, please tell your server before ordering.

The fastest options tonight are the chicken rice set, vegetable noodles, and tomato soup. Dishes with seafood or special sauces may take longer. Guests with allergies should confirm ingredients with staff because some sauces are prepared in advance.`,
      zh: `餐厅说明：高峰期点餐

晚餐高峰时，厨房会在不同区域分别制作烧烤类、面食和甜点。因此，同一桌的菜品可能不会完全同时上桌。如果你要赶火车或有其他时间限制，请在点餐前告知服务员。

今晚出餐较快的选择是鸡肉饭套餐、蔬菜面和番茄汤。海鲜类或特殊酱汁菜品可能需要更久。有过敏情况的客人应向工作人员确认配料，因为部分酱汁是提前准备的。`
    }
  ],
  directions: [
    {
      en: `Transit Notice: Temporary Exit Closure

Exit A at Central Station is closed this week because of road work outside the station. Passengers going to the museum, the business district, or the airport bus stop should use Exit B instead. Signs have been placed near the ticket gates to guide passengers.

If you are carrying luggage, take the elevator near Platform 2 and follow the blue signs to street level. The walking route from Exit B to the airport bus stop takes about six minutes. Station staff can mark the route on your map if you need help.`,
      zh: `交通通知：临时出口关闭

中央车站 A 出口本周因站外道路施工关闭。前往博物馆、商务区或机场巴士站的乘客请改走 B 出口。闸机附近已经设置指示牌引导乘客。

如果你携带行李，请乘坐 2 号站台附近的电梯，并沿蓝色标识前往地面。从 B 出口步行到机场巴士站大约需要六分钟。如需帮助，车站工作人员可以在地图上为你标出路线。`
    }
  ],
  meeting: [
    {
      en: `Meeting Notes: Product Page Conversion Review

The team reviewed the latest conversion data for the product detail page. Mobile conversion dropped after the new image gallery was released, while desktop conversion stayed almost unchanged. The product manager suggested checking page speed, image loading order, and the position of the size selector.

The next step is to run a quick comparison between the current page and last week's version. Design will review whether the size guide is easy to find, and operations will check customer questions related to sizing. The team will meet again on Friday to decide whether to roll back part of the update.`,
      zh: `会议纪要：商品详情页转化复盘

团队复盘了商品详情页的最新转化数据。新版图片展示上线后，移动端转化下降，而桌面端转化几乎没有变化。产品经理建议检查页面速度、图片加载顺序以及尺码选择器的位置。

下一步是快速对比当前页面和上周版本。设计团队会评估尺码指南是否容易找到，运营团队会查看与尺码相关的客户问题。团队将在周五再次开会，决定是否回滚部分更新。`
    }
  ],
  email: [
    {
      en: `Email Brief: Requesting Regional Feedback

The campaign team needs feedback from the regional sales team before the final launch plan can be approved. The email should explain the purpose of the request, summarize the current proposal, and clearly state what needs to be confirmed.

The most important questions are whether the launch date works for each region, whether the hero products match local demand, and whether translation support is needed for product pages. The sender should ask for replies by Friday noon so the team has enough time to make changes before Monday's launch.`,
      zh: `邮件简报：请求区域反馈

活动团队需要在最终上线计划获批前，获得区域销售团队的反馈。邮件需要说明请求目的、概括当前方案，并清楚写出需要确认的事项。

最重要的问题包括：上线日期是否适合各区域、主推商品是否符合本地需求，以及商品页是否需要翻译支持。发件人应请求对方在周五中午前回复，以便团队有足够时间在周一上线前调整。`
    }
  ],
  reporting: [
    {
      en: `Business Reading: Inventory Risk After Promotion

After the weekend promotion, order volume increased sharply for travel accessories. Compact chargers, packing cubes, and waterproof bags sold faster than expected. By Sunday evening, three popular items were close to stockout, which could reduce sales next week if replenishment is delayed.

The operations team should compare current inventory with the sales forecast and confirm delivery timing with the supply chain team. If replenishment cannot arrive before Friday, the team may need to lower ad spend for low-stock items and shift traffic to similar products with healthier inventory.`,
      zh: `业务阅读：促销后的库存风险

周末促销后，旅行配件的订单量明显上升。便携充电器、收纳袋和防水包的销量高于预期。到周日晚上，三款热门商品已经接近缺货。如果补货延迟，下周销售可能受到影响。

运营团队应将当前库存与销售预测进行对比，并与供应链团队确认到货时间。如果补货无法在周五前到达，团队可能需要降低低库存商品的广告投放，并把流量转向库存更健康的相似商品。`
    }
  ],
  client: [
    {
      en: `Client Update: Replacement Shipment Option

The client reported that a delayed package may affect a campaign photo shoot scheduled for Friday. The support team checked the tracking record and found that the package had arrived at the local warehouse, but the final delivery scan had not been updated.

To reduce risk, the team offered two options: prioritize the original package with the carrier or arrange a replacement shipment from a nearby warehouse. The client preferred the replacement option if delivery could be confirmed by tomorrow morning. The support owner will send a written update before 5:00 p.m. today.`,
      zh: `客户更新：补发方案

客户反馈，一个延误包裹可能影响周五安排的活动拍摄。客服团队查询物流记录后发现，包裹已经到达本地仓库，但最终配送扫描尚未更新。

为了降低风险，团队提供两个方案：要求承运商优先配送原包裹，或从附近仓库安排补发。如果能确认明早送达，客户更倾向于补发方案。客服负责人会在今天下午 5 点前发送书面更新。`
    }
  ]
};

export function getLongReading(scenario: Scenario, currentDay?: number) {
  const options = [readings[scenario.id] ?? readings.airport, ...(extraReadings[scenario.id] ?? [])];
  if (!currentDay) {
    return options[0];
  }

  const visitIndex = getScenarioVisitIndex(currentDay, scenario.id);
  return options[visitIndex - 1] ?? generateReading(scenario, visitIndex);
}

function generateReading(scenario: Scenario, visitIndex: number): Reading {
  const topic = scenario.category === "travel" ? "service information" : "business update";
  const zhTopic = scenario.category === "travel" ? "服务信息" : "业务更新";
  const caseNumber = String(visitIndex).padStart(2, "0");

  return {
    en: `${scenario.title} Reading ${caseNumber}: Practical ${topic}

This material is designed for a real ${scenario.title.toLowerCase()} situation. The first goal is to understand the main request, the key detail, and the expected next step. When you read it, focus on names, times, numbers, locations, and action verbs instead of translating every word.

In this case, the speaker needs to confirm an important detail, explain a small problem, and ask for a clear solution. A good response should be polite, specific, and easy to act on. After reading, summarize the situation in two English sentences and say what you would do next.`,
    zh: `${scenario.title}阅读 ${caseNumber}：实用${zhTopic}

这份材料用于真实的${scenario.title}场景。第一个目标是理解主要请求、关键信息和预期下一步。阅读时，重点抓姓名、时间、数字、地点和动作动词，而不是逐词翻译。

在这个案例中，说话人需要确认一个重要细节，解释一个小问题，并请求明确的解决方案。好的回应应该礼貌、具体、便于执行。读完后，用两句英文总结情况，并说出你下一步会怎么做。`
  };
}
