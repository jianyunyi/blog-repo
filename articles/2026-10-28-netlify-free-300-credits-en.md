# Netlify's Free Plan Changed: In the 300-Credit Era, How Far Does Free Hosting Go?

**One-line takeaway:** If you still quote the old "Netlify free: 100 GB bandwidth, 300 build minutes" posts, you will get caught out: the 2026 free plan runs on 300 credits a month — 15 credits per production deploy, 20 credits per GB of bandwidth — and when the credits run out, the whole project pauses until next month. Small sites are still free; busy or frequently deployed sites need to do the maths first.

## What you need

- A static site folder (plain HTML files, or a frontend project in a Git repository)
- An email address to register a Netlify account (no card required for the free plan, per the official comparison below)
- A clear picture of your site: an occasionally updated small site, or a frequently deployed, traffic-carrying site — that decides whether the free plan is enough

## Steps

### Step 1: Confirm the new free plan — 300 credits, custom domains and SSL included

![Netlify free vs pro comparison](img/2026-10-28-netlify/step1.png)

Netlify's official free-vs-pro comparison states: the Free plan is $0 and includes a global CDN, deploy previews, custom domains with SSL, functions and AI models, database and blob storage, with a 300-credit monthly limit. Pro is $20/month with unlimited members and 3,000 credits and up. Check that your new account is on this credit-based free plan — accounts created before September 2025 may still sit on the older, more generous plan, and the numbers are different.

### Step 2: Learn to count credits — 15 per deploy, 20 per GB, pause when empty

![Netlify free plan 300 credits explained (official docs rechecked 23 October 2026)](img/2026-10-28-netlify/step2.png)

Per a breakdown that rechecked Netlify's official docs on 23 October 2026: the 300-credit free limit is hard — when it runs out, every project pauses until the next billing cycle, the free plan cannot buy credit packs, and unused credits do not roll over. Rates: a production deploy costs 15 credits, bandwidth 20 credits per GB, web requests 2 credits per 10,000, function compute 10 credits per GB-hour, form submissions free, and deploy previews, branch deploys, failed deploys, and rollbacks free. Do the maths: 5 deploys (75 credits) plus 10 GB of traffic (200 credits) nearly exhausts the month — but 1 deploy (15 credits) plus 1 GB of traffic (20 credits) is only 35 credits, and a small site fits easily.

### Step 3: Deploy and attach a domain — drag-and-drop is fastest, Git is easiest long-term

![Netlify in the 2026 free static hosting comparison](img/2026-10-28-netlify/step3.png)

Two deployment paths: Netlify Drop takes a dragged folder straight to a live URL, best for one-off pages; connecting a Git repository (GitHub, GitLab, Bitbucket) auto-deploys on every push, best for a site you maintain. The 2026 comparison notes a gotcha: new accounts' projects start private by default and only go public when you choose to publish, and free projects created on or after 19 August 2026 show a "Powered by Netlify" badge in the bottom-right corner (turn it off in project settings). Attach your own domain in project settings; SSL is automatic, no separate certificate purchase needed.

## Costs, caveats, and pitfalls

- **Cost:** Free $0/month with 300 credits; Personal $9/month with 1,000 credits; Pro from $20/month with 3,000 credits and up (credit packs, per the third-party recheck: 500 credits for $5 on Personal, 1,500 for $10 on Pro — trust the checkout page).
- **Biggest trap: outdated posts.** "100 GB bandwidth, 300 build minutes, unlimited forms" describes the old free plan. Under credit pricing, 100 GB costs 2,000 credits — the free plan cannot hold it, so estimates copied from old posts will overshoot.
- **Pausing, not overcharging:** when credits run out, projects pause until the next cycle rather than billing you. Do not stake a production site entirely on the free plan; upgrade before traffic grows, or use Cloudflare Pages (unlimited static requests, 500 builds a month, per the comparison).
- **Free-plan boundaries:** no team member seats, password protection is a Pro feature, and web analytics and observability history on Free cover only the current and previous day.
- **Deploys cost credits too:** 15 credits per production deploy, so a site pushed daily for every typo can burn most of its allowance on deploys alone. Batch changes before pushing instead of deploying per typo.
- **No shutdown-track-record warning:** Netlify, founded in 2014 in San Francisco, changed its pricing model — that is a pricing change, not a quiet paywall or a shutdown. But pricing can change again, so the official pricing page is the authority, not this article.

## Sources

- Netlify free vs pro comparison: https://www.netlify.com/pricing/pro-vs-free/
- Netlify free plan 300 credits explained (official docs rechecked 23 October 2026): https://convika.com/compare/netlify-free-plan/
- 2026 free static hosting comparison: https://htmlpub.com/blog/static-site-hosting-comparison-2026
