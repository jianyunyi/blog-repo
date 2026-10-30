# 免费域名邮箱：Cloudflare Email Routing 图文教程——0 元给自己的域名挂一个专业收件地址

**一句话导读：** 有域名、没邮箱预算的时候，不用买 Google Workspace 也不用另搭邮件服务器：Cloudflare Email Routing 免费把 `you@yourdomain.com` 收到的信转发到你平时用的 Gmail 等邮箱，全程 0 元，十分钟能搭好；但它只是转发器、不是邮箱——没有收件箱、不能直接用它发信，这两条先想清楚再动手。

## 前置条件（需要什么）

- 一个你自己的域名（哪家注册商买的都行，本文不指定）
- 这个域名的 DNS 已经托管在 Cloudflare（免费档就行）；如果还没接，起名叫“把域名加进 Cloudflare、把注册商那边的 NS 改成 Cloudflare 给你的那一对”，改完等 DNS 生效
- 一个你平时收信的邮箱（Gmail、Outlook、Yahoo 都行），用来当转发目的地，需要能点验证链接
- 心理预期：这套方案只解决“收信”，发信要另配（见第 4 步）

## 分步骤

### 第 1 步：先看官方文档，确认 Email Routing 到底是什么

![Cloudflare Email Routing 官方文档首页](img/2026-10-30-email-routing/step1.png)

打开 Cloudflare 的 Email Routing 文档先看一眼定位：它接管你域名的 MX 记录，把发到这个域名的邮件转发到你验证过的目标邮箱。它不存信、没有独立收件箱、没有网页邮箱——信最终存在你的 Gmail 里。免费档就能用，不另收费。先把这个定位记牢，后面所有“为什么没有收件箱”的疑问都有答案了。

### 第 2 步：按实测教程走一遍全流程——验证目标邮箱、开路由、加 DNS 记录

![第三方实测教程：用 Cloudflare Email Routing 做免费域名邮箱转发](img/2026-10-30-email-routing/step2.png)

按 2026 年 10 月更新的实测教程，全流程是四段：

1. **验证目标邮箱：** 在 Cloudflare 面板里进 Email（新版面板在 Compute → Email Service → Email Routing）→ Destination Addresses → Add，填你平时用的邮箱，Cloudflare 会往那个邮箱发一封验证信，点链接后状态变成 Verified 才能用——没验证之前，指向它的规则一律不生效。
2. **启用路由并补 DNS 记录：** 在同一个域名下点“Add missing records / Add records and enable”，Cloudflare 会自动写好并锁定三条 MX 记录（`route1.mx.cloudflare.net`、`route2.mx.cloudflare.net`、`route3.mx.cloudflare.net`）和一条 SPF 记录（`v=spf1 include:_spf.mx.cloudflare.net ~all`）。锁定的记录在 DNS 页改不动，要改先去 Email Routing 设置里解锁——这是防手滑改坏的设计，不是 bug。
3. **建转发规则：** Routing rules → Create routing rule，邮箱前缀填 `hello`（或 `contact`、`support`，随你），动作选 Send to an email，目的地选刚验证好的邮箱，保存后规则显示 Active 就生效了。一个前缀一条规则，想要几个地址就建几条。
4. **决定 catch-all：** catch-all 管的是“没建规则的其他前缀”。开成 Send to an email，所有乱写的地址（包括别人打错的 `ifno@`）都会转发进来；开成 Drop 则悄悄丢弃。个人用建议先开 Drop，等确实需要“什么前缀都能收”时再改。

做完后给自己发一封测试信：往 `hello@yourdomain.com` 发一封，看它是不是几秒内出现在目标邮箱里；没到就去 Email Routing 的 Activity Log 查每封信的处置（Forwarded / Dropped / Rejected / Delivery failed），比瞎猜快得多。

### 第 3 步：核对三条硬边界，别等客服信丢了才发现

![第三方教程：Cloudflare Email Routing 的 3 个限制](img/2026-10-30-email-routing/step3.png)

按 2026 年 10 月的实测总结，Email Routing 有三条硬边界：

