# 免费域名再升级：DigitalPlat 一家就有 4 个后缀能托管 Cloudflare（附注册到接入全流程）

**一句话导读**：能托管到 Cloudflare 的免费域名为什么这么难找？因为要同时过两关：后缀必须在 Public Suffix List（PSL）上、且能在你注册的这一级名字上改 NS。

![免费域名再升级：DigitalPlat 一家就有 4 个后缀能托管 Cloudflare（附注册到接入全流程）](img/2026-10-21-免费域名-DigitalPlat四后缀/pic1.png)

能托管到 Cloudflare 的免费域名为什么这么难找？因为要同时过两关：后缀必须在 Public Suffix List（PSL）上、且能在你注册的这一级名字上改 NS。市面上绝大多数“免费域名”只过得了其中一关。好消息是，有一家非营利组织 DigitalPlat，一口气运营了 5 个免费命名空间，其中 4 个两关全过——注册、改 NS、接 Cloudflare 一条龙。这篇把判据、注册流程、接入步骤和坑一次说清。

## 一、先说清判据：为什么大多数免费域名接不了 CF

Cloudflare 免费版添加网站时，只收两种名字：① 你拥有、能改 NS 的完整域名；② PSL 上某个后缀的一级子域名（比如 xxx.dpdns.org），且你能在这一级把 NS 改成 Cloudflare 的。只给加 A / CNAME 记录、不能改 NS 的服务——DuckDNS、devs.li、lovie.me 这类——再免费也接不进 CF。已经倒下的 Freenom（.tk / .ml / .ga / .cf）更不用提，别再碰。所以找免费域名，先查 PSL、再问能不能改 NS，两样缺一不可。

## 二、DigitalPlat 是谁，5 个后缀先分清

DigitalPlat Domain 是一家非营利组织（由 The Hack Foundation 财政赞助），专门维护免费公共命名空间，主页明说可以“自带 DNS、CDN 或主机商（例如 Cloudflare）”。它家现在有 5 个免费后缀（2026-10-21 对照 PSL 官方列表实核）：
🔹 **dpdns.org** ✅ 在 PSL 上，可托管 CF——最老牌的一个；
🔹 **us.kg** ✅ 在 PSL 上，可托管 CF——教程最多，但见下方风控提醒；
🔹 **xx.kg** ✅ 在 PSL 上，可托管 CF；
🔹 **qzz.io** ✅ 在 PSL 上，可托管 CF——相对新、相对干净，dev.to 上有实测接通 CF 的记录；
🔹 **qd.je** ❌ 不在 PSL 上——能注册、能自己管 DNS，但**接不了 Cloudflare**，冲着 CF 去的别选它。

## 三、注册流程（约 5 分钟）

1）打开 DigitalPlat 域名后台 **dash.domain.digitalplat.org**，用邮箱注册账号并完成验证；
2）选命名空间：在上面 4 个可托管 CF 的后缀里挑一个；
3）输入想要的名字，提交注册；部分情况会走一道审核 / 邮件确认，耐心等通过；
4）注册成功后，这个名字就是你的了，可以改 NS、也可以先用它自带的 DNS 管理。

⚠️ 每个账号的免费域名有数量上限（配额），不是无限注册。先把真正想用的名字想好再提交，别连试几个废名把配额占光。

## 四、接入 Cloudflare：三步

1）Cloudflare 后台点 **Add a website**，填你的完整域名（例如 xxx.qzz.io），选 Free 计划，记下它分配给你的 **2 个 nameserver**；
2）回 DigitalPlat 后台，把这个域名的 NS 改成 Cloudflare 给的那两个；
3）等 Cloudflare 那边状态变成 **Active**（通常几分钟到几小时）。之后 DNS 记录全在 CF 里管，还能绑 Workers / Pages / Tunnel，等于白捡一整套 CF 生态。

## 五、四个后缀怎么选

🔹 想要**稳妥老牌**：dpdns.org，用的人多、活得久；
🔹 想要**教程多、出问题好搜**：us.kg，但它在国内圈子被滥用得比较多，个别平台可能对整个 us.kg 空间有风控，介意就避开；
🔹 想要**干净低调**：qzz.io，目前口碑最好的一档；
🔹 xx.kg 当备用即可。四个都免费，建议先注一个 qzz.io 或 dpdns.org 的主名，其余按需再说。

## 六、避坑与风险（免费域名的通病）

🔹 **命在运营方手里**：免费命名空间的规则、配额、存续都由运营方决定，历史上 Freenom 一夜清零就是先例。重要业务、主邮箱别往上放，适合做项目站、测试站、博客镜像；
🔹 **别碰滥用红线**：DigitalPlat 有自动滥用检测，钓鱼、诈骗、垃圾站会被直接回收域名甚至封号；
🔹 **名字先到先得**：好名字靠抢，注册前多备两三个候选；
🔹 **接入后记得续管**：NS 改到 CF 后，DigitalPlat 那边只保留注册关系，别在两边同时改 DNS 记录，容易自己绕晕。

总结一句：免费 + 能托管 Cloudflare 的组合本来近乎绝迹，DigitalPlat 这 4 个后缀是目前最成体系的一条路。注册 5 分钟、接入 3 步，先拿一个练手，再决定要不要往上放正经项目。

资料来源：DigitalPlat 官网（nic.us.kg）、Public Suffix List 官方列表（2026-10-21 实核）、51sec 的 us.kg 接入教程、dev.to 的 qzz.io 实测记录。

说明：dpdns.org 我们自己正在实际使用；us.kg / xx.kg / qzz.io 的完整注册→接入流程按官方文档与第三方实测整理，未逐一亲测，细节以官网为准。
