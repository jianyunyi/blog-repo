# 不注册、不绑卡，Netlify Drop 免费建站 2026 年 11 月实测：9 秒上线，但链接 1 小时后就过期

**一句话导读：** 手里有个做好的静态网页（作品集、落地页、活动单页），想立刻发个链接给别人看，又不想注册账号、不想碰 Git、不想绑卡？Netlify Drop 拖一下文件夹，9 秒就给一个能上网的链接，花费 0 美元——但别高兴太早：不注册拿到的链接先是一道密码墙，1 小时后还过期，本文把这条路从头到尾实测了一遍，告诉你它到底能干什么、不能干什么。

**最后核实：2026-11-18**

## 前置条件（需要什么）

- 一个浏览器（Chrome / Edge / Safari / Firefox 都行）。
- 一个现成的静态网站文件夹：里面至少有一个 `index.html`。我实测用的就是一个最小测试站，只有两个文件——`index.html`（一页中文“你好，世界！”）和 `style.css`（几行样式），打成 ZIP 只有 1 KB。
- **全程不需要账号、不需要手机号、不需要信用卡。** 下面所有步骤都是在未登录状态下做的。
- 关于截图的一句说明：拖放和上线是在真实浏览器里跑通的（无头浏览器里上传会直接报连接错误，见文末坑点）；成功页只在本次会话内可见，没有对外截图，文中用官方文档截图和访客视角截图佐证；密码墙截图和定价页截图是部署成功后直接拍的。

## 实测总览：9 秒上线，花费 0 美元，但有两个“但是”

| # | 操作 | 结果 | 耗时 |
|---|---|---|---|
| 1 | 打开 https://app.netlify.com/drop | 拖放区正常显示，主标题“Drag & drop to publish instantly” | 即时 |
| 2 | 把 1 KB 的测试站 ZIP 拖进拖放区 | 立即出现成功页“Voilà, your project is live”，拿到 `https://guileless-tapioca-757b72.netlify.app`，倒计时 59:51 | 约 9 秒 |
| 3 | 新标签页以访客身份打开这个链接 | 先撞上密码墙“Password protected site”，要输临时密码 `My-Drop-Site` 才能看 | 即时 |
| 4 | 输入临时密码后提交 | 测试页正常打开，标题“你好，世界！”、正文完整显示 | 即时 |
| 5 | 核对免费版额度（定价页） | Free 版 $0 forever，每月 300 credits；一次生产部署 15 credits，带宽 20 credits/GB | 即时 |

总花费：**0 美元**。全部实测都在 2026 年 11 月 18 日完成，全程没有出现人机验证，也没有被要求注册或绑卡。

**先说结论，再看步骤：** Netlify Drop 是真的“不用注册就能上线”，但不注册拿到的不是一条能直接发群里的公开链接——它先是一道密码墙，而且 1 小时后过期。想长期用、想公开分享，必须免费注册一个账号把站点“领走”（Claim），注册同样不绑卡。把它当“临时发个预览链接”的工具，非常好用；把它当“免费长期托管”，就走错路了。

## 步骤一：打开 Drop 页，不用登录就能拖

打开 https://app.netlify.com/drop，不用点任何登录按钮，页面正中就是拖放区，主标题写着“Drag & drop to publish instantly”，下面写着“Drop here or choose a file, folder, or start from an example”——文件夹、ZIP、单个 HTML 文件都能直接拖。

![Netlify Drop 着陆页，拖放区在正中](img/2026-11-18-免费建站-NetlifyDrop/step1.png)

页面下方还有一组常见问题，值得先看一眼，因为它和实测结果有一处对不上（见步骤三）：其中“Are my links publicly accessible?”的回答写的是“Yes, by default every project you drop gets a public link you can share with anyone.”——先记住这句话，实测会打它的脸。

**能拖什么：** 官方文档（Drop Quickstart）写的是“project folder or zip file”，也可以是单个 HTML 文件。需要注意：如果你拖的是还需要构建步骤的项目（比如没编译过的 React / Next.js 源码），必须先登录——未登录时 Netlify 只会把文件原样发布，不会帮你跑构建。正确做法是先在本地跑完构建，拖编译好的输出文件夹（比如 `dist/`）。

