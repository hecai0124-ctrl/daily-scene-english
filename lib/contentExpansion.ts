import type { Content, QuizItem, Scenario, SentenceItem, WordItem } from "@/lib/content";

const TARGET_WORDS = 900;
const TARGET_SENTENCES = 450;
const TARGET_QUIZZES = 450;

type Seed = {
  id: string;
  zhName: string;
  category: "travel" | "work";
  title: string;
  subtitle: string;
  place: string;
  zhPlace: string;
  helper: string;
  zhHelper: string;
  objects: Array<[string, string]>;
  actions: Array<[string, string]>;
  issues: Array<[string, string]>;
};

const seeds: Record<string, Seed> = {
  airport: {
    id: "airport",
    zhName: "机场",
    category: "travel",
    title: "机场",
    subtitle: "值机 · 安检 · 登机 · 转机",
    place: "at the airport",
    zhPlace: "在机场",
    helper: "airline staff",
    zhHelper: "航空公司工作人员",
    objects: [
      ["boarding pass", "登机牌"], ["passport", "护照"], ["checked bag", "托运行李"], ["carry-on bag", "随身行李"], ["gate screen", "登机口屏幕"],
      ["baggage tag", "行李条"], ["transfer desk", "转机柜台"], ["security lane", "安检通道"], ["departure board", "出发屏幕"], ["aisle seat", "过道座位"],
      ["window seat", "靠窗座位"], ["delay notice", "延误通知"], ["meal voucher", "餐券"], ["customs form", "海关表格"], ["arrival card", "入境卡"]
    ],
    actions: [
      ["check in", "办理值机"], ["change seats", "更换座位"], ["confirm the gate", "确认登机口"], ["ask about a delay", "询问延误"], ["find baggage claim", "寻找行李提取处"],
      ["report lost luggage", "申报行李丢失"], ["go through security", "通过安检"], ["make a transfer", "转机"], ["request assistance", "请求协助"], ["check boarding time", "确认登机时间"]
    ],
    issues: [
      ["the flight is delayed", "航班延误"], ["the gate has changed", "登机口变更"], ["the bag is overweight", "行李超重"], ["the suitcase is missing", "行李箱丢失"],
      ["the boarding pass is wrong", "登机牌信息有误"], ["the connection is tight", "转机时间紧"], ["the seat is separated", "座位被分开"], ["the kiosk is not working", "自助机不可用"]
    ]
  },
  hotel: {
    id: "hotel",
    zhName: "酒店",
    category: "travel",
    title: "酒店",
    subtitle: "入住 · 设施 · 维修 · 退房",
    place: "at the hotel",
    zhPlace: "在酒店",
    helper: "front desk staff",
    zhHelper: "前台工作人员",
    objects: [
      ["reservation", "预订"], ["room key", "房卡"], ["deposit", "押金"], ["invoice", "发票"], ["breakfast coupon", "早餐券"],
      ["Wi-Fi password", "无线网络密码"], ["air conditioner", "空调"], ["extra towel", "额外毛巾"], ["quiet room", "安静房间"], ["late checkout", "延迟退房"],
      ["housekeeping service", "客房清洁服务"], ["laundry bag", "洗衣袋"], ["wake-up call", "叫醒服务"], ["shuttle bus", "接驳巴士"], ["city view room", "城市景观房"]
    ],
    actions: [
      ["check in", "办理入住"], ["check out", "办理退房"], ["ask for breakfast", "询问早餐"], ["request a room change", "要求换房"], ["report a problem", "反馈问题"],
      ["book a shuttle", "预订接驳车"], ["ask for an invoice", "索要发票"], ["extend the stay", "续住"], ["call housekeeping", "联系客房服务"], ["request late checkout", "申请延迟退房"]
    ],
    issues: [
      ["the air conditioner is not working", "空调坏了"], ["the room is too noisy", "房间太吵"], ["the key card does not work", "房卡无法使用"], ["hot water is unavailable", "没有热水"],
      ["the room was not cleaned", "房间没有打扫"], ["the booking cannot be found", "找不到预订"], ["the invoice details are wrong", "发票信息有误"], ["the deposit is still pending", "押金仍未释放"]
    ]
  },
  restaurant: {
    id: "restaurant",
    zhName: "点餐",
    category: "travel",
    title: "点餐",
    subtitle: "订位 · 口味 · 过敏 · 结账",
    place: "at the restaurant",
    zhPlace: "在餐厅",
    helper: "server",
    zhHelper: "服务员",
    objects: [
      ["menu", "菜单"], ["table for two", "两人桌"], ["daily special", "每日特色菜"], ["allergy note", "过敏说明"], ["spicy sauce", "辣酱"],
      ["side dish", "配菜"], ["main course", "主菜"], ["vegetarian option", "素食选择"], ["receipt", "收据"], ["takeaway box", "打包盒"],
      ["service charge", "服务费"], ["reservation time", "预订时间"], ["water refill", "续水"], ["recommendation", "推荐菜"], ["bill", "账单"]
    ],
    actions: [
      ["book a table", "订桌"], ["ask for a recommendation", "询问推荐"], ["order a main course", "点主菜"], ["make it less spicy", "少放辣"], ["mention an allergy", "说明过敏"],
      ["split the bill", "分开结账"], ["pay by card", "刷卡支付"], ["pack leftovers", "打包剩菜"], ["change the order", "更改订单"], ["ask about ingredients", "询问配料"]
    ],
    issues: [
      ["the dish is too spicy", "菜太辣"], ["the order is missing", "少上一道菜"], ["the table is not ready", "桌位还没准备好"], ["the sauce contains peanuts", "酱汁含花生"],
      ["the bill is incorrect", "账单不对"], ["the food is cold", "食物凉了"], ["the waiting time is long", "等待时间长"], ["the portion is smaller than expected", "份量小于预期"]
    ]
  },
  directions: {
    id: "directions",
    zhName: "问路",
    category: "travel",
    title: "问路",
    subtitle: "地铁 · 公交 · 打车 · 导航",
    place: "on the street",
    zhPlace: "在路上",
    helper: "local staff",
    zhHelper: "当地工作人员",
    objects: [
      ["subway line", "地铁线路"], ["bus stop", "公交站"], ["station exit", "车站出口"], ["ticket machine", "售票机"], ["route map", "路线图"],
      ["airport bus", "机场巴士"], ["taxi stand", "出租车站"], ["landmark", "地标"], ["intersection", "十字路口"], ["walking route", "步行路线"],
      ["transfer station", "换乘站"], ["platform number", "站台号"], ["one-way ticket", "单程票"], ["travel card", "交通卡"], ["street sign", "路牌"]
    ],
    actions: [
      ["ask for directions", "问路"], ["take the subway", "坐地铁"], ["transfer lines", "换乘线路"], ["find the exit", "找出口"], ["buy a ticket", "买票"],
      ["confirm the route", "确认路线"], ["show the address", "出示地址"], ["walk two blocks", "走两个街区"], ["turn left", "左转"], ["get off at the next stop", "下一站下车"]
    ],
    issues: [
      ["the exit is closed", "出口关闭"], ["the train is delayed", "列车延误"], ["the bus stop has moved", "公交站搬迁"], ["the map is confusing", "地图看不懂"],
      ["the route is too far", "路线太远"], ["the ticket machine is not working", "售票机故障"], ["the platform is crowded", "站台拥挤"], ["the address is hard to find", "地址难找"]
    ]
  },
  meeting: {
    id: "meeting",
    zhName: "会议",
    category: "work",
    title: "会议",
    subtitle: "议程 · 观点 · 行动项 · 复盘",
    place: "in the meeting",
    zhPlace: "在会议中",
    helper: "teammate",
    zhHelper: "同事",
    objects: [
      ["agenda", "议程"], ["action item", "行动项"], ["timeline", "时间线"], ["priority", "优先级"], ["blocker", "阻碍"],
      ["decision", "决策"], ["owner", "负责人"], ["milestone", "里程碑"], ["scope", "范围"], ["follow-up note", "跟进记录"],
      ["launch plan", "上线计划"], ["product issue", "产品问题"], ["checkout flow", "结账流程"], ["campaign result", "活动结果"], ["risk list", "风险清单"]
    ],
    actions: [
      ["align on priorities", "对齐优先级"], ["clarify the next step", "明确下一步"], ["raise a concern", "提出担忧"], ["assign an owner", "指定负责人"], ["review the timeline", "复盘时间线"],
      ["summarize the decision", "总结决策"], ["share an update", "同步进展"], ["discuss a blocker", "讨论阻碍"], ["reduce the scope", "缩小范围"], ["confirm the deadline", "确认截止时间"]
    ],
    issues: [
      ["the timeline is tight", "时间线紧"], ["the owner is unclear", "负责人不明确"], ["the scope is too broad", "范围太大"], ["the data is incomplete", "数据不完整"],
      ["the decision is still pending", "决策仍未确定"], ["the dependency is risky", "依赖存在风险"], ["the meeting is running over", "会议超时"], ["the next step is vague", "下一步模糊"]
    ]
  },
  email: {
    id: "email",
    zhName: "邮件",
    category: "work",
    title: "邮件",
    subtitle: "请求 · 附件 · 跟进 · 确认",
    place: "in the email",
    zhPlace: "在邮件中",
    helper: "recipient",
    zhHelper: "收件人",
    objects: [
      ["subject line", "邮件主题"], ["attachment", "附件"], ["deadline", "截止日期"], ["campaign brief", "活动简报"], ["product list", "商品清单"],
      ["approval request", "审批请求"], ["follow-up email", "跟进邮件"], ["meeting summary", "会议总结"], ["launch date", "上线日期"], ["owner list", "负责人列表"],
      ["regional feedback", "区域反馈"], ["translation file", "翻译文件"], ["asset folder", "素材文件夹"], ["reply thread", "邮件回复串"], ["status update", "状态更新"]
    ],
    actions: [
      ["follow up on assets", "跟进素材"], ["confirm the deadline", "确认截止日期"], ["share context", "补充背景"], ["attach the report", "附上报告"], ["request approval", "请求审批"],
      ["summarize the decision", "总结决策"], ["ask for feedback", "请求反馈"], ["clarify the owner", "明确负责人"], ["send a reminder", "发送提醒"], ["close the loop", "闭环沟通"]
    ],
    issues: [
      ["the attachment is missing", "附件缺失"], ["the deadline is unclear", "截止日期不清楚"], ["the subject line is vague", "邮件主题模糊"], ["the request is too broad", "请求太宽泛"],
      ["the approval is delayed", "审批延迟"], ["the reply is incomplete", "回复不完整"], ["the file link is broken", "文件链接失效"], ["the owner is not copied", "负责人未抄送"]
    ]
  },
  reporting: {
    id: "reporting",
    zhName: "汇报",
    category: "work",
    title: "汇报",
    subtitle: "数据 · 趋势 · 风险 · 建议",
    place: "in the business review",
    zhPlace: "在业务复盘中",
    helper: "manager",
    zhHelper: "经理",
    objects: [
      ["dashboard", "数据看板"], ["conversion rate", "转化率"], ["traffic source", "流量来源"], ["average order value", "客单价"], ["revenue trend", "收入趋势"],
      ["refund rate", "退款率"], ["inventory risk", "库存风险"], ["campaign performance", "活动表现"], ["customer segment", "客户分群"], ["sales funnel", "销售漏斗"],
      ["repeat buyer", "复购用户"], ["paid search", "付费搜索"], ["email traffic", "邮件流量"], ["product category", "商品品类"], ["root cause", "根因"]
    ],
    actions: [
      ["explain the trend", "解释趋势"], ["compare the benchmark", "对比基准"], ["identify the root cause", "识别根因"], ["share an insight", "分享洞察"], ["recommend an action", "建议动作"],
      ["break down the data", "拆解数据"], ["highlight a risk", "强调风险"], ["track the metric", "追踪指标"], ["review the funnel", "复盘漏斗"], ["estimate the impact", "估算影响"]
    ],
    issues: [
      ["conversion dropped", "转化下降"], ["traffic quality is lower", "流量质量变低"], ["inventory is limited", "库存有限"], ["refunds increased", "退款增加"],
      ["paid search is expensive", "付费搜索成本高"], ["the sample size is small", "样本量小"], ["the dashboard is delayed", "数据看板延迟"], ["the insight is unclear", "洞察不清晰"]
    ]
  },
  client: {
    id: "client",
    zhName: "客户沟通",
    category: "work",
    title: "客户沟通",
    subtitle: "需求 · 投诉 · 交付 · 补偿",
    place: "with the client",
    zhPlace: "和客户沟通时",
    helper: "client",
    zhHelper: "客户",
    objects: [
      ["order number", "订单号"], ["delivery window", "配送时间窗口"], ["refund request", "退款申请"], ["replacement shipment", "补发货件"], ["complaint case", "投诉工单"],
      ["quotation", "报价"], ["requirement list", "需求清单"], ["service level", "服务等级"], ["compensation option", "补偿方案"], ["tracking record", "物流记录"],
      ["contract term", "合同条款"], ["purchase order", "采购订单"], ["delivery delay", "配送延误"], ["resolution plan", "解决方案"], ["customer expectation", "客户预期"]
    ],
    actions: [
      ["confirm the order number", "确认订单号"], ["explain the delay", "解释延误"], ["offer a solution", "提供解决方案"], ["request more details", "请求更多细节"], ["follow up with logistics", "跟进物流"],
      ["process a refund", "处理退款"], ["arrange a replacement", "安排补发"], ["set expectations", "管理预期"], ["escalate the case", "升级工单"], ["send a written update", "发送书面更新"]
    ],
    issues: [
      ["the package is delayed", "包裹延误"], ["the refund is pending", "退款待处理"], ["the client is unhappy", "客户不满意"], ["the requirement changed", "需求变更"],
      ["the quotation is too high", "报价过高"], ["the delivery date is risky", "交付日期有风险"], ["the tracking record is missing", "物流记录缺失"], ["the resolution is unclear", "解决方案不清晰"]
    ]
  },
  shopping: {
    id: "shopping",
    zhName: "购物超市",
    category: "travel",
    title: "购物",
    subtitle: "找商品 · 尺码 · 折扣 · 退换货",
    place: "in a store",
    zhPlace: "在商店",
    helper: "store assistant",
    zhHelper: "店员",
    objects: [["price tag", "价格标签"], ["discount", "折扣"], ["receipt", "收据"], ["fitting room", "试衣间"], ["size chart", "尺码表"], ["cashier", "收银台"], ["shopping cart", "购物车"], ["loyalty card", "会员卡"], ["return policy", "退货政策"], ["exchange policy", "换货政策"], ["out of stock", "缺货"], ["shelf", "货架"], ["barcode", "条形码"], ["coupon", "优惠券"], ["checkout counter", "结账柜台"]],
    actions: [["find a product", "找商品"], ["try this on", "试穿"], ["check the size", "确认尺码"], ["ask for a discount", "询问折扣"], ["return an item", "退货"], ["exchange an item", "换货"], ["pay by card", "刷卡支付"], ["use a coupon", "使用优惠券"], ["check availability", "查询库存"], ["get a receipt", "索要收据"]],
    issues: [["the size is not right", "尺码不合适"], ["the item is damaged", "商品损坏"], ["the price is different", "价格不一致"], ["the receipt is missing", "收据丢失"], ["the product is out of stock", "商品缺货"], ["the card payment failed", "刷卡失败"], ["the fitting room is full", "试衣间满了"], ["the return window has passed", "退货期限已过"]]
  },
  sightseeing: {
    id: "sightseeing",
    zhName: "景点游玩",
    category: "travel",
    title: "景点",
    subtitle: "买票 · 导览 · 排队 · 游客服务",
    place: "at the attraction",
    zhPlace: "在景点",
    helper: "visitor center staff",
    zhHelper: "游客中心工作人员",
    objects: [["ticket booth", "售票处"], ["entrance ticket", "门票"], ["opening hours", "开放时间"], ["guided tour", "导览团"], ["audio guide", "语音导览"], ["visitor map", "游客地图"], ["locker", "寄存柜"], ["queue line", "排队队伍"], ["photo spot", "拍照点"], ["exhibition hall", "展厅"], ["souvenir shop", "纪念品商店"], ["information desk", "咨询台"], ["rest area", "休息区"], ["viewpoint", "观景点"], ["closing time", "闭馆时间"]],
    actions: [["buy a ticket", "买票"], ["join a guided tour", "参加导览"], ["rent an audio guide", "租语音导览"], ["store my bag", "寄存包"], ["ask about opening hours", "询问开放时间"], ["find the entrance", "找入口"], ["follow the route", "按路线游览"], ["take photos", "拍照"], ["avoid the crowd", "避开人群"], ["ask for a map", "索要地图"]],
    issues: [["tickets are sold out", "门票售罄"], ["the attraction is closed", "景点关闭"], ["the queue is too long", "队伍太长"], ["the audio guide is not working", "语音导览故障"], ["the locker is full", "寄存柜满了"], ["the route is blocked", "路线封闭"], ["the weather is bad", "天气不好"], ["the tour is delayed", "导览延迟"]]
  },
  pharmacy: {
    id: "pharmacy",
    zhName: "医疗药店",
    category: "travel",
    title: "医疗药店",
    subtitle: "症状 · 买药 · 剂量 · 紧急求助",
    place: "at the pharmacy",
    zhPlace: "在药店",
    helper: "pharmacist",
    zhHelper: "药剂师",
    objects: [["pharmacy", "药店"], ["prescription", "处方"], ["painkiller", "止痛药"], ["cold medicine", "感冒药"], ["cough syrup", "止咳糖浆"], ["allergy medicine", "过敏药"], ["bandage", "绷带"], ["thermometer", "体温计"], ["dosage", "剂量"], ["side effect", "副作用"], ["insurance card", "保险卡"], ["clinic", "诊所"], ["appointment", "预约"], ["emergency room", "急诊室"], ["medical record", "病历"]],
    actions: [["describe symptoms", "描述症状"], ["buy medicine", "买药"], ["ask about dosage", "询问剂量"], ["mention an allergy", "说明过敏"], ["book a doctor appointment", "预约医生"], ["use insurance", "使用保险"], ["get urgent help", "寻求紧急帮助"], ["ask for a substitute", "询问替代药"], ["check side effects", "确认副作用"], ["take the medicine", "服药"]],
    issues: [["I have a fever", "我发烧"], ["I have a sore throat", "我喉咙痛"], ["I feel dizzy", "我头晕"], ["I am allergic to penicillin", "我对青霉素过敏"], ["the medicine makes me sleepy", "药让我犯困"], ["the pain is getting worse", "疼痛加重"], ["I lost my prescription", "我弄丢处方"], ["my insurance is not accepted", "我的保险不能用"]]
  },
  payment: {
    id: "payment",
    zhName: "支付退税",
    category: "travel",
    title: "支付退税",
    subtitle: "刷卡 · 收据 · 退款 · 退税",
    place: "at checkout",
    zhPlace: "结账时",
    helper: "cashier",
    zhHelper: "收银员",
    objects: [["credit card", "信用卡"], ["cash", "现金"], ["mobile payment", "移动支付"], ["receipt", "收据"], ["refund", "退款"], ["tax refund", "退税"], ["exchange rate", "汇率"], ["service charge", "服务费"], ["tip", "小费"], ["payment terminal", "刷卡机"], ["PIN code", "密码"], ["signature", "签名"], ["invoice", "发票"], ["billing address", "账单地址"], ["refund form", "退款表"]],
    actions: [["pay by card", "刷卡支付"], ["pay in cash", "现金支付"], ["ask for a receipt", "索要收据"], ["request a refund", "申请退款"], ["apply for a tax refund", "申请退税"], ["check the exchange rate", "确认汇率"], ["split the payment", "分开付款"], ["add a tip", "加小费"], ["enter my PIN", "输入密码"], ["sign the receipt", "签收据"]],
    issues: [["the payment failed", "支付失败"], ["the card was declined", "银行卡被拒"], ["the receipt is wrong", "收据错误"], ["the refund has not arrived", "退款未到账"], ["the tax refund counter is closed", "退税柜台关闭"], ["the exchange rate is unclear", "汇率不清楚"], ["I was charged twice", "我被扣款两次"], ["the terminal is not working", "刷卡机故障"]]
  },
  phone: {
    id: "phone",
    zhName: "电话沟通",
    category: "travel",
    title: "电话",
    subtitle: "预约 · 改时间 · 客服 · 确认信息",
    place: "on the phone",
    zhPlace: "打电话时",
    helper: "customer service agent",
    zhHelper: "客服",
    objects: [["phone call", "电话"], ["callback", "回电"], ["reservation time", "预约时间"], ["confirmation message", "确认短信"], ["extension number", "分机号"], ["voicemail", "语音留言"], ["customer service", "客服"], ["hold time", "等待时间"], ["reference number", "参考编号"], ["appointment slot", "预约时段"], ["address confirmation", "地址确认"], ["booking change", "预订变更"], ["cancellation policy", "取消政策"], ["service hotline", "服务热线"], ["contact number", "联系电话"]],
    actions: [["make a call", "打电话"], ["leave a message", "留言"], ["request a callback", "请求回电"], ["change the appointment", "更改预约"], ["confirm the address", "确认地址"], ["spell my name", "拼写姓名"], ["repeat the number", "重复号码"], ["wait on hold", "等待接通"], ["cancel a booking", "取消预订"], ["ask for customer service", "请求客服"]],
    issues: [["the line is busy", "线路忙"], ["I cannot hear you clearly", "我听不清"], ["the call was disconnected", "电话断了"], ["the appointment time is wrong", "预约时间错误"], ["the address is incorrect", "地址不正确"], ["I missed the callback", "我错过回电"], ["the voicemail is full", "语音信箱满了"], ["the booking was cancelled", "预订被取消"]]
  },
  emergency: {
    id: "emergency",
    zhName: "紧急求助",
    category: "travel",
    title: "紧急求助",
    subtitle: "报警 · 丢失 · 受伤 · 使馆",
    place: "in an emergency",
    zhPlace: "紧急情况下",
    helper: "emergency staff",
    zhHelper: "应急人员",
    objects: [["police station", "警察局"], ["emergency number", "紧急电话"], ["lost wallet", "丢失的钱包"], ["stolen passport", "被盗护照"], ["embassy", "使馆"], ["travel insurance", "旅行保险"], ["incident report", "事件报告"], ["first aid", "急救"], ["ambulance", "救护车"], ["safe place", "安全地点"], ["contact person", "联系人"], ["case number", "案件编号"], ["temporary document", "临时证件"], ["help desk", "求助台"], ["emergency contact", "紧急联系人"]],
    actions: [["call the police", "报警"], ["report a lost item", "报告失物"], ["contact the embassy", "联系使馆"], ["ask for first aid", "请求急救"], ["file a report", "报案"], ["call an ambulance", "叫救护车"], ["show my ID", "出示证件"], ["contact my family", "联系家人"], ["use travel insurance", "使用旅行保险"], ["find a safe place", "找安全地点"]],
    issues: [["my passport was stolen", "我的护照被盗"], ["I lost my wallet", "我丢了钱包"], ["I need medical help", "我需要医疗帮助"], ["I feel unsafe", "我感到不安全"], ["my phone is missing", "我的手机不见了"], ["I got injured", "我受伤了"], ["I cannot find my hotel", "我找不到酒店"], ["I need an interpreter", "我需要口译帮助"]]
  },
  car_rental: {
    id: "car_rental",
    zhName: "租车自驾",
    category: "travel",
    title: "租车",
    subtitle: "租车 · 保险 · 加油 · 停车",
    place: "at the rental counter",
    zhPlace: "在租车柜台",
    helper: "rental agent",
    zhHelper: "租车工作人员",
    objects: [["driver's license", "驾照"], ["rental agreement", "租车协议"], ["insurance coverage", "保险范围"], ["deposit", "押金"], ["fuel policy", "燃油政策"], ["parking ticket", "停车罚单"], ["toll road", "收费公路"], ["GPS navigation", "导航"], ["car inspection", "验车"], ["damage report", "损伤报告"], ["pickup location", "取车地点"], ["drop-off location", "还车地点"], ["mileage limit", "里程限制"], ["child seat", "儿童座椅"], ["roadside assistance", "道路救援"]],
    actions: [["rent a car", "租车"], ["add insurance", "加保险"], ["inspect the car", "检查车辆"], ["report damage", "报告损伤"], ["fill up the tank", "加满油"], ["return the car", "还车"], ["pay a toll", "支付过路费"], ["find parking", "找停车位"], ["extend the rental", "延长租期"], ["request roadside assistance", "请求道路救援"]],
    issues: [["the car has a scratch", "车有划痕"], ["the fuel tank is not full", "油箱未满"], ["the GPS is not working", "导航不可用"], ["the insurance is unclear", "保险不清楚"], ["I got a parking ticket", "我收到停车罚单"], ["the car broke down", "车坏了"], ["the pickup location changed", "取车地点变了"], ["the deposit is too high", "押金太高"]]
  },
  services: {
    id: "services",
    zhName: "生活服务",
    category: "travel",
    title: "生活服务",
    subtitle: "洗衣 · 快递 · 修理 · 寄存",
    place: "at a local service shop",
    zhPlace: "在生活服务店",
    helper: "service staff",
    zhHelper: "服务人员",
    objects: [["laundry service", "洗衣服务"], ["dry cleaning", "干洗"], ["haircut", "理发"], ["parcel delivery", "快递"], ["printing service", "打印服务"], ["storage locker", "寄存柜"], ["repair shop", "维修店"], ["delivery address", "收件地址"], ["pickup time", "取件时间"], ["service fee", "服务费"], ["tracking number", "物流单号"], ["receipt", "收据"], ["express delivery", "加急配送"], ["photo copy", "复印件"], ["mobile repair", "手机维修"]],
    actions: [["drop off laundry", "送洗衣物"], ["pick up a parcel", "取快递"], ["print a document", "打印文件"], ["store luggage", "寄存行李"], ["repair my phone", "修手机"], ["book a haircut", "预约理发"], ["confirm the price", "确认价格"], ["ask for express service", "询问加急服务"], ["change the pickup time", "更改取件时间"], ["track a package", "查询包裹"]],
    issues: [["the parcel is missing", "包裹丢失"], ["the laundry is not ready", "衣物未洗好"], ["the price is higher than expected", "价格高于预期"], ["the document printed incorrectly", "文件打印错误"], ["the locker is full", "寄存柜满了"], ["the phone cannot be repaired today", "手机今天修不了"], ["the pickup time changed", "取件时间变了"], ["the tracking number is invalid", "物流单号无效"]]
  },
  interview: {
    id: "interview",
    zhName: "外企面试",
    category: "work",
    title: "面试",
    subtitle: "自我介绍 · 项目经历 · 行为面试",
    place: "in the interview",
    zhPlace: "在面试中",
    helper: "interviewer",
    zhHelper: "面试官",
    objects: [["resume", "简历"], ["cover letter", "求职信"], ["job description", "职位描述"], ["strength", "优势"], ["weakness", "不足"], ["achievement", "成果"], ["challenge", "挑战"], ["career goal", "职业目标"], ["salary expectation", "薪资期望"], ["behavioral question", "行为面试问题"], ["work sample", "作品样例"], ["reference", "推荐人"], ["notice period", "离职通知期"], ["company culture", "公司文化"], ["interview feedback", "面试反馈"]],
    actions: [["introduce myself", "自我介绍"], ["explain my experience", "解释经历"], ["describe a project", "描述项目"], ["answer a behavioral question", "回答行为面试题"], ["ask a follow-up question", "追问问题"], ["discuss salary expectations", "讨论薪资期望"], ["share my career goal", "分享职业目标"], ["highlight an achievement", "强调成果"], ["explain a challenge", "解释挑战"], ["send a thank-you note", "发送感谢邮件"]],
    issues: [["I need more time to answer", "我需要更多时间回答"], ["the question is unclear", "问题不清楚"], ["my experience is not a perfect match", "我的经历不是完全匹配"], ["the salary range is unclear", "薪资范围不清楚"], ["the interview was rescheduled", "面试被改期"], ["I missed one detail", "我漏掉一个细节"], ["the role scope is broad", "岗位范围较宽"], ["the next step is unclear", "下一步不清楚"]]
  },
  onboarding: {
    id: "onboarding",
    zhName: "入职协作",
    category: "work",
    title: "入职",
    subtitle: "权限 · 工具 · 职责 · 交接",
    place: "during onboarding",
    zhPlace: "入职时",
    helper: "team buddy",
    zhHelper: "入职伙伴",
    objects: [["onboarding checklist", "入职清单"], ["access request", "权限申请"], ["company laptop", "公司电脑"], ["email account", "邮箱账号"], ["team directory", "团队通讯录"], ["training session", "培训课程"], ["handover document", "交接文档"], ["role description", "职责说明"], ["probation period", "试用期"], ["manager one-on-one", "经理一对一"], ["HR policy", "人力政策"], ["expense system", "报销系统"], ["calendar invite", "日历邀请"], ["security badge", "门禁卡"], ["tool permission", "工具权限"]],
    actions: [["request access", "申请权限"], ["set up my laptop", "设置电脑"], ["join a training session", "参加培训"], ["read the handover document", "阅读交接文档"], ["confirm my responsibilities", "确认职责"], ["schedule a one-on-one", "安排一对一"], ["submit an expense", "提交报销"], ["update my profile", "更新个人资料"], ["ask about probation", "询问试用期"], ["meet the team", "认识团队"]],
    issues: [["my access is still pending", "我的权限仍待审批"], ["the laptop is not ready", "电脑还没准备好"], ["the meeting invite is missing", "会议邀请缺失"], ["the handover document is outdated", "交接文档过时"], ["the role scope is unclear", "职责范围不清楚"], ["the system login failed", "系统登录失败"], ["the training time conflicts", "培训时间冲突"], ["the expense policy is confusing", "报销政策不清楚"]]
  },
  project: {
    id: "project",
    zhName: "项目推进",
    category: "work",
    title: "项目",
    subtitle: "目标 · 排期 · 阻塞 · 上线",
    place: "in the project sync",
    zhPlace: "在项目同步中",
    helper: "project owner",
    zhHelper: "项目负责人",
    objects: [["project goal", "项目目标"], ["timeline", "时间线"], ["milestone", "里程碑"], ["dependency", "依赖"], ["resource", "资源"], ["blocker", "阻塞"], ["risk register", "风险清单"], ["launch plan", "上线计划"], ["scope change", "范围变更"], ["status update", "状态更新"], ["stakeholder", "利益相关方"], ["delivery date", "交付日期"], ["test plan", "测试计划"], ["rollback plan", "回滚方案"], ["post-launch review", "上线后复盘"]],
    actions: [["define the goal", "定义目标"], ["set the timeline", "设定时间线"], ["track a milestone", "追踪里程碑"], ["manage a dependency", "管理依赖"], ["raise a blocker", "提出阻塞"], ["update the status", "更新状态"], ["reduce the scope", "缩小范围"], ["prepare the launch plan", "准备上线计划"], ["align with stakeholders", "对齐利益相关方"], ["run a post-launch review", "进行上线复盘"]],
    issues: [["the timeline is slipping", "时间线延后"], ["the dependency is delayed", "依赖延迟"], ["the scope changed", "范围变化"], ["resources are limited", "资源有限"], ["the test result failed", "测试结果失败"], ["the owner is unclear", "负责人不清楚"], ["the launch is risky", "上线有风险"], ["the requirement changed late", "需求后期变更"]]
  },
  ecommerce: {
    id: "ecommerce",
    zhName: "电商运营",
    category: "work",
    title: "电商运营",
    subtitle: "活动 · 商品 · 库存 · 转化",
    place: "in e-commerce operations",
    zhPlace: "在电商运营中",
    helper: "operations lead",
    zhHelper: "运营负责人",
    objects: [["campaign plan", "活动计划"], ["product listing", "商品链接"], ["inventory level", "库存水平"], ["order volume", "订单量"], ["conversion rate", "转化率"], ["refund rate", "退款率"], ["traffic source", "流量来源"], ["ad spend", "广告投放"], ["product detail page", "商品详情页"], ["promotion code", "优惠码"], ["shopping cart", "购物车"], ["repeat buyer", "复购用户"], ["customer review", "用户评价"], ["stockout risk", "缺货风险"], ["marketplace policy", "平台政策"]],
    actions: [["launch a campaign", "上线活动"], ["update a product listing", "更新商品链接"], ["monitor inventory", "监控库存"], ["analyze conversion", "分析转化"], ["review refunds", "复盘退款"], ["adjust ad spend", "调整广告投放"], ["optimize the product page", "优化商品页"], ["track order volume", "追踪订单量"], ["check customer reviews", "查看用户评价"], ["test a promotion code", "测试优惠码"]],
    issues: [["inventory is low", "库存偏低"], ["conversion is dropping", "转化下降"], ["refunds are increasing", "退款增加"], ["ad spend is too high", "广告花费过高"], ["the product page is unclear", "商品页不清楚"], ["the promotion code failed", "优惠码失效"], ["order volume is unstable", "订单量不稳定"], ["customer reviews are negative", "用户评价偏负面"]]
  },
  collaboration: {
    id: "collaboration",
    zhName: "跨团队协作",
    category: "work",
    title: "跨团队",
    subtitle: "产品 · 设计 · 研发 · 供应链",
    place: "in cross-team collaboration",
    zhPlace: "跨团队协作时",
    helper: "cross-functional partner",
    zhHelper: "跨团队伙伴",
    objects: [["product team", "产品团队"], ["design team", "设计团队"], ["engineering team", "研发团队"], ["operations team", "运营团队"], ["supply chain team", "供应链团队"], ["legal team", "法务团队"], ["dependency", "依赖"], ["handoff", "交接"], ["feedback loop", "反馈闭环"], ["shared document", "共享文档"], ["review meeting", "评审会"], ["decision owner", "决策负责人"], ["alignment", "对齐"], ["trade-off", "取舍"], ["escalation path", "升级路径"]],
    actions: [["align with product", "和产品对齐"], ["share design feedback", "反馈设计意见"], ["follow up with engineering", "跟进研发"], ["coordinate with operations", "协调运营"], ["check with supply chain", "确认供应链"], ["review legal requirements", "评审法务要求"], ["document a handoff", "记录交接"], ["close the feedback loop", "闭环反馈"], ["make a trade-off", "做取舍"], ["escalate the issue", "升级问题"]],
    issues: [["the dependency is unclear", "依赖不清楚"], ["feedback is delayed", "反馈延迟"], ["the handoff is incomplete", "交接不完整"], ["the decision owner is missing", "缺少决策负责人"], ["teams are not aligned", "团队未对齐"], ["legal review is pending", "法务评审待处理"], ["engineering capacity is limited", "研发产能有限"], ["the trade-off is difficult", "取舍困难"]]
  },
  performance: {
    id: "performance",
    zhName: "绩效反馈",
    category: "work",
    title: "绩效",
    subtitle: "目标 · 成果 · 反馈 · 晋升",
    place: "in a performance review",
    zhPlace: "在绩效沟通中",
    helper: "manager",
    zhHelper: "经理",
    objects: [["performance goal", "绩效目标"], ["key result", "关键结果"], ["self-review", "自评"], ["manager feedback", "经理反馈"], ["growth area", "成长点"], ["promotion path", "晋升路径"], ["skill gap", "能力差距"], ["development plan", "发展计划"], ["business impact", "业务影响"], ["peer feedback", "同事反馈"], ["quarterly review", "季度复盘"], ["career aspiration", "职业期待"], ["strength", "优势"], ["improvement area", "改进点"], ["next-cycle goal", "下一周期目标"]],
    actions: [["review my goals", "复盘目标"], ["share achievements", "分享成果"], ["ask for feedback", "寻求反馈"], ["discuss growth areas", "讨论成长点"], ["set a development plan", "制定发展计划"], ["clarify promotion criteria", "明确晋升标准"], ["measure business impact", "衡量业务影响"], ["collect peer feedback", "收集同事反馈"], ["align on next goals", "对齐下一阶段目标"], ["summarize action items", "总结行动项"]],
    issues: [["the goal was unclear", "目标不清楚"], ["the impact is hard to measure", "影响难以衡量"], ["feedback is too general", "反馈太笼统"], ["the promotion path is unclear", "晋升路径不清楚"], ["the skill gap is large", "能力差距较大"], ["the timeline is too short", "时间线太短"], ["peer feedback is mixed", "同事反馈不一致"], ["priorities changed mid-cycle", "周期中优先级变化"]]
  },
  workplace_social: {
    id: "workplace_social",
    zhName: "职场社交",
    category: "work",
    title: "职场社交",
    subtitle: "寒暄 · 午餐 · 文化差异 · 团队活动",
    place: "at work",
    zhPlace: "在职场中",
    helper: "colleague",
    zhHelper: "同事",
    objects: [["small talk", "寒暄"], ["coffee chat", "咖啡聊天"], ["team lunch", "团队午餐"], ["after-work event", "下班后活动"], ["company culture", "公司文化"], ["holiday schedule", "假期安排"], ["team building", "团建"], ["office etiquette", "办公室礼仪"], ["local custom", "当地习惯"], ["work-life balance", "工作生活平衡"], ["networking event", "社交活动"], ["icebreaker", "破冰话题"], ["shared interest", "共同兴趣"], ["farewell message", "告别消息"], ["welcome note", "欢迎语"]],
    actions: [["start small talk", "开始寒暄"], ["join a coffee chat", "参加咖啡聊天"], ["invite a colleague to lunch", "邀请同事午餐"], ["ask about local customs", "询问当地习惯"], ["join a team event", "参加团队活动"], ["send a welcome note", "发送欢迎语"], ["write a farewell message", "写告别消息"], ["share a personal interest", "分享个人兴趣"], ["build rapport", "建立关系"], ["respect cultural differences", "尊重文化差异"]],
    issues: [["I do not know what to say", "我不知道说什么"], ["the joke is hard to understand", "玩笑难理解"], ["the custom is unfamiliar", "习惯不熟悉"], ["the event conflicts with my schedule", "活动和日程冲突"], ["I forgot a colleague's name", "我忘了同事名字"], ["the topic feels too personal", "话题太私人"], ["I need to decline politely", "我需要礼貌拒绝"], ["I want to join the conversation", "我想加入对话"]]
  },
  remote: {
    id: "remote",
    zhName: "远程办公",
    category: "work",
    title: "远程办公",
    subtitle: "视频会议 · 时区 · 文档 · 异步沟通",
    place: "while working remotely",
    zhPlace: "远程办公时",
    helper: "remote teammate",
    zhHelper: "远程同事",
    objects: [["video call", "视频会议"], ["time zone", "时区"], ["shared document", "共享文档"], ["async update", "异步更新"], ["calendar invite", "日历邀请"], ["meeting recording", "会议录制"], ["screen sharing", "屏幕共享"], ["chat thread", "聊天串"], ["status message", "状态消息"], ["working hours", "工作时间"], ["handoff note", "交接备注"], ["remote setup", "远程设置"], ["VPN access", "VPN 权限"], ["focus time", "专注时间"], ["leave request", "请假申请"]],
    actions: [["join a video call", "加入视频会议"], ["share my screen", "共享屏幕"], ["post an async update", "发布异步更新"], ["check the time zone", "确认时区"], ["record the meeting", "录制会议"], ["update my status", "更新状态"], ["send a handoff note", "发送交接备注"], ["request VPN access", "申请 VPN 权限"], ["block focus time", "预留专注时间"], ["submit a leave request", "提交请假申请"]],
    issues: [["the audio is not working", "音频不可用"], ["the video is frozen", "视频卡住"], ["the time zone is confusing", "时区混乱"], ["the document link is broken", "文档链接失效"], ["the async update is missing", "异步更新缺失"], ["VPN access failed", "VPN 权限失败"], ["the meeting recording is unavailable", "会议录制不可用"], ["my working hours overlap poorly", "我的工作时间重叠少"]]
  }
};

