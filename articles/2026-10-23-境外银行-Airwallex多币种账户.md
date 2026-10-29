# 不出国也有美元/英镑/欧元本地账户：Airwallex 空中云汇企业多币种账户远程开户实录

> 一句话导读：Airwallex（空中云汇）让公司在家就能开出美、英、欧、港、澳等地的"本地收款账户"——美国客户用 ACH 转美元、英国客户用 Faster Payments 转英镑、欧洲客户用 SEPA 转欧元，全部走本地通道，免掉 SWIFT 中转费。开户 0 元、基础版 0 月费，全程在线申请 1–3 个工作日获批。但它只做企业客户，不接受个人开户；审核是合规制，材料对不齐会被卡。

## 先说结论：2026 年还能办吗？

能。Airwallex 中国官网（airwallex.com.cn）2026-10-23 当天的定价页写得明明白白：**Explore 基础版 0 元、无开户费**，全球收款账户支持 20+ 币种的收取和管理。但三个硬性门槛先泼冷水：

1. **必须是企业**：官方 FAQ 原话——"Airwallex 目前仅适用于企业客户，暂未提供个人账户服务"。没有公司主体就别试了。
2. **是合规开户，不是注册即用**：要过 KYC/KYB 审核，营业执照、法人/股东证件、业务证明一样不能少。
3. **它不是银行**：Airwallex 是各司法管辖区持牌的金融科技平台（电子货币机构），没有传统银行的存款保险。把全部营运资金放在一家平台的做法，评论区差评已经给出教训（见下文坑点）。

## 前置条件（动手前备好这 5 样）

1. **一家公司**：中国大陆、香港、新加坡等地注册的公司都行（不同注册主体能用的功能和币种略有差异，下单前以官网为准）。
2. **公司注册文件**：营业执照 / 公司注册证书（香港主体还要商业登记证 BR + 组织章程 M&A）。
3. **董事及实益拥有人（UBO）的证件**：护照或身份证 + 近 3 个月内的地址证明（水电账单、银行账单等）。
4. **业务证明**：公司官网、销售合同或发票——证明你是真实经营，不是空壳。审核时这一步卡住的人最多。
5. **一个企业邮箱**：注册建议用公司域名的企业邮箱，官方和多家评测都提到，个人邮箱注册容易触发人工合规复核。

费用：**开户费 0 元，Explore 基础版 0 月费**。进阶版另有订阅费（中国大陆：Grow 版暂未开放，Accelerate 版每月 ¥2,499 起；海外地区如澳洲是 A$29/月起或满足存款条件免月费）。换汇走银行间汇率，主流币种加 0.5%、其他币种加 1%。

## 步骤一：先去官网确认定价与方案

动手前先打开 Airwallex 中国官网定价页（airwallex.com.cn/pricing），亲眼确认免费版的存在，别听中介忽悠你买高价套餐：

![Airwallex 中国官网定价页：Explore 基础版 0 元免费](img/2026-10-23-airwallex/step1.png)

看懂三件事就行：

1. **Explore 基础版 = 免费**：包含全球企业账户、20+ 币种收管、批量转账至 120+ 国家/地区、银行间汇率换汇、每月 5 个免费支出管理用户、不限量发 Visa 企业卡。对刚起步的跨境团队完全够用。
2. **中国大陆主体的功能边界**：页面脚注写着，全球支出管理、全球收单、Yield 收益等服务"仅针对非中国主体客户适用"——收单和理财用不了的话，别对这部分抱期望。
3. **单笔交易费另计**：月费免费不等于全免费，换汇、SWIFT 汇款、超额发卡用户等按笔收费，具体看官网费用清单。

## 步骤二：官网在线注册，上传企业材料

去 Airwallex 官网（选你公司注册地对应的站点）点"立即注册"，整个流程 100% 在线，不用跑网点：

![Airwallex 开户页：输入企业邮箱即可在线开始申请](img/2026-10-23-airwallex/step2.png)

四步走完，官方说法是申请本身只要约 5 分钟：

1. **注册**：填企业邮箱、设密码、验证邮箱，顺手开双重验证（2FA）。
2. **填公司信息**：法定名称、注册号、经营地址、行业分类、预计月交易量——**公司信息、证件、注册记录三处名字必须一字不差**，这是被驳回的头号原因。
3. **上传 KYC/KYB 材料**：公司注册文件、董事和 UBO 的证件与地址证明、业务证明（官网/合同/发票）。文件支持 PDF/JPEG/PNG，单份 10MB 以内，拍清楚再传，模糊件是被 RFI（补件要求）的常见理由。
4. **等审核**：官方口径 1–3 个工作日（香港实体宣传最快 48 小时）。期间可能会收到补件邮件，尽快回，别拖。

> 坑点提醒：网上有一堆"出售已验证 Airwallex 账户"的帖子（Slideshare、HackMD、各种论坛灌水），**千万别买**。买来的账户原持有人能找回，资金随时被冻结，还涉嫌洗钱合规问题。合规的唯一通道是自己公司去官网申请。

## 步骤三：开通全球收款账户，拿下本地收款账户信息

审核通过后，在后台 Wallet > Global Accounts 里创建 Global Account，选国家和币种，拿到的是**带本地银行信息的收款账户**——客户像给本地公司打款一样付给你。官方开发者文档的覆盖表长这样：

![Airwallex 官方文档：Global Accounts 支持的地区、币种与本地清算网络](img/2026-10-23-airwallex/step3.png)

核心覆盖（文档更新于 2025-08-15，申请时以官网最新为准）：

