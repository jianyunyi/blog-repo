# 甲骨文免费云 2 核 12G 开机实录：Always Free A1 全流程（2026-10-20）

> 一句话导读：2026 年 6 月额度减半后，甲骨文免费云现在是 2 核 CPU + 12GB 内存 + 200GB 硬盘 + 10TB 流量，永久免费。这篇把注册到 SSH 登录的每一步、以及"无容量"这个最大坑的解法一次讲清。

## 前置条件

- 一个邮箱（建议 Gmail/Outlook，注册验证用）
- 一张**真实信用卡**（只做身份验证，$1–2 美元预授权，几天后撤销；不升级就不会扣费。虚拟卡/预付卡会被拒）
- 一个手机号（短信验证）
- SSH 客户端（macOS/Linux 自带终端，Windows 用 PowerShell 或 PuTTY）
- 耐心：A1 免费池经常"无容量"，这篇第四步专门讲蹲机技巧。

## 分步骤

### 第一步：注册免费账号，home region 一选定终身

打开 [oracle.com/cloud/free](https://www.oracle.com/cloud/free/) 点 **Start for free**。填邮箱 → 验证 → 姓名地址**必须和信用卡账单完全一致** → 选 **home region** → 绑卡 → 手机短信验证。

![Oracle Cloud 免费页：Start for free 注册入口](img/2026-10-20-Oracle-A1/step1.png)

**home region 选哪个，一辈子就是哪个**，免费 A1 只能在家乡区域开。美国区里 Ashburn（美东）、Phoenix（美西）容量相对多；人少的小区域反而可能更容易抢到。注册全程**不要挂代理/VPN**，IP 和资料对不上是被拒第一大原因。

### 第二步：创建实例——认准 Ampere A1.Flex，拉到 2 核 12G

登录控制台：左上角汉堡菜单 → **Compute → Instances → Create instance**。官方文档把创建流程拆得很细，对着走就行：

![Oracle 官方文档 Creating an Instance：选 Ampere 形状一节](img/2026-10-20-Oracle-A1/step2.png)

关键几项这样填：

1. **Image**：选 Canonical Ubuntu（ARM 版），认准带 "Always Free-eligible" 标签的镜像。
2. **Shape**：点 Change shape → 选 **Ampere** → **VM.Standard.A1.Flex**，把滑杆拉到 **2 OCPU / 12 GB**——这就是 2026 年 6 月之后的新免费上限（原来是 4 核 24G，已经减半）。想开两台小鸡就拆成 1C6G + 1C6G。
3. **Networking**：用默认 VCN，勾选 **Assign a public IPv4 address**（不然连不上）。
4. **SSH keys**：粘贴自己的公钥，或让 Oracle 生成一对并**下载好私钥**（控制台之后找不回来）。
5. **Boot volume**：默认 47–50GB 就行，计入 200GB 免费硬盘池。
6. 点 **Create**，1–3 分钟后状态变 Running。

### 第三步：SSH 登录 + 开防火墙（两处都要开）

```bash
ssh -i ~/.ssh/你的私钥 ubuntu@你的公网IP
uname -m   # 显示 aarch64 说明是 ARM，没错
```

连上之后先把防火墙打开——甲骨文默认**两处都封**：控制台的安全列表（Security Lists）和系统自带的 iptables。控制台去 Networking → VCN → Security Lists 加 Ingress 规则（80/443 等）；系统里：

```bash
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

只开一处，服务照样连不上，这是新手翻车重灾区。

![2026 年最新免费额度详解：2 OCPU/12GB 与其他免费 VPS 横向对比](img/2026-10-20-Oracle-A1/step3.png)

上图这份 2026 年 10 月更新的额度详解值得存：A1 的 12GB 内存是 GCP 免费 e2-micro（1GB）的 12 倍，10TB/月流量更是断层领先——这也是全网都在蹲它的原因。

## 注意事项、费用、坑点

- **"Out of host capacity" 是常态不是拒信**：A1 免费池被抢空时就会报这个错。解法：换一个 Availability Domain 试、凌晨/整点去刷、先开 1C6G 占坑再说。免费工具/脚本定时刷是常规操作。
- **额度红线**：免费账号 A1 总量就是 2 OCPU + 12GB（1500 OCPU-hours + 9000 GB-hours/月）。超了的老实例在 2026 年 6 月那波已经被关停，别想着 4C24G。
- **别手滑升级**：控制台里凡是带 "Always Free" 标签的才免费，点成按量付费的形状，账单会按 $0.01/OCPU-hour、$0.0015/GB-hour 计费（跑满约 $27/月）。
- **注册被拒自查**：资料与卡账单不一致、用虚拟卡、挂代理注册、短时间内反复提交——占了任何一条都容易被风控。真实信息 + 真实 IP + 一次过。
- **能拿它干嘛**：跑 Docker 应用、搭个人博客/导航站、自建 VPN、跑定时脚本、挂小型 AI 推理——12G 内存塞个量化小模型都够。


相关阅读：[免费 VPS 横评](https://jianyunyi.gv.uy/posts/2026-10-17-免费vps横评.html)

## 来源

- Oracle 免费注册页（注册流程、绑卡说明）：https://www.oracle.com/cloud/free/
- Oracle 官方文档 Creating an Instance（选 Ampere 形状、SSH 密钥）：https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/launchinginstance.htm
- 2026 年最新额度详解（2C12G 减半、与其他免费 VPS 对比表、防火墙两处开）：https://toolfreebie.com/oracle-free-arm-vps/
