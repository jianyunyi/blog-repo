// 中英文章配对表（英文 slug → 中文 slug）。
// 2026-10-23 由主会话逐篇按标题人工核对（17/17）；新译文上线时在此补一行即可。
// hreflang 互指只对表内配对生成；表外文章只声明自身语言 + x-default 指向自身。
// 2026-11-12 实测：英文稿已于 2026-11-04 全删（本站中文-only），17 个英文 slug
// 全部不在 manifest 中；languagesFor 只有在配对英文 slug 真实存在时才发 en
// alternate，否则只返回中文 + x-default（死链 hreflang 比没有更伤）。
// 不要只扩配对表——扩了也还是 404；等真实英文版上线再补行。

export const EN_TO_ZH: Record<string, string> = {
  '2026-10-20-germany-mailboxde-forwarding-en': '2026-10-20-免费转运地址-德国mailboxde图文教程',
  '2026-10-20-mimo-v25-sunset-migration-en': '2026-10-20-ai新闻-mimo-v2-5下线迁移图文教程',
  '2026-10-20-oracle-a1-free-vps-en': '2026-10-20-免费vps-oracle-a1开机图文教程',
  '2026-10-20-wise-multi-currency-account-en': '2026-10-20-境外银行-wise多币种账户图文教程',
  '2026-10-21-forward-email-domain-forwarding-en': '2026-10-21-免费邮箱-forwardemail域名转发图文教程',
  '2026-10-21-free-us-phone-number-guide-en': '2026-10-21-免费美国号码三条路图文教程',
  '2026-10-21-free-vpn-comparison-2026-en': '2026-10-21-免费vpn-2026横评图文教程',
  '2026-10-21-github-pages-free-hosting-en': '2026-10-21-免费建站-github-pages图文教程',
  '2026-10-22-free-esim-data-2026-en': '2026-10-22-免费esim-免费流量白嫖实测图文教程',
  '2026-10-22-italy-tax-code-en': '2026-10-22-税号办理-意大利codicefiscale图文教程',
  '2026-10-22-langflow-selfhost-en': '2026-10-22-免费智能体-langflow自托管图文教程',
  '2026-10-22-openai-models-google-cloud-en': '2026-10-22-ai新闻-openai模型上googlecloud图文教程',
  '2026-10-22-ppua-free-domain-en': '2026-10-22-免费域名-ppua申请图文教程',
  '2026-10-23-address-proof-kyc-en': '2026-10-23-境外开户地址证明实战',
  '2026-10-23-airwallex-account-en': '2026-10-23-境外银行-airwallex多币种账户',
  '2026-10-23-github-copilot-free-en': '2026-10-23-ai会员免费薅-githubcopilot免费版',
  '2026-10-23-uptimerobot-monitoring-en': '2026-10-23-免费出海策略-uptimerobot监控',
};

export const ZH_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(EN_TO_ZH).map(([en, zh]) => [zh, en]),
);

/** 返回某篇文章的 hreflang languages 对象（绝对 URL，形态与 canonical 一致）。
 * `exists` 为可选的 manifest 存在性检查：配对英文 slug 不存在时不发 en
 * alternate（否则就是一条指向本站 404 的 hreflang）。 */
export function languagesFor(
  slug: string,
  lang: 'zh-CN' | 'en',
  siteUrl: string,
  exists?: (slug: string) => boolean,
): Record<string, string> {
  const url = (s: string) => `${siteUrl}/posts/${s}.html`;
  const live = (s: string) => !exists || exists(s);
  if (lang === 'en' && EN_TO_ZH[slug] && live(slug)) {
    const zh = EN_TO_ZH[slug];
    return { 'zh-CN': url(zh), en: url(slug), 'x-default': url(zh) };
  }
  if (lang === 'zh-CN' && ZH_TO_EN[slug]) {
    const en = ZH_TO_EN[slug];
    if (live(en)) {
      return { 'zh-CN': url(slug), en: url(en), 'x-default': url(slug) };
    }
  }
  return lang === 'en'
    ? { en: url(slug), 'x-default': url(slug) }
    : { 'zh-CN': url(slug), 'x-default': url(slug) };
}
