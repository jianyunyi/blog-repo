# 博客配图 0 元装上 CDN：Cloudflare R2 免费 10GB 图床实测

**一句话导读：** 把博客/落地页的图片搬到 Cloudflare R2 对象存储——每月 10GB 存储、100 万次写入、1000 万次读取全免费，而且访客看图（出站流量）一分不收，爆款文章也不会收到天价账单。

## 前置条件（需要什么）

- 一个 Cloudflare 账号（邮箱注册即可，账号本身免费）
- 一张可绑定的支付方式（信用卡或 PayPal）：开通 R2 订阅时需要绑卡，免费额度内不会扣费，介意绑卡的人先想清楚
- （可选）一个自己的域名：想用 `img.你的域名.com` 这种顺眼图床地址才需要；暂时没有也能先用 R2 自带的 `r2.dev` 测试地址跑起来

## 分步骤

### 第一步：开通 R2 订阅

登录 Cloudflare 仪表盘，左侧找到 **R2 对象存储**（Storage & Objects → R2 Object Storage），按提示走一次订阅 checkout、绑定支付方式。绑完卡 R2 就开了——注意这只是开通的硬性步骤，在免费额度内不会产生任何扣费。

![R2 官方定价页，免费额度明细](img/2026-10-24-r2-hosting/step1.png)

### 第二步：创建一个存储桶（bucket）

进入 R2 → **Buckets → Create bucket**，起个小写英文名，比如 `blog-images`，地域选 Automatic（让 Cloudflare 自动调度）即可。桶名只能用小写字母、数字和连字符。

![R2 官方文档总览，Get started 入口](img/2026-10-24-r2-hosting/step2.png)

### 第三步：上传图片

进刚建的 bucket 点 **Upload** 直接网页上传。网页传一次传几张没问题，图片多的话建议用 S3 兼容工具批量传：

- **rclone**、**Cyberduck** 都支持 R2，Endpoint 填 `https://<你的账号ID>.r2.cloudflarestorage.com`
- 需要 API 密钥：在 R2 总览页右侧 **Account Details → Manage** 里 **Create User API Token**，权限选 **Object Read & Write**，范围限定到这个 bucket，TTL 选 Forever——千万别用 Admin 全权限，泄露了后果大

省钱小技巧：手机原图一张好几 MB，先压缩再传；转 WebP 通常省 30%~50% 体积，10GB 免费额度能装下几万张配图。

### 第四步：打开公开访问，拿到图片外链

刚建好的桶默认是私有的，外人打不开。进 bucket → **Settings → Public Development URL → Enable**，确认框里输入 `allow`，R2 会给你一个 `*.r2.dev` 的公共域名，图片立刻变成 `https://pub-xxx.r2.dev/图片名` 可访问。

**但注意：** `r2.dev` 官方定位是"开发测试用"，请求一多就会被限流（返回 429），生产环境的博客/落地页要用自定义域名：同一设置页里 **Custom Domains → Connect Domain**，绑 `img.你的域名.com`，DNS 会自动加上记录，几分钟生效。之后图片地址就是 `https://img.你的域名.com/图片名`，还自动享受 Cloudflare 的全球缓存和免费 HTTPS。

![R2 公开访问与自定义域名官方文档](img/2026-10-24-r2-hosting/step3.png)

### 第五步：接到网站/落地页上

- **WordPress**：装支持 S3 兼容存储的媒体库插件（如 S3 Uploads、Media Cloud、Offload Media Lite），Endpoint 填 R2 的，密钥填第三步创建的 token，上传的图片自动同步到 R2 并返回自定义域名的外链
- **静态博客/手写落地页**：图片直接引用 `https://img.你的域名.com/xxx.webp` 就行，跟引用普通图片地址没区别
- 旧站迁移：把历史配图批量上传到 R2 后，做一次查找替换，把旧图片地址换成新域名即可

![2026 年免费图床横评实测（R2 / B2 / Oracle 对比）](img/2026-10-24-r2-hosting/step4.png)

## 注意事项、费用、坑点

**费用（官方定价页 2026-10 核实）：**
- 免费额度每月重置：**10GB 存储 + 100 万次 A 类操作（写/上传/列表）+ 1000 万次 B 类操作（读/下载）**，**出站流量 $0**
- 超出部分：存储 $0.015/GB·月，A 类 $4.50/百万次，B 类 $0.36/百万次，流量依然 $0。个人博客基本碰不到超额线
- 免费额度只覆盖 **Standard 存储类**；2025 年新增的 Infrequent Access（$0.01/GB·月）有 $0.01/GB 取回费，图床别选它

**坑点：**
1. **开通必须绑卡**（信用卡/PayPal），这是硬性步骤，免费额度内不扣费但卡是必须的——纯白嫖党提前知晓
2. **r2.dev 别用在生产环境**：官方明确限流（每秒几百请求就 429），且带宽会被节流。正式用必须绑自定义域名
3. 缓存的 404 坑：Cloudflare 会缓存 404，如果访客在你上传之前访问过图片地址，之后上传了也可能继续 404 一阵子——解决办法是换个新文件名（路径里加版本号），或手动清缓存
4. **国内访问速度一般**：R2 在国内没有节点，直连偏慢。图床地址走自定义域名会自动套 Cloudflare 缓存，海外访客体验很好；主要做国内生意的，图片还是建议另想办法
5. 别拿 GitHub 仓库、Telegram Bot 当图床：明确违反服务条款，被封了文章全裂图。R2 这种大厂官方长期免费额度才稳

**前科调查：** R2 的 10GB/100万/1000万 免费额度从上线至今没缩水过（2026-10 官方定价页依然是这个数），没有"悄悄收费"记录。稳定性方面，2025-02-06 R2 曾因一次滥用处置误操作导致网关短暂停服约 1 小时（官方事后发了事故复盘），属于运营事故而非政策变更。社区里偶发的 R2 停服帖基本都是账单/风控问题，正常个人图床用途不在打击范围。

## 来源

- Cloudflare R2 官方定价页（免费额度核实）：https://developers.cloudflare.com/r2/pricing/
- R2 公开访问与自定义域名官方文档：https://developers.cloudflare.com/r2/buckets/public-buckets/
- R2 限制与限流官方文档：https://developers.cloudflare.com/r2/platform/limits/
- 免费图床横评 2026（R2/B2/Oracle 实测对比，2026-10-21）：https://www.rangka.com/49.html
- Cloudflare 免费全家桶额度明细（2026-10-17）：https://www.rangka.com/39.html
- R2 手把手搭建指南（含 API Token 创建，dev.to）：https://dev.to/yeagoo/cloudflare-r2-hands-on-guide-set-up-free-10gb-storage-zero-egress-object-storage-and-325n
- 播客 RSS 托管在 R2 的实测帖（V2EX，2026-10-19）：https://www.v2ex.com/t/1249908
- Cloudflare 官方事故复盘（2025-02-06 R2 网关事件）：https://blog.cloudflare.com/cloudflare-incident-on-february-6-2025/
