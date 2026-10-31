# AI 新闻：Mistral Large 4 开源实测指南——万亿参数“Le Chonk”权重已放出，普通人最划算的用法是托管 API 不是本地跑

**一句话导读：** 2026 年 10 月 29 日，法国 Mistral 把万亿参数模型 Large 4（昵称 Le Chonk）的权重公开放到了 Hugging Face：任何人都能下载、改、商用，唯独“拿它向别人提供托管模型服务”要另买商业授权；但先别急着下载——1 万亿参数的模型家里电脑根本跑不动，对绝大多数人来说，真正能立刻用上的路线是走 Mistral 自己的托管 API（输入 $0.70/百万 token），而不是本地部署。

## 前置条件（需要什么）

- 一个 Hugging Face 账号（只看模型页、读文档用；下载权重本身需要大硬盘和高端 GPU，别冲动点下载）
- 或者一个 Mistral API 账号（走托管路线实测用，按量付费，先充小额再试）
- 心理预期：这篇是“新闻 + 上手路线”，不是“家里跑万亿模型教程”——本地跑它需要 8 卡服务器级别的硬件，本文明确告诉你别往这条路走

## 分步骤

### 第 1 步：先看新闻本身——10 月 29 日到底放出了什么

![Mistral Large 4 权重登陆 Hugging Face 的报道](img/2026-10-31-mistral-large4/step1.png)

10 月 29 日放出的东西要拆成三句话说清楚：第一，模型叫 Mistral Large 4，昵称 Le Chonk，原生多模态（文本 + 图像输入、文本输出）的混合专家模型（MoE），总参数约 1 万亿，每次回答实际激活约 490 亿（算上 embedding 和输出层是 520 亿），上下文窗口 100 万 token（约 75 万词，能塞进一整个代码库）。第二，发布时间线：10 月 6 日先出 API 预览版，10 月 29 日放出的权重是又经过三周强化学习和客户测试的改进版，不是预览版原样冻结。第三，定位：Mistral 自己说它是“最强的开源权重编程模型”，主打编程和防守型网络安全——但下面所有分数都是 Mistral 自己公布的，完整技术报告截至发稿还没出，独立复现还没看到，先当成厂商口径听。

### 第 2 步：核对授权——“开源权重”不等于“随便拿去卖服务”

![Mistral Large 4 开源权重详解：授权与硬件门槛](img/2026-10-31-mistral-large4/step2.png)

这一步最容易被营销号带偏，必须单独拎出来：权重用的是 Mistral Ecosystem Open-Weight License（Mistral 生态开源权重授权），它是 MIT 的变体，不是标准 MIT、也不是 Apache 2.0。规则是：个人用、改、微调、商用都行；但有一种例外——如果你做的生意就是“把这个模型托管起来、按次卖给别人用”（Model-as-a-Service），必须先向 Mistral 另买商业授权。自己内部用、嵌进自己产品里给终端用户提供功能，和“转售模型访问”不是一回事，界线模糊时以授权原文为准，别听二手解读。

硬件门槛同样要先说死：官方模型卡给出的部署示例是 8 卡服务器级别，另有面向 NVIDIA Blackwell 显卡的 NVFP4 量化版；社区也出了 llama.cpp 能读的 GGUF 版，但那只是“能读”，不是“家用电脑能流畅跑”。看到“本地部署 Le Chonk”教程先问一句：它跑在什么卡上、速度多少、显存多大——答不上来的，一律当营销。

### 第 3 步：看本周 AI 大局——为什么这条新闻值得单独写一篇

![AI 周报：Mistral 开源 Large 4、加拿大入股 Cohere](img/2026-10-31-mistral-large4/step3.png)

单看一个模型容易误判，把它放进 10 月 30 日这周的大局里才看得清：同一周，Mistral 开源了万亿参数模型（托管价 $0.70 输入 / $2.10 输出 每百万 token），Google 的 Gemini 4 Carbon（10 月 28 日发布）只先给部分 vetted 网络安全防守者用、还没全面开放，加拿大政府宣布将分阶段入股 Cohere（最高约 16 亿加元）。这条线的意思是：好模型正在分化成两条路——一边是“权重公开、人人可下载”，另一边是“最强模型先给特定人群”。对独立开发者和小团队，Mistral 这条路的实际价值不在“下载权重”，而在“顶级开源权重有人替你跑、按量付费就能调用”。