export function expandContent(content: Content): Content {
  const scenarioIds = Array.from(new Set([...Object.keys(content.scenarios), ...Object.keys(seeds)]));
  return {
    ...content,
    scenarios: Object.fromEntries(
      scenarioIds.map((id) => [id, expandScenario(content.scenarios[id] ?? createScenario(seeds[id]))])
    )
  };
}

function createScenario(seed: Seed): Scenario {
  const words = generateWords(seed);
  return {
    id: seed.id,
    category: seed.category,
    title: seed.title,
    subtitle: seed.subtitle,
    words,
    sentences: generateSentences(seed),
    dialogue: [
      { speaker: "A", en: `Hi, I need help with ${seed.title.toLowerCase()}.`, zh: `你好，我需要处理${seed.title}相关的问题。` },
      { speaker: "B", en: `Sure. What would you like to do?`, zh: `当然。你想做什么？` },
      { speaker: "A", en: `Could you help me ${seed.actions[0][0]}?`, zh: `你能帮我${seed.actions[0][1]}吗？` },
      { speaker: "B", en: `No problem. Let me check that for you.`, zh: `没问题。我帮你确认一下。` },
      { speaker: "A", en: `${seed.issues[0][0]}.`, zh: `${seed.issues[0][1]}。` },
      { speaker: "B", en: `Thanks for explaining. Here is what we can do next.`, zh: `谢谢说明。接下来我们可以这样处理。` }
    ],
    quiz: generateQuizzes(seed, words)
  };
}

