# Cloudflare 免费 CDN：30 分钟给网站加速、给源站 IP 穿上隐身衣

**一句话导读**：零成本把域名接入 Cloudflare 免费版，全球 CDN 缓存提速 + 无限 DDoS 防护 + 免费 HTTPS，再配三步把源站 IP 彻底藏住——有 VPS 跑网站的创业者必备。

## 前置条件（需要什么）

- 一个**自己注册的域名**（任何注册商都行），且**能修改该域名的 NS（Nameserver）记录**——免费版只支持 full setup（必须把 NS 切换到 Cloudflare），官方文档明确只有企业用户才有 CNAME 部分接入选项
- 一台可正常访问的源站服务器（VPS），Web 服务（Nginx / Apache）已跑起来
- 一个邮箱即可注册 Cloudflare 账号，**免费版不需要绑信用卡**（注册页明示 "no credit card required"）
- 源站服务器需要能执行防火墙命令（如 ufw）——用于 IP 隐藏的最后一步

## 分步骤

### 步骤 1：注册账号，添加站点，选 Free（$0）

到 Cloudflare 控制台点 Onboard a domain / Add a site，输入根域名（如 `example.com`），选 **Free（$0/月）** 套餐。免费版包含什么，定价页列得明明白白：

![Cloudflare 定价页：Free 计划 $0 包含无限 DDoS 防护、CDN、免费 SSL](img/2026-10-17-免费CDN/step1.png)

无限带宽 CDN、无限 DDoS 防护、Universal SSL 证书、免费托管 WAF 规则集——做官网 / 小电商完全够用。

### 步骤 2：跟着官方四步接入流程走

官方接入文档（2026-05-05 更新）把流程拆成四步，右侧目录看得一清二楚：

![Cloudflare 官方接入文档：添加站点的四步流程](img/2026-10-17-免费CDN/step2.png)

1. Add your domain（添加域名）
2. Review DNS records（核对 DNS 记录）
3. Update nameservers（换 NS）
4. Complete SSL/TLS setup（配置 SSL）

### 步骤 3：核对 DNS 记录——橙色小云朵是关键

Cloudflare 会自动扫描你现有的 DNS 记录，逐条核对：

- **A 记录必须指向你的源站 IP**，并且**打开橙色小云朵（Proxied）**——这是 CDN 缓存 + 隐藏 IP 的总开关
- 邮件相关的 MX / TXT 记录保持**灰色云（DNS Only）**，邮件流量不能走代理
- 自动扫描可能漏掉 MX 记录，漏了会导致收不到邮件，务必人工补上

### 步骤 4：到域名注册商把 NS 换成 Cloudflare 的

把域名注册商处的 NS 记录换成 Cloudflare 分配给你的两条 NS。官方说注册商处理最长可达 24 小时，实际多为几分钟到 1 小时；控制台状态显示 Active 即生效。

⚠️ 切换前先备份好原 DNS 记录（含 MX 邮箱记录），并确认源站直接访问正常——官方有专门的 "Minimize downtime" 降风险指引。

### 步骤 5：选 SSL/TLS 模式——不要长期用 Flexible

官方文档把加密模式讲得很透：

![Cloudflare SSL 加密模式官方文档](img/2026-10-17-免费CDN/step3.png)

- **Flexible**：只加密"访客 → Cloudflare"这一段，Cloudflare → 源站走明文 HTTP。访客浏览器显示小锁头，但回源流量是明文，机房 / 线路上的人能看得一清二楚；而且源站若强制 HTTPS 跳转会造成无限重定向循环。**只当临时过渡用**。
- **Full**：回源走 HTTPS，但不验证证书（自签证书也能过）
- **Full (strict)**：回源 HTTPS 且验证证书，是**唯一推荐的生产模式**

建议部署 Cloudflare 免费签发的 Origin CA 证书（15 年有效期）后切换到 Full (strict)。

### 步骤 6：隐藏源站 IP 的真正三步

光开橙色云不够，IP 还是可能从别处漏出去。按这三步做才算藏住：

1. **所有 Web 相关的 A / AAAA / CNAME 记录保持橙色云代理**
2. **不要开灰色云的同 IP 子域名**（如 mail、direct），源站 IP 的历史 DNS 记录也可能泄露（SecurityTrails 这类网站能查到）
3. **源站防火墙只放行 Cloudflare 官方回源 IP 段**，其余 80/443 入站一律拒绝——官方 IP 段列表：

![Cloudflare 官方回源 IP 段列表](img/2026-10-17-免费CDN/step4.png)

官方页面 https://www.cloudflare.com/ips/ 列出了全部 15 个 IPv4 段 + 7 个 IPv6 段（如 173.245.48.0/20、103.21.244.0/22）。把防火墙白名单配好，攻击者就算知道你的源站 IP 也连不进来。

## 注意事项、费用、坑点

- **费用：$0**。Pro $20/月（年付）/ $25/月（月付），Business $200/$250——免费版做官网 / 小电商足够，升级点在完整 WAF 规则集、图片优化、SLA
- **Page Rules 数量**：免费版 legacy Page Rules 只有 **3 条**；新的规则引擎免费配额更宽（Dynamic Redirects / Cache Rules / Origin Rules / Config Rules 各 **10 条**），新手直接用新 Cache Rules 做缓存配置
- **前科核查（如实说）**：
  1. Cloudflare 服务条款禁止用免费 CDN 做"视频流或图片 / 音频 / 大文件占不成比例的非 HTML 内容分发"，历史上真实封停过多家视频站 / 图床。正常官网 / 博客 / 小电商流量不受影响，但**别拿它当免费视频 CDN 或网盘**
  2. China Network 是 Enterprise 订阅的独立服务，且**每个域名必须先有有效 ICP 备案**——免费版在大陆境内没有节点，对国内访客加速效果有限；你的站点面向海外客户则没问题
- **未验证提示**：官网注册页写 "no credit card required"，但历史上部分区域有风控要求绑卡验证的个案，以读者实际注册页为准；免费版"合理流量"无官方数字上限（无限带宽是定价页原话），只有"别做视频 / 大文件分发"的条款红线，不要写具体 TB 数；NS 生效官方只承诺最长 24 小时，写"通常几分钟到 1 小时，最长 24 小时"较稳妥

## 来源

官方（2026-10-17 实际打开验证）：

- https://www.cloudflare.com/plans/（免费版 $0 包含功能）
- https://developers.cloudflare.com/fundamentals/manage-domains/add-site/（官方接入四步，2026-05-05 更新）
- https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/（SSL 模式定义）
- https://www.cloudflare.com/ips/（官方回源 IP 段列表）
- https://developers.cloudflare.com/china-network/（China Network 需 Enterprise + ICP）

实测教程（2025–2026 近期）：

- https://cn.hostease.com/blog/tutorials/cloudflare-origin-certificate-setup/（2026-10 中文实测：Origin CA 免费证书 + Full Strict + 防火墙白名单全流程）
- https://hamy.xyz/blog/2025-01_hide-server-ip-address-cloudflare（2025-01 英文实测：橙色云隐藏 IP 三步法）
- https://www.youtube.com/watch?v=pN6zc5iuIAM（YouTube 3 分钟隐藏源站 IP 教程）
- https://blog.cloudflare.com/dynamic-redirect-rules/（官方博客：免费版规则配额）
- https://torrentfreak.com/cloudflare-suspends-streaming-sites-and-file-hosters-but-not-over-piracy/（"前科"：非 HTML 内容封停实证）
