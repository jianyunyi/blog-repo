# GitHub Copilot 免费版实测：2000 次补全 + 有限聊天，不绑卡就能薅

> 一句话导读：GitHub 账号登录即用的 Copilot Free，每月给 2000 次代码补全和约 50 条聊天/Agent 请求，无需绑卡——轻度写代码、学编程、做小项目完全够用；本篇把官方额度、开通姿势、和付费版的差距一次讲清。

## 先说结论：2026 年 10 月还能薅吗？

能。GitHub 官方计划页（2026-10-23 当天实测打开）明示 Copilot Free 依然是 **$0**，官方文档也确认免费版持续开放。Copilot Free 是 2024 年 12 月 18 日由 GitHub CEO Thomas Dohmke 官宣上线的——算下来已经稳定运营了近两年，**没有批量封号、没有突然下线的前科**（不像某些免费服务说没就没）。

但先泼两盆冷水：

1. **它是"试用级"的免费，不是"主力级"的免费**——官方文档原话是 "limited access to a selection of Copilot features"，定位就是让你尝鲜。
2. **额度规则会变**——2026 年 6 月 1 日 Copilot 全系已经从 premium requests 切换到 AI Credits 按量计费，文档里多处写着 "subject to change"。**动手前以官方计划页的实时口径为准**，本文数字是 2026-10-23 核实的。

另外提醒：10-17 那篇已经讲过 **GitHub 学生包（Copilot Student：无限补全）**，在读学生直接走那条路更香；本篇是给"非学生、只想免费体验"的人看的。

## 前置条件（需要什么）

1. **一个 GitHub 个人账号**（年满 13 岁），免费注册即可。
2. **一个代码编辑器**：VS Code（最顺滑）、JetBrains 系、Neovim、Xcode、Eclipse 都行，或者直接在终端用 Copilot CLI。
3. **不需要绑卡**：官方培训文档原话 "no credit card needed to sign up"（2026 年 10 月的第三方价格复核也确认 Free 档无需绑卡）。这是和 pp.ua 那种"绑卡防机器人"完全不同的路子。
4. **不需要学生身份**：任何个人账号都能开。

网络要求：github.com 和 docs.github.com 国内可直连，全程足不出户。

## 步骤一：看官方计划页，搞清免费版到底给了什么

打开官方计划页 https://github.com/features/copilot/plans（2026-10-23 实拍）：

![GitHub Copilot 官方计划页：Free $0 / Pro $10 / Pro+ $39 / Max $100](img/2026-10-23-copilot/step1.png)

Free 档 $0，页面 FAQ 原话（官方口径，本文英文保留原文便于你对照）：

> "GitHub Copilot Free users are limited to **2,000 completions and access to entry level models per month**."

拆成两部分：

- **2000 次代码补全/月**：写代码时灰色字体的自动建议，Tab 接受。官方文档《Plans for GitHub Copilot》写明 "Limited to 2000 completions per month on Copilot Free"。
- **聊天/Agent：有限使用（limited）**：官方营销页没给死数字；官方文档的 legacy 计费页写明 Free 版每月约 **50 premium requests**（chat + agent mode 都算），2026 年 10 月多篇第三方交叉验证（dev.to 10 月更新、appstackinsider 10 月价格复核、中文七彩云博客 2026-10-06 更新）都确认仍是 50。Agent 模式下你发的每条 prompt 计一次，多文件长会话烧得很快。
- **只能自动选模型**：官方文档原话 "On Copilot Free and Copilot Student plans, access to models is available through **auto model selection only**"——想手动选 Claude/GPT-5 这类高级模型，得加钱。

页面上 Free 档旁边标注 "Free plan supports CLI and agent mode"，说明免费版也能用终端 CLI 和 Agent 模式（只是额度有限）。

## 步骤二：读官方文档的 Free 说明，记住入口长什么样

官方文档《Plans for GitHub Copilot》（2026-10-23 实拍）：

