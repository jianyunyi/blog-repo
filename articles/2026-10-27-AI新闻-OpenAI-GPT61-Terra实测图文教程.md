# OpenAI GPT-6.1 Terra 半价上线：价格、入口与适用场景实测（2026-10-26 发布）

**一句话导读：** 2026 年 10 月 26 日，OpenAI 发布 GPT-6.1 Terra：API 输入 $1/百万 token、输出 $5/百万 token，比上一代便宜一半，但它只出现在 ChatGPT Work 和 Codex 里，不在普通 ChatGPT 对话和免费档里。

## 前置条件

- 想用它先分清身份：开发者走 API（模型 ID `gpt-6.1-terra`）；订阅用户走 ChatGPT Work / Codex；免费用户目前用不上
- 它不是免费薅的模型：价格是"便宜了一半"，不是"免费"

## 分步骤

### 第 1 步：确认发布本身——昨天官宣，定位是干活的中档模型

![PYMNTS 2026-10-26 报道](img/2026-10-27-gpt61-terra/step1.png)

PYMNTS 2026 年 10 月 26 日报道：OpenAI 当天发布 GPT-6.1 Terra，定位是高频自动化工作——读发票、录入会计软件、写提案、看技术图纸、填表、剪视频；官方称它是 GPT-5.6 Terra 的"显著进步"，标准 API 价格比 GPT-5.6 Terra 和 GPT-6.1 Sol 低 50%。

### 第 2 步：算价格账——$1/$5，缓存输入 $0.05

![AI Daily Post 价格报道](img/2026-10-27-gpt61-terra/step2.png)

价格口径多方一致：输入 $1/百万 token、输出 $5/百万 token（上一代是 $2/$10），缓存输入 $0.05/百万 token。第三方评测 Artificial Analysis 的说法是：在最高推理强度下，Terra 的 Intelligence Index 比上一代高 6 分，而每任务成本从 $1.40 降到 $0.40——这是第三方口径，不是官方承诺，引用时要分清。

### 第 3 步：确认入口——只在 Work 和 Codex，不在普通对话里

![上线范围与价格说明](img/2026-10-27-gpt61-terra/step3.png)

上线范围说明很关键，别跑错地方：ChatGPT Work 和 Codex 可用，计划包括 Plus、Pro、Business、Enterprise、Edu，免费档不在名单里；普通 ChatGPT 对话里没有它；部分 Plus/Pro 用户可能在 Power presets 里看到"Medium" effort 成为新默认；开发者走 `v1/responses` 和 `v1/chat/completions`，模型 ID 为 `gpt-6.1-terra`；阿联酋推理驻留（UAE inference residency）暂不支持。

## 注意事项、费用、坑点

- **费用：** API $1 输入 / $5 输出 / $0.05 缓存输入（每百万 token）；订阅用户能否在 Work/Codex 里看到它取决于计划、地区和工作区设置，是逐步推送，不是人人同一天上线。
- **别把它当免费模型：** 昨天发布、今天能用，不等于免费；免费档用户在 Work/Codex 入口都进不去。
- **基准数字分清来源：** "Agents Last Exam 高 15 分""错误率从 53.6% 降到 16.7%"这类数字是 OpenAI 内部基准或第三方评测口径，不是你我实测结果，写方案时别当成实测承诺。
- **型号命名别混：** GPT-6.1 家族里 Terra 是中档，Sol 和 Luna 是 10 月更早发布的型号，Astra 是旗舰档——选型时按价格和任务对号，别只看"6.1"这个版本号。

## 来源

- PYMNTS（2026-10-26）：https://www.pymnts.com/news/artificial-intelligence/2026/openai-unveils-half-price-ai-model-to-target-enterprise-automation/
- AI Daily Post（2026-10-26）：https://aidailypost.com/news/gpt-61-terra-halves-openai-api
- 上线范围与价格说明：https://www.online-tech-tips.com/openai-gpt-6-1-terra-release-speed-lower-cost/
- Forkast（2026-10-26，截图超时未采用，已换 AI Daily Post 补位）：https://forkast.news/gpt-6-1-terra-arrives-at-1-5-half-the-rate-of-a-model-openai-shipped-27-days-ago/

（播客素材：本轮检索中文出海/独立开发播客，未找到与本主题直接相关的单集，故未引用，不编造。）