function expandScenario(scenario: Scenario): Scenario {
  const seed = seeds[scenario.id];
  if (!seed) {
    return scenario;
  }

  const words = uniqueByEn([...scenario.words, ...generateWords(seed)]).slice(0, TARGET_WORDS);
  const sentences = uniqueByEn([...scenario.sentences, ...generateSentences(seed)]).slice(0, TARGET_SENTENCES);
  const quiz = uniqueById([...scenario.quiz, ...generateQuizzes(seed, words)]).slice(0, TARGET_QUIZZES);

  return { ...scenario, words, sentences, quiz };
}

function generateWords(seed: Seed): WordItem[] {
  return [
    ...seed.objects.map(([en, zh]) => ({
      en,
      zh,
      example: `Could you help me check the ${en} ${seed.place}?`
    })),
    ...seed.actions.map(([en, zh]) => ({
      en,
      zh,
      example: `I need to ${en} ${seed.place}.`
    })),
    ...seed.issues.map(([en, zh]) => ({
      en,
      zh,
      example: `I need help because ${en}.`
    }))
  ];
}

function generateSentences(seed: Seed): SentenceItem[] {
  return [
    ...seed.actions.flatMap(([action, zhAction]) => [
      {
        en: `Could you help me ${action}?`,
        zh: `你能帮我${zhAction}吗？`,
        scene: `${seed.zhName}场景`
      },
      {
        en: `I need to ${action} before we continue.`,
        zh: `继续之前，我需要${zhAction}。`,
        scene: `${seed.zhName}场景`
      }
    ]),
    ...seed.issues.flatMap(([issue, zhIssue]) => [
      {
        en: `I need help because ${issue}.`,
        zh: `我需要帮助，因为${zhIssue}。`,
        scene: `${seed.zhName}场景`
      },
      {
        en: `What should I do if ${issue}?`,
        zh: `如果${zhIssue}，我应该怎么办？`,
        scene: `${seed.zhName}场景`
      }
    ]),
    ...seed.objects.map(([object, zhObject]) => ({
      en: `Could you check the ${object} for me?`,
      zh: `你能帮我确认一下${zhObject}吗？`,
      scene: `${seed.zhName}场景`
    }))
  ];
}

function generateQuizzes(seed: Seed, words: WordItem[]): QuizItem[] {
  return words.slice(0, TARGET_QUIZZES).map((word, index) => {
    const distractors = words
      .filter((item) => item.zh !== word.zh)
      .slice(index + 1, index + 4)
      .map((item) => item.zh);
    const options = [word.zh, ...padOptions(distractors, words, word.zh)].slice(0, 4);

    return {
      id: `${seed.id}-generated-${index + 1}`,
      question: `"${word.en}" 在${seed.zhName}场景中的中文意思是？`,
      options,
      answer: word.zh
    };
  });
}

function padOptions(current: string[], words: WordItem[], answer: string) {
  const options = [...current];
  for (const word of words) {
    if (options.length >= 3) {
      break;
    }
    if (word.zh !== answer && !options.includes(word.zh)) {
      options.push(word.zh);
    }
  }
  return options;
}

function uniqueByEn<T extends { en: string }>(items: T[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.en.toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function uniqueById(items: QuizItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
}
