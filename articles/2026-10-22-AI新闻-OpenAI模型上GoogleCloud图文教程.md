# OpenAI 模型正式登陆 Google Cloud：GPT-6 全家桶进 Model Garden，独立开发者今天能做三件事

**一句话导读**：10 月 21 日 Google Cloud 官宣——OpenAI 的 GPT-6 Astra / GPT-6.1 Sol / GPT-6 Luna 和 Codex 全都要上架 Model Garden。现在还是企业私有预览，但填表排队、提前备好云项目，你今天就能动手。

---

## 新闻是什么（发生时间 + 来源）

- **时间**：2026 年 10 月 21 日（美东时间周三）。
- **来源**：Google Cloud 官方博客发布《Google Cloud brings OpenAI models to customers》（作者为 Google Cloud Gemini 产品副总裁 Michael Gerstenhaber），OpenAI 同步发布了对应公告。
- **核心内容**：
  - 三个 OpenAI 模型 **GPT-6 Astra、GPT-6.1 Sol、GPT-6 Luna** 正在向部分企业客户开放**私有预览**（private preview），正式版（GA）在"未来几周"到来。
  - 现在就可以通过 API 调用这些模型，也可以把本地的 **Codex CLI / Codex Desktop** 直接接到 Google Cloud 的 Gemini 平台做推理。
  - 后续 OpenAI 模型还会进入 Google 的企业产品 **Gemini for business** 和 **Google Antigravity**。
  - OpenAI 同时强调：Microsoft 仍然是它的主要云合作伙伴。
- **背景**（路透社 10 月 21 日报道）：OpenAI 与微软的独家分发协议已于 2026 年 4 月到期，此后它先后把模型分发扩展到了 AWS，现在轮到 Google Cloud。

三个模型的官方定位（照官方公告原文翻译）：

| 模型 | 定位 |
|---|---|
| GPT-6 Astra | 最强款：coding、computer use、专业任务、科学研究 |
| GPT-6.1 Sol | 接近 Astra 的能力、价格更低：agent coding、computer use、专业任务 |
| GPT-6 Luna | 又快又便宜：日常规模化任务 |

![官方公告页：标题与发布日期 2026-10-21](img/2026-10-22-ai-news/step1.png)

---

## 对你有什么影响

1. **一张账单买 GPT**：以后走 Google Cloud Marketplace 下单，所有用量合并到一张 GCP 账单，还能抵扣你已有的云消费承诺（commitment）、计入 Flexible Savings Plans。你本来就在 GCP 上跑业务的话，账务和采购都省一事。
2. **数据合规牌**：官方承诺你的 prompt、上下文和输出都留在你指定的数据边界内，绝不拿去训练模型（零数据保留 ZDR 选项"即将推出"）。做欧美企业客户项目时，这一点谈单很有用。
3. **Codex 用户多一条路**：本地 Codex CLI / Desktop 可以直连 Google Cloud 做推理，写代码的 agent 不用绑死 OpenAI 直连通道。
4. **一个平台横向选型**：Google Cloud 自称是唯一同时提供 Gemini、Claude、GPT 三家封闭大模型的超大规模云厂商，加上 200 多个模型同处一个平台——以后做 AI 出海工具，可以只接一个平台做模型切换，不用每家签合同。

**但先冷静**：目前只是私有预览、只发给部分企业客户。个人独立开发者现在能做的，就是填表排队 + 提前备好 GCP 环境，别被自媒体"已全量上线"的标题党带跑。

---

## 动手步骤（足不出户，今天就能做）

> 说明：以下截图均为只读浏览页面所得，没有注册账号、没有提交任何表格。

### 第 1 步：先读官方公告，确认这是真的

![官方公告页，重点看 Getting started 一节](img/2026-10-22-ai-news/step1.png)

打开 Google Cloud 官方博客这篇公告，重点看 **"Getting started"** 一节：现在是 private preview + 兴趣申请表模式，正式 GA 在"未来几周"。先建立正确预期，再动手。

