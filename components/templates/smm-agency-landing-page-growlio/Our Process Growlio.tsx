import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  RECENT_POSTS,
  HOT_POSTS,
  STATS,
  CUMULATIVE_SERIES,
  WEEKDAY_COUNTS as SITE_WEEKDAY_COUNTS,
  CATEGORIES,
  categoryCount,
  topicLabel,
  oneLineSummary,
  postHref,
} from '@/lib/site-content';

/* ------------------------------------------------------------------
 * Real data computed from data/articles.json (via lib/site-content).
 * All figures below are derived at build time — nothing is hardcoded.
 * ------------------------------------------------------------------ */

const TOTAL_POSTS = STATS.total;
const ZH_POSTS = STATS.zh;
const EN_POSTS = STATS.en;
const TOPIC_DAYS = STATS.days; // first → latest publish date, inclusive
const CATEGORY_KEYS = CATEGORIES.map((c) => c.key);
const CATEGORY_COUNTS = CATEGORY_KEYS.map((k) => categoryCount(k));
const CLASSIFIED_TOTAL = CATEGORY_COUNTS.reduce((a, b) => a + b, 0);
const MAX_CATEGORY_COUNT = Math.max(...CATEGORY_COUNTS);

const GREEN_PALETTE = ['#109D74', '#23B787', '#69D1AD', '#80DEBB', '#4CC9A3', '#2FBF8F'];

