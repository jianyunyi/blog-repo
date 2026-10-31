# Mistral Large 4 Goes Open Weight: "Le Chonk" Is Out — and the Smart Way to Try It Is the Hosted API, Not Your Laptop

**One-line summary:** On October 29, 2026, France's Mistral published the weights of its trillion-parameter Large 4 model (nicknamed Le Chonk) on Hugging Face: anyone can download, modify, and commercialize it — except that selling hosted access to it as a service requires a separate commercial license. But don't rush to download: a trillion-parameter model won't run on a home computer. For almost everyone, the route that actually works today is Mistral's own hosted API (input $0.70 per million tokens), not a local install.

## What you need

- A Hugging Face account (to read the model page and docs — think twice before clicking download; the weights need serious disk space and high-end GPUs)
- Or a Mistral API account (for the hosted route, pay-as-you-go — start with a small top-up)
- The right expectation: this is a news-plus-hands-on guide, not a "run a trillion-parameter model at home" tutorial — local inference needs server-grade, multi-GPU hardware, and this guide tells you not to go down that road

## Step by step

### Step 1: Read the news itself — what exactly landed on October 29

![Mistral Large 4 weights land on Hugging Face](img/2026-10-31-mistral-large4/step1.png)

The October 29 release breaks into three sentences. First, the model: Mistral Large 4, nicknamed Le Chonk, a natively multimodal (text + image in, text out) mixture-of-experts model with about 1 trillion total parameters, about 49 billion active per token (52 billion counting embeddings and output layers), and a 1-million-token context window — roughly 750,000 words, enough to hold an entire codebase. Second, the timeline: an API-only preview shipped October 6, and the October 29 weights are an improved version with three more weeks of reinforcement learning and customer testing, not a frozen copy of the preview. Third, the pitch: Mistral calls it the best open-weight model for coding, aimed at programming and defensive cybersecurity — but every score below is Mistral's own claim, the full technical report wasn't out at publication time, and independent replication hadn't appeared. Treat them as vendor figures.

### Step 2: Check the license — "open weight" is not "do anything, including reselling access"

![Mistral Large 4 open weights explained: license and hardware bar](img/2026-10-31-mistral-large4/step2.png)

This is the step most hype posts skip, so it gets its own section. The weights use the Mistral Ecosystem Open-Weight License, an MIT derivative — not standard MIT, not Apache 2.0. The rule: personal use, modification, fine-tuning, and commercial use are all allowed, with one exception — if your business is offering this model to others as a hosted, pay-per-use service (Model-as-a-Service), you must buy a separate commercial license from Mistral first. Using it inside your own product for your end users is not the same thing as reselling model access; where the line blurs, go by the license text, not second-hand summaries.

The hardware bar deserves the same bluntness: the official model card's setup examples assume an eight-GPU server, with a quantized NVFP4 variant targeting NVIDIA Blackwell GPUs; the community has also produced GGUF files that llama.cpp can read — but "can be loaded" is not "runs well on a home PC." Any "run Le Chonk locally" tutorial that can't answer what GPU, how much VRAM, and what speed should be treated as marketing.

### Step 3: See the week's bigger picture — why this story deserves its own article

![AI weekly wrap: Mistral opens Large 4, Canada backs Cohere](img/2026-10-31-mistral-large4/step3.png)

A single model is easy to misjudge; the week of October 30 puts it in context. In the same week, Mistral open-sourced a trillion-parameter model (hosted at $0.70 input / $2.10 output per million tokens), Google's Gemini 4 Carbon (announced October 28) went only to a vetted subset of cyber defenders with no wider-release date, and Canada's government announced it will take an equity stake in Cohere in stages (up to about C$1.6 billion). The pattern: top models are splitting into two paths — weights published for anyone to download, and the strongest models gated to selected users first. For independent developers and small teams, Mistral's path is valuable not because you download the weights, but because a top-tier open-weight model is available hosted, on a pay-as-you-go basis.

