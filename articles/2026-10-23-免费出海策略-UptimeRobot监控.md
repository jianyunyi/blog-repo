# 网站半夜挂了没人知道？5 分钟给它装上免费宕机告警（UptimeRobot 实战）

> 一句话导读：UptimeRobot 免费版给 50 个监控点、每 5 分钟检查一次、邮件告警不要钱，注册到第一封告警真正 5 分钟能搞定。但 2024 年 12 月之后免费版条款收紧——只许个人非商业用途，挂收款站得升级付费。本篇把免费版的真实边界和三步实操一次讲透。

## 先说结论：免费版香在哪，又卡在哪

UptimeRobot 是 2010 年就开始做的老牌网站监控，号称有 340 万+用户。免费版 2026 年的真实规格（2026-10-23 刚从官网定价页核实）：

- **50 个监控器**，0 元/月，注册**不需要绑卡**
- 检测间隔固定 **5 分钟**，免费版不能调
- 监控类型：HTTP(s)、ping、端口、关键词、API、UDP、DNS，还有 SSL/域名到期监控
- 告警通道：**邮件免费**（注册邮箱默认就能收）；App 推送免费（装官方 App 登录即可）；短信/语音电话要单独买额度，免费版不送；Telegram、Slack、Webhook 这些**免费版没有**——免费版只有 5 个基础集成（Google Chat、Discord、Pushover、Pushbullet、Splunk）
- 日志只保留 **3 个月**，状态页只能建 1 个基础版

以及最重要的一条，很多人还不知道的：**2024 年 12 月 1 日起，UptimeRobot 把免费版的使用条款改成了"仅限个人、非商业用途"**。官网定价页现在给免费版的定位就是 "Good for hobby and non-profit projects"。监控你的博客、测试站、作品集——没问题；监控正在收款的独立站、客户的站——按条款算违规，官方说法是可能导致封号。多家 2026 年的第三方实测（dev.to、notifier.so、upcanary 对比页）都确认了这条，开源/教育/非营利项目除外。

所以这篇教程的适用对象说清楚：**个人项目、测试站、博客、作品集**——完美；正式赚钱的业务站，请自觉看付费档（见文末价格对比）。

政策前科方面如实说一句：UptimeRobot 自己从 2010 年活到现在，没有突然跑路下线记录，算免费监控里的"老字号"；但 2024 年底那次 ToS 收紧就是一次"免费版悄悄变严格"的实例——免费的东西，规则说变就变，重要业务别把鸡蛋放一个篮子里。同行里 2026 年 3 月 Freshping 直接关停删数据，是个反面教材。

## 前置条件（动手前备好这 3 样）

1. **一个邮箱**：注册用，也是默认的告警接收邮箱。Gmail、Outlook 都行。
2. **你的网站 URL**：要监控的那个，比如 `https://你的域名/`。最好再准备一个 API 健康检查地址（比如 `/health`），后面会讲为什么。
3. **手机装 UptimeRobot 官方 App**（可选但推荐）：免费的推送告警，比邮件快。iOS/Android 都有，登录同一个账号就行。

费用：**注册到告警全流程 0 元**。短信/语音告警是唯一要花钱的项（免费版不含额度，需单独购买，一次性收费）。

## 步骤一：注册账号，点验证邮件

