# 免费建站：Vercel Hobby 免费档图文教程——个人项目 0 元上线，但赚钱的站不能用它

**一句话导读：** 昨天写了 Netlify 的 300 积分制，今天补 Vercel：Hobby 档 $0、每月 100GB 流量、100 万次边缘请求，对个人作品集和练手项目绰绰有余；但它有一条红线比额度更重要——只许个人非商业用途，拿它跑收款站就是违规，迟早要升 Pro（$20/人/月）。

## 前置条件（需要什么）

- 一个 GitHub 账号（Vercel 最顺的导入方式就是连 GitHub 仓库）
- 一个能公开访问的代码仓库：静态站、Next.js、React 都行；纯后端重活不适合 Hobby
- 先定性：这个站将来收不收钱、接不接客户？收钱就别从 Hobby 起手

## 分步骤

### 第 1 步：先看定价页，把 Hobby 的额度一次看全

![Vercel 定价页：Hobby $0，Pro $20/人/月](img/2026-10-29-vercel/step1.png)

打开 Vercel 定价页，Hobby 档的核心额度（2026 年 8–10 月官方口径的第三方整理）：每月 100GB 快速数据传输、100 万次边缘请求、100 万次函数调用、4 小时 Fluid Active CPU、360 GB-小时预配内存、1GB Blob 存储、1 个成员、部署次数不限。注意两个细节：第一，Hobby 不能购买额外用量，超了不是扣费、是对应资源暂停到下个周期或逼你升级；第二，构建分钟数在各家第三方页面口径不一（有写 600 分钟/月、有写不计），本文不把构建分钟当硬数字，部署时以你账号里的实际用量页为准。

### 第 2 步：从 GitHub 导入，一次部署拿到线上地址

![Vercel 官方文档首页](img/2026-10-29-vercel/step2.png)

进 Vercel 控制台点 Add New → Project，选 GitHub 仓库导入：框架预设会自动识别（Next.js、Vite、纯静态都会给默认值），一般不用改构建命令，点 Deploy，等构建成功就拿到一个 vercel.app 子域名。改代码后 push 到 GitHub，Vercel 自动重新部署——这就是它比手动传文件省事的地方。部署失败先看构建日志，十有八九是框架预设或 Node 版本没对上，别急着换平台。

### 第 3 步：绑自定义域名 + 看用量仪表盘，超量前先预警

![Vercel 2026 定价详解：Hobby 的商业用途红线与 Pro 对照](img/2026-10-29-vercel/step3.png)

在项目 Settings → Domains 里绑自己的域名（按提示加 DNS 记录，等 HTTPS 证书自动签发），然后每月看一次 Usage：流量快到 100GB、函数调用快到 100 万次之前，就要决定是瘦身（压图片、开缓存）还是升级。个人博客、小工具站通常远不到这个量；一张图 3MB 的站，100GB 也就撑 3 万多次页面访问，图片多先压图再上线。

## 注意事项、费用、坑点

- **费用：** Hobby $0；Pro $20/人/月（含 $20 用量额度），Pro 给 1TB 流量、1000 万次边缘请求；Enterprise 定制价。价格以部署时定价页为准。
- **最大坑点——商业用途红线：** Hobby 明确只许个人、非商业用途。你的 AI 订阅店、收款落地页、客户项目，哪怕流量再小，也要上 Pro；用 Hobby 跑商业站属于违反条款，不是“薅到就是赚到”。
- **和 Netlify/GitHub Pages 的分工（10-28 Netlify 篇、10-21 GitHub Pages 篇已写）：** Next.js 项目首选 Vercel（同源优化最好）；纯静态站三家都行，Netlify 的积分制要算部署+带宽+函数的总账，GitHub Pages 最省心但动态能力最弱。
- **前科核查：** Vercel 未见免费档突然下线的前科，但它的计费规则一直在变（2026 年已从简单档位转向额度+按量混合计费），别把 2024 年的老教程额度照抄到现在。
- **别踩的坑：** ① Hobby 超量不扣费但会停服，别拿它接活动流量；② 团队协作要 Pro，Hobby 只有 1 个成员；③ 部署前先在本地跑通构建，Vercel 构建失败最常见的原因是本地能跑、线上缺环境变量。


相关阅读：[Netlify 免费档 300 积分制](https://jianyunyi.gv.uy/posts/2026-10-28-免费建站-netlify免费档300积分图文教程.html)

## 来源

- Vercel 定价页：https://vercel.com/pricing
- Vercel 官方文档：https://vercel.com/docs
- 2026 定价详解（Hobby 额度与非商业红线，2026-08 核对）：https://livemy.app/blog/vercel-pricing
- Pro 档对照：https://dev.to/zforzain2000/vercel-vs-vps-for-nextjs-the-real-monthly-cost-in-2026-431o