## 步骤二：拖放 ZIP，9 秒后拿到上线链接

我把打好包的测试站 ZIP（`index.html` + `style.css`，1 KB）拖进拖放区，上传完立刻跳出成功页，大标题是“Voilà, your project is live”，旁边标着“Live”。页面同时给出三样东西：

- 上线链接：`https://guileless-tapioca-757b72.netlify.app`（随机生成的子域名，`guileless-tapioca-757b72` 这种词组加数字的组合）；
- 临时密码：`My-Drop-Site`，原文是“Your project is protected with this password until you claim it:”；
- 倒计时：“Claim this site 59:51”和“This unclaimed site expires in 59:51”——从部署完成到成功页显示，只过去了约 9 秒，倒计时从 60 分钟开始走。

页面下方还有一张卡片“Make this project yours”，原文是“Claim this site to keep it online and unlock the full Netlify platform. You can claim this site with a free plan, which you can keep as long as you like.”以及“No credit card required or overages on our free plan.”——意思是：免费注册领走，站点就长期在线，免费版不用绑卡、也不会超额扣费。

**关于这个测试站链接：** 本次实测故意没有领取它，所以它在部署约 1 小时后（2026-11-18 约 13:49 CST）已经过期失效，你现在点开是打不开的——这正是本篇要验证的机制，不是链接贴错了。

## 步骤三：访客视角——先撞上密码墙，而不是直接看到网站

这一步最重要，也最容易让人误解。换一个新标签页，以访客身份直接打开 `https://guileless-tapioca-757b72.netlify.app`，看到的不是测试页，而是一道密码墙：

![访客打开未领取的 Drop 链接，先看到密码墙](img/2026-11-18-免费建站-NetlifyDrop/step2.png)

页面标题是“Password Protection”，正文是“Password protected site”“Please enter your password to get access.”，只有一个密码输入框和 Submit 按钮，页脚写着“This site is powered by Netlify. Build and deploy your own site for free.”

这就和步骤一里 FAQ 那句“默认就是公开链接”对上了号：**FAQ 说的和实际做的不一样。** 未领取的 Drop 链接，访客第一眼看到的是密码墙，必须拿到临时密码才能进。官方文档（Drop Quickstart 的“Is your project public?”一节）说得才准确：“If you drop without signing in, your project URL is protected with a temporary password until you claim it.”——以文档为准，别信着陆页 FAQ 的那句。

为什么会这样？Netlify 官方博客（2026 年 7 月《The 13-year story of Netlify Drop》）交代了来龙去脉：Drop 从 2013 年上线就是匿名拖放；2022 年 1 月把领取窗口从 24 小时砍到 1 小时、每个 IP 最多 3 个匿名站；2024 年一波诈骗网站潮里，大部分被举报的诈骗站都是 Drop 匿名站，于是 Netlify 给未领取的站加了临时密码墙；2025 年初又加了保留策略：未领取的站先暂停，一周后删除。所以密码墙不是 bug，是 2024 年之后有意加的安全措施。

## 步骤四：输入临时密码，测试页正常打开

在密码墙输入成功页给的临时密码 `My-Drop-Site`，点 Submit，测试页正常加载：

![输入临时密码后，测试页正常显示](img/2026-11-18-免费建站-NetlifyDrop/step5.png)

一级标题“你好，世界！”、两段中文正文和一行英文都完整显示，样式也正常——说明部署本身没有问题，文件原样上了 Netlify 的全球网络，只是被密码墙挡在了外面。**这张截图拍的是与部署文件完全相同的本地文件渲染效果**，因为线上那份在输密码后显示的内容与之一致（真实浏览器里已逐字核对过）。

## 步骤五：免费版额度怎么算——300 credits 够干什么

