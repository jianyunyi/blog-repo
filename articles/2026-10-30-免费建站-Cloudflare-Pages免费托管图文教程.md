# 免费建站：Cloudflare Pages 图文教程——静态站不限流量的免费托管，500 次构建/月要先算清

**一句话导读：** 10-28 写了 Netlify 的 300 积分、10-29 写了 Vercel 的 100GB，今天补 Cloudflare Pages：静态站的流量和请求在所有档位都不限量，免费档每月 500 次构建、单站 2 万个文件、单文件 25MB——个人博客、作品集、落地页放这里几乎不可能超支；但它不管动态功能，带后端逻辑的站别往这里塞。

## 前置条件（需要什么）

- 一个免费的 Cloudflare 账号（不用绑卡）
- 一个 GitHub 或 GitLab 仓库里的静态站源码（纯 HTML/CSS/JS，或 Hugo、Astro、Next.js 静态导出这类能 build 出静态文件的项目）
- 一个能接受“纯静态”定位的项目：如果你的站要登录、要数据库、要服务端渲染，先别选 Pages，见第 4 步的分流建议

## 分步骤

### 第 1 步：先看产品页，确认 Pages 到底免费到什么程度

![Cloudflare Pages 产品页](img/2026-10-30-cloudflare-pages/step1.png)

打开 Cloudflare Pages 产品页，先看它的核心卖点：网站托管在 Cloudflare 遍布 200 多个城市的边缘网络上，GitHub/GitLab 一 push 就自动构建、自动部署到全部节点。对静态站来说，官方口径是所有档位都不限站点数、不限请求数、不限流量——这是它和 Netlify（100GB/月）、Vercel Hobby（100GB/月）最直接的区别：流量焦虑在这里不存在。

### 第 2 步：核对 2026 年 10 月的免费档数字，别被旧教程误导

![2026 年 10 月评测：Cloudflare Pages 免费档 500 构建/月、2 万文件、25MB 单文件](img/2026-10-30-cloudflare-pages/step2.png)

按 2026 年 10 月多家对照官方文档的评测，免费档的关键数字是：

- **构建：每月 500 次，同一时间只能跑 1 个，单次构建超时 20 分钟**——个人站一周部署几次，连零头都用不完；但多分支、多人同时推的项目会排队。
- **单站文件：2 万个，单文件最大 25MB**——文章站、作品集站随便装；别把未压缩的视频、大图原图直接扔进来，25MB 的单文件上限会先卡住你。
- **自定义域名：单项目 100 个**——个人用绰绰有余。
- **账号项目数：100 个**——这个上限所有档位都一样，升级也不涨，纯粹是防滥用。
- **流量和请求：不限量**——静态资源不计量，这是免费档真正的护城河。

注意一个版本提醒：Cloudflare 官方文档现在对新项目推荐走 Workers（静态资源同样不限量），Pages 仍在支持、没有官方下线时间表，但新功能会优先给 Workers——新项目如果愿意多学一点，可以直接看 Workers 静态资源路线；求稳、求文档多，Pages 依然是今天能用的选择。

### 第 3 步：从 Git 仓库导入，一次部署拿到线上地址

![Cloudflare Pages 官方文档首页](img/2026-10-30-cloudflare-pages/step3.png)

按官方文档的操作流：Cloudflare 面板 → Workers & Pages → Create → Pages → Connect to Git，选 GitHub/GitLab 仓库，框架预设一般能自动识别（Hugo、Astro、Next.js 静态导出、纯静态都有对应预设），构建命令和输出目录按预设来，点 Deploy。第一次构建成功后你会拿到一个 `*.pages.dev` 的线上地址；之后每次往仓库 push，Pages 自动重新构建部署，不用手动传文件。

动手前先在本地把构建跑通一次：本地 `npm run build`（或你框架对应的命令）能出产物、产物里没有超 25MB 的单文件，再推仓库——Pages 构建失败最常见的原因就是本地都没跑通过的构建命令，和缺环境变量，别先怀疑平台。

### 第 4 步：绑自定义域名，并给动态需求分流

![2026 年 10 月 29 日更新的评测：Pages 仍在支持，但新项目官方推荐 Workers](img/2026-10-30-cloudflare-pages/step4.png)

部署成功后，在项目设置 → Custom domains 里加自己的域名，按提示做 DNS 解析，等 HTTPS 证书自动签发。域名可以不是 Cloudflare 注册的，只要按提示指过去就行。

动态需求分流（这一步决定你会不会在免费档上踩雷）：

- **纯静态内容（文章、作品集、落地页）：** 放心用 Pages 免费档，流量不限量。
- **Pages Functions（服务端逻辑、SSR）：** 它按 Workers 计费——免费 Workers 档是每天 10 万次请求、单次 CPU 10 毫秒，超了请求直接失败，不会自动扣费升级；量大的动态功能要 Workers 付费档（$5/月起）或 Pro 档（$20/月起，构建涨到 5000 次/月）。
- **要数据库/对象存储（D1、R2）：** 不包含在 Pages 免费档里，另行计费，别默认它们免费。

## 注意事项、费用、坑点

- **费用：** Pages 免费档 $0，不绑卡；Pro 约 $20/月（构建 5000 次/月、5 并发）、Business 约 $200/月（构建 20000 次/月、20 并发），流量在所有档位都不限量。价格以 Cloudflare 套餐页为准。
- **前科核查：** Cloudflare Pages 免费档自推出以来没有批量关停、悄悄收费或突然下线的公开前科；它的免费模式是“静态不限量、构建和动态功能计量”，结构上可持续。但要注意：Pages 的免费档定位是静态托管，别拿它当网盘、视频站或代理节点，滥用会被按条款处理。
- **别踩的坑：** ① 单文件 25MB 上限：视频、大图先压缩再部署，别直接扔原文件；② 构建 20 分钟超时：页面上万的超大静态站先在本地测构建时长；③ Functions 别当免费午餐：SSR 和 API 路由走 Workers 免费档每天 10 万次请求，超了就失败，不是自动升级；④ 官方已把新项目推荐语改成 Workers，长期规划的新项目值得先对比 Workers 静态资源路线再决定。

## 来源

- Cloudflare Pages 产品页：https://pages.cloudflare.com/
- Cloudflare Pages 官方文档：https://developers.cloudflare.com/pages/
- 2026 年 10 月评测（免费档：不限流量、500 构建/月、2 万文件、25MB 单文件）：https://www.cloudpicked.com/cloudflare-pages-review-en.html
- 2026 年 10 月 29 日更新评测（Pages 仍在支持、新项目推荐 Workers、Workers 免费档 10 万次/天）：https://www.sofast.host/blog/what-is-cloudflare-pages/
- 2026 年 10 月 17 日横评（Pages vs GitHub Pages vs Netlify 免费档对照）：https://www.danieljin.com/writing/cheapest-website-hosting-2026/
