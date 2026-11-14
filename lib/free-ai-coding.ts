import data from '../data/free-ai-coding.json';

/**
 * /free-ai-coding section data — synced from the open-source list
 * "awesome-free-ai-coding" (MIT) by scripts/fetch-free-ai-coding.js,
 * which applies this site's editorial filter (official free tiers and
 * established platforms only; no token-resale shops). The JSON is
 * committed, so this module is a pure build-time read.
 */

export interface FreeAiEntry {
  id: string;
  name: string;
  url: string;
  category: string;
  cardRequired: boolean;
  noAccount: boolean;
  trains: string | null;
  offering: string;
  models: string[];
  lastVerified: string | null;
  provisional: boolean;
}

export interface FreeAiSection {
  key: string;
  anchor: string;
  name: string;
  en: string;
  blurb: string;
}

export const FREE_AI_SECTIONS: FreeAiSection[] = [
  {
    key: 'agent-cli',
    anchor: 'agents',
    name: '编程 Agent 与 CLI',
    en: 'Coding Agents & CLIs',
    blurb: '工具自家的免费计划：装上就能用 AI 写代码，上游清单里这一组全部免绑卡。',
  },
  {
    key: 'api-free-tier',
    anchor: 'apis',
    name: '免费 LLM API',
    en: 'LLM APIs with Free Tier',
    blurb: '厂商官方免费层：拿 Key 直接调模型，适合接进自己的 Agent 和小工具。',
  },
  {
    key: 'trial',
    anchor: 'trials',
    name: '限时试用',
    en: 'Trials',
    blurb: '限时额度专区：先看清是否绑卡、什么时候到期，再决定要不要开。',
  },
  {
    key: 'aggregator',
    anchor: 'aggregators',
    name: '聚合平台',
    en: 'Aggregators',
    blurb: '一个 Key 调多家模型。本站只保留少数知名平台，中转、转售类一律不收。',
  },
];

export const FREE_AI_GENERATED: string = data.generated;
export const FREE_AI_SOURCE: string = data.source;

export const FREE_AI_ENTRIES: FreeAiEntry[] = data.entries as FreeAiEntry[];

export function entriesInSection(key: string): FreeAiEntry[] {
  return FREE_AI_ENTRIES.filter((e) => e.category === key);
}
