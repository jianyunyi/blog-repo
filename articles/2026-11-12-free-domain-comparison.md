---
category: domain-email
---
# 免费域名对比：eu.org、pp.ua、DuckDNS、dpdns

**一句话导读**：免费域名分两类：能改 NS、接 Cloudflare 的（eu.org、pp.ua、dpdns.org、is-a.dev、afraid.org），和只能做动态解析或短跳转的（DuckDNS、devs.li、lovie.me、pu.gy）。先定用途再选：公开建站选前者，家里服务远程访问选 DuckDNS。

![免费域名对比：pp.ua 申请实测截图](img/2026-10-22-ppua-domain/step1.png)

（上图：pp.ua 申请实测截图，见原文《免费域名还没死：乌克兰 pp.ua 申请实录，0 元拿下、还能年年免费续》。）

## 先说结论

- **公开建站、想接 Cloudflare**：eu.org、pp.ua、dpdns.org、is-a.dev、afraid.org——前提是后缀在 Public Suffix List 上、且能在你注册的这一级名字上改 NS，两样缺一不可。
- **家里 IP 会变、远程回家**：DuckDNS，$0，动态解析，5 分钟拿到 yourname.duckdns.org。
- **只要一个好记的短域名**：pu.gy（5 位以上前缀免费，每人 3 个）、devs.li（每人 5 个）、lovie.me（一次领 3 个）——都不能改 NS、接不了 Cloudflare。
- **别碰**：Freenom 已死（.tk/.ml/.ga/.cf 2024 年 2 月退出，现已回归但改为收费，约 €8/年起）。

## 对比表（截至各原文实测日期）

| 域名 | 费用 | 续费 | 门槛 / 要求 | 能接 Cloudflare 吗 | 适合 | 来源 / 实测日期 |
|---|---|---|---|---|---|---|
| eu.org | $0 | 官网未明确承诺“永久不过期”，以官网为准 | 审核制、无官方时限（社区反馈短则 8 小时、长则一两年）；申请前必须先配好 NS；官方建议优先选开放三级域（如 ASSO/EDU/INT/NET.eu.org），别直接挂 eu.org | 能，改 NS 接入，免费 SSL 自动签发 | 不赶时间的个人项目、非营利组织 | 《出海贸易 \| 免费域名全攻略》，2026-10-08 |
| pp.ua | $0（nic.ua 官方通道） | 0 元/年，需在到期前 4 个月内操作 + 重新激活 | 必须绑卡（Visa/Mastercard，验证用，不扣费）+ 手机号（收激活码；非乌克兰号码短信可能不稳，Telegram 机器人兜底）；同一手机号 30 天内最多 3 个域名；WHOIS 强制公开；5 天不激活订单作废 | 能 | 测试站、个人博客、作品集、落地页验证；不建议正式收款业务 | 《免费域名还没死：乌克兰 pp.ua 申请实录》，2026-10-22 |
| DuckDNS | $0，靠捐赠维持，没有付费档 | 长期免费（靠捐赠） | 几乎零门槛；token 当密码，别截进截图里 | 不能（只给域名和动态解析，不改 NS） | 家里 IP 会变的动态场景、远程回家 | 《DuckDNS 免费子域名》，2026-10-28 |
| dpdns.org（DigitalPlat） | $0；官方条款新增“Buy Slot”（付费扩容注册名额）机制——免费名额有限，额外名额可付费购买；买 Slot 不等于买域名、不等于买所有权、不等于买续费权，也不保证获批 | 免费续费周期未在官方条款正文中核实到具体天数（“剩余不足 180 天可免费续下一年”未核实）；每账号免费域名数量上限旧资料 1 个与 3 个两种说法冲突，未验证 | 无 EPP 转出码、不能迁到其他注册商；WHOIS 上的注册人是服务方；服务按 best-effort 提供，无 SLA、无可用性与续费保证 | 能，改 NS 接入 | 测试 / 作品集 / Demo / 文档站的过渡指针，别当关键业务唯一路径 | 《免费域名 dpdns.org：配 Cloudflare Pages 零成本上线》，2026-10-25 |
| is-a.dev | $0，无信用卡、无隐藏收费 | 免费（社区项目） | GitHub PR 申请；站还是空白页就去申请会被拒；商业项目、带收款的着陆页按规则会被关闭 PR；合并后 DNS 全球生效最长约 24 小时 | 能（改 NS） | 个人项目、开发者子域名 | 《免费域名：is-a.dev 图文教程》，2026-10-31 |
| afraid.org | $0，5 个子域名 | 免费（25 年老站） | 共享子域名随时可能被域名所有者撤掉，选官方自持的 mooo.com 类；Google 默认不收录共享子域名，别指望 SEO | 能（改 NS） | 测试站、跳转、内网服务 | 《免费二级域名：afraid.org 25 年老站》，2026-10-16 |
| Freenom（.tk/.ml/.ga/.cf） | 已死，现已回归但改为收费（约 €8/年起） | — | 2023 年 3 月因 Meta 起诉滥用与抢注暂停新注册；2023 年 11 月 ICANN 终止其注册商资质；2024 年 2 月宣布退出域名业务；约 1260 万个域名停止工作 | — | 别碰 | 《免费域名：Freenom 已死》，2026-10-11；《dpdns.org》，2026-10-25 |