领走站点要注册免费账号，额度就按 Netlify 免费版算。定价页（2026-11-18 核实）写得很清楚：Free 版 $0 forever，每月 300 credits；Personal $9/月、1,000 credits；Pro $20/月、3,000 credits 起。

![Netlify 定价页：Free 版 $0 forever，每月 300 credits](img/2026-11-18-免费建站-NetlifyDrop/step3.png)

用量单价（定价页原文）：

| 用量项 | 单价（credits） | 300 credits 能换什么 |
|---|---|---|
| 生产部署（Production deploy） | 15 credits / 次 | 约 20 次部署 / 月 |
| 带宽（Bandwidth） | 20 credits / GB | 约 15 GB 流量 / 月 |
| 计算（Compute，函数等） | 10 credits / GB-hour | 静态站基本用不上 |
| 网络请求（Web requests） | 2 credits / 万次 | 小站每月几万次请求只花几个 credits |

算一笔账：一个纯静态小站，页面加图片按每次访问 500 KB 算，15 GB 流量约等于 3 万次访问；部署一次 15 credits，一个月改 20 次版也才花完额度。**对作品集、落地页、活动单页这种量级，免费版绰绰有余。** 但要注意免费版的硬规矩：额度用完，账号下所有站点暂停，直到下个月重置，不会自动扣费（免费版不能买附加额度，也没有超额账单）。

另外两个领走之后才有的东西：免费版可以绑自己的域名（带免费 SSL 证书），也可以在仪表盘里改项目名、看部署历史、重新拖放更新——更新的办法就是再拖一次新文件夹，自动发布成最新生产版。

![Netlify Drop 官方文档：未登录拖放会被临时密码保护](img/2026-11-18-免费建站-NetlifyDrop/step4.png)

## 注意事项、费用、坑点

**费用：0 美元。** 本次实测从打开页面到上线，没有任何付费环节；注册免费账号领走站点同样不绑卡。唯一要花的是你自己的时间：准备文件约 2 分钟，拖放上线约 9 秒。

**坑点一：不注册的链接不是公开链接。** 这是本文最大的实测发现：着陆页 FAQ 说默认公开，实际情况是密码墙 + 1 小时过期。想发链接给别人看，有两条路——要么把临时密码和链接一起发过去（对方输密码才能看，而且 1 小时后失效），要么免费注册领走站点再分享。别把未领取的链接直接贴进群里，别人点开会以为你的站坏了。

**坑点二：1 小时领取窗口，别拖。** 成功页的倒计时从 60 分钟开始走；按官方博客的说法，2022 年以来窗口就是 1 小时，过期未领的站会被暂停、一周后删除。部署完就顺手注册领走，不要“晚点再说”。

**坑点三：文件别太大。** 官方文档故障排查里写着：部署 50 MB 以下效果最好，单个文件超过 10 MB 可能卡住；更大的项目改用 Netlify CLI。实测的 1 KB 测试站是秒过的，别拿它去传几百 MB 的视频素材站。

**坑点四：需要构建的项目必须先登录。** 未登录拖源码文件夹，Netlify 不会帮你构建，只会原样发布——页面可能直接显示源码目录或报错。先在本地 `npm run build`，拖 `dist/` / `build/` 输出文件夹。

**坑点五：无头/自动化浏览器可能拖不上去。** 实测中一个教训：用无头 Chrome（CDP）走同一流程，Drop 页能打开，但一传文件就报“We're having some trouble connecting you to Netlify”，换真实浏览器一次成功。Drop 的上传接口对无头环境不友好，用你平时用的浏览器手动拖，别折腾自动化。

**坑点六：免费版额度是全账号共享的。** 300 credits 是整个账号一个月，不是每个站 300。部署、流量、请求全从这一个池子里扣，额度用完所有站一起暂停。站多的话，部署次数要省着用（预览部署不花生产部署的钱，改小东西先看预览）。

## 判断与结论：谁适合用，谁不适合

**适合用 Netlify Drop 的人：**