### 第 4 步：动手实测——走托管 API，别下载权重

![Mistral Large 4 开源报道：托管价格与基准分数](img/2026-10-31-mistral-large4/step4.png)

普通人实测 Large 4 的正确姿势是四步，全程不用下载权重：

1. **选入口：** 去 Mistral 自己的平台（Mistral Studio / Mistral API）建账号，模型名选 `mistral-large-4`；OpenRouter、NVIDIA 托管端点、微软 Foundry 上也有同一模型，可以比价，但第一次实测建议走官方入口，价格和参数最不容易错。
2. **先对价格：** 官方托管价是输入 $0.70/百万 token、缓存输入 $0.07/百万 token、输出 $2.10/百万 token；先充小额、设好用量上限，再跑测试，别一上来就把大代码库全塞进 100 万上下文里烧钱。
3. **跑两个对照任务：** 一个编程任务（比如让模型读一段代码找 bug、写补丁）、一个长文档任务（比如把一份长文档摘要成要点），分别记下输出质量和 token 花费——Mistral 自己公布的分数（FrontierCode 2.0 19.7%、Terminal-Bench 4.0 41%、Cyber Index 51%、编码 Agent 指数约 49.8%）是厂商口径，你的实测才是你自己的口径。
4. **判断去留：** 如果你的任务是编程、代码审查、防守型安全分析，且预算敏感，Large 4 的托管价确实比同级闭源模型便宜一截；如果任务只是日常聊天、写文案，没必要为万亿参数买单，小模型更快更便宜。决定“长期用”之前，先看它在你自己任务上的实测，别看榜单。

## 注意事项、费用、坑点

- **费用：** 权重本身免费下载；托管 API 输入 $0.70 / 输出 $2.10 每百万 token（缓存输入 $0.07）；本地跑的成本是硬件和电费，不是授权费——8 卡服务器的账别算漏。
- **前科核查：** Mistral 这次是“先预览、后放权重”，按 10 月初承诺的月底时间点兑现了，没有跳票；但完整技术报告还没出、分数全是厂商口径，这两点是目前最大的“未验证”——本文所有基准分数都标注为 Mistral 自报，不替它背书。
- **别踩的坑：** ① 以为“开源”就是标准开源协议，拿去做托管转售服务要先买商业授权；② 家用电脑下载 1 万亿参数权重，硬盘、显存、速度三重打击；③ 把厂商自报分数当成独立评测，完整技术报告未出之前先打折听；④ 100 万上下文听起来免费——不是免费，是按 token 计费，长上下文跑一次就可能烧掉不少钱，先设上限；⑤ Gemini 4 Carbon 同周新闻别混淆：Carbon 目前只给部分防守者、没有全面开放日期，别拿它的榜单第一去套 Large 4 的可用性。

## 来源

- Mistral Large 4 权重登陆 Hugging Face（模型卡名 Mistral-Large-4-1T-A52B、vLLM/SGLang 部署、托管价）：https://www.unite.ai/mistrals-1-trillion-parameter-le-chonk-checkpoint-lands-on-hugging-face/
- Mistral Large 4 开源权重详解（授权变体、硬件门槛、GGUF 社区版、基准分数为厂商口径）：https://www.llms.blog/posts/mistral-large-4-open-weights-hugging-face
- AI 周报（Mistral 10 月 29 日开源、Gemini 4 Carbon 仅限部分防守者、加拿大入股 Cohere，2026 年 10 月 30 日）：https://aiworldwire.org/articles/ai-weekly-wrap-mistral-large-4-canada-cohere/
- Mistral Large 4 开源报道（10 月 29 日发布、1 万亿参数、49B 激活、托管价、基准分数未独立复现）：https://theaipin.com/science/mistral-releases-open-weights-of-large-4-le-chonk
- 2026 年 10 月 AI 模型发布总表（Large 4 列为 10 月 28–29 日条目，与 Gemini 4 Carbon、Genie 4 同周）：https://www.nocode.mba/ai-release-tracker/2026/10
