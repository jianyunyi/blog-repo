#!/usr/bin/env node
/**
 * ONE-OFF P0 backfill (2026-11-12): prepend an explicit `category:`
 * frontmatter block to the 50 stock articles that matched no category
 * under the old title-regex rules, so the six categories partition the
 * whole site (179 = sum of category counts = total; no more 179 vs 130).
 *
 * Assignment rule: each article goes to the category its existing cluster
 * already belongs to (建站/服务器/网络基建 → vps-server, 保号 → sim-keep,
 * 税号 → tax-id, 域名 → domain-email, 虚拟卡/支付 → payment,
 * AI 模型/API/新闻 → ai-tools).
 *
 * FLAGGED (least-bad fit, no category truly fits — review before going
 * live; a 7th "出海工具箱" category in P1 would be the honest home):
 *   - 转运地址 ×4 → tax-id (framed as 身份/收件地址 in the articles)
 *   - Lexmount 注册 → tax-id (身份注册)
 *   - X 私域引流 → vps-server (流量主题最接近基建，无贴合分类)
 *   - 跨境独立站播客 → vps-server (建站部分为主)
 *   - 改定位 ×3 (WLOC/安卓/iOS 27) → sim-keep (手机相关)
 *   - 图片压缩横评 → vps-server (建站工具链)
 *
 * Safe to re-run: files that already carry frontmatter are skipped.
 * Not wired into package.json — delete after review if unwanted.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const SRC = path.join(__dirname, '..', 'articles');

/** md filename → category key (one of the six in lib/site-content.ts). */
const BACKFILL = {
  // vps-server — 建站 / 服务器 / 云托管 / 网络基建
  '2026-10-08-静态IP搭建-账号防封.md': 'vps-server',
  '2026-10-17-免费CDN-Cloudflare加速图文教程.md': 'vps-server',
  '2026-10-18-免费VPN-WARP图文教程.md': 'vps-server',
  '2026-10-18-推特引流私域实操解读.md': 'vps-server', // FLAGGED: no fitting category
  '2026-10-18-跨境独立站播客实录.md': 'vps-server', // FLAGGED: 建站部分为主
  '2026-10-19-免费出海策略-CloudflareTunnel图文教程.md': 'vps-server',
  '2026-10-20-Tailscale免费私有组网.md': 'vps-server',
  '2026-10-21-免费VPN-2026横评图文教程.md': 'vps-server',
  '2026-10-21-免费建站-GitHub-Pages图文教程.md': 'vps-server',
  '2026-10-21-免费我的世界服务器-MCServerHost.md': 'vps-server',
  '2026-10-21-华为云服务器36元一年半.md': 'vps-server',
  '2026-10-21-Serv00永久免费主机攻略.md': 'vps-server',
  '2026-10-23-免费出海策略-UptimeRobot监控.md': 'vps-server',
  '2026-10-24-免费建站-CloudflareR2图床图文教程.md': 'vps-server',
  '2026-10-25-alwaysdata免费主机带SSH无广告保活规则.md': 'vps-server',
  '2026-10-25-免费VPN-免费住宅网页代理Shifter图文教程.md': 'vps-server',
  '2026-10-27-5款越南云服务器推荐河内胡志明市节点对比.md': 'vps-server',
  '2026-10-27-免费出海策略-Cloudflare免费统计图文教程.md': 'vps-server',
  '2026-10-28-免费建站-Netlify免费档300积分图文教程.md': 'vps-server',
  '2026-10-29-免费建站-Vercel-Hobby免费档图文教程.md': 'vps-server',
  '2026-10-30-免费VPN-Proton-VPN免费档图文教程.md': 'vps-server',
  '2026-10-30-免费建站-Cloudflare-Pages免费托管图文教程.md': 'vps-server',
  '2026-11-03-免费自建提醒神器SubsTracker-Cloudflare一键部署.md': 'vps-server',
  '2026-11-09-免费图片压缩-三家横评图文教程.md': 'vps-server', // FLAGGED: 建站工具链
  // sim-keep — 保号 / 手机相关
  '2026-10-20-iPhone改定位-WLOC实测.md': 'sim-keep', // FLAGGED: 手机相关
  '2026-10-20-安卓改定位三步教程.md': 'sim-keep', // FLAGGED: 手机相关
  '2026-10-20-马来西亚UMobile橙卡保号.md': 'sim-keep',
  '2026-10-23-iOS27虚拟定位全攻略.md': 'sim-keep', // FLAGGED: 手机相关
  '2026-10-23-澳洲ALDIMobile保号攻略.md': 'sim-keep',
  // tax-id — 税号 / 身份 / 收件地址
  '2026-10-09-Lexmount与MetaMuse注册教程.md': 'tax-id', // FLAGGED: 身份注册
  '2026-10-17-免费转运地址教程.md': 'tax-id', // FLAGGED: 身份/收件地址
  '2026-10-20-免费转运地址-德国mailboxde图文教程.md': 'tax-id', // FLAGGED
  '2026-10-21-美国真实地址-AnytimeMailbox指南.md': 'tax-id', // FLAGGED
  '2026-10-22-税号办理-意大利CodiceFiscale图文教程.md': 'tax-id',
  '2026-10-24-免费转运地址-PlanetExpress美国地址图文教程.md': 'tax-id', // FLAGGED
  '2026-10-26-税号办理-德国Steuer-ID图文教程.md': 'tax-id',
  '2026-10-29-税号办理-澳大利亚TFN图文教程.md': 'tax-id',
  // domain-email — 域名
  '2026-10-23-75里拉买com域名核查.md': 'domain-email',
  '2026-10-23-便宜域名续费价-top与cn.md': 'domain-email',
  // payment — 虚拟卡 / 支付
  '2026-10-20-Wovia虚拟卡实测.md': 'payment',
  '2026-10-20-美国运通MR积分政策变动.md': 'payment',
  // ai-tools — AI 模型 / API / 新闻
  '2026-10-21-Groq免费API全攻略.md': 'ai-tools',
  '2026-10-21-Kiro升级优惠全攻略.md': 'ai-tools',
  '2026-10-21-SambaNova免费档避坑.md': 'ai-tools',
  '2026-10-22-AI新闻-OpenAI模型上GoogleCloud图文教程.md': 'ai-tools',
  '2026-10-25-AI新闻-Kimi-K31-Pro实测图文教程.md': 'ai-tools',
  '2026-10-27-AI新闻-OpenAI-GPT61-Terra实测图文教程.md': 'ai-tools',
  '2026-10-29-AI新闻-Gemini-4-Carbon图文教程.md': 'ai-tools',
  '2026-11-02-免费AI接口-Pollinations免注册实测图文教程.md': 'ai-tools',
  '2026-11-03-腾讯云TokenHub新人100万Token图文教程.md': 'ai-tools',
};

let done = 0;
let skipped = 0;
for (const [file, category] of Object.entries(BACKFILL)) {
  const full = path.join(SRC, file);
  if (!fs.existsSync(full)) {
    console.error(`[backfill] MISSING: ${file}`);
    continue;
  }
  const text = fs.readFileSync(full, 'utf-8');
  if (text.startsWith('---\n') || text.startsWith('---\r\n')) {
    console.error(`[backfill] SKIP (already has frontmatter): ${file}`);
    skipped += 1;
    continue;
  }
  fs.writeFileSync(full, `---\ncategory: ${category}\n---\n\n${text}`, 'utf-8');
  done += 1;
}
console.log(`[backfill] ${done} files got frontmatter, ${skipped} skipped`);
