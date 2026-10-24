# 免费出海策略（2）：Cloudflare Tunnel——没公网 IP，也能把本地服务变成 https

> 一句话导读：家里电脑或便宜 VPS 上跑的网站/机器人后台，没有公网 IP、不能开防火墙端口，照样能变成 `https://xxx.你的域名.com` 公开访问。Cloudflare Tunnel 免费、自动上 HTTPS，还能给敏感后台加一道邮箱登录墙。

## 前置条件（需要什么）

- 一个 Cloudflare 免费账号
- 一个域名，且 DNS 已经托管在 Cloudflare（把域名的 NS 切到 Cloudflare 即可，免费）
- 本地/服务器上能装 `cloudflared`（Linux/macOS/Windows/Docker 都行）
- 本地已经有一个跑起来的服务（比如 `localhost:3000` 的网站、Flowise 的 `:3000` 面板）

## 分步骤

### 步骤 1：在 Zero Trust 面板创建一个 Tunnel

登录 Cloudflare 后进 **Zero Trust**（one.dash.cloudflare.com）→ 左侧 **Networks → Tunnels** → **Create a tunnel** → 连接器选 **Cloudflared** → 起个名字（比如 `homelab`）→ 保存。面板会给你一串 **token**（很长的 base64 字符串），复制好，它只显示一次，丢了就重新生成。官方文档把全流程压缩在 5 分钟内。

![Cloudflare 官方文档：创建第一个 Tunnel](img/2026-10-19-出海策略-Tunnel/step1.png)

### 步骤 2：在服务器上装 cloudflared，用 token 跑起来

按你机器的系统二选一（任选一条路）：

```bash
# 路线 A：Debian/Ubuntu 直接装
curl -L https://pkg.cloudflare.com/install.sh | sudo bash
sudo apt install cloudflared
sudo cloudflared service install <上一步复制的TOKEN>
# 注册成系统服务，开机自启、崩了自动重启

# 路线 B：Docker 一条命令（已有 Docker 的直接用）
docker run -d --name cf-tunnel --restart unless-stopped \
  cloudflare/cloudflared:latest \
  tunnel --no-autoupdate run --token <上一步复制的TOKEN>
```

回到 Zero Trust 面板，Tunnel 状态变绿 **Healthy** 就是通了。原理：cloudflared 从你的机器**向外**连 Cloudflare 边缘，不需要你开任何入站端口，防火墙保持关闭也行。

![Docker 部署 Cloudflare Tunnel 分步教程](img/2026-10-19-出海策略-Tunnel/step2.png)

### 步骤 3：配一个公网域名指向本地服务

回到 Tunnel 页面 → **Public Hostname** 标签 → **Add a public hostname**，按表填：

| 字段 | 填什么（示例） |
|---|---|
| Subdomain | `bot` |
| Domain | `你的域名.com` |
| Service Type | HTTP |
| URL | `localhost:3000` |

保存后 Cloudflare 自动建一条 DNS CNAME（`bot.你的域名.com → <tunnel-id>.cfargotunnel.com`）。浏览器打开 `https://bot.你的域名.com`，证书是 Cloudflare 边缘自动发的，你本地完全不用配 TLS。

一个 Tunnel 可以挂多个域名/多个本地端口：再加一条 Public Hostname 就行，比如 `api.你的域名.com → localhost:8080`。

![2026 年实测：localhost 挂域名全流程](img/2026-10-19-出海策略-Tunnel/step3.png)

### 步骤 4（可选）：临时分享 & 给后台加登录墙

- **临时分享**：不想建正式 Tunnel 时，命令行跑 `cloudflared tunnel --url localhost:3000`，会给你一个 `xxx.trycloudflare.com` 的临时公网地址，不用账号、发给朋友看 demo 神器，关掉即失效。
- **登录墙**：管理后台不想被全网扫描？Zero Trust → **Access → Applications → Add an application → Self-hosted**，域名填你的后台域名，策略设 **Allow + 按邮箱放行**（默认的邮箱一次性验证码就能用，也可接 Google/GitHub 登录），免费版支持 50 个用户。

## 注意事项、费用、坑点

- **费用**：Tunnel 本身 0 元（含在 Cloudflare Zero Trust 免费计划里）；花钱的只有域名（约 $10/年，is-a.dev 这类免费子域名也行）。
- **和 10-17 Cloudflare CDN 篇的关系**：那篇是给"已有公网服务器"加速藏 IP；这篇是给"没有公网 IP 的机器"开公网入口。两篇叠加：家里小主机 → Tunnel → Cloudflare 边缘 → 全球访问，又免费又抗打。
- **别当生产主力**：家用宽带的上行和稳定性撑不起高并发、也保证不了 99.99% 在线；跑正式业务还是上正经云服务器。
- **安全红线**：Tunnel 让内网服务一键公网化，千万别把数据库管理后台、Flowise 管理员面板裸奔上网——要么只映射前端，要么加上面的 Access 登录墙。
- **前科检查**：Cloudflare Tunnel（前身 Argo Tunnel）2018 年上线至今一直是免费层功能，无批量收费/下线前科，是 Cloudflare 获客的基本盘，稳定性可信。

## 来源

- Cloudflare 官方文档（5 分钟建第一个 Tunnel）：https://developers.cloudflare.com/tunnel/get-started/
- Docker 部署分步教程：https://selfhosting.sh/apps/cloudflare-tunnel/
- 2026 年实测指南（含 Access 登录墙 50 用户免费）：https://dev.to/recca0120/cloudflare-tunnel-in-2026-expose-localhost-without-opening-ports-or-buying-an-ip-32l5
- 无端口转发暴露本地服务教程：https://dev.to/mrviduus/how-to-expose-your-local-server-to-the-internet-without-port-forwarding-3f3h
- 极简 CLI 建 Tunnel 指南：https://gist.github.com/Chaphasilor/01736f965cbf9bcb59d37a0eb293b624