### Step 4: Try it the right way — hosted API, no weight download

![Mistral Large 4 open release: hosted pricing and benchmark scores](img/2026-10-31-mistral-large4/step4.png)

The practical way for an ordinary user to test Large 4 runs in four steps, with no weight download anywhere:

1. **Pick an entry point:** Create an account on Mistral's own platform (Mistral Studio / Mistral API) and select the model `mistral-large-4`. OpenRouter, NVIDIA-hosted endpoints, and Microsoft Foundry also serve the same model and are worth comparing on price, but for a first test the official entry point is the least likely to misstate pricing or parameters.
2. **Check the price first:** Official hosted pricing is $0.70 per million input tokens, $0.07 per million cached input tokens, and $2.10 per million output tokens. Top up a small amount, set a usage cap, then test — don't feed an entire codebase into the 1-million-token window on your first run and burn money finding out what it costs.
3. **Run two comparison tasks:** One coding task (for example, asking the model to find a bug in a code sample and write a patch) and one long-document task (for example, summarizing a long document into key points), and record output quality and token spend for each. Mistral's published scores (FrontierCode 2.0 19.7%, Terminal-Bench 4.0 41%, Cyber Index 51%, Coding Agent Index about 49.8%) are vendor figures; your own test is your own figure.
4. **Decide whether to stay:** If your work is coding, code review, or defensive security analysis and you are price-sensitive, Large 4's hosted price is genuinely cheaper than comparable closed models. If your work is everyday chat or copywriting, there is no reason to pay for a trillion parameters — a smaller model is faster and cheaper. Before committing long-term, judge it on your own tasks, not on leaderboards.

## Costs, risks, and pitfalls

- **Cost:** The weights themselves are free to download. Hosted API: $0.70 input / $2.10 output per million tokens ($0.07 cached input). Local running costs are hardware and electricity, not licensing — don't forget the eight-GPU server in that math.
- **Track record check:** Mistral delivered on its end-of-October promise — preview first, weights on schedule, no slip. But the full technical report was not yet published and all scores are vendor-reported; those are the two biggest "unverified" items here, and this article labels every benchmark score as Mistral's own rather than endorsing it.
- **Pitfalls:** ① Treating "open" as a standard open-source license and reselling hosted access without the separate commercial license; ② downloading trillion-parameter weights onto a home computer and hitting disk, VRAM, and speed walls all at once; ③ treating vendor-reported scores as independent benchmarks before the full technical report appears; ④ assuming a 1-million-token window is free — it is billed per token, so one long-context run can cost real money; set a cap first; ⑤ confusing this week's two stories: Gemini 4 Carbon is currently limited to a subset of defenders with no wider-release date — don't transfer its number-one benchmark ranking onto Large 4's availability.

## Sources

- Mistral Large 4 weights land on Hugging Face (model card Mistral-Large-4-1T-A52B, vLLM/SGLang deployment, hosted pricing): https://www.unite.ai/mistrals-1-trillion-parameter-le-chonk-checkpoint-lands-on-hugging-face/
- Mistral Large 4 open weights explained (license variant, hardware bar, community GGUF builds, vendor-reported benchmarks): https://www.llms.blog/posts/mistral-large-4-open-weights-hugging-face
- AI weekly wrap (Mistral open-sourced October 29, Gemini 4 Carbon limited to vetted defenders, Canada to take Cohere stake, October 30, 2026): https://aiworldwire.org/articles/ai-weekly-wrap-mistral-large-4-canada-cohere/
- Mistral Large 4 open release report (October 29 release, 1 trillion parameters, 49B active, hosted pricing, scores not independently reproduced): https://theaipin.com/science/mistral-releases-open-weights-of-large-4-le-chonk
- October 2026 AI model release tracker (Large 4 listed alongside Gemini 4 Carbon and Genie 4 in the same week): https://www.nocode.mba/ai-release-tracker/2026/10