![GitHub 官方文档 Plans 页：Copilot Free 条目与 Start using Copilot Free 入口](img/2026-10-23-copilot/step2.png)

关键两行，官方原文：

- "This plan includes **limited access to a selection of Copilot features** allowing you to try AI-powered coding assistance **at no cost**."
- 页面上的 **"Start using Copilot Free"** 就是官方开通入口（点它会引导你去登录/装扩展）。

这里顺带辟个坑：GitHub 有个免费领取页 https://github.com/github-copilot/free_signup，10-17 的实测发现它现在**会重定向到 Copilot Pro 的 $10/月结账页**——看到付费页别付款，那不是你的问题。**正确的开通姿势是步骤三这种：在编辑器里登录**，根本不需要走那个领取页。

## 步骤三：装扩展、登录，开工

官方文档《Where to use GitHub Copilot》（2026-10-23 实拍）列出了所有可用位置：

![GitHub 官方文档：可以在 IDE、浏览器、终端、手机等位置使用 Copilot](img/2026-10-23-copilot/step3.png)

开通只需要三步（纯在线）：

1. **装扩展**：VS Code 里搜 "GitHub Copilot" 装官方扩展（发布者 GitHub），顺手装 "GitHub Copilot Chat"。
2. **登录**：点编辑器里的 Copilot 图标 → "Sign in to Use GitHub Copilot for Free"（官方培训文档原话）→ 浏览器跳出 GitHub 授权页，用个人账号登录并授权。
3. **确认生效**：状态栏出现 Copilot 图标即成功。在 https://github.com/settings/copilot 可以看到你的计划和用量。

其他接入方式（官方文档列出的全家桶）：JetBrains / Visual Studio / Neovim / Xcode / Eclipse 插件、**Copilot CLI**（终端里用，官方文档明确 "All plans include Copilot CLI and the Copilot app"，免费版也含）、github.com 网页端、GitHub Mobile。

## 免费额度实战：2000 + 50 到底能干什么

先说体感（综合中文实测帖的经验）：

- **2000 次补全**：写小项目、刷题、学语言完全够用；但"开着全量补全写一天前端"，两三天就能见底。七彩云博客（2026-10-06 更新）的实测建议很实在：**给 Markdown、日志、配置文件关掉自动补全**，只给主力代码文件开，能省三成额度。
- **50 条聊天/Agent**：这是硬约束。别问"帮我写个登录"这种空问题，要带上下文一次问到位——比如贴上 `auth.ts` 现有代码，明确说"加 JWT 刷新令牌，指出要改哪三处并给 diff"。性价比最高的用法其实是**读代码 + 定位 bug**：让它解释调用链、找报错原因，比让它从头生成几百行代码省得多。
- **Agent 模式省着用**：Agent 模式每个 prompt 计一次请求，长任务几分钟就能烧掉十几条。免费版下把它当"偶尔体验"，日常还是靠补全 + 精准提问。

## 免费版 vs 付费版：一张表看清差距

官方文档 + 计划页（2026-10-23 核实）：

| 项目 | Free（$0） | Pro（$10/月） | Pro+（$39/月） |
|---|---|---|---|
| 代码补全 | 2000 次/月 | 无限 | 无限 |
| 聊天/Agent | 有限（约 50 请求/月） | 1500 AI credits/月 | 7000 AI credits/月 |
| 模型选择 | 只能自动选（入门级模型） | 可自选 | 全部模型 + 优先体验 |
| IDE Chat skills | ❌ 不可用 | ✅ | ✅ |
| CLI / App | ✅ 含 | ✅ | ✅ |
| 代码审查/云端 Agent | 有限 | ✅ | ✅ |

备注：2026 年 6 月 1 日起付费档按 **AI Credits** 计费，1 credit = $0.01；Pro 含 1500 credits（base 1000 + flex 500），Pro+ 含 7000（3900+3100）。额度每月 1 号重置（00:00 UTC），**用不完不结转**。

## 注意事项、费用、坑点汇总

