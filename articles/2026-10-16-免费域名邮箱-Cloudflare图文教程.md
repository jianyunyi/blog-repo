# 零成本拥有 info@你的域名.com：Cloudflare 免费域名邮箱图文教程

> 一句话导读：做跨境生意，联系邮箱是 `info@你的域名.com` 还是 `xxx123@gmail.com`，客户信任度差一截。Cloudflare 的 Email Routing 让你**免费**用自己的域名收邮件、转发到 Gmail；想要真正的"发件箱"，Zoho Mail 免费版（5 用户/5GB）还在。全程 $0。

## 前置条件

- 一个你自己的域名（注册商不限；本站 2026-10-13 教程《Northwest 免费 .com》拿到的免费域名就能用）
- 该域名的 DNS 托管在 Cloudflare（免费计划就行）：Cloudflare 账号 → Add a site → 按提示把注册商处的 NS 换成 Cloudflare 分配的两个 → 等状态变 Active
- 一个常用邮箱（Gmail / QQ 邮箱都行），用来接收转发

## 步骤 1：确认免费——官方限制文档

先看 Cloudflare 官方文档（2026-10-16 实测，文档 2026-09-25 更新；注意 Email Routing 文档已并入 Email Service）：

![步骤1：Cloudflare Email Routing 官方限制文档：免费、无限收件](img/2026-10-16-免费域名邮箱/step1.png)

关键数字：**价格 $0，收件量不限**；每个域名最多 200 条路由规则、200 个已验证的目标地址；单封邮件上限 25 MiB。记住它的定位：**只能收、不能发**（纯入站转发，没有邮箱存储、没有发件箱 UI）。

## 步骤 2：按官方指南启用——三步走

官方 Get started 文档（developers.cloudflare.com/email-service/get-started/route-emails/，2026-10-16 实测）：

![步骤2：官方设置指南：Enable Email Routing → 添加目标地址 → 建路由规则](img/2026-10-16-免费域名邮箱/step2.png)

跟着文档走：

1. **Enable Email Routing**：在 Cloudflare 控制台左侧 **Email → Email Routing** 点 Get started / Enable，Cloudflare 会**自动添加 MX 等 DNS 记录**（不用你手填）。
2. **Add a destination address（添加目标地址）**：填你常用的真实邮箱（如 Gmail），去收件箱点验证链接——目标地址必须先验证。
3. **Create address / routing rule（建自定义地址）**：比如 `info@你的域名.com` → 转发到你的 Gmail。保存后发一封测试邮件，几秒内就该出现在 Gmail 收件箱。
4. （可选）开 **Catch-all**：没定义过的地址（如各种网站注册的随机别名）全部转到同一个收件箱，薅验证码、接客服邮件的神器。

官网产品页原话："Cloudflare Email Routing is a **free**, private service for creating custom email addresses for your domains"（2026-10-16 实测截图）：

![步骤3：Cloudflare 官网 Email Routing 产品页：免费、私密、自定义域名地址](img/2026-10-16-免费域名邮箱/step3.png)

## 步骤 3：解决"回复"问题——收信用 Cloudflare，发信用别的

这是新手最容易卡住的地方：Email Routing 只管收，你想用 `info@你的域名.com` **回复**客户，得另配发件通道。实测帖里的通用做法：

- **轻量用法**：Gmail 的"发送为"（Send mail as）功能，用域名地址名义发出。注意 SPF 对齐问题，偶尔进垃圾箱，个人小量沟通够用。
- **正经用法**：配 Cloudflare Email Service 发件（2026 年 4 月公测）：需要 Workers Paid 计划 $5/月（含 3000 封/月）——**这一步开始收费**，业务量起来了再考虑。
- **免费正经用法**：直接上 Zoho Mail 免费版（见下），有真正的发件箱。

## 备选：Zoho Mail 免费版——"传闻已死"是谣言

![步骤4：Zoho Mail 定价页 Forever Free Plan：一个域名、5 用户、每人 5GB](img/2026-10-16-免费域名邮箱/step4.png)

2026 年 10 月多家测评交叉确认：Zoho Mail **Forever Free Plan** 仍对新用户开放（2026-10-16 官网定价页实测截图）：**一个自定义域名、最多 5 用户、每用户 5GB 存储**，网页端 + App 可用。这是真正的邮箱（有收件箱、发件箱），不是转发。

免费版的三个限制要提前知道：① **无 IMAP/POP**——不能接 Outlook / 苹果自带邮件 App，只能用网页和官方 App；要 IMAP 得升 $1/人/月的 Lite 版；② 无外部转发、无路由规则；③ 部分数据中心才可用（定价页小字 "*Available only in select data centers"）。

**选型建议**：只要"有个 @自己域名的收件地址"→ Cloudflare Email Routing（零配置成本）；要"正经收发、像个公司邮箱"→ Zoho 免费版（5 用户内小团队够用）。

## 一句话带过的其他方案

- **ImprovMX**：免费档 1 个域名 / 25 个别名 / 每天 500 封转发，配置最简单；但不能发信、无存储。
- **ForwardEmail**：免费档**不是谁都免**——90 天内新建/过期过的域名、.cc/.xyz、历史上被用过的域名会被强制 $3/月起；免费档只收不发。这是它最大的坑，新域名用户直接上 Cloudflare 更省心。

## 坑点总结

1. 转发链路的通用风险：发件方 SPF/DKIM 不全时，转发可能**静默丢信**（Cloudflare 2025-06-30 起已收紧策略）。重要业务邮件建议用 Zoho 真实邮箱兜底，别把鸡蛋放一个篮子。
2. Cloudflare Email Routing 没有邮箱存储：目标邮箱一旦丢失访问权就断；一条规则只能到一个目标地址，多人分流要写 Worker。
3. 同类服务的前科提醒：Skiff 2024 年被 Notion 收购后关停——纯转发类服务换成本低，关键邮件别只走转发。

## 来源

- Cloudflare Email Routing 限制文档（2026-09-25 更新，2026-10-16 实测）：https://developers.cloudflare.com/email-routing/limits/
- Cloudflare Email Routing 设置指南（2026-10-16 实测）：https://developers.cloudflare.com/email-service/get-started/route-emails/
- Cloudflare 官网 Email Routing 产品页（2026-10-16 实测）：https://www.cloudflare.com/products/email-routing/
- Zoho Mail 定价页（2026-10-16 实测）：https://www.zoho.com/mail/zohomail-pricing.html
- Cloudflare + Gmail 免费域名邮箱 2026 实操（2026-09-26 更新）：https://register.domains/en/blog/free-email-address-with-custom-domain
- 2026 年完整配置（Cloudflare 收 + SMTP2GO 发，2026-09-29）：https://medium.com/@GoHunk/how-to-set-up-a-custom-domain-email-for-free-a4e38bed97d8
- Zoho Mail 2026 评测（确认 Forever Free 开放）：https://ecommerceparadise.com/zoho-mail-review-2026-the-best-ad-free-professional-email-hosting-for-budget-conscious-business-owners/
- ImprovMX 免费档现状（2026 对比评测）：https://emailalias.io/blog/improvmx-alternative/
