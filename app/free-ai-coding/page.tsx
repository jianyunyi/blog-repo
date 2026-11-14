import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/articles';
import {
  FREE_AI_ENTRIES,
  FREE_AI_GENERATED,
  FREE_AI_SECTIONS,
  FREE_AI_SOURCE,
  entriesInSection,
} from '@/lib/free-ai-coding';
import { FreeAiCard } from '@/components/free-ai-card';
import { JsonLd } from '@/components/json-ld';

/**
 * /free-ai-coding — a living directory of legal free AI coding tools
 * and LLM APIs. Data comes from the open-source, probe-verified list
 * "awesome-free-ai-coding" (MIT), synced weekly by
 * scripts/fetch-free-ai-coding.js with this site's editorial filter
 * applied (official free tiers + established platforms only).
 * Layout/classes mirror app/categories/[key]/page.tsx 1:1 so the
 * section inherits the main site's design system unchanged.
 */

const TOTAL = FREE_AI_ENTRIES.length;
const NO_CARD = FREE_AI_ENTRIES.filter((e) => !e.cardRequired).length;
const CANONICAL = `${SITE_URL}/free-ai-coding`;
const DESCRIPTION = `免费 AI 编程与 API 清单共 ${TOTAL} 条（其中 ${NO_CARD} 条免绑卡）：编程 Agent、厂商官方免费 API、限时试用与聚合平台，全部经开源清单每周两次探针实测、本站二次筛选，标注验证日期与免费模型。`;

export const metadata: Metadata = {
  title: '免费 AI 编程与 API 清单 · 出海实操教程',
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: '免费 AI 编程与 API 清单 · 出海实操教程',
    description: DESCRIPTION,
    type: 'website',
    url: CANONICAL,
  },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: '「免绑卡」是什么意思？',
    a: '指注册并使用免费档不需要绑定信用卡。标「需绑卡」的条目多为限时试用，开通前先看清到期时间和自动续费规则，别让试用变扣费。',
  },
  {
    q: '数据多久更新一次？每条的「验证」日期是什么？',
    a: '上游开源清单每周两次用探针逐条实测每个免费档是否还有效，失效的会移入存档；本站每周自动同步一次。卡片上的「验证」日期，就是该条目最近一次通过上游实测的日期。',
  },
  {
    q: '为什么有些聚合站、中转站不在清单里？',
    a: '本站只收录厂商官方免费档、工具自家的免费计划，以及少数知名聚合平台；靠转售 API Key、代充账号起家的中转站一律不收——这是本站一贯的红线，和每日羊毛雷达的筛选标准一致。',
  },
  {
    q: '免费 API 拿来能干什么？',
    a: '最常见的用法是接进 Claude Code、Codex、OpenCode 这类编程 Agent 当免费通道，或者给自己的小工具、机器人当模型后端。本站「AI 工具」分类里有 Groq、GitHub Copilot 学生包等单项实测教程，可以配合着看。',
  },
];

export default function FreeAiCodingPage() {
  const collectionPageLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '免费 AI 编程与 API 清单',
    description: DESCRIPTION,
    url: CANONICAL,
    isPartOf: { '@type': 'WebSite', name: '出海实操教程', url: SITE_URL },
  };
  const faqPageLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: '免费 AI 编程与 API 清单',
        item: CANONICAL,
      },
    ],
  };

  return (
    <div className="lp-page">
      <JsonLd data={collectionPageLd} />
      <JsonLd data={faqPageLd} />
      <JsonLd data={breadcrumbLd} />
      <section className="lp-hero">
        <span className="lp-kicker">免费资源 · 每周同步实测</span>
        <h1
          className="lp-title"
          style={{
            fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
          }}
        >
          免费 AI 编程与 API 清单
        </h1>
        <p className="lp-sub">
          共 {TOTAL} 条，其中 {NO_CARD} 条免绑卡：
          {FREE_AI_SECTIONS.map((s) => s.name).join('、')}
          。全部来自开源清单的探针实测，本站二次筛选后同步，条条标注验证日期。
        </p>
      </section>
      <section className="lp-intro" aria-label="清单说明">
        <p>
          这份清单的数据来自开源项目 awesome-free-ai-coding（MIT
          协议）：维护者每周两次用自动化探针逐条实测每个免费档是否还活着，失效的移入存档、不再展示。本站每周自动同步它的结构化数据（本页数据生成于{' '}
          {FREE_AI_GENERATED}
          ），所以这里看到的不是攒了几年的死名单，而是上周刚验证过的活清单。
        </p>
        <p>
          同步时本站再筛一道：只收厂商官方免费档、工具自家的免费计划和少数知名聚合平台，中转、转售类一律不收。每张卡片标注是否需要绑卡、最近验证日期和可用的免费模型；带
          🧪 的是上游观察期条目（刚通过两周探针期）。免费额度随时可能调整，动手前请以各家官网为准。
        </p>
      </section>
      <nav className="lp-toc" aria-label="清单目录">
        {FREE_AI_SECTIONS.map((s) => (
          <a key={s.key} href={`#${s.anchor}`}>
            {s.name} · {entriesInSection(s.key).length} 条
          </a>
        ))}
      </nav>
      {FREE_AI_SECTIONS.map((s) => {
        const entries = entriesInSection(s.key);
        if (entries.length === 0) return null;
        return (
          <section key={s.key} className="lp-cat" id={s.anchor}>
            <div className="lp-cat-head">
              <h2
                className="lp-cat-name"
                style={{
                  fontFamily:
                    "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
                }}
              >
                {s.name}
              </h2>
              <span className="lp-cat-count">
                {s.en} · {entries.length} 条
              </span>
            </div>
            <p className="lp-note" style={{ textAlign: 'left' }}>
              {s.blurb}
            </p>
            <div className="lp-grid">
              {entries.map((e) => (
                <FreeAiCard key={e.id} entry={e} />
              ))}
            </div>
          </section>
        );
      })}
      <section className="lp-faq" aria-label="常见问题">
        <h2
          className="lp-faq-title"
          style={{
            fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
          }}
        >
          常见问题
        </h2>
        {FAQ.map(({ q, a }) => (
          <div key={q} className="lp-faq-item">
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}
      </section>
      <p className="lp-note">
        数据来源：<a href={FREE_AI_SOURCE}>awesome-free-ai-coding</a>
        （MIT 协议，作者 mvalentsev），本站同步与筛选脚本随本站源码一同公开。单项实测教程见{' '}
        <a href="/categories/ai-tools">AI 工具分类</a>，或回到{' '}
        <a href="/categories">全部教程分类</a>。
      </p>
    </div>
  );
}
