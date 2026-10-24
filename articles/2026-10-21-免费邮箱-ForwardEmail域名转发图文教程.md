# Forward Email 免费域名邮箱转发图文教程：support@你的域名.com，0 成本收信（2026-10-21）

> 一句话导读：做跨境，support@你的域名.com 这种邮箱一亮出来，客户信任度立刻不一样。Forward Email（forwardemail.net）从 2017 年做到现在，160 万+域名在用，100% 开源——免费版纯转发：域名邮箱收到的信自动转到你已有的 Gmail，无限域名、无限别名，一分钱不花。

## 前置条件

- 一个自己的域名（比如 `yourshop.com`；没有的话先去整一个，这是唯一门槛）
- 一个已有邮箱收信（Gmail、Outlook 都行，用来接收转发的邮件）
- 域名的 DNS 管理权限（在域名商后台加两条记录就行，Cloudflare 用户直接复制粘贴）

全程网页端，不出门、不装软件。

## 分步骤

### 第一步：官网注册免费账号

打开 [forwardemail.net](https://forwardemail.net/)，注册一个免费账号。官网首页把"免费转发"的定位写得很清楚，先看一眼心里有数。

![Forward Email 官网首页](img/2026-10-21-Forward-Email/step1.png)

### 第二步：添加域名，按提示加 MX / TXT 记录

登录后进 **My Account → Domains**，点 **Add domain**，填你的域名。页面会给出该加的 **MX 记录**和 **TXT 记录**（用来验证域名所有权和做转发路由），照着去域名商的 DNS 设置里添加即可。Cloudflare 用户直接贴过去就行。

DNS 生效一般几分钟到 1 小时，喝杯水回来验证状态变绿就可以继续。

### 第三步：加别名，指定转到哪个邮箱

域名验证通过后，就可以加**别名（alias）**了，比如：

- `support@yourshop.com` → 转到你的 Gmail（客服）
- `orders@yourshop.com` → 转到你的 Gmail（订单通知）
- `noreply@yourshop.com` → 转到你的 Gmail（系统通知）

别名数量无限，一个域名挂几十个别名都行。

### 第四步：发封测试邮件验证

从别的邮箱（比如手机）给 `support@yourshop.com` 发一封测试邮件，看你的 Gmail 能不能收到。能收到，这条链路就通了。

![官方 FAQ：免费版只能转发不能发信](img/2026-10-21-Forward-Email/step2.png)

先看清楚免费版的边界（官方 FAQ 原话）：**免费版 = 只能收（转发），不能用域名发信，也不能存邮件**。想拿 `support@yourshop.com` 回复客户、发营销邮件，得升级。

## 注意事项、费用、坑点

- **三档价格（2026）：** Free **$0**（纯转发）/ Enhanced Protection **$3/月**（含发信 SMTP + 10GB 存储）/ Team **$9/月**。三档都是**无限域名、无限别名**。刚起步 Free 档够用，等真有"用域名发信"的需求再升级。

![三档价格对照](img/2026-10-21-Forward-Email/step3.png)

- **免费版回信露馅：** 客户给你发 `support@yourshop.com`，你在 Gmail 里回，客户看到的是你的 Gmail 地址。介意的直接上 $3 档开 SMTP。
- **转发进垃圾箱：** 转发到 Gmail 的邮件偶尔会被判垃圾邮件。处理办法：把发件域名/地址加白名单；重要的客户往来先发一封测试信确认。
- **别拿它收重要验证码：** 银行、支付平台、关键账号的验证码/安全邮件，转发链路有延迟和丢信风险，这类邮件直接用原生邮箱收，别经转发。
- **前科审查通过：** 2017 年开始做邮件转发，100% 开源，160 万+域名在用，没有批量封号、悄悄收费、突然下线的前科记录。

## 来源

- Forward Email 官网：https://forwardemail.net/en
- 官方：邮件管理方案说明：https://forwardemail.net/en/tour-operators-email-management
- 计费与支付体系说明（DeepWiki）：https://deepwiki.com/forwardemail/forwardemail.net/4.4-billing-and-payment-system