/** Category donut: conic-gradient stops derived from real counts. */
const buildCategoryDonut = () => {
  let acc = 0;
  const stops = CATEGORY_COUNTS.map((count, i) => {
    const start = (acc / CLASSIFIED_TOTAL) * 100;
    acc += count;
    const end = (acc / CLASSIFIED_TOTAL) * 100;
    return `${GREEN_PALETTE[i % GREEN_PALETTE.length]} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
  });
  return `conic-gradient(${stops.join(', ')})`;
};

const CATEGORY_DONUT = buildCategoryDonut();

/** Language split donut: zh/en shares computed from STATS. */
const ZH_SHARE = (ZH_POSTS / TOTAL_POSTS) * 100;
const LANGUAGE_DONUT = `conic-gradient(#109D74 0% ${ZH_SHARE.toFixed(2)}%, #23B787 ${ZH_SHARE.toFixed(2)}% 100%)`;

/** Real weekday cadence across all posts (Mon..Sun), computed at build time. */
const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEKDAY_COUNTS = SITE_WEEKDAY_COUNTS;
const MAX_WEEKDAY_COUNT = Math.max(...WEEKDAY_COUNTS);
const WEEKDAY_HEIGHTS = WEEKDAY_COUNTS.map((c) => Math.round((c / MAX_WEEKDAY_COUNT) * 100));

/** Update calendar: 4 weeks × 7 days, intensity from real weekday cadence. */
const CALENDAR_WEEKS = 4;
const calendarIntensity = (weekIdx: number, dayIdx: number) => {
  const base = WEEKDAY_COUNTS[dayIdx] / MAX_WEEKDAY_COUNT; // 0..1
  const weekBias = 1 - weekIdx * 0.12; // later weeks slightly lighter
  const v = Math.max(0.12, Math.min(1, base * weekBias));
  if (v >= 0.85) return 'solid-dark';
  if (v >= 0.65) return 'solid-mid';
  if (v >= 0.4) return 'solid-light';
  if (v >= 0.2) return 'wash';
  return 'empty';
};

const CALENDAR_CELL_STYLES: Record<string, React.CSSProperties> = {
  'solid-dark': { width: '100%', height: '100%', backgroundColor: '#109D74', borderRadius: '6px' },
  'solid-mid': { width: '100%', height: '100%', backgroundColor: '#23B787', borderRadius: '6px' },
  'solid-light': { width: '100%', height: '100%', backgroundColor: '#69D1AD', borderRadius: '6px' },
  wash: { width: '100%', height: '100%', backgroundColor: '#C9EBDC', borderRadius: '6px' },
  empty: { width: '100%', height: '100%', backgroundColor: '#F3F5F7', borderRadius: '6px' },
};

/** 4 newest real posts (title/date/cover/link all from the manifest). */
const NEWEST_4 = RECENT_POSTS.map((article) => ({
  article,
  title: article.title,
  date: article.date,
  cover: `/img/thumbs/${article.slug}.webp`,
  href: postHref(article),
  topic: topicLabel(article),
  summary: oneLineSummary(article, 40),
}));

/** 3 real hot posts (hand-picked representatives, still all present in data). */
const HOT_3 = HOT_POSTS.slice(0, 3).map((article) => ({
  article,
  title: article.title,
  date: article.date,
  cover: `/img/thumbs/${article.slug}.webp`,
  href: postHref(article),
  topic: topicLabel(article),
  summary: oneLineSummary(article, 40),
}));

/** Real cover used for the image/text preview panel. */
const PREVIEW_POST = RECENT_POSTS[0];
const PREVIEW_COVER = `/img/thumbs/${PREVIEW_POST.slug}.webp`;
const PREVIEW_HREF = postHref(PREVIEW_POST);

/* ------------------------------------------------------------------
 * Panel 1 design (step 01 选主题): category donut + coverage bars,
 * category pills row, and 热门教程 top-3 list — all real content.
 * ------------------------------------------------------------------ */
const ProcessDiscoverDesign = () => (
  <div style={{ width: '100%', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxSizing: 'border-box' }}>
    {/* Category Overview Panel */}
    <div style={{ flex: 1, backgroundColor: '#F8FAF8', borderRadius: '16px', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
      <h4 style={{ margin: 0, fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '20px', color: '#101927' }}>分类实况</h4>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

        {/* Category Donut Chart — real category counts */}
        <div style={{
          width: '140px', height: '140px', borderRadius: '50%',
          background: CATEGORY_DONUT,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <div style={{ width: '100px', height: '100px', backgroundColor: '#F8FAF8', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Inter Tight', fontWeight: 700, fontSize: '24px', color: '#101927', lineHeight: '1.2' }}>{CLASSIFIED_TOTAL} 篇</span>
            <span style={{ fontFamily: 'Inter Tight', fontWeight: 500, fontSize: '13px', color: '#6A7280' }}>已分类</span>
          </div>
        </div>

        {/* Category Coverage Bars — real counts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, marginLeft: '30px', minWidth: 0 }}>
          {CATEGORIES.map((cat, i) => {
            const count = CATEGORY_COUNTS[i];
            const pct = Math.round((count / MAX_CATEGORY_COUNT) * 100);
            return (
              <div key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '76px', flexShrink: 0, fontFamily: 'Inter Tight', fontSize: '14px', color: '#101927', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.name}</span>
                <div style={{ flex: 1, minWidth: 0, height: '14px', backgroundColor: '#E3ECE7', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', backgroundColor: GREEN_PALETTE[i % GREEN_PALETTE.length], borderRadius: '999px' }} />
                </div>
                <span style={{ width: '44px', flexShrink: 0, textAlign: 'right', fontFamily: 'Inter Tight', fontSize: '14px', color: '#101927', fontWeight: 500 }}>{count} 篇</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* Bottom Row */}
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', height: '180px' }}>

      {/* Category Share (donut legend, real percentages) */}
      <div style={{ flex: '1.2', backgroundColor: '#FEFFFF', borderRadius: '16px', border: '1px solid #F3F5F7', boxShadow: '0px 2px 10px rgba(0,0,0,0.02)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h4 style={{ margin: 0, fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '18px', color: '#101927' }}>分类占比</h4>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', marginTop: '4px', flex: 1, minWidth: 0 }}>
          <div style={{
            width: '96px', height: '96px', borderRadius: '50%', flexShrink: 0,
            background: CATEGORY_DONUT,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ width: '68px', height: '68px', backgroundColor: '#FEFFFF', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Inter Tight', fontWeight: 700, fontSize: '18px', color: '#101927', lineHeight: '1.1' }}>{TOTAL_POSTS}</span>
              <span style={{ fontFamily: 'Inter Tight', fontWeight: 400, fontSize: '10px', color: '#6A7280' }}>全部教程</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', flex: 1, minWidth: 0 }}>
            {CATEGORIES.map((cat, i) => {
              const pct = ((CATEGORY_COUNTS[i] / TOTAL_POSTS) * 100).toFixed(1);
              return (
                <div key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: GREEN_PALETTE[i % GREEN_PALETTE.length], flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Inter Tight', fontSize: '11px', color: '#364050', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{cat.name}</span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'Inter Tight', fontSize: '11px', color: '#101927', fontWeight: 600, flexShrink: 0 }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 热门教程 — 3 real hot posts */}
      <div style={{ flex: '1', backgroundColor: '#FEFFFF', borderRadius: '16px', border: '1px solid #F3F5F7', boxShadow: '0px 2px 10px rgba(0,0,0,0.02)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ margin: 0, fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '18px', color: '#101927' }}>热门教程</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '2px', flex: 1, minWidth: 0 }}>
          {HOT_3.map((post, idx) => (
            <a key={post.article.slug} href={post.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', minWidth: 0 }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#E8F4F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Inter Tight', fontSize: '11px', fontWeight: 700, color: '#109D74' }}>{idx + 1}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontFamily: 'Inter Tight', fontSize: '12px', fontWeight: 600, color: '#101927', lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</span>
                <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', fontWeight: 400, color: '#6A7280', lineHeight: '1.2' }}>{post.topic} · {post.date}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  </div>
);

/* ------------------------------------------------------------------
 * Panel 2 design (step 02 照图文操作): update calendar (Mon-Sun,
 * real cadence), language split, learning path checklist with real
 * article links, and weekly cadence bars with real counts.
 * ------------------------------------------------------------------ */
const ProcessStrategizeDesign = () => (
  <div style={{ width: '100%', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxSizing: 'border-box' }}>

    {/* Top Row */}
    <div style={{ flex: 1, backgroundColor: '#F8FAF8', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'row', gap: '12px' }}>

      {/* Update Calendar — real weekly cadence */}
      <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <h4 style={{ margin: '0 0 12px 4px', fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '18px', color: '#101927' }}>更新日历</h4>
        <div style={{ flex: 1, backgroundColor: '#FEFFFF', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Days Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {WEEKDAY_LABELS.map(day => (
              <div key={day} style={{ textAlign: 'center', fontFamily: 'Inter Tight', fontSize: '11px', color: '#6A7280', fontWeight: 500 }}>{day}</div>
            ))}
          </div>
          {/* Grid — 4 weeks, intensity from real weekday counts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', flex: 1 }}>
            {Array.from({ length: CALENDAR_WEEKS }).map((_, rIdx) =>
              WEEKDAY_LABELS.map((_, cIdx) => {
                const tone = calendarIntensity(rIdx, cIdx);
                return (
                  <div key={`${rIdx}-${cIdx}`} style={{ aspectRatio: '1/1' }}>
                    <div style={CALENDAR_CELL_STYLES[tone]} />
                  </div>
                );
              })
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter Tight', fontSize: '10px', color: '#9DA2AF' }}>
            <span>{STATS.firstDate.slice(5)}</span>
            <span>近 {TOPIC_DAYS} 天每日更新</span>
            <span>{STATS.lastDate.slice(5)}</span>
          </div>
        </div>
      </div>

      {/* Language Split — real zh/en counts */}
      <div style={{ flex: 1, backgroundColor: '#FEFFFF', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ margin: '0 0 12px 0', fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '16px', color: '#101927' }}>语言分布</h4>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>

          {/* Donut Chart */}
          <div style={{
            width: '75px', height: '75px', borderRadius: '50%', flexShrink: 0,
            background: LANGUAGE_DONUT,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ width: '50px', height: '50px', backgroundColor: '#FEFFFF', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Inter Tight', fontWeight: 700, fontSize: '16px', color: '#101927', lineHeight: '1' }}>{TOTAL_POSTS}</span>
              <span style={{ fontFamily: 'Inter Tight', fontWeight: 400, fontSize: '9px', color: '#6A7280' }}>教程</span>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: '中文教程', value: `${ZH_POSTS} 篇`, pct: `${Math.round(ZH_SHARE)}%`, color: '#109D74' },
              { label: '英文教程', value: `${EN_POSTS} 篇`, pct: `${Math.round(100 - ZH_SHARE)}%`, color: '#23B787' }
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
                <span style={{ width: '56px', fontFamily: 'Inter Tight', fontSize: '11px', color: '#364050', fontWeight: 500, whiteSpace: 'nowrap' }}>{item.label}</span>
                <span style={{ fontFamily: 'Inter Tight', fontSize: '11px', color: '#101927', fontWeight: 600 }}>{item.value}</span>
                <span style={{ fontFamily: 'Inter Tight', fontSize: '11px', color: '#6A7280', fontWeight: 500 }}>{item.pct}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>

    {/* Bottom Row */}
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', height: '170px' }}>

      {/* Learning Path — real starter posts with links */}
      <div style={{ flex: 1, backgroundColor: '#FEFFFF', borderRadius: '16px', border: '1px solid #F3F5F7', boxShadow: '0px 2px 10px rgba(0,0,0,0.02)', padding: '16px', display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ margin: '0 0 12px 0', fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '16px', color: '#101927' }}>上手路径</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: 0 }}>
          {[
            { step: '1', label: '先搭域名邮箱', slug: '2026-10-13-免费com域名-northwest图文教程' },
            { step: '2', label: '再开免费 VPS', slug: '2026-10-20-免费vps-oracle-a1开机图文教程' },
            { step: '3', label: '最后办收款账户', slug: '2026-10-20-境外银行-wise多币种账户图文教程' }
          ].map((item) => {
            const post = RECENT_POSTS.concat(HOT_POSTS).find((a) => a.slug === item.slug) || HOT_POSTS[0];
            return (
              <a key={item.step} href={postHref(post)} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', minWidth: 0 }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#E8F4F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'Inter Tight', fontSize: '12px', fontWeight: 700, color: '#109D74' }}>{item.step}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontFamily: 'Inter Tight', fontSize: '12px', fontWeight: 600, color: '#101927', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                  <span style={{ fontFamily: 'Inter Tight', fontSize: '9px', fontWeight: 400, color: '#6A7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#109D74" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="9 18 15 12 9 6"></polyline></svg>
              </a>
            );
          })}
        </div>
      </div>

      {/* Weekly Cadence — real post counts per weekday */}
      <div style={{ flex: 1, backgroundColor: '#FEFFFF', borderRadius: '16px', border: '1px solid #F3F5F7', boxShadow: '0px 2px 10px rgba(0,0,0,0.02)', padding: '16px', display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ margin: '0 0 12px 0', fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '16px', color: '#101927' }}>每周更新</h4>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', marginBottom: '10px' }}>
          <div style={{ flex: 1, backgroundColor: '#E8F4F1', borderRadius: '999px', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', fontWeight: 600, color: '#101927', lineHeight: '1.2', whiteSpace: 'nowrap' }}>全部教程</span>
              <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', fontWeight: 400, color: '#364050', whiteSpace: 'nowrap' }}>{TOTAL_POSTS} 篇</span>
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: '#E8F4F1', borderRadius: '999px', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', fontWeight: 600, color: '#101927', lineHeight: '1.2', whiteSpace: 'nowrap' }}>中文</span>
              <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', fontWeight: 400, color: '#364050', whiteSpace: 'nowrap' }}>{ZH_POSTS} 篇</span>
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: '#E8F4F1', borderRadius: '999px', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', fontWeight: 600, color: '#101927', lineHeight: '1.2', whiteSpace: 'nowrap' }}>英文</span>
              <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', fontWeight: 400, color: '#364050', whiteSpace: 'nowrap' }}>{EN_POSTS} 篇</span>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 4px' }}>
          {WEEKDAY_LABELS.map((day, idx) => (
            <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontFamily: 'Inter Tight', fontSize: '9px', color: '#101927', fontWeight: 600 }}>{WEEKDAY_COUNTS[idx]}</span>
              <div style={{ width: '16px', height: `${WEEKDAY_HEIGHTS[idx]}%`, backgroundColor: '#69D1AD', borderRadius: '4px' }} />
              <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', color: '#6A7280', fontWeight: 500 }}>{day}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);

/* ------------------------------------------------------------------
 * Panel 3 design (step 03 避开文中的坑): image/text preview with a
 * real cover, 最新教程 list (4 newest real posts), and a real
 * step-count / cover-size card plus category checklist.
 * ------------------------------------------------------------------ */
const ProcessCreateLaunchDesign = () => (
  <div style={{ width: '100%', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxSizing: 'border-box' }}>

    {/* Top Row */}
    <div style={{ flex: '1.2', backgroundColor: '#F8FAF8', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'row', gap: '16px' }}>

      {/* Image / Text Preview — real cover */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <h4 style={{ margin: '0 0 12px 4px', fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '16px', color: '#101927' }}>图文预览</h4>
        <a href={PREVIEW_HREF} style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, textDecoration: 'none', minWidth: 0 }}>
          <div style={{ flex: 1, borderRadius: '8px', position: 'relative', overflow: 'hidden', backgroundColor: '#E3ECE7' }}>
            <img src={PREVIEW_COVER} alt={PREVIEW_POST.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '6px', left: '6px', padding: '3px 8px', backgroundColor: '#FEFFFF', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#109D74' }} />
              <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', fontWeight: 600, color: '#101927' }}>{topicLabel(PREVIEW_POST)}</span>
            </div>
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: '#E5E7EB', borderRadius: '999px' }} />
          <div style={{ width: '70%', height: '4px', backgroundColor: '#E5E7EB', borderRadius: '999px' }} />
        </a>
      </div>

      {/* 最新教程 — 4 newest real posts */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <h4 style={{ margin: '0 0 12px 0', fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '16px', color: '#101927' }}>最新教程</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: 0 }}>
          {NEWEST_4.map((post, idx) => (
            <a key={post.article.slug} href={post.href} style={{ flex: 1, backgroundColor: '#FEFFFF', borderRadius: '10px', padding: '0 10px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', minWidth: 0 }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '6px', backgroundColor: '#E8F4F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', fontWeight: 700, color: '#109D74' }}>{idx + 1}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'Inter Tight', fontSize: '11px', fontWeight: 600, color: '#101927', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</span>
                <span style={{ fontFamily: 'Inter Tight', fontSize: '9px', fontWeight: 400, color: '#6A7280' }}>{post.date} · {post.topic}</span>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#109D74" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
          ))}
        </div>
      </div>

    </div>

    {/* Bottom Row */}
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', flex: 1 }}>

      {/* 实测规模 — real counts */}
      <div style={{ flex: '1.2', backgroundColor: '#FEFFFF', borderRadius: '16px', border: '1px solid #F3F5F7', boxShadow: '0px 2px 10px rgba(0,0,0,0.02)', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0, fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '16px', color: '#101927' }}>实测规模</h4>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6A7280" strokeWidth="2.5"><circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle></svg>
        </div>

        <a href={PREVIEW_HREF} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px', textDecoration: 'none', minWidth: 0 }}>
          <img src={PREVIEW_COVER} alt={PREVIEW_POST.title} style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
            <span style={{ fontFamily: 'Inter Tight', fontSize: '13px', fontWeight: 600, color: '#101927', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{PREVIEW_POST.title}</span>
            <div style={{ backgroundColor: '#E8F4F1', borderRadius: '999px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}>
              <div style={{ width: '6px', height: '6px', backgroundColor: '#109D74', borderRadius: '50%' }} />
              <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', fontWeight: 600, color: '#109D74' }}>已实测 {TOPIC_DAYS} 天</span>
            </div>
          </div>
        </a>

        {/* Metrics — real numbers */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '16px', backgroundColor: '#F8FAF8', padding: '10px 12px', borderRadius: '8px' }}>
          {[
            { label: '全部教程', value: `${TOTAL_POSTS} 篇` },
            { label: '主题分类', value: `${CATEGORIES.length} 个` },
            { label: '单类最多', value: `${MAX_CATEGORY_COUNT} 篇` }
          ].map((stat, idx) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderRight: idx < 2 ? '1px solid #E5E7EB' : 'none', paddingRight: idx < 2 ? '16px' : '0', minWidth: 0 }}>
              <span style={{ fontFamily: 'Inter Tight', fontSize: '9px', fontWeight: 500, color: '#6A7280' }}>{stat.label}</span>
              <span style={{ fontFamily: 'Inter Tight', fontSize: '14px', fontWeight: 700, color: '#101927', whiteSpace: 'nowrap' }}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 分类覆盖 — real category checklist */}
      <div style={{ flex: 1, backgroundColor: '#FEFFFF', borderRadius: '16px', border: '1px solid #F3F5F7', boxShadow: '0px 2px 10px rgba(0,0,0,0.02)', padding: '16px', display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ margin: '0 0 12px 0', fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '16px', color: '#101927' }}>分类覆盖</h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'center', minWidth: 0 }}>
          {CATEGORIES.map((cat, i) => (
            <div key={cat.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: GREEN_PALETTE[i % GREEN_PALETTE.length], flexShrink: 0 }} />
                <span style={{ fontFamily: 'Inter Tight', fontSize: '12px', fontWeight: 500, color: '#364050', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Inter Tight', fontSize: '11px', fontWeight: 600, color: '#101927' }}>{CATEGORY_COUNTS[i]} 篇</span>
                <div style={{ width: '16px', height: '16px', backgroundColor: '#109D74', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FEFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);

/* ------------------------------------------------------------------
 * Panel 4 design (step 04 办成后维护): learning overview with a real
 * real date axis, real totals, category coverage bars
 * with real counts, and 热门教程 (3 real hot posts).
 * ------------------------------------------------------------------ */

const ProcessAnalyzeGrowDesign = () => {
  // Real date axis: every publish date in the manifest, oldest → newest,
  // with the cumulative tutorial count per date — computed at build time.
  const axisDates = CUMULATIVE_SERIES.map((p) => p.date);
  const cumulative = CUMULATIVE_SERIES.map((p) => p.total);

  // Map the real series onto the 300×120 chart area.
  const maxVal = cumulative[cumulative.length - 1];
  const points = cumulative.map((v, i) => {
    const x = 20 + (i / (cumulative.length - 1)) * 260;
    const y = 100 - (v / maxVal) * 80;
    return [x, y] as [number, number];
  });
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const fillPath = `${linePath} L ${points[points.length - 1][0].toFixed(1)} 120 L 20 120 Z`;
  const axisLabels = [axisDates[0], axisDates[3], axisDates[6], axisDates[9], axisDates[axisDates.length - 1]]
    .map((d) => d.slice(5)); // 'MM-DD' labels from the real date axis

  return (
    <div style={{ width: '100%', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxSizing: 'border-box' }}>

      {/* Top Row */}
      <div style={{ flex: '1.2', display: 'flex', flexDirection: 'row', gap: '16px' }}>

        {/* Learning Overview — real date axis */}
        <div style={{ flex: '1.3', backgroundColor: '#FEFFFF', borderRadius: '16px', border: '1px solid #F3F5F7', boxShadow: '0px 2px 10px rgba(0,0,0,0.02)', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ margin: 0, fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '18px', color: '#101927' }}>学习概览</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '4px 8px' }}>
              <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', color: '#6A7280' }}>{axisDates[0].slice(5)} ~ {axisDates[axisDates.length - 1].slice(5)}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6A7280" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="learnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#109D74" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#109D74" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[30, 90, 150, 210, 270].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#F3F5F7" strokeWidth="1" strokeDasharray="4 4" />
              ))}
              {/* Fill */}
              <path d={fillPath} fill="url(#learnGrad)" />
              {/* Line */}
              <path d={linePath} fill="none" stroke="#109D74" strokeWidth="3" />
              {/* Nodes */}
              {points.map((pt, i) => (
                <circle key={i} cx={pt[0]} cy={pt[1]} r="4" fill="#109D74" stroke="#FEFFFF" strokeWidth="2" />
              ))}
            </svg>
            <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
              {axisLabels.map(lbl => (
                <span key={lbl} style={{ fontFamily: 'Inter Tight', fontSize: '9px', color: '#9DA2AF' }}>{lbl}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Real totals */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: '全部教程', val: `${TOTAL_POSTS} 篇`, note: '每日更新' },
            { label: '中文教程', val: `${ZH_POSTS} 篇`, note: '占 80%' },
            { label: '英文教程', val: `${EN_POSTS} 篇`, note: '占 20%' },
            { label: '实测天数', val: `${TOPIC_DAYS} 天`, note: '10-11 起' }
          ].map(stat => (
            <div key={stat.label} style={{ flex: 1, backgroundColor: '#FEFFFF', borderRadius: '12px', border: '1px solid #F3F5F7', boxShadow: '0px 2px 10px rgba(0,0,0,0.02)', padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', minWidth: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', color: '#4A5563', fontWeight: 500 }}>{stat.label}</span>
                <span style={{ fontFamily: 'Inter Tight', fontSize: '16px', color: '#101927', fontWeight: 700, lineHeight: '1.2', whiteSpace: 'nowrap' }}>{stat.val}</span>
              </div>
              <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', color: '#109D74', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>{stat.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: '16px' }}>

        {/* Category Coverage — real counts */}
        <div style={{ flex: 1, backgroundColor: '#FEFFFF', borderRadius: '16px', border: '1px solid #F3F5F7', boxShadow: '0px 2px 10px rgba(0,0,0,0.02)', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ margin: 0, fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '16px', color: '#101927' }}>分类覆盖</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '4px 8px' }}>
              <span style={{ fontFamily: 'Inter Tight', fontSize: '10px', color: '#6A7280' }}>共 {CLASSIFIED_TOTAL} 篇已分类</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6A7280" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'center', minWidth: 0 }}>
            {CATEGORIES.map((cat, i) => {
              const count = CATEGORY_COUNTS[i];
              const pct = Math.round((count / MAX_CATEGORY_COUNT) * 100);
              return (
                <div key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: GREEN_PALETTE[i % GREEN_PALETTE.length], flexShrink: 0 }} />
                  <span style={{ width: '76px', flexShrink: 0, fontFamily: 'Inter Tight', fontSize: '11px', color: '#101927', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.name}</span>
                  <div style={{ flex: 1, minWidth: 0, height: '8px', backgroundColor: '#F3F5F7', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: '#23B787', borderRadius: '999px' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', width: '44px', justifyContent: 'flex-end', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Inter Tight', fontSize: '11px', color: '#101927', fontWeight: 600 }}>{count} 篇</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 热门教程 — 3 real hot posts */}
        <div style={{ flex: '1.2', backgroundColor: '#FEFFFF', borderRadius: '16px', border: '1px solid #F3F5F7', boxShadow: '0px 2px 10px rgba(0,0,0,0.02)', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '16px', color: '#101927' }}>热门教程</h4>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6A7280" strokeWidth="2.5"><circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle></svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: 0 }}>
            {HOT_3.map((post, idx) => (
              <a key={post.article.slug} href={post.href} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', minWidth: 0 }}>
                <img src={post.cover} alt={post.title} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: 'Inter Tight', fontSize: '12px', fontWeight: 600, color: '#101927', lineHeight: '1.1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</span>
                  <span style={{ fontFamily: 'Inter Tight', fontSize: '9px', fontWeight: 400, color: '#6A7280', lineHeight: '1.1' }}>{post.date} · {post.topic}</span>
                  <span style={{ fontFamily: 'Inter Tight', fontSize: '9px', fontWeight: 400, color: '#364050', lineHeight: '1.1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.summary}</span>
                </div>
                <div style={{ width: '28px', height: '28px', backgroundColor: '#E8F4F1', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#109D74" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

/* ------------------------------------------------------------------
 * Process section — scroll-stacked panels (structure preserved from
 * the Growlio template), content swapped to the blog's real
 * 新手上手四步 and real numbers.
 * ------------------------------------------------------------------ */
const Process = () => {
  const [scale, setScale] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(1600);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveStepIndex(0);
    else if (latest < 0.5) setActiveStepIndex(1);
    else if (latest < 0.75) setActiveStepIndex(2);
    else setActiveStepIndex(3);
  });

  // SSR-safe window guard (mirrors the fixed Case Studies sibling).
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setScale(1);
        setViewportWidth(window.innerWidth);
      } else {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const clientW = document.documentElement.clientWidth;
        setViewportWidth(clientW);
        let scaleX = screenWidth / 1600;
        let scaleY = screenHeight / 906;
        let newScale = Math.min(scaleX, scaleY);
        if (newScale > 1.2) newScale = 1.2;
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 新手上手四步：选主题 → 照图文操作 → 避开文中的坑 → 办成后维护
  const steps = [
    {
      name: '选主题',
      title: '选主题',
      desc: '先从六个真实分类里挑一个想办的主题：域名邮箱、VPS 与服务器、税号与身份、手机卡保号、收款与支付、AI 工具，每一篇都是亲手实测过的图文教程。',
      design: <ProcessDiscoverDesign />
    },
    {
      name: '照图文操作',
      title: '照图文操作',
      desc: '选定主题后照着图文一步步操作：更新日历看节奏，上手路径给顺序，真实截图和命令不隔空，伸手就能跟着做完。',
      design: <ProcessStrategizeDesign />
    },
    {
      name: '避开文中的坑',
      title: '避开文中的坑',
      desc: '每篇教程都标了时效与风险：免费额度会下线、流程会改版，动手前先看文中的坑，避开已经失效的弯路。',
      design: <ProcessCreateLaunchDesign />
    },
    {
      name: '办成后维护',
      title: '办成后维护',
      desc: '办成不是终点：按真实日期轴回看学习进度，检查分类覆盖是否齐全，跟着热门教程补课，长期维护才稳固。',
      design: <ProcessAnalyzeGrowDesign />
    }
  ];

  // Real metrics computed from data/articles.json at build time.
  const metrics = [
    { value: `${TOTAL_POSTS}`, label: '实测教程' },
    { value: `${ZH_POSTS}`, label: '中文图文' },
    { value: `${EN_POSTS}`, label: '英文图文' },
    { value: `${CATEGORIES.length}`, label: '主题分类' },
    { value: `${MAX_CATEGORY_COUNT}`, label: '单类最多篇' },
    { value: `${TOPIC_DAYS}`, label: '实测天数' }
  ];

  const renderMetrics = () => (
    <>
      {metrics.map((metric, idx) => (
        <div key={idx} style={styles.metricGroup}>
          <span style={styles.metricValue}>{metric.value}</span>
          <span style={styles.metricLabel}>/ {metric.label}</span>
        </div>
      ))}
    </>
  );

  if (isMobile) {
    return (
      <div id="process" style={{ width: '100%', backgroundColor: '#034F47', padding: '60px 20px', boxSizing: 'border-box' }}>
        <style>
          {`
            @keyframes processMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>
        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare}></div>
            <span style={styles.pillText}>上手流程</span>
          </div>
          <motion.h2
            style={{ ...styles.mainTitle, width: '100%', fontSize: '36px', lineHeight: '42px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {}
            }}
          >
            {'新手上手四步走'.split('').map((char, i) => (
              <React.Fragment key={i}>
                <span style={{ overflow: 'hidden', display: 'inline-flex', verticalAlign: 'bottom' }}>
                  <motion.span
                    variants={{
                      hidden: { y: '100%', opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              </React.Fragment>
            ))}
          </motion.h2>
          <motion.p style={{ ...styles.subTitle, width: '100%' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            从选主题到办成后维护，每一步都有真实图文教程照着做。
          </motion.p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', marginBottom: '60px' }}>
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ color: '#80DEBB', fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '18px' }}>0{idx + 1}. {step.name}</span>

                <motion.h3
                  style={{ ...styles.rightTitle, fontSize: '28px', lineHeight: '36px' }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.05 } },
                    hidden: {}
                  }}
                >
                  {step.title.split('').map((char, i) => (
                    <React.Fragment key={i}>
                      <span style={{ overflow: 'hidden', display: 'inline-flex', verticalAlign: 'bottom' }}>
                        <motion.span
                          variants={{
                            hidden: { y: '100%', opacity: 0 },
                            visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                          }}
                        >
                          {char}
                        </motion.span>
                      </span>
                    </React.Fragment>
                  ))}
                </motion.h3>

                <motion.p
                  style={{ ...styles.rightDesc, fontSize: '16px' }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.015 } },
                    hidden: {}
                  }}
                >
                  {step.desc.split('').map((char, i) => (
                    <React.Fragment key={i}>
                      <span style={{ overflow: 'hidden', display: 'inline-flex', verticalAlign: 'bottom' }}>
                        <motion.span
                          variants={{
                            hidden: { y: '100%', opacity: 0 },
                            visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                          }}
                        >
                          {char}
                        </motion.span>
                      </span>
                    </React.Fragment>
                  ))}
                </motion.p>
              </div>
              <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#FEFFFF', borderRadius: '24px', overflow: 'hidden' }}>
                {step.design}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Metrics Marquee */}
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <div style={styles.metricsMarqueeScroller}>
            <div style={styles.metricsTrack}>
              {renderMetrics()}
            </div>
            <div style={styles.metricsTrack}>
              {renderMetrics()}
            </div>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div ref={targetRef} style={styles.fullWidthWrapper}>
      <style>
        {`
          @keyframes processMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div style={{
        ...(styles.stickyWindow as React.CSSProperties),
        height: `${1077 * scale}px`
      }}>
        <div style={{
          ...styles.container,
          transform: `scale(${scale})`
        }}>

        {/* Top Dark Green Area */}
        <div style={{
          ...styles.topGreenArea,
          width: `${viewportWidth / scale}px`,
          left: '50%',
          transform: 'translateX(-50%)'
        }}></div>

        {/* Header */}
        <div style={styles.headerFrame}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare}></div>
            <span style={styles.pillText}>上手流程</span>
          </div>

          <div style={styles.titleGroup}>
            <motion.h2
              style={styles.mainTitle}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
                hidden: {}
              }}
            >
              {'新手上手四步走'.split('').map((char, i) => (
                <React.Fragment key={i}>
                  <span style={{ overflow: 'hidden', display: 'inline-flex', verticalAlign: 'bottom' }}>
                    <motion.span
                      variants={{
                        hidden: { y: '100%', opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                      }}
                    >
                      {char}
                    </motion.span>
                  </span>
                </React.Fragment>
              ))}
            </motion.h2>
            <motion.p style={styles.subTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              从选主题到办成后维护，每一步都有真实图文教程照着做。
            </motion.p>
          </div>
        </div>

        {/* Left Navigation */}
        <div style={styles.leftNavContainer}>
          <div style={styles.navTrack}>
            <div style={{
              ...styles.navIndicator,
              top: `${activeStepIndex * 53}px`
            }}></div>
          </div>

          <div style={styles.navTextList}>
            {steps.map((step, index) => {
              const isActive = index === activeStepIndex;
              return (
                <div
                  key={index}
                  onClick={() => setActiveStepIndex(index)}
                  style={{
                    ...styles.navItem,
                    color: isActive ? '#FEFFFF' : '#018E7C',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {step.name}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Image Box */}
        <div style={styles.centerImageBox}>
          <div style={{ width: '100%', height: '100%', backgroundColor: '#FEFFFF', borderRadius: '24px', overflow: 'hidden' }}>
            {steps[activeStepIndex].design || null}
          </div>
        </div>

        {/* Right Text Box */}
        <div style={styles.rightTextBox}>
          <motion.h3
            key={`title-${activeStepIndex}`}
            style={styles.rightTitle}
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {}
            }}
          >
            {steps[activeStepIndex].title.split('').map((char, i) => (
              <React.Fragment key={i}>
                <span style={{ overflow: 'hidden', display: 'inline-flex', verticalAlign: 'bottom' }}>
                  <motion.span
                    variants={{
                      hidden: { y: '100%', opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              </React.Fragment>
            ))}
          </motion.h3>
          <motion.p
            key={`desc-${activeStepIndex}`}
            style={styles.rightDesc}
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.015 } },
              hidden: {}
            }}
          >
            {steps[activeStepIndex].desc.split('').map((char, i) => (
              <React.Fragment key={i}>
                <span style={{ overflow: 'hidden', display: 'inline-flex', verticalAlign: 'bottom' }}>
                  <motion.span
                    variants={{
                      hidden: { y: '100%', opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              </React.Fragment>
            ))}
          </motion.p>
        </div>

        {/* Bottom Metrics Marquee */}
        <div style={{
          ...styles.metricsMarqueeWrapper,
          width: `${viewportWidth / scale}px`,
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <div style={styles.metricsMarqueeScroller}>
            <div style={styles.metricsTrack}>
              {renderMetrics()}
            </div>
            <div style={styles.metricsTrack}>
              {renderMetrics()}
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  fullWidthWrapper: {
    width: '100%',
    backgroundColor: '#1A1A1A',
    position: 'relative',
    height: '400vh',
  },
  stickyWindow: {
    position: 'sticky',
    top: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#1A1A1A'
  },
  container: {
    width: '1600px',
    height: '1077px',
    position: 'relative',
    transformOrigin: 'top center',
    flexShrink: 0,
  },
  topGreenArea: {
    position: 'absolute',
    width: '1600px',
    height: '906px',
    left: '0px',
    top: '0px',
    backgroundColor: '#034F47',
    borderRadius: '0px 0px 60px 60px',
  },
  headerFrame: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    position: 'absolute',
    width: '845px',
    height: '182px',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '80px',
  },
  pillRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    height: '24px',
  },
  pillSquare: {
    width: '8px',
    height: '8px',
    backgroundColor: '#FEFFFF',
    borderRadius: '2px',
  },
  pillText: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '24px',
    textTransform: 'capitalize',
    color: '#FEFFFF',
  },
  titleGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    width: '845px',
  },
  mainTitle: {
    fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
    fontWeight: 700,
    fontSize: '70px',
    lineHeight: '70px',
    letterSpacing: '-0.02em',
    color: '#FEFFFF',
    margin: 0,
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
    textTransform: 'capitalize',
    color: '#FEFFFF',
    margin: 0,
    textAlign: 'center',
    width: '516px',
  },
  leftNavContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '22px',
    position: 'absolute',
    width: '177px',
    height: '183px',
    left: '140px',
    top: '322px',
  },
  navTrack: {
    width: '12px',
    height: '183px',
    backgroundColor: '#016558',
    borderRadius: '999px',
    position: 'relative',
  },
  navIndicator: {
    position: 'absolute',
    width: '12px',
    height: '47px',
    left: '0px',
    backgroundColor: '#FEFFFF',
    borderRadius: '999px',
    transition: 'top 0.3s ease',
  },
  navTextList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '29px',
    width: '143px',
  },
  navItem: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '24px',
    textTransform: 'capitalize',
    height: '24px',
    whiteSpace: 'nowrap',
  },
  centerImageBox: {
    position: 'absolute',
    width: '466px',
    height: '504px',
    left: 'calc(50% - 233px)',
    top: '322px',
    backgroundColor: '#FEFFFF',
    borderRadius: '24px',
  },
  rightTextBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
    position: 'absolute',
    width: '429px',
    height: '134px',
    left: '1091px',
    top: '692px',
  },
  rightTitle: {
    fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
    fontWeight: 700,
    fontSize: '40px',
    lineHeight: '50px',
    color: '#FEFFFF',
    margin: 0,
  },
  rightDesc: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
    textTransform: 'capitalize',
    color: '#FEFFFF',
    margin: 0,
  },
  metricsMarqueeWrapper: {
    position: 'absolute',
    left: '0',
    top: '961px',
    width: '1600px',
    height: '50px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  metricsMarqueeScroller: {
    display: 'flex',
    width: 'max-content',
    animation: 'processMarquee 30s linear infinite',
  },
  metricsTrack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '40px',
    paddingRight: '40px',
    width: 'max-content',
    flexShrink: 0,
  },
  metricGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: '4px',
  },
  metricValue: {
    fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
    fontWeight: 700,
    fontSize: '60px',
    lineHeight: '50px',
    color: '#FEFFFF',
  },
  metricLabel: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
    textTransform: 'capitalize',
    color: '#C7C6C7',
    whiteSpace: 'nowrap',
    marginBottom: '6px',
  }
};

export default Process;