- **美国 USD**：ACH routing number + Fedwire routing number + SWIFT，支持 ACH / Fedwire / FedNow / RTP 本地通道。
- **英国 GBP**：account number + sort code + IBAN，走 Faster Payments / BACS / CHAPS。
- **欧洲 EUR（SEPA）**：爱沙尼亚、德国、荷兰、丹麦提供 EUR 的 SEPA / SEPA Instant 账户（荷兰对中港主体客户不可用，申请前先确认你的主体能开哪个）。
- **香港**：CNY/HKD 走 ACH / RTGS / FPS，EUR/USD 走 RTGS；还支持 EUR、AUD、GBP、JPY 等多币种。
- **其他**：澳洲 AUD、新加坡 SGD（FAST/GIRO/MEPS）、加拿大 CAD（EFT/Interac）、日本 JPY、新西兰 NZD、印尼 IDR、墨西哥 MXN（SPEI）、以色列 ILS、波兰 PLN、阿联酋 AED、马来西亚 MYR。
- **SWIFT 兜底**：美、英、港、星、丹麦等地账户还支持 SWIFT 收款，覆盖 22 个币种（AUD、USD、EUR、GBP、CNY、HKD 等）。

到账的钱进多币种钱包，可以原币持有（比如收了美元就留着付美元供应商），也可以按银行间汇率换汇。官方称约 93% 的本地通道付款当日到账。

## 费用、注意事项、坑点汇总

| 项目 | 情况 |
|---|---|
| 开户费 | 0 元 |
| 月费 | Explore 基础版 0 元；中国大陆 Accelerate ¥2,499/月起（Grow 暂未开放） |
| 换汇 | 银行间汇率 +0.5%（主流币种：USD/HKD/CNY/AUD/EUR/GBP/CAD/SGD/CHF/NZD/JPY），其他币种 +1% |
| 本地通道转账 | 120+ 国家/地区 $0 转账费；SWIFT 付款到 200+ 国家（按笔收费） |
| 币种 | 20+ 币种收管；70+ 国家/地区本地收款 |
| 开户材料 | 营业执照/注册证书、董事+UBO 证件与地址证明、业务证明（官网/合同/发票）、企业邮箱 |
| 审核时效 | 1–3 个工作日（香港最快 48 小时）；材料不清会被要求补件 |
| 个人开户 | ❌ 不支持，仅企业客户 |
| 地址证明 | 需要（董事/UBO 近 3 个月地址证明） |
| 风险 | Trustpilot 2.8–2.9/5（2500+ 条评论，2026 年 9–10 月数据）：低分集中在合规审查冻结账户/资金、到账延迟、客服回复慢；**不是银行、无存款保险**，别把全部营运资金放在一家 |
| 适用场景 | 跨境电商收款、SaaS 出海订阅、独立站多币种结算、给海外供应商/员工付款 |

最大的一句忠告来自一堆一星评论的共性：**开户容易保户难**。第一笔大额收款进来之前，先把合同、发票、资金来源证明备齐；公司资料在注册处、证件、平台后台三处保持一致。风控触发时客服是邮件制、回复慢，Accelerate 版才有专属客户经理——所以别把唯一的收款命脉押在这一家，Wise / 万里汇做个备份，睡得着觉。


相关阅读：[中文账单变英文地址证明的 4 条链路](https://jianyunyi.gv.uy/posts/2026-10-23-境外开户地址证明实战.html)

## 来源

- Airwallex 中国官网定价页（2026-10-23 实测，Explore 基础版免费、Accelerate ¥2,499/月起、功能脚注）：https://www.airwallex.com.cn/pricing
- Airwallex 官方开发者文档《Supported regions and currencies》（Global Accounts 覆盖国家/币种/本地清算网络，更新于 2025-08-15）：https://www.airwallex.com/docs/accounts/supported-regions-and-currencies
- Airwallex 官方帮助中心《How to Create a Global Account for Multiple Currencies》（后台创建流程）：https://help.airwallex.com/hc/en-gb/articles/900001756146-How-to-Create-a-Global-Account-for-Multiple-Currencies
- Airwallex 香港开户页（所需文件清单、5 分钟申请、最快 48 小时获批）：https://www.airwallex.com/en-hk/business-account
- Airwallex 官方博客《How to Create and Set Up an Airwallex Account in 4 Steps》（4 步开户流程、文件格式要求）：https://www.airwallex.com/en-us/blog/how-to-create-and-set-up-an-airwallex-account
- Airwallex 香港官方博客（"仅适用于企业客户，暂未提供个人账户服务"；开户材料：公司注册证明书、商业登记证、授权代理人身份证件）：https://www.airwallex.com/zh-hk/blog/cross-border-payment-and-remittance-guide-wholesale
- Airwallex 官方《Airwallex 和 WorldFirst 怎么选》（全球收款账户免开户费免管理费、20+ 币种、70+ 国家地区本地收款）：https://www.airwallex.com/cn/blog/comparison-worldfirst-vs-airwallex
- Statrys《9 Key Things to Know Before Opening an Airwallex Account [2026]》（开户 1–3 天、Trustpilot 2.9/5、合规冻结是主要差评原因、应对清单）：https://statrys.com/blog/open-airwallex-account
- BusinessExpert《Airwallex Review: Is It Cheap for Money Transfers?》（2026-10 数据：Trustpilot 2.8/5、差评集中在合规冻结）：https://www.businessexpert.co.uk/money-transfer/airwallex-money-transfer-review/
- Trustpilot Airwallex 评论页（冻结案例实录）：https://www.trustpilot.com/review/airwallex.com

*（播客说明：另搜了一轮中文出海/跨境/独立开发播客（小宇宙、Apple Podcasts、Spotify），未找到与 Airwallex 开户直接相关的单集，故不引用。）*
