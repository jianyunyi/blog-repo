# Google Gemini 4 Carbon 发布：最强模型登顶，普通人现在还用不上（2026-10-28 发布）

**一句话导读：** 2026 年 10 月 28 日，Google DeepMind 发布 Gemini 4 Carbon，自称“最强模型”，主打网络安全和长程工程任务，独立榜单 Artificial Analysis Intelligence Index v5 直接登顶 59 分。但先别急着找入口：首批只给一小部分网络安全防御者，开发者、企业和普通用户都没有公开时间表——今天这篇教你怎么核实、怎么等、怎么防骗，而不是假装能教你“开通 Carbon”。

## 前置条件（需要什么）

- 不需要注册、不需要付费——因为现在根本没有面向公众的开通入口
- 需要一个判断标准：凡是声称“已开通 Carbon 内测、付费可进”的第三方链接，一律按骗局处理
- 如果你现在就要用 Gemini，目标应该是上一代 Argon，而不是 Carbon

## 分步骤

### 第 1 步：读官方公告原文，确认“发布”和“可用”是两回事

![Google 官方公告：Gemini 4 Carbon，2026 年 10 月 28 日](img/2026-10-29-gemini-carbon/step1.png)

打开 Google 官方博客的 Carbon 公告（2026 年 10 月 28 日，作者 Koray Kavukcuoglu）：第一句就是“our strongest model with state-of-the-art cybersecurity and long horizon capabilities”，但 rollout 一段写得非常明确——本周起先给一小部分网络安全防御者，再通过 Fairwind Program 逐步扩大到受信任的合作伙伴，收集反馈、迭代护栏之后，才“as soon as possible”给开发者、企业和消费者。没有日期、没有公开申请表、没有 API 模型 ID——这三样都没有，就不能写“申请步骤”。

### 第 2 步：看独立榜单和厂商分数的差距，别只看一家之言

![VentureBeat 报道：Carbon 登顶但访问受限，独立榜单 59 分](img/2026-10-29-gemini-carbon/step2.png)

VentureBeat 的报道把两边放在一起：独立评估 Artificial Analysis 的 Intelligence Index v5 给 Carbon（High）59 分，排第一，Claude Opus 5.5 是 58 分、GPT-6 Astra 57 分、上一代 Argon 50 分；Google 自己的安全分数是 SEC-bench Pro 找漏洞 88.2%、CWE-bench 打补丁 71.0%、ExploitGym 利用 54.8%，安全代码生成成功率比 Argon 高 2 倍以上（内部基准）。但同一篇报道也留了口子：Carbon 在部分专业任务上落后对手、在一项事实知识测试里的幻觉率高于 Argon；Google 的安全基准据称是“无护栏条件下测的”，且 Chrome 那个“10 倍于另一家大模型”的说法没有点名对手——厂商分数先当“定位参考”，别当“实测结论”。

### 第 3 步：算价格、定等待策略——现在该干什么

![路透社报道：Gemini 4 Carbon 定价 $2/$10，与 Argon  introductory 价一致](img/2026-10-29-gemini-carbon/step3.png)

路透社 2026 年 10 月 28 日的报道确认了定价：Carbon 上线价是每百万输入 token $2、输出 $10，缓存输入便宜 95%，和 Argon 的 introductory 价一致；但 introductory 期结束后涨到 $4/$20，结束日期 Google 没公布。给普通读者的等待策略就三条：

1. **现在要用 Gemini：** 用 Argon 的 API/产品线，别等 Carbon——Carbon 的价格和能力现在都只是“纸面价”。
2. **你是安全团队或关键基础设施单位：** 去了解 Fairwind Program 的定位（面向国家网络安全机构、关键基础设施运营商、核心技术平台，限定防御与学术研究用途），它不是消费者排队通道。
3. **你是个人用户：** 只盯两个官方信号——Google 博客的后续公告和 Artificial Analysis 的榜单更新，其他“Carbon 内测群”“Carbon 充值入口”一律不点、不付。

## 注意事项、费用、坑点

- **费用（纸面价，未生效）：**  introductory $2 输入 / $10 输出（每百万 token），缓存输入 95% off；之后 $4/$20。没有公开 API 之前，这个价格买不到任何东西。
- **和 GPT-6.1 Terra（10-27 篇）的区别：** Terra 是 10 月 26 日发布、且明确给了 ChatGPT Work 与 Codex 的可用范围；Carbon 是 10 月 28 日发布、但可用范围只写了“部分防御者”，两者的“发布”含金量不一样，别把公告日当上线日。
- **上下文窗口：** 第三方模型库标注 Carbon 为 1M token 上下文，Google 官方公告正文未明确写出，本文按第三方口径标注、未当官方数字写。
- **别踩的坑：** ① 别为“Carbon 账号”“Carbon API Key”付费，那是假货重灾区；② 别把 59 分理解成“所有任务都第一”——榜单是 9 项评估的综合分，单项上 OpenAI 和 Anthropic 各有领先；③ 别用 Carbon 的安全分数去论证“它能替你做渗透测试”——Fairwind 明确限定防御与学术用途，攻击性用途不在放行范围内。

## 来源

- Google 官方公告（2026-10-28）：https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/
- 路透社（2026-10-28）：https://www.reuters.com/technology/google-launches-gemini-4-carbon-ai-model-with-cybersecurity-focus-2026-10-28/
- VentureBeat 报道（含独立榜单与短板）：https://venturebeat.com/technology/google-unveils-gemini-4-carbon-retaking-the-worlds-no-1-spot-on-updated-harder-benchmarks-but-access-is-limited
- 模型库整理（1M 上下文、无公开 API ID）：https://handyai.substack.com/p/model-drop-gemini-4-carbon
- 当日 AI 新闻汇总：https://thediaryofai.com/ai-news-20261028/
