/**
 * Category landing page content (P1 SEO).
 *
 * One intro (300–500 chars) + 3–4 FAQs per category. Every claim is
 * grounded in a real article of that category — the FAQ answers name
 * the source article so the claim can be checked. Counts and article
 * lists are NOT stored here: the page computes them live from
 * data/articles.json (lib/site-content.ts), so nothing here can go
 * stale when new articles land.
 */

export interface CategoryPageFaq {
  q: string;
  a: string;
}

export interface CategoryPageContent {
  /** intro paragraphs (joined with blank lines when rendered) */
  intro: string[];
  faq: CategoryPageFaq[];
}

export const CATEGORY_PAGES: Record<string, CategoryPageContent> = {
  'domain-email': {
    intro: [
      '出海第一步是先有个能收信、能建站的域名，再配一个以自己域名结尾的邮箱。这个分类收了 25 篇实测：免费域名怎么领、免费邮箱怎么挂、域名邮箱转发怎么做。免费域名这条线，2026 年 10 月还活着的主要是 eu.org、pp.ua、DuckDNS、dpdns.org、is-a.dev、afraid.org、DigitalPlat、HapDNS、pu.gy、lovie.me、devs.li 这一批——每一家我们都写了申请实录：eu.org 免费但审核看运气，短则 8 小时、长则一两年；pp.ua 0 元但要绑卡绑手机，同一手机号 30 天内最多 3 个；DuckDNS 适合家里 IP 会变的动态场景；dpdns.org 配 Cloudflare Pages 能零成本上线，但要记住你不拥有这个名字，没有转出码。Freenom 已经死了，别再看旧教程。',
      '域名邮箱这条线，Zoho Mail 一个域名能开 5 个用户、每人 5GB，是真正的免费真邮箱；Proton Mail、Tuta 是加密邮箱路线；不想管邮箱服务器的，用 Cloudflare Email Routing、ImprovMX、Forward Email 做转发，support@你的域名.com 5 分钟就能收信。先想清楚用途再选：公开建站选固定子域名，家里服务远程访问选 DuckDNS，正式收款业务别把命押在任何一家免费域名上。',
    ],
    faq: [
      {
        q: 'eu.org 现在还能免费申请吗？',
        a: '能，但它是审核制，官网不承诺时限；社区反馈短则 8 小时、长则一两年，急着用的别等它。申请前必须先配好 NS 记录，官方建议优先选开放三级域。详见《出海贸易 | 免费域名全攻略：eu.org 这些免费域名到底怎么玩》。',
      },
      {
        q: 'pp.ua 免费续费有什么条件？',
        a: '0 元续费，但要在到期前 4 个月内操作并重新激活；注册要绑卡（验证用，不扣费）和手机号（收激活码），同一手机号 30 天内最多 3 个域名；WHOIS 强制公开。详见《免费域名还没死：乌克兰 pp.ua 申请实录，0 元拿下、还能年年免费续》。',
      },
      {
        q: 'DuckDNS 和 is-a.dev 有什么区别？',
        a: 'DuckDNS 是动态域名，适合家里 IP 会变的场景；is-a.dev 是固定子域名，适合公开建站。一个 GitHub PR 就能领 .is-a.dev 子域名，全程 0 元，但商业站会被拒。详见《DuckDNS 免费子域名》和《免费域名：is-a.dev 图文教程》。',
      },
      {
        q: '免费域名能用来收发邮件吗？',
        a: '能，但要分开看：域名本身只解决名字，邮箱要另配。Zoho Mail 一个域名 5 个用户、每人 5GB；或者用 Cloudflare Email Routing、ImprovMX 做转发。详见《Zoho Mail 免费域名邮箱全攻略》。',
      },
    ],
  },
  'vps-server': {
    intro: [
      '服务器和建站托管是出海的第二步，这个分类 31 篇，讲的都是 2026 年 10 月还活着的免费档：免费 VPS、免费建站、免费 CDN、免费 VPN 横评。先说结论：真能长期白嫖的免费 VPS 只剩三家半——甲骨文 A1、谷歌 e2-micro、三丰云/阿贝云，再加一个 AWS 新号 $200 额度。甲骨文 A1 是 2 核 12GB、每月 10TB 流量，跑 3X-UI 的首选，代价是要蹲容量，“Out of host capacity”是常态；GCP e2-micro 是 1 核 1GB，不用蹲随时能开，但每月只有 1GB 免费出站流量，跑代理几天就烧光；三丰云 0 元开通、每 7 天点一下续期，但 IP 在国内，跑代理有合规风险；AWS 新号 $200 额度 6 个月有效，到期自动关闭不扣费。',
      '免卡的新选择是 ASCS Cloud：2 核 2GB、30 天点一次确认，但只有 IPv6、没有 IPv4。建站托管这边，Cloudflare Pages 静态站不限流量、每月 500 次构建；Vercel Hobby 个人项目免费，但赚钱的站不能用；Netlify 免费档改成了 300 积分制。先定用途再选机器：跑代理面板蹲甲骨文，要稳妥开 GCP，练手用三丰云或 ASCS。',
    ],
    faq: [
      {
        q: '甲骨文 A1 免费额度到底是多少？',
        a: '免费账号 A1 总量是 2 OCPU + 12GB（每月 1500 OCPU-hours + 9000 GB-hours），另加 200GB 块存储、每月 10TB 出站流量；超了的老实例在 2026 年 6 月那波已被关停。详见《甲骨文免费云 2 核 12G 开机实录：Always Free A1 全流程（2026-10-20）》。',
      },
      {
        q: 'GCP e2-micro 免费有什么坑？',
        a: '两个硬边界：1GB 内存是真瓶颈，跑个空载小服务可以，多加插件就可能崩；每月只有 1GB 免费出站流量（北美出发，不含中国和澳大利亚目的地）。免费额度没有自动断费开关，一定要开账单预算提醒。详见《Google Cloud 永久免费机 e2-micro：1 核 1G，开对地方才真免费》。',
      },
      {
        q: '三丰云免费服务器要怎么续期？',
        a: '0 元开通、不绑卡，每 7 天点一下续期就能一直用；规则就是“7 天一续”，忘了就释放。把它当实验场和备用机，别当生产环境，重要数据一定备份到别处。详见《三丰云免费云服务器实测：0 元开通，每 7 天点一下续期一直用》。',
      },
      {
        q: '免费 VPS 能跑 3X-UI 吗？',
        a: '能跑的硬门槛是 root 权限 + 独立公网 IP + 能开入站端口 + 至少 512MB 内存。按这个标尺：甲骨文 A1 首选，GCP e2-micro 流量不够，三丰云/阿贝云能跑但 7 天一续且有合规风险。详见《2026 年还活着的免费 VPS 横评：想跑 3X-UI，先看这篇》。',
      },
    ],
  },
  'tax-id': {
    intro: [
      '出海要办的税号和身份文件，都在这个分类：13 篇，覆盖美国 EIN、马来西亚 TIN、意大利 Codice Fiscale、德国 Steuer-ID、澳大利亚 TFN、欧盟 EORI，还有土耳其税号的避坑实录。先说总原则：这些都是中国护照、在家就能办的免费税号，但每张的路子都不一样——美国 EIN 无 SSN 的外国人也能免费注册；马来西亚 TIN 免费申请，全流程图文；意大利 Codice Fiscale 全程邮件申请，不出国门就能办；德国 Steuer-ID 要先分清三个号，别被代办收智商税；澳大利亚 TFN 免费、终身 9 位号，但先选对申请路线。',
      '土耳其税号是在线申请的反面教材：入口还活着，但 2026 年的规则是申请人必须持该护照入境过土耳其，没去过就别指望下号，别再重试。税号信件要寄到真实地址，所以这个分类也收了转运地址的实测：Planet Express 免费美国地址、德国 mailboxde、Anytime Mailbox 选址与公证。办之前先想清楚用途：收款、清关、开户要的号各不相同，别为办而办。',
    ],
    faq: [
      {
        q: '美国 EIN 没有 SSN 能办吗？',
        a: '能。无 SSN 的外国人也能免费注册 EIN，详见《美国 EIN 免费注册：无 SSN 的外国人也能办》。',
      },
      {
        q: '土耳其税号在线申请为什么总被拒？',
        a: '不是表格填错了。2026 年的规则是申请人必须持该护照入境过土耳其，在线申请被拒的原因就是“没有该护照的入境记录”，这条路对没去过土耳其的人已经死了，别重试；剩下的路是本人去土耳其税务局，或找律师做 POA。详见《土耳其个人税号在线申请：入口还活着，但没去过土耳其就别指望下号（避坑实录）》。',
      },
      {
        q: '意大利税号不出国能办吗？',
        a: '能。Codice Fiscale 全程邮件申请实测，不出国门就能办，详见《不出国门办意大利税号：Codice Fiscale 全程邮件申请实测》。',
      },
      {
        q: '税号信件寄到哪里？',
        a: '要寄到真实地址。这个分类收了 Planet Express 免费美国地址、德国 mailboxde、Anytime Mailbox 的实测：美国地址能收银行卡、税号信件和小包裹；选址、公证与转运的坑见《在美国租个真实地址收卡收信：Anytime Mailbox 选址、公证与转运避坑全指南》。',
      },
    ],
  },
  'sim-keep': {
    intro: [
      '这是本站最大的分类：50 篇。核心是两件事——出国上网的 eSIM，和长期持有海外手机号。eSIM 这边，“每日 eSIM”栏目每天介绍一款：Airalo 是全球最大的 eSIM 商店、覆盖 190+ 国家，但全部是纯流量卡、不能收短信；Airalo 的“Unlimited”名义无限，实际每天 3–5GB 高速后降速到约 1Mbps；Holafly 按天卖无限流量，也有月订阅 Unlimited $64.90/月；Nomad 新用户免费试用给 1GB/3 天；Jetpac 航班延误免费进贵宾室；Mobal 和 Sakura Mobile 是日本市场的带号 eSIM，给你真实的日本手机号。',
      '保号这条线，英国 Giffgaff 曾经是低成本首选，但 2026 年 7–8 月批量清理长期境外用户，这家已经出局；现在相对稳的是 VOXI，£10/月，漫游条款是先警告、后处理。其他保号卡：斯里兰卡 Dialog 护照线上 0 元开卡、每月约 1.3 元保号；捷克 Kaktus 0 月租、每年充 50 克朗（约 16 元）保号一年；泰国 AIS 49 泰铢（约 $1.5）保一年。收验证码是单独的学问：纯流量卡一律收不了短信，要收码必须买带真实号码的套餐，9 种方案的总对比见本站枢纽页。',
    ],
    faq: [
      {
        q: 'Airalo 能收短信验证码吗？',
        a: '不能。Airalo 卖的全部是纯流量卡（data-only），没有电话号码，不能收发短信；WhatsApp、Telegram 这类走流量的 App 可以用，但银行、平台注册的验证码指望不上它。详见《每日 eSIM | Airalo：全球最大的 eSIM 商店，但先说清楚它不能收短信》。',
      },
      {
        q: 'Giffgaff 还能用来保号吗？',
        a: '别碰了。2026 年 7–8 月 Giffgaff 批量清理长期在境外使用的预付用户，无预警直接断号、余额不退，重灾区就是中国。现在相对稳的是 VOXI，£10/月。详见《中国护照也能开：英国 VOXI 号码长期保号全攻略（eSIM + 实体卡两条路）》。',
      },
      {
        q: '去日本旅游，eSIM 选哪家？',
        a: '只要上网，Holafly 日本 7 天无限 $27.50、Airalo 日本无限 10 天 $34.50；要日本真实号码收验证码，选 Mobal 或 Sakura Mobile 的 Voice+Data 月租。详见枢纽页《日本 eSIM 对比：Mobal、Sakura Mobile 与三大旅行卡》。',
      },
      {
        q: '免费 eSIM 试用能长期保号吗？',
        a: '不能。免费的都是试用，到期就收回：美国三大运营商各 30 天、Visible 15 天，Nomad 免费试用 1GB/3 天。试用的用途是短期测试、临时收验证码、体验套餐。详见《免费 eSIM 试用：美国三大运营商 30 天白嫖指南》。',
      },
    ],
  },
  payment: {
    intro: [
      '跨境收款是出海的最后一公里，这个分类 10 篇，讲 Wise、Airwallex、Revolut 这三家主流多币种账户，外加 iFAST、Wovia 虚拟卡和境外银行卡的实测。先说三家的分工：Wise 个人账户免费开户、无月费、无最低余额，一个账户装 40 多种货币，换汇、汇款、取现、办卡按笔收费，付款前页面明示；Airwallex 是企业多币种账户，不支持个人开户，Explore 基础版 0 元，换汇是银行间汇率 +0.5%，120+ 国家/地区本地通道转账 $0 转账费；Revolut 免费 Standard 账户 0 月费开户，换汇、国际汇款、取现的边际费用按额度、星期、币种走，App 内确认页为准。',
      '三家都不是传统银行：Wise 的资金是“保护存放”、不是存款保险承保的银行存款；Airwallex Trustpilot 2.8–2.9/5，低分集中在合规审查冻结账户。开户容易保户难：第一笔大额收款进来之前，先把合同、发票、资金来源证明备齐，别把唯一的收款命脉押在一家。境外银行卡这边，大陆居民能远程开的有英国 iFAST 数字银行 0 门槛；Wovia 虚拟卡 1 美元开卡，能付 ChatGPT、Claude 订阅。',
    ],
    faq: [
      {
        q: 'Wise 开户要钱吗？',
        a: '个人账户开户 $0、无月费、无最低余额；换汇、汇款、取现、办卡按笔收费，付款前页面明示。商业账户的全功能一次性开通费（美国约 $31、英国约 £50）与个人账户无关。详见《境外银行：Wise 多币种账户图文教程——免费开户、一个账户装 40 多种货币》。',
      },
      {
        q: 'Airwallex 个人能开户吗？',
        a: '不能。Airwallex 仅支持企业客户，开户要营业执照、董事+UBO 证件与地址证明、业务证明、企业邮箱；审核 1–3 个工作日。详见《不出国也有美元/英镑/欧元本地账户：Airwallex 空中云汇企业多币种账户远程开户实录》。',
      },
      {
        q: 'Revolut 免费版真的免费吗？',
        a: 'Standard 月费 $0；换汇、国际汇款、取现的边际费用按额度、星期、币种走，App 内确认页为准。别买“已验证 Revolut 账户”，买卖已验证账户违反平台规则且会被冻结。详见《Revolut 免费 Standard 账户全攻略：0 月费开户，哪些是真免费、哪些要另算钱》。',
      },
      {
        q: '三家怎么选？',
        a: '个人收款先看 Wise；公司收款、跨境电商、SaaS 订阅看 Airwallex；日常多币种消费看 Revolut。横向对比见枢纽页《Wise vs Airwallex vs Revolut 对比：跨境收款三家实测》。',
      },
    ],
  },
  'ai-tools': {
    intro: [
      '这是本站第二大分类：50 篇，覆盖 AI 聊天、翻译、配音、免费 API、智能体自托管、学生免费档和 AI 大事件日报。零注册、不绑卡的实测是这个分类的招牌：Duck.ai 免费匿名 AI 聊天，6 个模型随便换、对话不拿去训练；DeepL 免费 AI 翻译，每月 5 万字符够用，但单次 1500 字是真边界；Edge-TTS 免费 AI 配音，微软神经音色随便用；Pollinations 免 Key 接口，图片和英文文案还能白嫖。免费 API 这条线：Groq 免绑卡、每天 1000 次大模型调用；Atria 大模型免费 API 白嫖 1 亿 Token；SambaNova 名义每天 20 万 token，但 2026 年实测已大幅缩水。',
      '智能体自托管：n8n、Dify、Flowise、Langflow、OpenClaw、扣子，一条 Docker 命令就能搭出 24 小时 AI 员工。学生免费档：ChatGPT Plus 10 月 31 日截止、Google 12 月 31 日截止，GitHub 学生包白嫖 Copilot。AI 大事件日报每天一条，有据可查，不追热点、只记实测能验证的进展。先说清楚：免费档的额度会变，动手前以官方页面为准。',
    ],
    faq: [
      {
        q: 'Duck.ai 真的不用注册吗？',
        a: '不用。DuckDuckGo 的 Duck.ai 不用邮箱、不用手机号、不用信用卡，GPT、Claude、Mistral 和两个开源模型 6 个免费随便换，对话不拿去训练。详见《零注册、不绑卡，Duck.ai 免费匿名 AI 聊天 2026 年 11 月实测：6 个模型随便换，对话不拿去训练》。',
      },
      {
        q: 'DeepL 免费版每月能翻多少？',
        a: '每月 5 万字符，但单次粘贴超过 1500 字是真边界，长文要分段。详见《DeepL 免费 AI 翻译实测：每月 5 万字符，单次 1500 字是边界》。',
      },
      {
        q: '智能体自托管要服务器吗？',
        a: '要，但一条 Docker 命令就能跑：n8n、Dify、Flowise、Langflow、OpenClaw 都有自托管教程；本站免费 VPS 分类里有甲骨文 A1、GCP e2-micro 的开机实录，2 核 12G 跑个小智能体绰绰有余。详见《免费智能体：n8n 自托管，一条 Docker 命令搭出 24 小时 AI 员工》。',
      },
      {
        q: '学生 AI 免费档什么时候截止？',
        a: 'ChatGPT Plus 学生档 10 月 31 日截止，Google 学生档 12 月 31 日截止；GitHub 学生包的 Copilot 无限代码补全免费领，但有个缩水要先说。详见《学生 AI 免费档截止期：ChatGPT 10 月 31 日、Google 12 月 31 日》。',
      },
    ],
  },
};