- 手里已经有做好的静态页面（AI 工具生成的落地页、作品集、活动单页、简历页），想立刻拿到一个能上网的链接发给客户或朋友看——拖一下、9 秒上线，比注册 GitHub、配 CI 快得多。
- 临时分享：给客户看一版设计稿、给朋友看一个活动页，1 小时有效期反而是优点，过期自动消失，不留尾巴。
- 不想碰 Git、不想学部署的新手：零命令行、零配置。

**不适合的人：**

- 想长期公开托管、不想注册账号的人——未领取的站 1 小时就过期，这条路走不通；要么注册免费领走，要么直接选 GitHub Pages / Cloudflare Pages（见下表）。
- 需要后端、数据库、用户登录、表单收数据的站——Drop 只是静态托管，没有这些；表单、登录、数据库都要上 Netlify 的其他服务或另外搭。
- 靠网站做生意的正式站点——免费版额度暂停机制（用完即停）和 Netlify 的服务条款，正式生意请走付费版或自有服务器。

**同类免费托管对照表（官方文档口径，2026-11-18 核实；只有 Netlify Drop 一栏是本文亲手实测，其余为文档核实）：**

| 方案 | 免账号上线 | 未领取/免账号的链接 | 免费版核心额度 | 适合 |
|---|---|---|---|---|
| **Netlify Drop（本文实测）** | 可以，拖放就行 | 密码墙 + 1 小时后过期 | 300 credits/月（≈20 次部署或 15 GB 流量） | 临时预览、快速分享 |
| Vercel Drop | 可以（2026-10-19 起静态站免账号） | 1 小时后过期，需登录领取 | Hobby $0，100 GB 流量/月，仅限个人非商用 | 临时预览、框架项目 |
| GitHub Pages | 不可以，要 GitHub 账号 + 公开仓库 | 无此概念，公开仓库即公开访问 | 站点 ≤1 GB，带宽软上限 100 GB/月 | 个人博客、项目文档、作品集长期托管 |
| Cloudflare Pages | 不可以，要 Cloudflare 账号 | 无此概念 | 带宽不限，每月 500 次构建 | 长期托管、流量大的静态站 |

一句话总结这张表：**只要临时链接，Netlify Drop 和 Vercel Drop 都行；要长期免费托管，GitHub Pages 或 Cloudflare Pages 更合适；要商用，GitHub Pages 明确禁商用，Netlify 免费版允许商用项目、Vercel Hobby 只限个人非商用。**

## 来源

- Netlify Drop 着陆页（拖放区与 FAQ 原文）：https://app.netlify.com/drop ——核实日期 2026-11-18
- Netlify Drop 官方文档 Quickstart（未登录拖放会被临时密码保护、50 MB / 10 MB 限制、构建需登录）：https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/ ——核实日期 2026-11-18
- Netlify 定价页（Free $0 forever、300 credits/月、15 credits/次部署、20 credits/GB 带宽）：https://www.netlify.com/pricing/ ——核实日期 2026-11-18
- Netlify 官方博客《The 13-year story of Netlify Drop》（2026-07-27：1 小时领取窗口、每 IP 3 个匿名站、2024 年密码墙由来、未领取站暂停后一周删除）：https://www.netlify.com/blog/thirteen-years-of-netlify-drop/ ——核实日期 2026-11-18
- Vercel Drop（2026-10-19 起静态站免账号、1 小时过期；Hobby 100 GB/月、仅限个人非商用）：https://ship.page/vercel-drop-without-account ——核实日期 2026-11-18
- GitHub Pages 官方限制文档（站点 ≤1 GB、带宽软上限 100 GB/月、禁商用）：https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits ——核实日期 2026-11-18
- Cloudflare Pages 免费版（带宽不限、每月 500 次构建）：https://www.sofast.host/blog/cloudflare-pages-vs-github-pages/ ——核实日期 2026-11-18
- 本次实测部署的测试站（未领取，已于部署约 1 小时后过期）：https://guileless-tapioca-757b72.netlify.app ——部署时间 2026-11-18 约 12:49 CST，临时密码 `My-Drop-Site`（随站点过期已失效）