- **它不能存信：** 没有邮箱本体。如果目标邮箱把某封信判成垃圾邮件，Cloudflare 那边没有副本可捞，只能看 Activity Log 的处置记录和每日转发/丢弃计数。
- **一条规则只对一个人：** 一个地址只能转发到一个目的地。想让两个人同时收到，得用 Email Worker 自己写转发逻辑（Worker 里调两次 `forward()`），那就超出“零代码免费转发”的范围了，本文不展开。
- **它不能替你回信：** 从目标邮箱回复时，发件人默认是你自己的 Gmail 地址，不是域名地址。想用域名地址发信，得另配发信通道，见第 4 步。

另外一条冲突提醒：如果你的域名之前已经有别的邮件服务商的 MX 记录（比如以前绑过 Zoho、Google Workspace），Cloudflare 会提示冲突并建议替换——先确认旧邮箱里没有还要收的信，再点替换，否则旧邮箱直接断收。

### 第 4 步：发信通道二选一——Gmail 自带 SMTP 能用，但 DMARC 对不齐；要对齐走 SMTP2GO

![Cloudflare 免费档套餐页：Email Routing 包含在免费档内](img/2026-10-30-email-routing/step4.png)

收信免费，难的是“用域名地址发信”。两条路，按你的较真程度选：

- **省事路：Gmail 自带 SMTP。** 在 Gmail 设置里“用这个地址发送邮件”，走 Google 的 SMTP 发。能发、对方看到的 From 是你的域名地址，但 SPF/DKIM 认证用的是 Google 的域名，DMARC 对不齐——对个人通信够用，对“怕进垃圾箱的客服信”不够稳。
- **较真路：SMTP2GO 这类发信服务。** 用它发信可以做到 SPF 和 DKIM 都对齐你自己的域名，DMARC 才能真正通过。代价是多注册一个服务、按量计费（免费额度各家不同，发信量小的话通常够用，具体以注册时页面为准）。

注意：Cloudflare 自己也有一个 Email Sending 服务，但目前还是 beta，且往任意收件人发信要 Workers 付费档——别把它和免费的 Email Routing 混为一谈。

## 注意事项、费用、坑点

- **费用：** Email Routing 本身 $0，Cloudflare 免费档就能用；你唯一要付的是域名本身的年费。发信走 Gmail SMTP 是 $0，走 SMTP2GO 按其套餐算。
- **前科核查：** Cloudflare Email Routing 自推出以来没有批量封号、悄悄收费或突然下线的公开前科；它是 Cloudflare 免费档里的常驻功能，不是限时赠品。但注意：免费档的定位是“个人/小站”，别拿它当群发或客服工单系统批量收信——Activity Log 和转发量都不是为那种量级设计的。
- **别踩的坑：** ① 目标邮箱没点验证链接就建规则，规则一直不生效，先查 Verified 状态；② 一个域名只能有一条 SPF 记录，域名已有 SPF 时要把 `include:_spf.mx.cloudflare.net` 合并进同一条，别另起一条；③ 刚加完 MX 记录就查收不到，可能是解析器缓存了之前的“无 MX”否定答案，Cloudflare 区域的 SOA 最小 TTL 默认 1800 秒（30 分钟），等半小时再测；④ 回复客户时记得切发件人，否则对方看到的是你的私人 Gmail 地址。

## 来源

- Cloudflare Email Routing 官方文档：https://developers.cloudflare.com/email-routing/
- 2026 年 10 月实测教程（四步流程、MX/SPF 记录值）：https://hackernoon.com/set-up-free-email-forwarding-for-your-domain-with-cloudflare-email-routing
- 2026 年 10 月实测（3 个限制、目标邮箱验证、Activity Log）：https://dev.to/howardzlh/cloudflare-email-routing-support-address-setup-and-3-limits-35ph
- Gmail 发信 + SMTP2GO 对齐 DMARC 的对照（2026 年 7 月口径）：https://explosive.cloud/free-custom-domain-email-cloudflare-gmail-smtp2go/
- Cloudflare 套餐页（免费档说明）：https://www.cloudflare.com/plans/
