# Stop Chasing us.kg: The Free Domain That Still Works in October 2026 Is dpdns.org — With Cloudflare Pages for $0 Hosting

**One-line summary:** First, the correction: us.kg and xx.kg have paused new registrations and qzz.io went paid, so don't copy old lists — or the project's own README, which still shows five suffixes. As of the last public hands-on review on October 21, 2026, dpdns.org was still open — but the dashboard requires login before it shows its suffix list, so this article's step 1 is: verify first, and stop if it's gone.

## What You Need

- An email address for a dashboard account (the dashboard also offers Google / GitHub sign-in)
- A free Cloudflare account, for nameserver delegation or direct DNS management
- A free host: Cloudflare Pages, GitHub Pages, or Netlify
- No overseas bank account, no travel — everything is done online

## Step 1: Check the Current Status First — Don't Copy Old Lists

The status anchor for this article is a public hands-on review from around October 21, 2026 (dev.to): within DigitalPlat, eu.org is still free but manual review can take months; `.us.kg` and `.xx.kg` paused new registrations over abuse (existing domains still resolve); `.qzz.io` moved to paid only; `dpdns.org` was still open for new registrations.

Two conflicting signals to watch for: the project's own README still lists five suffixes (.DPDNS.ORG, .US.KG, .QZZ.IO, .XX.KG, .QD.JE), and an October 24, 2026 repost lists the same five — but a README is static text, not live status, and the repost is a repo summary, not a hands-on test. **"Listed in the README" does not mean "registrable."**

Step 1 of the actual work: sign in at the dashboard, https://dash.domain.digitalplat.org/ (email, Google, or GitHub sign-in), and confirm `dpdns.org` is still in the available-suffix list. If it isn't, stop — see the fallback at the end.

**(Unverified, stated openly:** before writing on October 25, 2026, this article only read-checked the dashboard's login page — it genuinely requires login before showing the suffix list. Whether dpdns.org is still listed on October 25 could not be finally confirmed without registering. The "still open" claim comes from the October 21, 2026 public review, not an October 25 test.)

![DigitalPlat homepage: free domain registration and DNS learning resources](img/2026-10-25-dpdns/step1.png)

## Step 2: Register — Dashboard Account, Pick the dpdns.org Suffix, Submit

Once the suffix is confirmed in the list, the flow is: create a dashboard account → pick a suffix → submit → configure DNS. The registration entry is `dash.domain.digitalplat.org`, and you can use Cloudflare, FreeDNS, Hostry, or your own DNS — or delegate elsewhere later.

![DigitalPlat official tutorial index: registration flow and external nameserver delegation](img/2026-10-25-dpdns/step2.png)

## Step 3: Delegate Nameservers — All Records Live in Your External DNS

DigitalPlat does not provide an ordinary DNS record editor. It only registers the name and delegates it to an external authoritative nameserver. A, AAAA, CNAME, MX, and TXT records are all managed in your external DNS service. Don't look for an "add A record" button in the dashboard — there isn't one.

In practice: delegate your `yourname.dpdns.org` nameservers to Cloudflare (or your chosen DNS provider), then manage every record there. If you move later, you only change the delegation.

## Step 4: Point a CNAME at Free Hosting — HTTPS Comes Free

On the hosting side, it's one CNAME to the hostname your host assigns:

- Cloudflare Pages: CNAME `yourname.dpdns.org` to the assigned `xxx.pages.dev`;
- GitHub Pages / Netlify / Vercel: same pattern, CNAME to the assigned hostname;
- HTTPS certificates are issued automatically by the host.

That gives you a working site at `yourname.dpdns.org`: $0 domain, $0 hosting, $0 certificate.

## Step 5: Read the Terms Before Deciding What This Domain Is For

![DigitalPlat terms of service: best-effort, no SLA, namespaces may be discontinued](img/2026-10-25-dpdns/step3.png)

## Costs, Limits, and Pitfalls

- **Cost:** Registration is $0 — but the terms added a "Buy Slot" mechanism (paid extra registration slots). Free slots are limited; buying a slot buys quota, not ownership, not renewal rights, and not approval.
- **Terms, verified:** The service is best-effort with no SLA and no availability or renewal guarantee. Any namespace may be modified, restricted, discontinued, or taken down at any time. Users must keep a backup domain and a failover plan, and must not use a DigitalPlat domain as the only path for critical business.
- **You don't own the name:** No EPP transfer code, no moving to another registrar; the WHOIS registrant is the service. Never use it as the sole identity for a brand, payments, email, or account recovery.
- **Position it only as a test / portfolio / demo / docs pointer,** with a migration checklist: run a second domain in parallel, set up 301 redirects, never hard-code the domain.
- **The operator description changed:** Older write-ups call it a non-profit under The Hack Foundation's fiscal sponsorship. The current terms name EdgeAlphix LLC as the operator. Don't repeat the non-profit claim unconditionally.
- **The official Telegram account was compromised:** Multiple sources note the original Telegram account was hijacked — don't trust any Telegram messages, bonus offers, or links claiming to be official. The README itself says Telegram is no longer an official channel.
- **Freenom is the cautionary tale:** In March 2023 it paused new registrations after Meta sued over abuse and cybersquatting; in November 2023 ICANN terminated its registrar accreditation; in February 2024 it exited the domain business; about 12.6 million domains (mostly .tk / .cf / .gq) stopped working. It has since returned as a paid registrar (from about €8/year). That is what "free domains can die" looks like.
- **Three items are unverified — check them yourself, don't treat them as facts:** the per-account free domain limit (older sources conflict: 1 vs. 3); the free renewal window (the "renew free within 180 days of expiry" claim was not confirmed in the official tutorial index or the terms text); whether registration needs a phone number or ID verification.
- **Don't list `.qd.je` as "available":** It only appears in suffix listings, with no October status evidence. Mention it only as "appeared in old lists."
- **Fallback:** If dpdns.org is no longer listed on the day you try, the same chain (nameserver delegation + CNAME to free hosting) works for any other suffix still listed. eu.org remains an option through its manual review queue, but expect months of waiting.

## Sources

- Status review (dev.to, ~2026-10-21): https://dev.to/mattleeee/free-domain-options-in-2026-from-euorg-to-digitalplat-dpdnsorg-3k3o
- October 24, 2026 repost (listing evidence only, not a hands-on test): https://svanews.com/2026/10/24/freedomain/
- DigitalPlat homepage: https://domain.digitalplat.org/
- Registration dashboard: https://dash.domain.digitalplat.org/
- Terms of service: https://domain.digitalplat.org/terms-of-service/
- Official tutorial index: https://github.com/DigitalPlatDev/FreeDomain/blob/main/documents/tutorial/index.md
- Project repo (README suffix list and Telegram compromise notice): https://github.com/DigitalPlatDev/FreeDomain
- Older write-up (2026-05-29, registration-flow reference): https://silenceper.com/en/article/2026-05-29-freedomain-free-domain-for-projects/
- Free custom domain comparison (~2026-10-12): https://dev.to/learn-to-earn/free-custom-domain-options-for-developers-in-2026-compared-40eg
