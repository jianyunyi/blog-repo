# GitHub Pages 免费建站图文教程：零成本上线你的英文落地页（2026-10-21）

> 一句话导读：做跨境缺一个英文落地页？GitHub Pages 给公开仓库免费托管静态网站，2008 年上线至今没收过一分钱、也没跑过路，自定义域名 + 自动 HTTPS 全免费，网页端点几下、1–10 分钟上线。

## 前置条件

- 一个邮箱（注册 GitHub 免费账号用）
- 一个写好的 `index.html`（或者任何静态网页文件）；没有的话先写个最简单的也行，先跑通流程再装修
- 可选：一个自己的域名（想绑 `yourdomain.com` 才需要；没有的话先用免费的 `用户名.github.io`）

全程网页端操作，不用装软件、不用开服务器、不出门。

## 分步骤

### 第一步：注册 GitHub 免费账号

打开 [github.com](https://github.com/) 点 Sign up，邮箱 + 用户名 + 密码三件套，验证邮箱后登录。免费账号做这个完全够用。

### 第二步：新建仓库，传 index.html

点右上角 **+** → **New repository**，仓库名注意：

- 想做**用户站**（地址短、好看）：仓库名必须 **exactly 叫 `你的用户名.github.io`**，比如用户名是 `zhangsan`，仓库名就叫 `zhangsan.github.io`，上线后地址就是 `https://zhangsan.github.io`
- 想做**项目站**（一个账号挂多个站）：仓库名随便起，比如 `my-shop`，地址是 `https://zhangsan.github.io/my-shop`

选 **Public**（公开仓库免费是确定的；私有仓库发布 Pages 按账号类型可能要付费计划，别踩坑），然后网页端点 **Upload files** 把 `index.html` 传上去，点 Commit。

![GitHub Pages 官方 Quickstart 文档](img/2026-10-21-GitHub-Pages/step1.png)

### 第三步：打开 Pages 开关，等 1–10 分钟

进仓库的 **Settings → Pages**：

1. **Source** 选 **Deploy from a branch**
2. **Branch** 选 **main**，目录选 **/(root)**
3. 点 **Save**

然后就去泡杯咖啡。GitHub 要构建部署，**1–10 分钟**后访问 `https://你的用户名.github.io` 就能看到你的站了。第一次访问建议清一下缓存。

### 第四步（可选）：绑自己的域名 + 免费 HTTPS

还是在 **Settings → Pages**：

1. **Custom domain** 里填你的域名（比如 `shop.yourdomain.com`，或裸域名 `yourdomain.com`），点 Save——GitHub 会自动签发 Let's Encrypt 证书
2. 去域名商的 DNS 设置里加记录：
   - **裸域名（apex）**：加 4 条 A 记录，分别指向 `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
   - **子域名**（如 `shop.`）：加一条 CNAME，指向 `你的用户名.github.io`
3. 回到 Pages 设置，勾选 **Enforce HTTPS**

DNS 生效从几分钟到几小时不等，别急，睡一觉再看一般都好了。

![自定义域名官方文档](img/2026-10-21-GitHub-Pages/step2.png)

## 注意事项、费用、坑点

- **费用：全免费。** 站点约 1GB 空间、月流量约 100GB（软限制，个人站基本碰不到）、分支部署每小时约 10 次构建。自定义域名和 HTTPS 也免费。
- **只能放静态文件。** HTML/CSS/JS 可以，PHP、Node、Python、数据库这些服务端代码跑不了——想做电商下单、用户登录这类动态功能，GitHub Pages 不是它的活。
- **CNAME 文件别手误删。** 绑域名后仓库根目录会多一个 `CNAME` 文件，删了域名绑定就掉了。
- **构建失败去哪看：** 仓库的 **Actions** 标签页里有构建日志，红了点进去看报错信息，一般是文件名大小写或分支选错。
- **免费建站横向对比（2026 年 10 月实测横评）：** Cloudflare Pages 免费且流量不限（之前写过，这里不展开）；Netlify 免费约 100GB 流量 + 每月 300 构建分钟；Vercel Hobby 计划限个人非商业用途。GitHub Pages 胜在**极简、稳定、和代码仓库天然一体**。

![2026 年 10 月免费建站横评](img/2026-10-21-GitHub-Pages/step3.png)

- **前科审查通过：** 2008 年上线至今，长期免费，没有批量封号、悄悄收费、突然下线的黑历史，放心用。

## 来源

- 2026 年免费建站（含自定义域名）横评：https://dev.to/mryadavgulshan/best-free-website-hosting-with-custom-domain-in-2026-122i
- 免费建站 + 自定义域名实测详解：https://medium.com/@linc_36944/free-website-hosting-with-a-custom-domain-in-2026-what-you-actually-get-e8cf7bf9b3b1
- 自定义域名绑定 GitHub Pages 教程（2026）：https://tamzidulhaque.com/how-to-connect-custom-domain-to-github-pages-2026/
- GitHub Pages 介绍：http://tms-outsource.com/blog/posts/what-is-github-pages/
- 单页免费托管横评（Netlify Drop / GitHub Pages / Tiiny Host）：https://dev.to/sailorpro6/netlify-drop-github-pages-tiiny-host-what-the-free-tiers-actually-do-with-one-html-page-oct-39ok
