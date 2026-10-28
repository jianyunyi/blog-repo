# Google Cloud 永久免费机 e2-micro：1 核 1G，开对地方才真免费

**一句话导读：** Google Cloud 有一台真正长期免费的虚拟机：e2-micro，每月 1 台、30GB 磁盘、1GB 出站流量。免费的三个硬条件是机型、区域、磁盘都踩对——开到法兰克福或新加坡，它长得一模一样，但按原价收费。

## 前置条件

- 一个 Google 账号，能注册 Google Cloud（$300 试用是另一回事，见第 1 步，别和永久免费档混淆）
- 接受这台机的定位：轻量应用、定时任务、学习练手，不是跑重服务的机器
- 记住三个免费区域：美国俄勒冈（us-west1）、爱荷华（us-central1）、南卡罗来纳（us-east1）

## 分步骤

### 第 1 步：分清两笔账——$300 试用 90 天，e2-micro 永久免费

![Google Cloud 免费功能官方文档](img/2026-10-28-gcp-e2micro/step1.png)

Google Cloud 官方免费功能文档写明 Compute Engine 的免费额度：每月 1 台非抢占式 e2-micro，限美国三个区域（俄勒冈 us-west1、爱荷华 us-central1、南卡罗来纳 us-east1），30GB-月标准持久磁盘，每月从北美向除中国和澳大利亚外的所有区域目的地出站 1GB。GPU 和 TPU 不在免费范围内，加了就收费。新账号另有 $300/90 天的试用赠金，那是会过期的体验金；e2-micro 的免费额度是每月重置、长期有效的，两者别混成一笔账。

### 第 2 步：按免费配置开一台——区域、机型、磁盘三处对勾

![GCP 免费机器控制台开通过程（第三方 2026 指南）](img/2026-10-28-gcp-e2micro/step2.png)

按第三方 2026 指南的控制台流程：进 console.cloud.google.com，新建或选一个项目，启用 Compute Engine API，到 VM Instances 点 Create Instance。名字随便起；区域必须选三个免费区域之一（指南用 us-central1-a 做例子）；机型选 e2-micro（控制台会显示 Free tier 标识）；启动磁盘选 Debian/Ubuntu、标准持久磁盘、不超过 30GB；需要对外提供网页服务就勾 Allow HTTP traffic。建之前看右侧月度估算：三项都对的话估算应为 $0，再点 Create。

### 第 3 步：避开两个最常见的收费坑——按小时计费、跨区域不累计

![GCP 免费档 e2-micro 详解：按时间而非按台计费](img/2026-10-28-gcp-e2micro/step3.png)

第三方详解点出的两个误读最值得背下来：第一，免费额度是按时间算、不是按台算——每月所有符合条件的 e2-micro 用量加起来，免费到当月总小时数为止；两台同时跑满一个月，大约一半用量要收费。第二，只有三个美国区域算免费——在其他区域开 e2-micro，外观一模一样，照常收费，这是最常见的账单惊吓来源。另外注意：免费额度不跨月结转，Windows 镜像和 Marketplace 镜像不在免费范围内（第三方指南口径）。

## 注意事项、费用、坑点

- **费用：** 额度内 $0；超出的部分按正常价收费，没有自动断费开关——所以一定要开账单预算提醒（Billing budgets/alerts），别等账单来了才发现。
- **性能边界：** e2-micro 是 2 个共享 vCPU、1GB 内存的突发机型。第三方横评提醒：1GB 内存是真瓶颈，跑个空载的小服务可以，加几个人和插件就可能开始交换内存甚至崩溃——别拿它当游戏服或重应用主机。
- **流量边界：** 免费出站流量每月只有 1GB（北美出发，不含中国和澳大利亚目的地），做图床、下载站、大流量站会立刻超标；轻量 API、机器人、定时任务才合适。
- **和甲骨文的区别：** 甲骨文 A1 是 2 核 12GB 但要蹲容量（本站 2026-10-20 开机实录），GCP e2-micro 是 1 核 1GB 但不用蹲、随时能开——要性能蹲甲骨文，要稳妥开 GCP，别拿两者的优点拼成一台不存在的机器。
- **免费额度会变：** 官方文档注明免费额度"不设到期日，但可能变更"，动手前以 docs.cloud.google.com/free/docs/free-cloud-features 当前版本为准。

## 来源

- Google Cloud 免费功能官方文档：https://docs.cloud.google.com/free/docs/free-cloud-features
- GCP 免费机器控制台开通过程（第三方 2026 指南）：https://copyprogramming.com/howto/setup-free-compute-on-gcp-code-example
- GCP 免费档 e2-micro 详解：https://yangworks.dev/guides/google-cloud-free-tier-e2-micro

（播客素材：本轮检索中文出海/独立开发播客，未找到与本主题直接相关的单集，故未引用，不编造。）
