#!/usr/bin/env node
/**
 * fetch-free-ai-coding — sync the /free-ai-coding section data.
 *
 * Source: the open-source list "awesome-free-ai-coding" by mvalentsev
 * (MIT License) — https://github.com/mvalentsev/awesome-free-ai-coding
 * It probe-verifies every entry twice a week; we consume its machine-
 * readable index.json (never scrape HTML) and apply this site's own
 * editorial filter before anything reaches the page:
 *
 *  - archived entries are dropped;
 *  - categories agent-cli / api-free-tier / trial pass as-is;
 *  - category "aggregator" is allowlist-only (established platforms);
 *  - a small explicit blocklist removes token-resale shops (中转站),
 *    which this site never lists (same red line as PerkRadar).
 *
 * Output: data/free-ai-coding.json (committed, so builds work offline).
 * On fetch failure the existing file is left untouched and the script
 * exits non-zero — callers (GitHub Actions) treat that as "no update".
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const SRC =
  'https://raw.githubusercontent.com/mvalentsev/awesome-free-ai-coding/main/index.json';
const OUT = path.join(__dirname, '..', 'data', 'free-ai-coding.json');

/** Aggregators allowed on this site (established platforms only). */
const AGGREGATOR_ALLOW = new Set([
  'openrouter-free',
  'huggingface-inference',
  'vercel-ai-gateway',
  'requesty',
]);

/** Token-resale shops — never listed, whatever category they sit in. */
const BLOCKLIST = new Set(['cheapllm-shop', 'miapi', 'jzstoken', 'beatapi']);

function keep(e) {
  if (!e || e.archived) return false;
  if (BLOCKLIST.has(e.id)) return false;
  if (e.category === 'aggregator') return AGGREGATOR_ALLOW.has(e.id);
  return ['agent-cli', 'api-free-tier', 'trial'].includes(e.category);
}

function slim(e) {
  const models = (e.models || [])
    .map((m) => (typeof m === 'string' ? m : m.table_name || m.family || null))
    .filter(Boolean);
  return {
    id: e.id,
    name: e.name,
    url: e.url,
    category: e.category,
    cardRequired: !!e.card_required,
    noAccount: !!e.no_account,
    trains: e.data_use && e.data_use.trains ? e.data_use.trains : null,
    offering: (e.offering || '').trim(),
    models,
    lastVerified: e.last_verified || null,
    provisional: !!e.provisional,
  };
}

async function main() {
  const res = await fetch(SRC, { headers: { 'user-agent': 'blog-repo-sync' } });
  if (!res.ok) throw new Error(`fetch ${SRC} -> HTTP ${res.status}`);
  const src = await res.json();
  const entries = (src.entries || []).filter(keep).map(slim);
  const out = {
    generated: new Date().toISOString().slice(0, 10),
    source: 'https://github.com/mvalentsev/awesome-free-ai-coding',
    sourceGenerated: src.generated || null,
    entries,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
  const byCat = {};
  for (const e of entries) byCat[e.category] = (byCat[e.category] || 0) + 1;
  console.log(`free-ai-coding: ${entries.length} entries`, byCat);
}

main().catch((err) => {
  console.error('free-ai-coding sync failed:', err.message);
  process.exit(1);
});
