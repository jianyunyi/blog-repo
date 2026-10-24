# OpenAI Models Land on Google Cloud: How to Queue for GPT-6 Access in Model Garden

**TL;DR**: On October 21, Google Cloud announced that OpenAI's GPT-6 Astra, GPT-6.1 Sol, GPT-6 Luna, and Codex are coming to Model Garden. It's private preview for select enterprise customers for now — but you can join the waitlist and prep your cloud project today, from your desk.

---

## What happened (when + where)

- **When**: Wednesday, October 21, 2026.
- **Where**: The Google Cloud official blog published "Google Cloud brings OpenAI models to customers" (authored by Michael Gerstenhaber, VP of Product Management for Gemini at Google Cloud), with a matching announcement from OpenAI.
- **The news**:
  - Three OpenAI models — **GPT-6 Astra, GPT-6.1 Sol, and GPT-6 Luna** — are rolling out in **private preview to select enterprise customers** in Google Cloud's Model Garden. General availability is planned "in the coming weeks."
  - Customers can already build with the models through APIs, and connect their local **Codex CLI and Desktop** workflows directly to Google's Gemini platform for inference.
  - OpenAI models will also arrive in **Gemini for business** and **Google Antigravity** soon.
  - OpenAI noted that "Microsoft remains OpenAI's primary cloud partner."
- **Context** (Reuters, Oct 21): OpenAI's exclusive distribution arrangement with Microsoft expired in April 2026. Since then, OpenAI has expanded distribution to AWS — and now Google Cloud.

The three models, in Google's own words:

| Model | Positioned for |
|---|---|
| GPT-6 Astra | Demanding work: coding, computer use, professional tasks, scientific research |
| GPT-6.1 Sol | Near-Astra intelligence at lower cost: agentic coding, computer use, professional work |
| GPT-6 Luna | Fast and cost-efficient: everyday work at scale |

![Official announcement page, dated October 21, 2026](img/2026-10-22-ai-news/step1.png)

---

## Why it matters to you

1. **One bill for GPT**: Purchases run through Google Cloud Marketplace, so usage lands on a single Google Cloud invoice, draws down your existing cloud spend commitments, and counts toward Flexible Savings Plans (FSP). If your business already runs on GCP, this simplifies procurement and accounting.
2. **Enterprise data governance**: Google states that prompts, context, and outputs stay within your designated data perimeter and are never used to train foundation models (Zero Data Retention options "coming soon"). That's a strong selling point when pitching enterprise clients.
3. **A new route for Codex users**: Local Codex CLI/Desktop workflows can now point at Google Cloud for inference — no longer locked to OpenAI's direct channel.
4. **One platform for model choice**: Google Cloud claims to be the only hyperscaler offering Gemini, Claude, and GPT together, alongside 200+ models. For indie builders, that means switching models without signing a new contract for each one.

**Reality check**: this is private preview for select enterprise customers only. As an independent developer, what you can do today is join the waitlist and get your GCP project ready — don't believe the "fully launched" hype from social media.

---

## Hands-on steps (all doable from home today)

> Note: screenshots below are from read-only page views. No accounts were registered and no forms were submitted.

### Step 1: Read the official announcement first

![Official announcement — check the "Getting started" section](img/2026-10-22-ai-news/step1.png)

Open the Google Cloud blog post and read the **"Getting started"** section: it's private preview plus an interest form right now, with GA coming "in the coming weeks." Set the right expectations before acting.

### Step 2: Apply for preview access (5 minutes)

![Interest form for OpenAI models in Model Garden](img/2026-10-22-ai-news/step2.png)

The "this form" link in the announcement leads here (`cloud.google.com/resources/interest/openai-models`). Its own disclaimer: **"Expressing interest and filling out this form does not guarantee access."**

Required fields: first/last name, business email, business phone, job title, company name, country. Practical tips:

- **Company name**: if you're an indie dev without a company, write "Independent Developer" or your studio name — don't invent a fake company (unverified: whether this affects approval odds).
- **Business email**: use a domain email or your regular Gmail; avoid throwaway addresses.
- **Phone**: the calling-code picker defaults to +1 — switch it to your real country code.

### Step 3: Prep your Google Cloud project (so you're running within 10 minutes once approved)

![Model Garden official docs: model library overview](img/2026-10-22-ai-news/step3.png)

- A Google Cloud account requires an **international credit/debit card** (Visa / Mastercard) for billing verification — the only hard requirement in the public information (unverified: whether extra verification applies to your country).
- Enable the **Vertex AI API** in your project. After GA, search "GPT-6" in Model Garden to find the model cards and call them via API or the console prompt-design page.
- Skim the official Model Garden docs (pictured above) while you wait — they cover discovery, testing, and deployment, so you can move fast once access lands.

**Cost reference**: Google Cloud channel pricing for GPT-6 hasn't been published. For reference only, OpenAI's standard API rates for GPT-6.1 Sol are **$2 per million input tokens, $0.10 per million cached input tokens, $10 per million output tokens** (per OpenAI's September 29 release info). Use this for rough cost estimates and always add "subject to actual billing" in client quotes.

### Step 4 (optional, for Codex users): Point your local Codex at Google Cloud

The announcement says you can "connect their local Codex CLI and Desktop workflows directly to our Gemini platform for inference" starting now. The exact configuration parameters come with your preview approval — complete Step 2 first, then follow the docs.

---

## Caveats, costs, and gotchas

1. **Applying ≠ access.** Google says so explicitly. Don't shut down your existing API channels.
2. **No pricing published yet.** Neither GPT-6 pricing nor discounts on the GCP channel are known — estimate with OpenAI's standard rates for now.
3. **Regional eligibility unverified.** Whether preview access is granted outside the US, or how regional restrictions apply through the GCP channel, is not stated anywhere public — select your country honestly on the form.
4. **ZDR (Zero Data Retention) is "coming soon," not here yet.** Don't migrate highly sensitive workloads until it ships.
5. **GCP is pay-as-you-go.** After linking a card, set a billing budget alert so runaway API calls can't surprise you.

---

## Sources

- Google Cloud official blog, "Google Cloud brings OpenAI models to customers" (2026-10-21): https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-brings-openai-models-to-customers
- Interest form for OpenAI models preview: https://cloud.google.com/resources/interest/openai-models
- Model Garden official docs overview: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models
- Reuters report (via CNA, 2026-10-21): https://www.channelnewsasia.com/business/openai-sell-its-top-models-google-cloud-in-latest-enterprise-push-6478941
- Digital Applied deep dive (2026-10-21): https://www.digitalapplied.com/blog/openai-models-google-cloud-model-garden-preview
- Unite.AI coverage (2026-10-21): https://www.unite.ai/google-cloud-adds-openais-gpt-astra-and-gpt-6-models-to-model-garden/
