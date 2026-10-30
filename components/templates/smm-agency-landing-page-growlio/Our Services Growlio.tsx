import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  CATEGORIES,
  postsInCategory,
  newestInCategory,
  oneLineSummary,
  postHref,
} from '@/lib/site-content';

const ArrowUpIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22C45E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>;
const CheckIcon = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>;

/** Shorten a real post title so it stays inside its mockup row. */
const shortTitle = (title: string, max = 12): string =>
  title.length > max ? `${title.slice(0, max - 1)}…` : title;

/** Real topic keywords per category (each appears in the category's real post titles). */
const TOPIC_MAP: Record<string, string[]> = {
  'domain-email': ['免费域名', '邮箱转发', 'Zoho Mail', 'is-a.dev', 'afraid.org'],
  'vps-server': ['甲骨文免费云', 'AWS 免费', 'VPS 横评'],
  'tax-id': ['EORI 清关号', '美国 EIN', '各国税号', '土耳其税号'],
  'sim-keep': ['eSIM 免费流量', '美国号码', '英国保号', 'VOXI'],
  'payment': ['Wise 多币种', '数字银行', '境外银行卡', '地址证明'],
  'ai-tools': ['Langflow 自托管', 'n8n 工作流', 'Flowise', 'AI 赠金'],
};

/** Real, verifiable fact pairs per category (taken from the posts' own titles/summaries). */
const FACT_MAP: Record<string, string[]> = {
  'domain-email': ['0 元注册', '年年免费续'],
  'vps-server': ['永久免费', '2核·12G'],
  'tax-id': ['免费申请', '在家可办'],
  'sim-keep': ['3 家可领', '2 家已下线'],
  'payment': ['40+ 币种', '本地收款'],
  'ai-tools': ['开源免费', '数据不出门'],
};

/** Real data for one tutorial category, computed from data/articles.json. */
interface CategoryData {
  key: string;
  name: string;
  count: number;
  newestTitle: string;
  newestDate: string; // YYYY-MM-DD
  shortDate: string; // MM-DD
  desc: string;
  href: string;
  thumb: string;
  secondThumb: string;
  secondTitle: string;
  thirdThumb: string;
  thirdTitle: string;
  dates: string[]; // newest post dates, MM-DD
  checklist: string[]; // newest post titles, shortened
  topics: string[];
  facts: string[];
}

const CATEGORY_DATA: CategoryData[] = CATEGORIES.map((category) => {
  const posts = postsInCategory(category.key);
  const newest = newestInCategory(category.key);
  const second = posts[1];
  const third = posts[2];
  return {
    key: category.key,
    name: category.name,
    count: posts.length,
    newestTitle: newest ? newest.title : category.name,
    newestDate: newest ? newest.date : '',
    shortDate: newest ? newest.date.slice(5) : '',
    desc: newest ? oneLineSummary(newest, 56) : '',
    href: '/categories#' + category.key,
    thumb: newest ? `/img/thumbs/${newest.slug}.webp` : '',
    secondThumb: second ? `/img/thumbs/${second.slug}.webp` : '',
    secondTitle: second ? second.title : '',
    thirdThumb: third ? `/img/thumbs/${third.slug}.webp` : '',
    thirdTitle: third ? third.title : '',
    dates: posts.slice(0, 5).map((p) => p.date.slice(5)),
    checklist: posts.slice(0, 4).map((p) => shortTitle(p.title, 12)),
    topics: TOPIC_MAP[category.key] || [],
    facts: FACT_MAP[category.key] || [],
  };
});