## 其他免费域名，一句话定位

- **DigitalPlat（4 个后缀能托管 Cloudflare）**：与 dpdns.org 同一运营方链路；2026-10-21 的原文称它是一家非营利组织（由 The Hack Foundation 财政赞助），但 2026-10-25 的 dpdns 原文核实：现行官方条款写运营方为 EdgeAlphix LLC，不要再无条件写“非营利免费项目”。5 个免费后缀里 qd.je 不在 PSL 上、接不了 Cloudflare。详见《免费域名再升级：DigitalPlat 一家就有 4 个后缀能托管 Cloudflare》。
- **HapDNS**：免费注册域名 + 托管到 Cloudflare 一条龙；下单时看清价格是 0，期限一般是 1 年，到期前记得续费（免费续）。详见《Freenom 死后，免费域名的新答案：HapDNS 注册+Cloudflare 托管全攻略》。
- **pu.gy**：后缀只有 4 个字符，5 位以上的前缀免费注册，每人 3 个，到期前 30 天提醒续费、到期后 15 天宽限期；1–4 位前缀要付费（¥1–5/年）。详见《免费超短域名！pu.gy 永久免费领》。
- **lovie.me**：一个账号免费申领 3 个子域名，官方口径永久有效、不用每年续费，自带 DNS 解析和自动 SSL；不能把 DNS 托管到 Cloudflare。详见《又一个永久免费域名：lovie.me 一次领 3 个》。
- **devs.li**：面向开发者的免费子域名平台，每人默认 5 个，三字母前缀还能抢；只支持加 A、AAAA、CNAME、TXT 记录和 URL 跳转，不支持改 NS、接不了 Cloudflare。详见《又一个永久免费域名！devs.li 超短后缀》。

## 怎么选：按你的用途抄作业

- **公开建站、要接 Cloudflare**：eu.org（不赶时间）、pp.ua（能过绑卡绑手机）、dpdns.org（最快，但记住你不拥有这个名字）、is-a.dev（开发者）、afraid.org（测试站）。
- **家里服务远程访问**：DuckDNS，IP 变了也不掉线。
- **只要一个短域名挂项目**：pu.gy、devs.li、lovie.me，三选一，看哪个前缀还能抢。
- **正式品牌站、收款业务**：别用任何一家免费域名，花几十块买个付费域名更稳——免费域名的通病是随时可能被收回、SEO 权重低、部分平台不认。

## 常见问题

### 免费域名哪个能接 Cloudflare？

先过两关：后缀必须在 Public Suffix List（PSL）上、且能在你注册的这一级名字上改 NS。eu.org、pp.ua、dpdns.org、is-a.dev、afraid.org、HapDNS 都能；DuckDNS、devs.li、lovie.me 只给加 A/CNAME 记录、不能改 NS，接不进 CF。引自《免费域名再升级：DigitalPlat 一家就有 4 个后缀能托管 Cloudflare》（2026-10-21）。

### eu.org 申请要等多久？

官网不承诺时限。社区反馈短则 8 小时、长则一两年，急着用的别等它。申请前必须先配好 NS 记录，官方建议优先选开放三级域。引自《出海贸易 | 免费域名全攻略》（2026-10-08）。

### pp.ua 免费续费有什么条件？

0 元续费，但要在到期前 4 个月内操作并重新激活；注册要绑卡（验证用，不扣费）和手机号（收激活码），同一手机号 30 天内最多 3 个域名；WHOIS 强制公开，5 天不激活订单作废。引自《免费域名还没死：乌克兰 pp.ua 申请实录》（2026-10-22）。

## 来源与说明

- 价格与政策全部引自本站单品实测，见上表“来源 / 实测日期”列；免费域名的规则随时会变，动手前以各官网当前页面为准。
- dpdns.org 的每账号免费域名数量上限与免费续费周期，本站原文明确写了“未验证”，本页如实保留，不编数字。
- DigitalPlat 运营方口径：2026-10-21 原文写“非营利组织（由 The Hack Foundation 财政赞助）”，2026-10-25 原文核实为 EdgeAlphix LLC——本页以较新的核实为准，并注明两篇口径的变化。

最后核实：2026-11-12。

相关阅读：[免费域名全攻略：eu.org](https://jianyunyi.gv.uy/posts/2026-10-08-免费域名-euorg全攻略.html) · [乌克兰 pp.ua 申请实录](https://jianyunyi.gv.uy/posts/2026-10-22-免费域名-ppua申请图文教程.html) · [DuckDNS 免费子域名](https://jianyunyi.gv.uy/posts/2026-10-28-免费域名-duckdns免费子域名图文教程.html) · [dpdns.org 免费域名](https://jianyunyi.gv.uy/posts/2026-10-25-免费域名-dpdns免费域名图文教程.html) · [is-a.dev 图文教程](https://jianyunyi.gv.uy/posts/2026-10-31-免费域名-is-a-dev图文教程.html) · [afraid.org 免费二级域名](https://jianyunyi.gv.uy/posts/2026-10-16-免费二级域名-afraid图文教程.html)