| 项目 | 情况 |
|---|---|
| 费用 | $0 全程免费，不绑卡；误点进 Pro 结账页别付款 |
| 适用场景 | 学编程、小项目、读开源代码、偶尔写脚本；不适合每天重度写代码 |
| 数据隐私 | ⚠️ 个人版默认**可能用你的 prompt 和代码片段训练模型**，可在 https://github.com/settings/copilot/features 关掉"模型训练"开关（官方计划页 FAQ 原话，不影响功能） |
| 组织账号 | 通过公司/学校的 Copilot Business/Enterprise 拿 seat 的人，用不了 Free 档（官方文档明示） |
| 学生 | 在读学生走 10-17 那篇的**学生包路线**（无限补全），比 Free 香得多 |
| 额度重置 | 每月 1 号 00:00 UTC 重置，不结转；用完就等下月或升级 |
| 政策风险 | 自 2024-12 上线以来稳定，无批量封号/下线前科；但额度规则随政策调整（2026-6 已切 AI Credits 计费），**动手前复核官方计划页** |

最大的坑其实是预期：免费版是 GitHub 的"引流款"，50 条聊天够你体验 Agent 模式长什么样，但真把它当主力，一周就见底。正确姿势是——补全敞开用、聊天精打细算、重度需求再考虑 $10/月的 Pro（Pro 还有一次性 30 天免费试用，试用结束前取消就不扣费）。


相关阅读：[GitHub 学生包白嫖 Copilot：无限代码补全免费领，但有个缩水要先说](https://jianyunyi.gv.uy/posts/2026-10-17-ai会员免费薅-github学生包图文教程.html)

## 来源

官方（2026-10-23 实际打开验证）：

- https://github.com/features/copilot/plans（官方计划与定价页：Free 档 2000 completions + entry level models；Pro/Pro+/Max 价格与 AI credits）
- https://docs.github.com/en/copilot/concepts/billing/individual-plans（官方文档：Free 每月 2000 completions 上限、免费版仅自动选模型、所有计划含 CLI 和 App、Free 版无 IDE Chat skills）
- https://docs.github.com/en/copilot/concepts/billing/copilot-requests（官方文档 legacy 计费页：Free 版每月约 50 premium requests、用不完不结转、每月 1 号 00:00 UTC 重置；2026-6-1 起付费档改用 AI Credits）
- https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-yourself（官方开通文档：VS Code 里 "Sign in to Use GitHub Copilot for Free"）
- https://learn.microsoft.com/en-us/training/modules/github-copilot-management-and-customizations/2-explore-github-copilot-plans-associated-management-customization-features（微软官方培训：Free 档无需绑卡开通）
- 2024-12-18 GitHub 官方博客公告 Copilot Free 上线（CEO Thomas Dohmke 宣布；第三方转述：https://www.neowin.net/news/github-copilot-is-now-available-for-free-in-vs-code/）

实测/讨论（中文，2026-10）：

- https://www.qicaiyun.top/4667.html（七彩云博客，2026-09-26 发布、2026-10-06 更新：《GitHub Copilot 免费额度怎么用：2000 次补全 + 50 次聊天的最优用法》——额度实战建议的主要来源）
- https://dev.to/stimlau/github-copilot-vs-cursor-in-2026-which-ai-coder-earns-its-seat-4mak（dev.to，2026 年 10 月更新：Free = 2000 completions + 50 chat/agent requests，auto model selection only）
- https://appstackinsider.com/insights/github-copilot-pricing-explained/（2026 年 10 月价格复核：Free 硬上限、无需绑卡、Pro/Pro+ 的 AI credits 档位）
- 本系列 2026-10-17《GitHub 学生包白嫖 Copilot》（Copilot Student 无限补全、free_signup 页重定向到 Pro 结账页的实测坑点）

*（播客说明：另搜了一轮中文出海/独立开发播客（小宇宙、Apple Podcasts、Spotify），未找到与 GitHub Copilot 免费版直接相关的单集，故不引用。）*
