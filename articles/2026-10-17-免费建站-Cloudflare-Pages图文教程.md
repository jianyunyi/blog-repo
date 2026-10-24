# Cloudflare Pages 免费建站保姆级教程：零成本上线 + 绑定自己的域名（带 HTTPS）

**一句话导读**：每月 500 次构建、流量带宽不限、免绑卡，真·零成本把静态网站挂到你自己的域名上，全程在线搞定，不用买服务器。

## 前置条件（需要什么）

- 一个邮箱（Gmail / QQ 邮箱都行）：注册 Cloudflare 账号用
- 一个 GitHub 或 GitLab 账号：用来连仓库自动部署（push 代码就自动上线）；没有仓库也行，可以直接上传打包好的静态文件
- 一个域名（可选但强烈建议）：付费域名、免费二级域名都行；实在没有，先用 Cloudflare 送的 `<项目名>.pages.dev` 免费子域名上线
- **不用绑信用卡**：官网定价页明确写着 Free $0，"no credit card required"
- 不需要服务器，面向境外访问不需要备案

## 分步骤

### 步骤 1：注册 Cloudflare 免费账号

打开官网注册页，用邮箱注册，选 **Free（$0/月）** 计划即可。全程不需要填写信用卡信息——官方定价页白纸黑字：

![Cloudflare 定价页：Free 计划 $0、无需信用卡](img/2026-10-17-免费建站/step1.png)

注册完去邮箱点验证链接，账号就激活了。

### 步骤 2：先看清免费额度，心里有数再动手

免费版不是无限的，但额度对小生意官网绰绰有余。官方 limits 页（2026-09-05 更新）列得清清楚楚：

![Cloudflare Pages 官方免费额度说明](img/2026-10-17-免费建站/step2.png)

关键数字记一下：

- 每月 **500 次构建**（push 一次算一次，一天推十几次都够用）
- 每个项目最多 **100 个自定义域名**
- 单个站点最多 **20,000 个文件**，单个文件不超过 **25 MiB**
- 单个账号最多 **100 个项目**

最香的一条是官方定价页原话：**静态资源请求免费且不限量，不收带宽费**（"Requests to static assets are free and unlimited"）。纯静态官网随便多少人访问都不花钱。

注意：动态函数（Pages Functions）走另一套账，计入 Workers 免费额度——每天 10 万次请求、单次 CPU 10ms。**纯静态站完全不碰这条线**，就没这烦恼。

### 步骤 3：创建 Pages 项目，把网站部署上去

登录控制台 → Workers & Pages → 创建 Pages 项目，两种部署方式：

- **连 Git 仓库（推荐）**：选 GitHub/GitLab 仓库，选框架预设（Hugo / Hexo / VitePress 等），填构建命令和输出目录。以后每次 push 代码自动构建、自动上线。
- **Direct Upload（直接上传）**：把打包好的静态文件（index.html 等）直接拖进去就行，适合没代码仓库的纯静态页。

部署成功后自动获得 `https://<项目名>.pages.dev`，HTTPS 自动生效。新账号注意：注册后前 48 小时内可创建的项目数量受限（防滥用的），48 小时后自动解除。

### 步骤 4：绑定自己的域名

在项目里点 **Custom domains** → **Set up a domain** → 输入你的域名 → Continue。官方文档（2026-04-21 更新）把流程写得很细：

![Cloudflare Pages 绑定自定义域名官方步骤](img/2026-10-17-免费建站/step3.png)

两条路线：

- **子域名**（如 `shop.example.com`）：域名不用托管在 Cloudflare，只需在原 DNS 商加一条 CNAME 记录指向 `<项目名>.pages.dev`
- **根域名**（如 `example.com`）：需要把域名 NS 切换到 Cloudflare（加为 zone），Cloudflare 会自动建好 CNAME 记录

HTTPS 证书由 Cloudflare 自动签发，不用你操心。

### 步骤 5：验证上线

浏览器打开你的自定义域名，确认能访问、地址栏有小锁头。DNS 全球生效一般几分钟，慢的话等一会儿再看。

## 注意事项、费用、坑点

- **费用：$0/月**，上面列的额度内全免费
- **前科核查（如实说）**：
  1. Cloudflare 滥用检测偏严，2026-10 有真实案例：只部署个人网站也被封过号（Error 8000036），申诉还挺难。正常建站没事，但**千万别拿 Pages/Workers 搭代理、VPN、测速节点**——收到 Network Abuse 警告后不删会被全局阻断。
  2. `*.pages.dev` 被钓鱼团伙滥用过，在某些安全软件里信誉一般——**这正好是绑定自己域名的理由之一**。
  3. 没查到"免费额度缩水"或"悄悄收费"的前科，这点可以放心。
- **已知小坑**（官方 known-issues 页，2026-10-15 更新）：

![Cloudflare Pages 官方已知问题页](img/2026-10-17-免费建站/step4.png)

  - 不支持通配符自定义域名（如 `*.example.com`）
  - 域名上如果已有 Worker 路由或 Cloudflare Access 策略，绑不上
  - Next.js 部署方式变了：旧的 `@cloudflare/next-on-pages` 已弃用，纯静态路线最稳，避开这个坑
- **未验证提示**：有 2026-02 的中文实测帖称 `pages.dev` 在国内可能打不开（单信源，未独立验证）——如果你的客户主要在国内，直接绑定自定义域名即可；面向海外客户则无此问题。

## 来源

官方（2026-10-17 实际打开验证）：

- https://www.cloudflare.com/pricing（Free $0，no credit card required）
- https://developers.cloudflare.com/pages/platform/limits/（免费额度，2026-09-05 更新）
- https://developers.cloudflare.com/pages/configuration/custom-domains/（绑定自定义域名官方步骤）
- https://developers.cloudflare.com/pages/platform/known-issues/（已知问题，2026-10-15 更新）
- https://developers.cloudflare.com/workers/platform/pricing/（静态资源请求免费不限量、无带宽费）

实测/讨论原帖：

- https://www.360doc.com/content/26/0203/13/67742488_1169452787.shtml（中文实测：NavSphere + Pages 部署全流程，2026-02-03）
- https://eastondev.com/blog/zh/posts/dev/20261009-solo-founder-deployment-cloudflare-pages-workers-vercel-railway/（中文：一人公司部署方案对比，2026-10-09）
- https://dev.to/nayankyada/cloudflare-pages-pricing-2026-free-tier-limits-workers-costs-when-to-upgrade-2ono（2026 Pages 免费额度解析）
- https://community.cloudflare.com/t/pages-blocked-your-cloudflare-account-has-been-blocked-error-8000036-abusere/965881（2026-10-06 Pages 误封案例）
- https://github.com/cmliu/edgetunnel/issues/1796（2026-10-11 代理用途被 Abuse 警告实测）
