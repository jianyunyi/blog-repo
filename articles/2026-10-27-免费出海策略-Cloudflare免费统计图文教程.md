# 不装 GA、不弹 Cookie 横幅：Cloudflare 免费统计 5 分钟接上你的出海站

**一句话导读：** 只要想知道"有没有人来、从哪来、哪页最火"，Cloudflare Web Analytics 免费就够了——无 Cookie、无指纹，多数情况下不用挂 Cookie 同意横幅。

## 前置条件

- 一个已有网站（静态站、博客、落地页都行），以及一个免费 Cloudflare 账号
- 不需要改后端、不需要绑卡开通统计本身（统计产品本身免费）

## 分步骤

### 第 1 步：先确认它到底免费、到底能看什么

![Cloudflare 免费统计产品页](img/2026-10-27-web-analytics/step1.png)

Cloudflare 官网把 Web Analytics 定位为"Privacy-first, lightweight, accurate web analytics—for free"：免费、隐私优先、轻量。它看的是访问量、热门页面、来源、国家、设备和真实访客的页面性能（Core Web Vitals），而不是把每个访客的行为串成一条完整路径。

### 第 2 步：按官方文档开通——已接 Cloudflare 的站走自动注入

![官方开通文档](img/2026-10-27-web-analytics/step2.png)

官方开通路径分两条，对号入座：

- **网站已走 Cloudflare 代理：** 控制台 → Web Analytics → Add a site → 从下拉框选域名 → Done，默认就是自动注入（Automatic setup），不用改代码。
- **Cloudflare Pages 项目：** 控制台 → Workers & Pages → 选中项目 → Metrics → 在 Web Analytics 下点 Enable，下一次部署后自动带上统计脚本。
- **没走 Cloudflare 代理的站：** 同样在 Web Analytics 里添加站点，选手动安装（JS Snippet installation），把给你的 beacon 脚本粘到页面 `</body>` 之前。

### 第 3 步：理解它的边界，再决定要不要同时留着 GA

![无 Cookie 横幅实测帖](img/2026-10-27-web-analytics/step3.png)

实测帖的结论很实在：因为不设 Cookie、不做跨站追踪，多数场景下不需要 Cookie 同意横幅；但它天生没有会话、跳出率、转化漏斗、自定义事件这些 GA 式深挖功能。如果你要做漏斗和转化分析，它不是 GA 的替代品；如果你只要"有没有人来"这个答案，它就是最省事的那个。

## 注意事项、费用、坑点

- **费用：** Web Analytics 本身免费。不要把它和 Cloudflare 付费套餐里的其他功能混为一谈。
- **数据保留有上限：** 第三方对照文章指出，Cloudflare Web Analytics 只保留最近 6 个月的数据，7 天后长期数据会做聚合/抽样——要做跨年对比的话，定期把关键数字导出存档。
- **严格 CSP 会悄悄挡住 beacon：** 如果你的站设置了严格的 Content-Security-Policy，统计脚本可能被静默拦截，表现为"装了却一直没数据"，先查 CSP 再怀疑产品。
- **欧盟访客可单独排除：** 官方文档提供"Enable, excluding visitor data in the EU"选项，对欧盟合规有额外顾虑时可用。
- **广告拦截的影响：** 任何浏览器端统计都会被部分拦截插件挡掉一部分，数字当趋势看，别当精确账本。

## 来源

- Cloudflare Web Analytics 产品页：https://www.cloudflare.com/web-analytics/
- Cloudflare 官方开通文档：https://developers.cloudflare.com/web-analytics/get-started/
- DEV 实测帖《Add analytics to your site without a cookie consent banner》：https://dev.to/solca/add-analytics-to-your-site-without-a-cookie-consent-banner-4a11
- Plausible 对照页（保留期与抽样口径）：https://plausible.io/vs-cloudflare-web-analytics

（播客素材：本轮检索中文出海/独立开发播客，未找到与本主题直接相关的单集，故未引用，不编造。）