const Card1Design = ({ data }: { data: CategoryData }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', background: 'linear-gradient(135deg, #FEF1F5 0%, #F2E9FE 50%, #FFE5E1 100%)', overflow: 'hidden' }}>
    {/* Background decorative blobs */}
    <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(255,192,203,0.3) 0%, rgba(255,192,203,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
    <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '70%', height: '70%', background: 'radial-gradient(circle, rgba(230,230,250,0.6) 0%, rgba(230,230,250,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />

    {/* Content Container */}
    <div className="svc-dash" style={{ position: 'absolute', inset: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
       {/* Top Row */}
       <div className="svc-dash-top" style={{ display: 'flex', gap: '15px', height: '55%', minWidth: 0 }}>
          {/* Category Lessons */}
          <div className="svc-tile svc-count-tile" style={{ flex: 1.2, minWidth: 0, backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F293B', margin: '0 0 12px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>分类教程</p>
            <div className="svc-count-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <h4 className="svc-count" style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#0E162A', whiteSpace: 'nowrap' }}>{data.count} 篇</h4>
              <div className="svc-count-date" style={{ display: 'flex', alignItems: 'center', color: '#10B881', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                <ArrowUpIcon /> {data.shortDate} 最新
              </div>
            </div>
            <div className="svc-bars" style={{ display: 'flex', gap: '8px', marginTop: 'auto', alignItems: 'flex-end', height: '60px' }}>
              {[25, 35, 30, 45, 60, 80, 100].map((h, i) => (
                <div key={i} style={{ flex: 1, minWidth: 0, height: `${h}%`, background: 'linear-gradient(to top, #F572B7, #FA7185)', borderRadius: '4px', opacity: i > 3 ? 1 : 0.6 }} />
              ))}
            </div>
          </div>
          {/* Update Calendar */}
          <div className="svc-tile svc-dates-tile" style={{ flex: 1, minWidth: 0, backgroundColor: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F293B', margin: '0 0 16px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>更新日历</p>
            <div className="svc-dates-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#65758B', marginBottom: '12px', fontWeight: 600, minWidth: 0 }}>
              {data.dates.slice(0, 5).map((d, i) => <span key={i} className="svc-date" style={{ whiteSpace: 'nowrap' }}>{d}</span>)}
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '35%', height: '16px', backgroundColor: '#F572B7', borderRadius: '8px' }}></div>
              <div style={{ width: '20%', height: '16px', backgroundColor: '#F1F4F8', borderRadius: '8px' }}></div>
              <div style={{ width: '25%', height: '16px', backgroundColor: '#F1F4F8', borderRadius: '8px', position: 'relative' }}><div style={{ position: 'absolute', bottom: 2, left: 4, width: '60%', height: '4px', backgroundColor: '#F572B7', borderRadius: '2px' }}></div></div>
              <div style={{ width: '20%', height: '16px', backgroundColor: '#F1F4F8', borderRadius: '8px' }}></div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '25%', height: '16px', backgroundColor: '#A68AFA', borderRadius: '8px' }}></div>
              <div style={{ width: '25%', height: '16px', backgroundColor: '#F1F4F8', borderRadius: '8px', position: 'relative' }}><div style={{ position: 'absolute', bottom: 2, right: 4, width: '60%', height: '4px', backgroundColor: '#F572B7', borderRadius: '2px' }}></div></div>
              <div style={{ width: '20%', height: '16px', backgroundColor: '#F1F4F8', borderRadius: '8px' }}></div>
              <div style={{ width: '30%', height: '16px', backgroundColor: '#FBBF24', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
            </div>
          </div>
       </div>
       {/* Bottom Row */}
       <div className="svc-dash-bottom" style={{ display: 'flex', gap: '15px', height: '45%', minWidth: 0 }}>
          {/* Category Topics */}
          <div className="svc-tile svc-topics-tile" style={{ flex: 1.2, minWidth: 0, backgroundColor: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F293B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>分类主题</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', minWidth: 0 }}>
              {data.topics.map((topic) => (
                <div key={topic} style={{ padding: '4px 10px', backgroundColor: '#F1F4F8', borderRadius: '8px', fontSize: '11px', fontWeight: 600, color: '#324055', whiteSpace: 'nowrap', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topic}</div>
              ))}
            </div>
          </div>
          {/* Latest Tutorials */}
          <div className="svc-tile svc-latest-tile" style={{ flex: 1, minWidth: 0, backgroundColor: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <p className="svc-latest-title" style={{ fontSize: '13px', fontWeight: 600, color: '#1F293B', margin: '0 0 16px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>最新教程</p>
            {data.checklist.map((item, i) => (
              <div key={i} className="svc-check-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', minWidth: 0 }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#10B881', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                  <CheckIcon />
                </div>
                <span style={{ fontSize: '11px', color: '#324055', fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item}</span>
              </div>
            ))}
          </div>
       </div>
    </div>
  </div>
);

const Card2Design = ({ data }: { data: CategoryData }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', background: 'linear-gradient(135deg, #F9F8FF 0%, #E8EDFB 100%)', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {/* Background decorative blobs */}
    <div style={{ position: 'absolute', top: '10%', left: '10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, rgba(167,139,250,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
    <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />

    {/* Content Container */}
    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', position: 'relative', zIndex: 10, transform: 'scale(0.95)' }}>
      {/* Latest Post Card */}
      <div style={{ width: '135px', backgroundColor: 'white', borderRadius: '14px', padding: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '320px', position: 'relative' }}>

        {/* Floating badge */}
        <div style={{ position: 'absolute', top: '-12px', left: '-12px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#024F47', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(2, 79, 71, 0.3)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', marginTop: '6px', minWidth: 0 }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#E3E9F1', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#95A2B8"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '10px', fontWeight: 700, margin: 0, color: '#1F293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>出海实操教程</p>
            <p style={{ fontSize: '8px', color: '#65758B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>实测图文</p>
          </div>
        </div>

        {/* Real article thumbnail */}
        <div style={{ flex: 1, backgroundColor: '#8A5CF6', borderRadius: '6px', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <img src={data.thumb} alt={data.newestTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Button */}
        <div style={{ backgroundColor: '#1877F2', color: 'white', borderRadius: '6px', padding: '6px', fontSize: '10px', fontWeight: 700, width: '100%', textAlign: 'center', cursor: 'pointer' }}>看教程</div>
      </div>

      {/* Second Post Card (overlaps) */}
      <div style={{ width: '155px', backgroundColor: 'white', borderRadius: '14px', padding: '10px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', height: '360px', transform: 'translateY(-10px)', zIndex: 2, position: 'relative' }}>

        {/* Floating badge */}
        <div style={{ position: 'absolute', top: '-14px', left: '-14px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#F59E0B', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(245, 158, 11, 0.3)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M6 4l14 8-14 8z"/></svg>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', marginTop: '8px', minWidth: 0 }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#E3E9F1', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#95A2B8"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '11px', fontWeight: 700, margin: 0, color: '#1F293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>出海实操教程</p>
            <p style={{ fontSize: '9px', color: '#65758B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>实测图文</p>
          </div>
        </div>

        {/* Real article thumbnail */}
        <div style={{ flex: 1, backgroundColor: '#EDF3F6', borderRadius: '6px', marginBottom: '10px', overflow: 'hidden', position: 'relative' }}>
          <img src={data.secondThumb} alt={data.secondTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
          </div>
        </div>

        {/* Button */}
        <div style={{ backgroundColor: '#F1F4F8', color: '#1F293B', borderRadius: '6px', padding: '6px', fontSize: '10px', fontWeight: 700, width: '100%', textAlign: 'center', cursor: 'pointer' }}>阅读全文</div>
      </div>

      {/* Stats Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '130px', minWidth: 0 }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', minWidth: 0 }}>
          <p style={{ fontSize: '10px', color: '#65758B', margin: '0 0 4px 0', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>教程篇数</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 0 }}>
            <h4 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0E162A', whiteSpace: 'nowrap' }}>{data.count} 篇</h4>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B881" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', minWidth: 0 }}>
          <p style={{ fontSize: '10px', color: '#65758B', margin: '0 0 4px 0', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>最新实测</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 0 }}>
            <h4 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0E162A', whiteSpace: 'nowrap' }}>{data.shortDate}</h4>
            <span style={{ color: '#10B881', fontSize: '10px', fontWeight: 700 }}>实测</span>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', minWidth: 0 }}>
          <p style={{ fontSize: '10px', color: '#65758B', margin: '0 0 4px 0', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>实测事实</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 0 }}>
            <h4 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0E162A', whiteSpace: 'nowrap' }}>{data.facts[0]}</h4>
            <span style={{ color: '#10B881', fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap' }}>{data.facts[1]}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Card3Design = ({ data }: { data: CategoryData }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', background: 'linear-gradient(135deg, #FEF1F5 0%, #FFE5E1 100%)', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {/* Background decorative blobs */}
    <div style={{ position: 'absolute', top: '20%', left: '20%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(255,182,193,0.3) 0%, rgba(255,182,193,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
    <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(255,105,180,0.15) 0%, rgba(255,105,180,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />

    {/* Center Post Mockup */}
    <div style={{ width: '180px', height: '360px', backgroundColor: 'white', borderRadius: '24px', padding: '10px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', zIndex: 10, position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 4px' }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#F1F4F8', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F53E5F' }} />
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#CBD5E1' }} />
          <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#CBD5E1' }} />
          <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#CBD5E1' }} />
        </div>
      </div>
      <div style={{ flex: 1, backgroundColor: '#EDF3F6', borderRadius: '12px', position: 'relative', overflow: 'hidden', marginBottom: '10px' }}>
        <img src={data.thumb} alt={data.newestTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '36px', height: '36px', borderRadius: '50%', border: '2px solid white', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px 4px 4px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#EF4544" stroke="#EF4544"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#65758B" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#65758B" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#65758B" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
      </div>
    </div>

    {/* Left Polaroid (real post thumbnail) */}
    <div style={{ position: 'absolute', left: '30px', top: '40px', width: '130px', height: '170px', backgroundColor: 'white', padding: '8px', paddingBottom: '24px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', transform: 'rotate(-8deg)', zIndex: 5 }}>
      <img src={data.secondThumb} alt={data.secondTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
    </div>

    {/* Right Polaroid (real post thumbnail) */}
    <div style={{ position: 'absolute', right: '30px', top: '50px', width: '130px', height: '170px', backgroundColor: 'white', padding: '8px', paddingBottom: '24px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', transform: 'rotate(8deg)', zIndex: 5 }}>
      <img src={data.thirdThumb} alt={data.thirdTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
    </div>

    {/* Red Count Bubble */}
    <div style={{ position: 'absolute', left: '20px', top: '160px', backgroundColor: '#FE5A5E', color: 'white', padding: '8px 12px', borderRadius: '16px', borderBottomLeftRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', zIndex: 12, boxShadow: '0 8px 20px rgba(255,90,95,0.3)', whiteSpace: 'nowrap' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
      {data.count} 篇
    </div>

    {/* Bottom Left Toolbar Pill */}
    <div style={{ position: 'absolute', left: '20px', bottom: '40px', backgroundColor: 'white', padding: '10px 16px', borderRadius: '24px', display: 'flex', gap: '12px', zIndex: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#EEF7FF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3A83F6" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      </div>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#F1F4F8', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#1F293B', fontWeight: 700, fontSize: '12px' }}>Aa</div>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FFF7ED', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97317" strokeWidth="2.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>
      </div>
    </div>

    {/* Top Right Latest Post Pill */}
    <div style={{ position: 'absolute', right: '15px', top: '25px', backgroundColor: 'white', padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4544" strokeWidth="2.5"><path d="M12 2v20M2 12h20M7.05 7.05l9.9 9.9M16.95 7.05l-9.9 9.9"/></svg>
      <span style={{ fontSize: '13px', fontWeight: 700, color: '#1F293B' }}>最新教程</span>
    </div>

    {/* Bottom Right Date Card */}
    <div style={{ position: 'absolute', right: '15px', bottom: '30px', backgroundColor: 'white', padding: '16px', borderRadius: '16px', width: '140px', zIndex: 12, boxShadow: '0 15px 35px rgba(0,0,0,0.08)', minWidth: 0 }}>
      <p style={{ fontSize: '11px', color: '#65758B', margin: '0 0 4px 0', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>最新实测</p>
      <h4 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 12px 0', color: '#0E162A', whiteSpace: 'nowrap' }}>{data.newestDate}</h4>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '40px' }}>
        {[20, 30, 45, 60, 80, 100].map((h, i) => (
          <div key={i} style={{ flex: 1, minWidth: 0, height: `${h}%`, background: 'linear-gradient(to top, #F572B7, #FA7185)', borderRadius: '4px' }} />
        ))}
      </div>
    </div>

  </div>
);

const Card4Design = ({ data }: { data: CategoryData }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', background: 'linear-gradient(135deg, #F0FCF4 0%, #F8FAFD 100%)', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {/* Background decorative blobs */}
    <div style={{ position: 'absolute', top: '10%', left: '10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(134,239,172,0.15) 0%, rgba(134,239,172,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
    <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(167,243,208,0.15) 0%, rgba(167,243,208,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />

    {/* Left Post Thumbnail */}
    <div style={{ position: 'absolute', left: '20px', top: '70px', width: '140px', height: '280px', backgroundColor: 'white', padding: '6px', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)', transform: 'rotate(-5deg)', zIndex: 5 }}>
      <img src={data.secondThumb} alt={data.secondTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
    </div>

    {/* Green Squiggly Line (above left post) */}
    <svg style={{ position: 'absolute', left: '50px', top: '35px', zIndex: 12, transform: 'rotate(-10deg)' }} width="60" height="30" viewBox="0 0 60 30" fill="none" stroke="#22C45E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 25 Q 15 5 25 15 T 45 5" />
    </svg>

    {/* Bottom Left Count Pill */}
    <div style={{ position: 'absolute', left: '15px', bottom: '80px', backgroundColor: 'white', padding: '12px 16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 12, boxShadow: '0 15px 35px rgba(0,0,0,0.1)', whiteSpace: 'nowrap' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0E162A" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      <div>
        <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0E162A', whiteSpace: 'nowrap' }}>{data.count} 篇</h4>
        <p style={{ fontSize: '10px', color: '#65758B', margin: 0, fontWeight: 700 }}>教程</p>
      </div>
    </div>

    {/* Center Post Mockup */}
    <div style={{ width: '190px', height: '390px', backgroundColor: '#1F293B', borderRadius: '32px', padding: '8px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', zIndex: 10, position: 'relative', border: '2px solid #324055' }}>

      {/* Top Notch */}
      <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '18px', backgroundColor: '#1F293B', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 20 }}></div>

      <div style={{ flex: 1, backgroundColor: '#EDF3F6', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
        <img src={data.thumb} alt={data.newestTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

        {/* Play Button */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '44px', height: '44px', borderRadius: '50%', border: '2px solid white', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
        </div>

        {/* Top Status Bar Content */}
        <div style={{ position: 'absolute', top: '8px', left: '16px', color: 'white', fontSize: '9px', fontWeight: 600 }}>{data.shortDate}</div>
        <div style={{ position: 'absolute', top: '8px', right: '16px', display: 'flex', gap: '4px' }}>
          <div style={{ width: '12px', height: '6px', backgroundColor: 'white', borderRadius: '2px' }}></div>
        </div>

        {/* Controls Overlay */}
        <div style={{ position: 'absolute', bottom: '15px', left: '15px', right: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', fontSize: '9px', fontWeight: 700, marginBottom: '6px', minWidth: 0 }}>
            <span style={{ whiteSpace: 'nowrap' }}>图文 · {data.shortDate}</span>
            <div style={{ display: 'flex', gap: '8px' }}>
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
            </div>
          </div>
          <div style={{ width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '2px' }}>
            <div style={{ width: '30%', height: '100%', backgroundColor: 'white', borderRadius: '2px' }}></div>
          </div>
        </div>
      </div>
    </div>

    {/* Right Facts Card */}
    <div style={{ position: 'absolute', right: '25px', top: '30px', backgroundColor: 'white', padding: '16px 20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 12, boxShadow: '0 15px 35px rgba(0,0,0,0.06)', minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#EF4544" stroke="#EF4544"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#324055', whiteSpace: 'nowrap' }}>{data.count} 篇教程</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#0E162A"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#324055', whiteSpace: 'nowrap' }}>{data.shortDate} 实测</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#0E162A"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#324055', whiteSpace: 'nowrap' }}>{data.facts[0]}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0E162A" strokeWidth="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#324055', whiteSpace: 'nowrap' }}>{data.facts[1]}</span>
      </div>
    </div>

    {/* Bottom Right Photo (real post thumbnail) */}
    <div style={{ position: 'absolute', right: '20px', bottom: '40px', width: '140px', height: '140px', backgroundColor: 'white', padding: '6px', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)', zIndex: 5 }}>
      <img src={data.thirdThumb} alt={data.thirdTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
    </div>

  </div>
);

const Card5Design = ({ data }: { data: CategoryData }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)', overflow: 'hidden' }}>
    {/* Background decorative blobs */}
    <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(251,191,36,0.25) 0%, rgba(251,191,36,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
    <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '70%', height: '70%', background: 'radial-gradient(circle, rgba(254,243,199,0.8) 0%, rgba(254,243,199,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />

    {/* Content Container */}
    <div style={{ position: 'absolute', inset: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
       {/* Top Row */}
       <div style={{ display: 'flex', gap: '15px', height: '55%', minWidth: 0 }}>
          {/* Payment Methods */}
          <div style={{ flex: 1.2, minWidth: 0, backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F293B', margin: '0 0 12px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>收款方式</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <h4 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#0E162A', whiteSpace: 'nowrap' }}>{data.count} 篇</h4>
              <div style={{ display: 'flex', alignItems: 'center', color: '#10B881', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                <ArrowUpIcon /> {data.shortDate} 最新
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', alignItems: 'flex-end', height: '60px' }}>
              {[30, 45, 35, 55, 70, 90, 100].map((h, i) => (
                <div key={i} style={{ flex: 1, minWidth: 0, height: `${h}%`, background: 'linear-gradient(to top, #FBBF24, #F59E0B)', borderRadius: '4px', opacity: i > 3 ? 1 : 0.6 }} />
              ))}
            </div>
          </div>
          {/* Update Calendar */}
          <div style={{ flex: 1, minWidth: 0, backgroundColor: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F293B', margin: '0 0 16px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>更新日历</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#65758B', marginBottom: '12px', fontWeight: 600, minWidth: 0 }}>
              {data.dates.slice(0, 4).map((d, i) => <span key={i} style={{ whiteSpace: 'nowrap' }}>{d}</span>)}
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '35%', height: '16px', backgroundColor: '#FBBF24', borderRadius: '8px' }}></div>
              <div style={{ width: '20%', height: '16px', backgroundColor: '#F1F4F8', borderRadius: '8px' }}></div>
              <div style={{ width: '25%', height: '16px', backgroundColor: '#F1F4F8', borderRadius: '8px', position: 'relative' }}><div style={{ position: 'absolute', bottom: 2, left: 4, width: '60%', height: '4px', backgroundColor: '#F59E0B', borderRadius: '2px' }}></div></div>
              <div style={{ width: '20%', height: '16px', backgroundColor: '#F1F4F8', borderRadius: '8px' }}></div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '25%', height: '16px', backgroundColor: '#F59E0B', borderRadius: '8px' }}></div>
              <div style={{ width: '25%', height: '16px', backgroundColor: '#F1F4F8', borderRadius: '8px', position: 'relative' }}><div style={{ position: 'absolute', bottom: 2, right: 4, width: '60%', height: '4px', backgroundColor: '#FBBF24', borderRadius: '2px' }}></div></div>
              <div style={{ width: '20%', height: '16px', backgroundColor: '#F1F4F8', borderRadius: '8px' }}></div>
              <div style={{ width: '30%', height: '16px', backgroundColor: '#10B881', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
            </div>
          </div>
       </div>
       {/* Bottom Row */}
       <div style={{ display: 'flex', gap: '15px', height: '45%', minWidth: 0 }}>
          {/* Payment Topics */}
          <div style={{ flex: 1.2, minWidth: 0, backgroundColor: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F293B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>收款主题</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', minWidth: 0 }}>
              {data.topics.map((topic) => (
                <div key={topic} style={{ padding: '4px 10px', backgroundColor: '#F1F4F8', borderRadius: '8px', fontSize: '11px', fontWeight: 600, color: '#324055', whiteSpace: 'nowrap', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topic}</div>
              ))}
            </div>
          </div>
          {/* Latest Tutorials */}
          <div style={{ flex: 1, minWidth: 0, backgroundColor: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F293B', margin: '0 0 16px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>最新教程</p>
            {data.checklist.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', minWidth: 0 }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#10B881', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                  <CheckIcon />
                </div>
                <span style={{ fontSize: '11px', color: '#324055', fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item}</span>
              </div>
            ))}
          </div>
       </div>
    </div>
  </div>
);

const Card6Design = ({ data }: { data: CategoryData }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', background: 'linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {/* Background decorative blobs */}
    <div style={{ position: 'absolute', top: '10%', left: '10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
    <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />

    {/* Content Container */}
    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', position: 'relative', zIndex: 10, transform: 'scale(0.95)' }}>
      {/* Latest AI Post Card */}
      <div style={{ width: '135px', backgroundColor: 'white', borderRadius: '14px', padding: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '320px', position: 'relative' }}>

        {/* Floating badge */}
        <div style={{ position: 'absolute', top: '-12px', left: '-12px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0891B2', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(8, 145, 178, 0.3)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', marginTop: '6px', minWidth: 0 }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#E3E9F1', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#95A2B8"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '10px', fontWeight: 700, margin: 0, color: '#1F293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>出海实操教程</p>
            <p style={{ fontSize: '8px', color: '#65758B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>AI 工具</p>
          </div>
        </div>

        {/* Real article thumbnail */}
        <div style={{ flex: 1, backgroundColor: '#0891B2', borderRadius: '6px', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <img src={data.thumb} alt={data.newestTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Button */}
        <div style={{ backgroundColor: '#0891B2', color: 'white', borderRadius: '6px', padding: '6px', fontSize: '10px', fontWeight: 700, width: '100%', textAlign: 'center', cursor: 'pointer' }}>看教程</div>
      </div>

      {/* Second AI Post Card (overlaps) */}
      <div style={{ width: '155px', backgroundColor: 'white', borderRadius: '14px', padding: '10px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', height: '360px', transform: 'translateY(-10px)', zIndex: 2, position: 'relative' }}>

        {/* Floating badge */}
        <div style={{ position: 'absolute', top: '-14px', left: '-14px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#8B5CF6', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M6 4l14 8-14 8z"/></svg>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', marginTop: '8px', minWidth: 0 }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#E3E9F1', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#95A2B8"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '11px', fontWeight: 700, margin: 0, color: '#1F293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>出海实操教程</p>
            <p style={{ fontSize: '9px', color: '#65758B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>AI 工具</p>
          </div>
        </div>

        {/* Real article thumbnail */}
        <div style={{ flex: 1, backgroundColor: '#EDF3F6', borderRadius: '6px', marginBottom: '10px', overflow: 'hidden', position: 'relative' }}>
          <img src={data.secondThumb} alt={data.secondTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
          </div>
        </div>

        {/* Button */}
        <div style={{ backgroundColor: '#F1F4F8', color: '#1F293B', borderRadius: '6px', padding: '6px', fontSize: '10px', fontWeight: 700, width: '100%', textAlign: 'center', cursor: 'pointer' }}>阅读全文</div>
      </div>

      {/* Stats Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '130px', minWidth: 0 }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', minWidth: 0 }}>
          <p style={{ fontSize: '10px', color: '#65758B', margin: '0 0 4px 0', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>教程篇数</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 0 }}>
            <h4 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0E162A', whiteSpace: 'nowrap' }}>{data.count} 篇</h4>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B881" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', minWidth: 0 }}>
          <p style={{ fontSize: '10px', color: '#65758B', margin: '0 0 4px 0', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>最新实测</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 0 }}>
            <h4 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0E162A', whiteSpace: 'nowrap' }}>{data.shortDate}</h4>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B881" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', minWidth: 0 }}>
          <p style={{ fontSize: '10px', color: '#65758B', margin: '0 0 4px 0', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>实测事实</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 0 }}>
            <h4 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0E162A', whiteSpace: 'nowrap' }}>{data.facts[0]}</h4>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B881" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CARD_DESIGNS = [Card1Design, Card2Design, Card3Design, Card4Design, Card5Design, Card6Design];

const CARD_COLORS = [
  { bgColor: '#F780A3', badgeBg: '#F697B3' },
  { bgColor: '#9F82FE', badgeBg: '#BCA8FE' },
  { bgColor: '#FD7BEC', badgeBg: '#FD96EF' },
  { bgColor: '#034F47', badgeBg: '#016558' },
  { bgColor: '#F59E0B', badgeBg: '#FBBF24' },
  { bgColor: '#0EA5E9', badgeBg: '#38BDF8' },
];

const CARD_ICONS = [
  (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2l4 4-4 4" />
    </svg>
  ),
  (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
      <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="15" x2="4" y2="15" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="15" x2="23" y2="15" />
    </svg>
  ),
];

const Services = () => {
  const [scale, setScale] = useState(1);
  const targetRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setScale(1);
      } else {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        let scaleX = screenWidth / 1600;
        let scaleY = screenHeight / 946;
        let newScale = Math.min(scaleX, scaleY);
        if (newScale > 1.2) newScale = 1.2;
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Card 1 is static.
  const y1 = 0;

  // Cards 2-6 come up in sequence across the scroll
  const y2 = useTransform(scrollYProgress, [0, 0.2], [1200, 20]);
  const y3 = useTransform(scrollYProgress, [0.2, 0.4], [1200, 40]);
  const y4 = useTransform(scrollYProgress, [0.4, 0.6], [1200, 60]);
  const y5 = useTransform(scrollYProgress, [0.6, 0.8], [1200, 70]);
  const y6 = useTransform(scrollYProgress, [0.8, 0.99], [1200, 80]);

  const cardYs = [y1, y2, y3, y4, y5, y6];

  // Six real tutorial categories: real counts, real summaries, real links.
  const totalCount = CATEGORY_DATA.reduce((sum, c) => sum + c.count, 0);

  const cards = CATEGORY_DATA.map((data, idx) => ({
    ...CARD_COLORS[idx],
    data,
    title: data.name,
    desc: data.desc,
    badges: [`${data.count} 篇实测`, ...data.topics.slice(0, 3)],
    icon: CARD_ICONS[idx],
    href: data.href,
    // @ts-ignore
    rightSide: CARD_DESIGNS[idx] ? React.createElement(CARD_DESIGNS[idx], { data }) : null,
  }));

  if (isMobile) {
    return (
      <div id="services" style={{ width: '100%', backgroundColor: '#FAFADC', padding: '60px 20px', boxSizing: 'border-box' }}>
        <style>{`
          @media (max-width: 768px) {
            #services .svc-dash { inset: 12px !important; gap: 10px !important; }
            #services .svc-dash-top { gap: 10px !important; }
            #services .svc-dash-bottom { gap: 10px !important; }
            #services .svc-tile { overflow: hidden !important; padding: 12px !important; }
            #services .svc-count-row { flex-wrap: wrap !important; gap: 6px !important; }
            #services .svc-count { font-size: 22px !important; }
            #services .svc-count-date { font-size: 11px !important; white-space: normal !important; }
            #services .svc-bars { height: 48px !important; }
            #services .svc-dates-row { flex-wrap: wrap !important; justify-content: flex-start !important; gap: 4px 8px !important; font-size: 10px !important; margin-bottom: 10px !important; }
            #services .svc-date { white-space: normal !important; }
            #services .svc-latest-title { margin-bottom: 10px !important; }
            #services .svc-check-row { margin-bottom: 6px !important; }
          }
        `}</style>
        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '60px' }}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare}></div>
            <span style={styles.pillText}>教程分类</span>
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
            {/* Chinese: animate per character instead of per word */}
            {'全部教程分类'.split('').map((char, i) => (
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
          <motion.p style={{ ...styles.subTitle, width: '100%', textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {`六大主题，共 ${totalCount} 篇实测图文：域名邮箱、VPS 服务器、税号身份、手机保号、跨境收款和 AI 工具。每篇都亲手实测，配真实截图和分步说明，照着做就能办成。`}
          </motion.p>
        </div>

        {/* Cards Section Stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              style={{
                backgroundColor: card.bgColor,
                borderRadius: '32px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                color: 'white',
                position: 'relative'
              }}
            >
              <a href={card.href} aria-label={`${card.title}：最新教程《${card.data.newestTitle}》`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px' }}>
                  {card.icon}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
                  <motion.h3
                    style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: '28px', margin: 0, lineHeight: '32px', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={{
                      visible: { transition: { staggerChildren: 0.05 } },
                      hidden: {}
                    }}
                  >
                    {card.title.split('').map((char, i) => (
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
                    style={{ fontFamily: '"Inter", sans-serif', fontWeight: 500, fontSize: '15px', lineHeight: '140%', margin: 0, opacity: 0.9, minWidth: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {card.desc}
                  </motion.p>
                  <motion.div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minWidth: 0 }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {card.badges.map(badge => (
                      <div key={badge} style={{ ...styles.badge, backgroundColor: card.badgeBg, maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {badge}
                      </div>
                    ))}
                  </motion.div>
                </div>
                <div style={{ width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden' }}>
                  {/* @ts-ignore */}
                  {card.rightSide ? card.rightSide : null}
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="services" ref={targetRef} style={styles.scrollTrack}>
      <div style={styles.stickyWindow}>
        <div style={{ ...styles.container, transform: `scale(${scale})` }}>

          {/* Header Section */}
          <div style={styles.headerFrame}>
            <div style={styles.pillRow}>
              <div style={styles.pillSquare}></div>
              <span style={styles.pillText}>教程分类</span>
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
                {/* Chinese: animate per character instead of per word */}
                {'全部教程分类'.split('').map((char, i) => (
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
                {`六大主题，共 ${totalCount} 篇实测图文：域名邮箱、VPS 服务器、税号身份、手机保号、跨境收款和 AI 工具。每篇都亲手实测，配真实截图和分步说明，照着做就能办成。`}
              </motion.p>
            </div>
          </div>

          {/* Cards Section */}
          <div style={styles.cardsContainer}>
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                style={{
                  ...styles.card,
                  backgroundColor: card.bgColor,
                  y: cardYs[idx],
                  zIndex: idx + 1
                }}
              >
                <a href={card.href} aria-label={`${card.title}：最新教程《${card.data.newestTitle}》`} style={{ position: 'absolute', inset: 0, display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                  <div style={styles.cardIcon}>
                    {card.icon}
                  </div>
                  <div style={styles.cardContent}>
                    <div style={styles.cardTextGroup}>
                      <motion.h3
                        style={styles.cardTitle}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.5 }}
                        variants={{
                          visible: { transition: { staggerChildren: 0.05 } },
                          hidden: {}
                        }}
                      >
                        {card.title.split('').map((char, i) => (
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
                        style={styles.cardDesc}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {card.desc}
                      </motion.p>
                    </div>
                    <motion.div
                      style={styles.badgesRow}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {card.badges.map(badge => (
                        <div key={badge} style={{ ...styles.badge, backgroundColor: card.badgeBg, maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {badge}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                  <div style={{ ...styles.cardImage, overflow: 'hidden' }}>
                    {/* @ts-ignore */}
                    {card.rightSide ? card.rightSide : null}
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  scrollTrack: {
    width: '100%',
    height: '400vh',
    backgroundColor: '#FAFADC',
    position: 'relative',
  },
  stickyWindow: {
    position: 'sticky',
    top: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  container: {
    width: '1600px',
    height: '946px',
    position: 'relative',
    transformOrigin: 'center center',
    flexShrink: 0,
  },
  headerFrame: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    position: 'absolute',
    width: '844px',
    height: '252px',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '80px',
  },
  pillRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    width: '85px',
    height: '24px',
  },
  pillSquare: {
    width: '8px',
    height: '8px',
    backgroundColor: '#034F47',
    borderRadius: '2px',
  },
  pillText: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '24px',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#010101',
  },
  titleGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    width: '844px',
    height: '208px',
  },
  mainTitle: {
    fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
    fontWeight: 700,
    fontSize: '70px',
    lineHeight: '70px',
    textAlign: 'center',
    letterSpacing: '-0.02em',
    color: '#034F47',
    margin: 0,
    width: '788px',
  },
  subTitle: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#034F47',
    margin: 0,
    width: '648px',
  },
  cardsContainer: {
    position: 'absolute',
    width: '1240px',
    height: '474px',
    left: '188px',
    top: '392px',
  },
  card: {
    width: '1240px',
    height: '474px',
    borderRadius: '16px',
    position: 'absolute',
    left: 0,
    top: 0,
    flexShrink: 0,
    boxShadow: '0px -10px 30px rgba(0,0,0,0.05)',
  },
  cardIcon: {
    position: 'absolute',
    width: '85px',
    height: '82px',
    left: '40px',
    top: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '24px',
    position: 'absolute',
    width: '482px',
    left: '40px',
    top: '269px',
    minWidth: 0,
  },
  cardTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5px',
    width: '463px',
    minWidth: 0,
  },
  cardTitle: {
    fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
    fontWeight: 700,
    fontSize: '40px',
    lineHeight: '50px',
    color: '#FFFFFF',
    margin: 0,
    width: '100%',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  cardDesc: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
    textTransform: 'capitalize',
    color: '#FFFFFF',
    margin: 0,
    width: '100%',
    minWidth: 0,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  badgesRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    flexWrap: 'wrap',
    minWidth: 0,
  },
  badge: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '999px',
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
    textTransform: 'capitalize',
    color: '#FFFFFF',
    whiteSpace: 'nowrap',
  },
  cardImage: {
    position: 'absolute',
    width: '476px',
    height: '454px',
    left: '754px',
    top: '10px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
  }
};

export default Services;