### 第 2 步：填表申请预览资格（5 分钟）

![OpenAI 模型兴趣申请表：填完不保证能拿到资格](img/2026-10-22-ai-news/step2.png)

官方公告里 "this form" 链接跳到这个页面（`cloud.google.com/resources/interest/openai-models`）。页面原话：**"Expressing interest and filling out this form does not guarantee access."**——填表不保证能拿到资格。

必填项：姓名、商务邮箱、商务电话、职位、公司名、国家。几个实操建议：

- **公司名**：独立开发者没有公司，填 "Independent Developer" 或你的个人工作室英文名即可（未验证：是否影响获批概率，如实填写别造假）。
- **商务邮箱**：用域名邮箱或常用 Gmail，别用一次性邮箱。
- **电话区号**：默认是 +1，记得改成你的真实区号（中国大陆是 +86），国家下拉里有 China。
- 职位如实写，比如 "Founder" / "Indie Developer"。

### 第 3 步：提前备好 Google Cloud 项目（资格一下来，10 分钟就能开跑）

![Model Garden 官方文档：模型库总览与用法](img/2026-10-22-ai-news/step3.png)

- Google Cloud 账号需要绑一张**国际信用卡**（Visa / Mastercard）做账单验证，这是目前公开信息里唯一的硬门槛（未验证：中国大陆身份注册 GCP 是否有额外审核）。
- 项目建好后，先把 **Vertex AI API** 启用；GA 之后直接去 Model Garden 搜 "GPT-6" 就能看到模型卡片，走 API 或控制台的 Prompt 设计页调用。
- Model Garden 的官方文档（上图）把"怎么找模型、怎么调用、怎么部署"都写清楚了，排队期间可以先读熟，资格下来直接照做。

**费用参考**：GCP 渠道的 GPT-6 价格尚未公布。仅供参考的是 OpenAI 官方渠道标准价——GPT-6.1 Sol 为每百万输入 token **$2**、缓存输入 **$0.10**、输出 **$10**（据 9 月 29 日 OpenAI 发布信息）。先按这个做成本估算，给客户报价时务必加一句"以实际账单为准"。

### 第 4 步（可选，Codex 用户）：把本地 Codex 接到 Google Cloud

官方公告明确：现在就可以 "connect their local Codex CLI and Desktop workflows directly to our Gemini platform for inference"。具体配置参数要等你的预览资格获批后才能拿到——先完成第 2 步排队，资格下来再看文档接入。

---

## 注意事项、费用、坑点

1. **填表 ≠ 有资格**。官方白纸黑字写了不保证，别因此停掉你现有的 API 渠道。
2. **价格未公布**。GCP 渠道的 GPT-6 价格、折扣都还没影，做成本核算先按 OpenAI 官方渠道价估算。
3. **区域限制未验证**。OpenAI 对中国大陆地区有服务限制，GCP 渠道是否放行、预览资格会不会发给中国公司，目前没有任何公开信息——填表时国家如实选即可。
4. **ZDR（零数据保留）是 "coming soon"，现在还没有**。合规要求极严的项目，先别急着迁移敏感数据。
5. **GCP 按用量后付费**，绑卡后记得设置预算告警（billing budget），防止 API 调用跑飞。

---

## 来源

- Google Cloud 官方博客《Google Cloud brings OpenAI models to customers》（2026-10-21）：https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-brings-openai-models-to-customers
- OpenAI 模型预览兴趣申请表：https://cloud.google.com/resources/interest/openai-models
- Model Garden 官方文档总览：https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models
- 路透社报道（via CNA，2026-10-21）：https://www.channelnewsasia.com/business/openai-sell-its-top-models-google-cloud-in-latest-enterprise-push-6478941
- Digital Applied 深度解析（2026-10-21）：https://www.digitalapplied.com/blog/openai-models-google-cloud-model-garden-preview
- Unite.AI 报道（2026-10-21）：https://www.unite.ai/google-cloud-adds-openais-gpt-astra-and-gpt-6-models-to-model-garden/