打开 [uptimerobot.com](https://uptimerobot.com)，首页明明白白写着 "50 monitors for free"，点 "Start monitoring for free"：

![UptimeRobot 官网首页：50 个免费监控点，免费开始](img/2026-10-23-uptimerobot/step1.png)

填邮箱、设密码注册。注册完去邮箱点验证链接——**没验证邮箱，告警邮件可能收不到**，这步别跳过。全程纯在线，不用出国、不用绑卡，2 分钟。

## 步骤二：添加第一个监控器（核心就这一步）

登录进控制台（dashboard），点 **Add New Monitor**，按下面填：

- **Monitor Type**：选 **HTTP(s)**——最常用的网站存活检查
- **Friendly Name**：起个自己看得懂的名字，比如 `我的博客首页`
- **URL (or IP)**：填 `https://你的域名/`
- **Monitoring Interval**：免费版只有 5 分钟可选，不用纠结
- **Alert Contacts To Notify**：勾上你的邮箱

点 Create Monitor，完事。5 分钟后第一次检查完成，面板上就会出现绿色的 Up 状态。

**进阶一点的做法（推荐）：** 再建第二个监控器，类型选 HTTP(s)，URL 填你 API 的健康检查端点（比如 `https://你的域名/api/health`）。首页挂了 + API 还活着，说明问题出在前端/CDN/DNS 层；两个一起挂，八成是服务器或网络层的问题。两个监控器互相参照，排障快一倍。还剩 48 个名额，博客、落地页、API 全加上都够。

**第三个值得顺手开的：域名到期监控。** 免费版特性里包含 SSL & Domain expiry monitor（域名到期前会提醒）。出海人域名一多，最容易犯的低级错误就是域名过期没续导致全站 404——让机器人替你记着。

> 坑点提醒：免费版 5 分钟检查一次，意味着**最坏情况下宕机 4 分 59 秒你才知道**（dev.to 2026 年实测文章算过这笔账：299 秒的最大检测盲区）。对个人博客完全够用；对秒级敏感的交易链路，免费版先天不够。

## 步骤三：把告警通道配成"一定能叫醒你"

邮件告警是默认开的，但邮件可能进垃圾箱、可能半夜不看手机。按官方帮助文档（2026-07-31 更新的《Personal Notification Channels – Setup Guide》），免费版真正靠谱的告警组合是**邮件 + App 推送**：

![UptimeRobot 官方帮助文档：个人告警通道设置指南（邮件/短信与语音/App 推送）](img/2026-10-23-uptimerobot/step3.png)

1. **邮件**：每个用户默认有一个邮件通道，就是注册邮箱。不用配，已经能用。想加第二个邮箱？免费版不行——加额外联系人需要付费档的席位。
2. **App 推送**：手机装 UptimeRobot 官方 App，用同一账号登录，控制台里就会出现推送通道，勾到监控器上。**这是免费版最快的告警方式**，强烈建议开。
3. **短信/语音电话**：免费版**不送额度**，需要单独购买（一次性购买、不是订阅）。半夜宕机指望电话叫醒的，得花这笔钱——价格以官网 FAQ 为准（第三方评测称约 $3/10 条短信额度，未在官网核实）。
4. **Discord 通知**：免费版 5 个基础集成里有 Discord。把告警推到你自己的 Discord 频道，手机 Discord 一响就知道——这是绕开"免费版没有 Telegram/Slack"的土办法。

配完之后，点监控器旁边的 **Test notification** 发一条测试告警，确认每个通道真能收到，再当它是生产工具。

## 费用、限制、坑点汇总

| 项目 | 情况 |
|---|---|
| 注册+50 个监控器 | 0 元/月，无需绑卡 |
| 检测间隔 | 固定 5 分钟（免费版不可调）；Solo 60 秒 / Team 30 秒 / Scale 15 秒 |
| 邮件告警 | 免费，注册邮箱默认可用 |
| App 推送告警 | 免费，需装官方 App 并登录 |
| 短信/语音告警 | 免费版不含额度，需单独购买（一次性收费） |
| Telegram / Slack / Webhook | 免费版**没有**；Telegram、Slack、MS Teams 需 Solo 起；Webhook、Zapier、PagerDuty 需 Team 起 |
| 免费集成 | 仅 5 个基础：Google Chat、Discord、Pushover、Pushbullet、Splunk |
| 日志保留 | 3 个月（Solo 12 个月，Team/Scale 24 个月） |
| 状态页 | 1 个基础版（无自定义域名） |
| 适用范围 | **个人、非商业用途**（2024-12-01 起 ToS 规定）；开源/教育/非营利除外 |
| 风险 | 收款站/客户站挂免费版 = 违反条款，有封号风险 |

**付费档价格**（官网定价页，2026-10-23，仅作对比）：Solo $13/月（年付 $12/月）10 个监控器；Team $46/月（年付 $39/月）100 个监控器；Scale $98/月（年付 $79/月）200 个监控器。注意 Solo 的监控器数量反而比免费版少（10 vs 50），买的是更快间隔和更多功能，不是更多数量。

![UptimeRobot 官网定价页：免费版 $0 与 Solo / Team / Scale 各档价格对比](img/2026-10-23-uptimerobot/step2.png)

## 来源

- UptimeRobot 官网定价页（免费版 50 监控器/5 分钟/告警通道/付费档价格，2026-10-23 核实）：https://uptimerobot.com/pricing
- UptimeRobot 官网首页：https://uptimerobot.com
- UptimeRobot 官方帮助文档《Personal Notification Channels – Setup Guide》（2026-07-31 更新）：https://help.uptimerobot.com/en/articles/11360953-uptimerobot-personal-notification-channels-setup-guide
- UptimeRobot 官方 FAQ：https://uptimerobot.com/faq/?ref=footer
- dev.to r0tten0x《UptimeRobot Free Plan in 2026: The Limits That'll Actually Bite You》（2026 年 5 月更新：免费版仅限个人非商业用途、299 秒检测盲区）：https://dev.to/r0tten0x/uptimerobot-free-plan-in-2026-the-limits-thatll-actually-bite-you-445g
- notifier.so《UptimeRobot vs Pingdom 2026》（免费版告警通道对比、短信额度说明）：http://notifier.so/guides/uptimerobot-vs-pingdom/
- notifier.so《Uptime Kuma vs UptimeRobot》（免费版限制、Freshping 2026-03 关停）：http://notifier.so/guides/uptime-kuma-vs-uptimerobot/
- whatap.io《UptimeRobot vs cron+curl vs Free URL Monitoring》（2026 年 8 月：免费版集成与区域限制）：https://url.whatap.io/blog/best-free-uptime-monitoring
- loadster.com《UptimeRobot Alternatives with Transaction Checks (2026)》（定价与监控类型对照）：https://loadster.com/compare/uptimerobot-alternatives/
- upcanary.io《UpCanary vs UptimeRobot》（2024-12-01 ToS 变更说明）：https://upcanary.io/compare/uptimerobot
- designmodo《7 Best Uptime Robot Alternatives》（2025-12-19：ToS 变更背景）：https://designmodo.com/uptimerobot-alternatives/
- DigitalOcean Ideas《How to Use UptimeRobot for Cron Job Monitoring》（heartbeat 监控定时任务）：https://ideas.Digitalocean.com/network/p/how-to-use-uptimerobot-for-cron-job-monitoring

*（播客说明：另搜了一轮中文出海/独立开发播客（小宇宙、Apple Podcasts、Spotify），未找到与网站监控或 UptimeRobot 直接相关的单集，故不引用。）*
