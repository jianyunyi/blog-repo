# 免费 VPN 求生指南：Proton 免费版还能打，但别指望它当主力（图文教程）

> 一句话导读：2026 年 10 月实测，Proton VPN 免费版（$0、无流量上限、无需绑卡）还活着，是免费 VPN 里最体面的一个；Windscribe 每月 10GB 当备选。但丑话说在前面：**免费 VPN 在中国大陆没有"稳定可用"的方案**，这篇教你怎么把它们当"随身备用"，而不是主力。

## 前置条件（先看完再动手）

- **Proton 官网在大陆被墙**：注册、下载、首次登录必须在墙外网络完成（比如你已经在用的代理/VPS 上）。在大陆境内直接打开官网大概率失败——这不是教程的问题，是前置门槛。
- 一个邮箱（注册用，不绑卡、不绑支付方式）。
- 心态：免费 VPN 是"备用降落伞"，主力网络还得靠你自己的合规方案（比如你正在搭的住宅 IP 落地那套）。

> 法律提示一句话：中国仅允许使用政府批准的 VPN 服务，个人使用非合规 VPN 存在法律风险，自行评估。

## 步骤 1：确认免费档——官网定价页 Free $0

打开 https://www.protonvpn.com/pricing ，找到 **Proton Free** 那一列（2026-10-16 实测）：

![步骤1：Proton VPN 定价页，Proton Free $0.00/月、无需信用卡](img/2026-10-16-免费VPN/step1.png)

免费档写得明明白白：**$0.00/月、No credit card required（无需信用卡）、1 台设备、100+ 服务器（覆盖 5 国）、No speed limits（不限速）**。旁边是 Plus / Unlimited 付费档，对比着看就知道免费档没藏着掖着。

## 步骤 2：看清免费版的卖点和边界

官网 Free VPN 介绍页（ https://protonvpn.com/free-vpn ）：

![步骤2：Proton 官方 Free VPN 页：免费、无广告、无日志、无流量上限](img/2026-10-16-免费VPN/step2.png)

四个卖点：**Unlimited and free forever（无流量上限）、No ads、No logs（无日志，开源可审计）、1 device**。免费版的商业模式是"付费用户补贴"，这是 Proton 官方公开承诺的，所以它不像杂牌免费 VPN 那样靠卖数据回血——这是它敢主推的根本原因。

边界也要看清：免费档**不能自选国家/服务器**（自动分配）、只有 1 台设备同时在线、流媒体解锁别想了（实测 Netflix 把免费 IP 段封了）、不支持 P2P。

## 步骤 3：大陆能连的关键——Stealth 混淆协议

这是免费 VPN 在大陆"时好时坏"里"好的那一半"的来源。Proton 官方支持文档（protonvpn.com/support，搜 Stealth）：

![步骤3：Proton 官方文档 Stealth 协议：隐匿 VPN 连接以突破网络封锁](img/2026-10-16-免费VPN/step3.png)

Stealth 是 Proton 自研的混淆协议，原理是把 VPN 流量伪装成普通 HTTPS 流量。**设置路径：客户端 → 设置 → 协议选 Stealth，同时打开 Alternative routing（备用路由）**。支持 Windows / macOS / Android / iOS。

实测结论（2026 年 10 月多家实测交叉）：Stealth 能连上一段时间，但**会被周期性封锁**，免费版成功率比付费版更低。建议优先试日本/新加坡节点（香港节点是付费的，免费档没有）。**出发前（在墙外）就装好、登好、把协议调好**，别等到了没网的时候现装——大陆境内登录都经常失败。

## 步骤 4：备选方案——Windscribe，每月 10GB

![步骤4：Windscribe 首页，免费档每月 10GB（验证邮箱后）](img/2026-10-16-免费VPN/step4.png)

Windscribe（ https://windscribe.com ）免费档：**验证邮箱后每月 10GB**（不验证只有 2GB），设备数不限。它的杀手锏是**混淆协议免费档全可用**（Stealth / WStunnel / AmneziaWG），2026 年实测对 GFW 的穿透手段比 Proton 多，免费节点含香港。

注册：官网注册（可先不给邮箱拿 2GB）→ 邮箱验证升到 10GB → 下载客户端 → 设置里手动选协议：先 Stealth（OpenVPN over TLS），不行换 WStunnel（走 443 端口）→ 连香港节点。大陆实测同样是"部分网络可连、有时今天行明天不行"，10GB 用完即止，**只够收邮件、回消息，不够看视频、传大文件**。

## 不推荐清单（一句话劝退）

- **Cloudflare WARP（1.1.1.1 App）**：免费、无限流量、无需注册都是真的，但它技术上是"就近出口"的加密隧道，**不换地区**——被墙的站点依然打不开。当加密 DNS / 公共 Wi-Fi 保平安可以，出海场景无效。
- **杂牌免费 VPN**（各种排行榜上没名号的、应用商店里图标很山寨的）：Hola 有卖用户带宽的前科，Turbo VPN 有日志丑闻。**只从官网下客户端**，别用第三方"破解版""无限流量版"。

## 费用与坑点总结

| 方案 | 免费额度 | 大陆可用性（2026-10 实测） | 定位 |
|---|---|---|---|
| Proton VPN 免费版 | $0，无限流量，1 设备 | 时好时坏，Stealth 协议是关键 | 主推：备用 |
| Windscribe 免费版 | $0，每月 10GB | 部分网络可连，需手动调协议 | 备选：轻量备用 |
| Cloudflare WARP | $0，无限流量 | 能连，但打不开被墙站点 | 不推（出海无效） |

**坑点重申**：① 免费 VPN 没有"稳定可用"的，大陆封锁是动态对抗，今天能连不代表明天能连；② 官网被墙，注册/下载/登录/调协议四件事必须提前在墙外做完；③ 别在免费 VPN 上登录重要金融账户做大额操作；④ 2026 年三家均无批量封号/悄悄收费/突然下线的前科，Proton 的免费承诺可信度最高。

## 来源

- Proton VPN 定价页（2026-10-16 浏览器实测）：https://www.protonvpn.com/pricing
- Proton VPN 免费版介绍页（2026-10-16 浏览器实测）：https://protonvpn.com/free-vpn
- Proton 官方 Stealth 协议文档（2026-10-16 浏览器实测）：https://protonvpn.com/support/how-to-change-vpn-protocols
- Windscribe 官网（2026-10-16 浏览器实测）：https://windscribe.com
- toolradar 2026-10-15 大陆 VPN 对比（Proton 第 1、Windscribe 第 2）：https://toolradar.com/blog/best-vpn-for-china
- gizmodo Proton VPN 中国实测（标注 Last Checked October 2026）：https://gizmodo.com/best-vpn/proton-vpn/china
- gizmodo Windscribe 中国实测（2026-09）：https://gizmodo.com/best-vpn/windscribe/china
- androidpolice 2026-09（WARP 免费、无流量上限）：https://www.androidpolice.com/cloudflare-warp-android-app-vpn-connection-fix/
