# MiMo V2.5 Sunset Migration: Your V2.6 Migration Checklist (Retires Oct 21, 2026 at 10:00)

> One-line takeaway: Xiaomi's official notice: `mimo-v2.5-pro` / `mimo-v2.5` retire on Oct 21, 2026 at 10:00 (UTC+8). If your code still references the old model names, spend 10 minutes switching today — requests will fail outright tomorrow.

## What you need

- Code, agent workflows, or tool configs calling the MiMo API with `model` set to `mimo-v2.5-pro` or `mimo-v2.5`
- Ability to edit and fire one test request; run a regression pass before shipping to production

## Step by step

### Step 1: Read the official deprecation notice, memorize the mapping

Xiaomi published a formal deprecation notice in the MiMo open-platform docs. The timeline is unambiguous:

![Xiaomi MiMo official deprecation notice: V2.5 series retires Oct 21 10:00](img/2026-10-20-MiMo下线/step1.png)

- `mimo-v2.5-pro` → `mimo-v2.6-pro` (upgrade: the old one was text-only; the new one understands multimodal input)
- `mimo-v2.5` → `mimo-v2.6-flash` (watch the changed parameter defaults in Step 3)
- Since 18:00 on Oct 14, requests to old names have been **auto-routed** to the new models. **After 10:00 on Oct 21, the old names stop working entirely** — requests error out.

### Step 2: Grep for old model names and swap the IDs

Search your projects for `mimo-v2.5`:

```bash
# find every reference to the old models
grep -rn "mimo-v2.5" --include="*.py" --include="*.ts" --include="*.js" --include="*.json" --include="*.yaml" .
```

Replacement map:

| Old (dead tomorrow) | New (switch to) |
|---|---|
| `mimo-v2.5-pro` | `mimo-v2.6-pro` |
| `mimo-v2.5` | `mimo-v2.6-flash` |

Calling via OpenRouter? The new model IDs there are `Xiaomi: MiMo-V2.6-Pro` (and the Flash counterpart), priced the same as the official API — Pro at $0.435/$0.87 per million input/output tokens, Flash at $0.14/$0.28. Xiaomi says V2.6 keeps previous-gen pricing.

![Xiaomi models on OpenRouter: V2.6 pricing and model list](img/2026-10-20-MiMo下线/step2.png)

### Step 3: Check three parameter changes — don't just swap names

The official notice documents V2.6 behavior changes. A bare model-name swap can silently change behavior:

1. **No more custom `temperature` / `top_p` in thinking mode**: v2.6-flash and v2.6-pro force `temperature: 1.0` and `top_p: 0.95` — anything you pass is ignored. If you tuned sampling params before, delete or comment out that logic.
2. **`max_completion_tokens` default changed**: mimo-v2.5 defaulted to 32768; mimo-v2.6-flash defaults to 131072. If you relied on the default for truncation/pagination, outputs can now be 4× longer — either pass the param explicitly or check downstream handling.
3. **Multimodal is new**: mimo-v2.6-pro accepts image input. If you previously routed around v2.5-pro's text-only limit (e.g., calling a separate vision model), you can simplify the chain.

### Step 4: Regression-test these three things before production

- Long-output tasks: with the bigger default max tokens, check long generations don't blow up downstream consumers
- Multi-step agent tasks: third-party benchmarks scored v2.5-pro 87.5% average on agent tasks (97.9% on coding); Xiaomi claims stronger reasoning for v2.6 — verify with your own task set instead of assuming "newer is better"

![Third-party benchmark: mimo-v2.5-pro agent-task scores](img/2026-10-20-MiMo下线/step3.png)

- Billing: prices are unchanged, but longer outputs = more tokens = bigger bills. Glance at your usage dashboard.

## Notes, costs, pitfalls

- **The deadline is tomorrow 10:00 (UTC+8)**: auto-routing since Oct 14 was only a transition. After that, old names hard-fail. Cron jobs and scheduled tasks with hardcoded model names are the easiest to miss — grep everything (Step 1's command).
- **Same price ≠ same bill**: unit prices didn't change, but the 4× larger default max tokens means more output tokens per call. Cost-sensitive workloads should pass `max_completion_tokens` explicitly.
- **Silent thinking-param failure is the sneakiest**: passing temperature/top_p doesn't error — it's just ignored, so behavior differs from what you expect. Check this first when debugging.
- **OpenRouter users**: model names carry the `Xiaomi:` prefix — don't confuse with the direct-API names `mimo-v2.6-pro`. OpenRouter also makes it easy to A/B against other models, but watch cache hit rates — they materially affect your real bill.

## Sources

- Xiaomi MiMo official deprecation notice (migration map + parameter changes): https://mimo.mi.com/docs/en-US/updates/deprecate
- Xiaomi models on OpenRouter (V2.6 pricing and model list): https://openrouter.ai/provider/xiaomi
- Third-party benchmark (mimo-v2.5-pro agent-task scores): https://kilo.ai/models/xiaomi-mimo-v2-5-pro
- Sunset news report (Oct 12, 2026): https://www.binance.com/fr-AF/square/post/376356828991380
