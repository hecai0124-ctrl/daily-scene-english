import type { Scenario } from "@/lib/content";

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

export function getLongReading(scenario: Scenario) {
  return readings[scenario.id] ?? readings.airport;
}
