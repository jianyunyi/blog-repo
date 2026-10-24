"use client";

import { STATS } from '@/lib/site-content';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/** Prefix every in-page anchor ('#faq') with this string.
 *  Homepage passes nothing ('' → '#faq' stays an in-page anchor);
 *  second-level pages pass '/' so anchors point home ('/#faq'). */
const anchorHref = (href: string, prefix: string) =>
  href.startsWith('#') ? prefix + href : href;

const NAV_ITEMS = [
  { label: '教程分类', href: '/categories' },
  { label: '最新文章', href: '/articles' },
  { label: '常见问题', href: '#faq' },
];

const HERO_LINES = ['出海不用出门'];

const HERO_SUBTITLE = [
  '这里专写在家就能办的出海实操——海外域名、企业邮箱、免费 VPS、各国税号、手机卡保号、跨境收款和 AI 工具。',
  '每篇都亲手实测，配真实截图和分步说明，照着做就能办下来。',
];

const svgUrls = [
  '/jiro/1.svg',
  '/jiro/2.svg',
  '/jiro/3.svg',
  '/jiro/4.svg',
  '/jiro/5.svg',
  '/jiro/6.svg',
  '/jiro/7.svg',
  '/jiro/8.svg',
  '/jiro/9.svg'
];

const socialIcons = [
  { rotate: '12.56deg', left: '-285px', top: '551px' },
  { rotate: '12.56deg', left: '-202px', top: '575px' },
  { rotate: '12.56deg', left: '-119px', top: '599px' },
  { rotate: '12.56deg', left: '-36px', top: '623px' },
  { rotate: '3.6deg', left: '47px', top: '647px' },
  { rotate: '1.56deg', left: '134px', top: '662px' },
  { rotate: '0deg', left: '220px', top: '665px' },
  { rotate: '0.09deg', left: '307px', top: '662px' },
  { rotate: '-9.48deg', left: '387px', top: '644px' },
  { rotate: '-14.55deg', left: '470px', top: '619px' },
  { rotate: '-21.55deg', left: '548px', top: '589px' },
  { rotate: '-26.7deg', left: '626px', top: '548px' },
  { rotate: '-35.98deg', left: '694px', top: '502px' },
  { rotate: '-37.93deg', left: '764px', top: '449px' },
  { rotate: '-37.93deg', left: '832px', top: '397px' },
  { rotate: '-37.93deg', left: '900px', top: '345px' },
  { rotate: '-36.97deg', left: '966px', top: '296px' },
  { rotate: '-36.43deg', left: '1035px', top: '249px' },
  { rotate: '-10.98deg', left: '1125px', top: '220px' },
  { rotate: '2.44deg', left: '1234px', top: '225px' },
  { rotate: '5.94deg', left: '1313px', top: '228px' },
  { rotate: '12deg', left: '1396px', top: '236px' },
  { rotate: '15.54deg', left: '1474px', top: '259px' },
  { rotate: '15.2deg', left: '1550px', top: '284px' },
  { rotate: '15.2deg', left: '1626px', top: '309px' },
  { rotate: '15.2deg', left: '1702px', top: '334px' },
  { rotate: '15.2deg', left: '1778px', top: '359px' }
].map((icon, idx) => ({ ...icon, url: svgUrls[idx % 9] }));

const Header = ({ anchorPrefix = '', showHero = true }: { anchorPrefix?: string; showHero?: boolean }) => {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (mobile) {
        setScale(1); // Do not scale down on mobile, use responsive flex layout
      } else {
        const availableWidth = window.innerWidth - 160; 
        let newScale = availableWidth / 1440;
        const availableHeight = window.innerHeight;
        const heightScale = availableHeight / 805; 
        newScale = Math.min(newScale, heightScale);
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Same NAV_ITEMS data; only '#...' hrefs get the anchorPrefix.
  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    href: anchorHref(item.href, anchorPrefix),
  }));

  return (
    <div style={!showHero ? styles.navOnlyWrapper : (isMobile ? { ...styles.fullWidthWrapper, height: 'auto', minHeight: '100vh', padding: '20px', boxSizing: 'border-box', position: 'relative' } : styles.fullWidthWrapper)}>
      {/* showHero=false (second-level pages): collapse to a plain nav bar.
          The hero layout reserves height:'100vh' on this wrapper plus a fixed
          805px container below it; with the hero hidden those kept reserving a
          full viewport of cream space, so swap them for normal flow. */}
      <style>{`
        
        .cta-btn:hover {
          opacity: 0.9;
        }

        @keyframes textSlideUp {
          0% { transform: translateY(0); opacity: 1; }
          40% { transform: translateY(-10px); opacity: 0; }
          50% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .nav-item {
          cursor: pointer;
        }
        
        .nav-item span {
          display: inline-block;
        }

        .nav-item:hover span {
          animation: textSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div style={!showHero ? styles.navOnlyContainer : (isMobile ? {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      } : { ...styles.container, transform: `scale(${scale})` })}>
        
        {/* Navigation Bar */}
        <div style={!showHero ? styles.navOnlyBar : (isMobile ? {
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          padding: '20px',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box',
          zIndex: 50,
          backgroundColor: isMenuOpen ? '#FAFADC' : 'transparent'
        } : styles.navBar)}>
          <a href="/" style={{ ...styles.logoGroup, textDecoration: 'none' }}>
            <img src="/logo-mark.svg" alt="出海实操教程" width="22" height="20" />
            <span style={styles.logoText}>出海实操教程</span>
          </a>

          {!isMobile && (
            <div style={styles.menuGroup}>
              {navItems.map((item, idx) => (
                <a key={idx} href={item.href} style={{ textDecoration: 'none' }} className="nav-item">
                  <div style={styles.menuItem}>
                    <div style={styles.menuDot}></div>
                    <span style={styles.menuText}>{item.label}</span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {isMobile ? (
            <div style={{ cursor: 'pointer', padding: '8px' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#024F47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            </div>
          ) : (
            <a href="/articles" className="nav-item" style={{ textDecoration: 'none' }}>
              <div style={styles.startProject}>
                <div style={{ ...styles.menuDot, backgroundColor: '#024F47' }}></div>
                <span style={styles.startProjectText}>最新教程</span>
                <div style={{ ...styles.menuDot, backgroundColor: '#024F47' }}></div>
              </div>
            </a>
          )}

          {/* Mobile Dropdown Menu */}
          {isMobile && isMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '72px',
              left: 0,
              width: '100%',
              backgroundColor: '#FAFADC',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              gap: '24px',
              boxSizing: 'border-box',
              borderBottom: '1px solid rgba(3, 79, 70, 0.1)',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)'
            }}>
              {navItems.map((item, idx) => (
                <a key={idx} href={item.href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '6px', height: '6px', backgroundColor: '#024F47', borderRadius: '50%' }}></div>
                  <span style={{ fontFamily: 'Inter Tight', fontSize: '18px', fontWeight: 500, color: '#024F47' }}>{item.label}</span>
                </a>
              ))}
              <a href="/articles" style={{ textDecoration: 'none' }}>
                <div style={{ ...styles.startProject, alignSelf: 'flex-start', marginTop: '10px' }}>
                  <span style={styles.startProjectText}>最新教程</span>
                </div>
              </a>
            </div>
          )}
        </div>

        {showHero && (
        <>
        {/* Hero Content */}
        <div style={isMobile ? {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '20px',
          width: '100%',
          paddingTop: '112px', // 72px nav + 40px gap
          zIndex: 20
        } : styles.heroContent}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={isMobile ? {
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '0.32em',
              color: '#024F47',
              opacity: 0.85,
              margin: 0
            } : {
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              letterSpacing: '0.32em',
              color: '#024F47',
              opacity: 0.85,
              margin: 0
            }}
          >
            GO GLOBAL, FROM HOME
          </motion.p>
          <motion.h1 
            style={isMobile ? {
              fontFamily: "'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
              fontWeight: 800,
              fontSize: '44px',
              lineHeight: '1.15',
              letterSpacing: '0.01em',
              color: '#024F47'
            } : styles.heroTitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } },
              hidden: {}
            }}
          >
            {/* Chinese: animate per line (segment) instead of per word */}
            {HERO_LINES.map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  variants={{
                    hidden: { y: '-100%', opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
          >
            <span style={{ width: '48px', height: '3px', backgroundColor: '#024F47', borderRadius: '2px', flex: 'none' }} />
            <span style={isMobile ? {
              fontFamily: "'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
              fontWeight: 500,
              fontSize: '17px',
              color: '#024F47',
              opacity: 0.78
            } : {
              fontFamily: "'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
              fontWeight: 500,
              fontSize: '24px',
              color: '#024F47',
              opacity: 0.78
            }}>
              跟着图文教程 · 一步一步办成
            </span>
          </motion.div>
          <motion.p 
            style={isMobile ? {
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '1.5',
              color: '#024F47',
              opacity: 0.8
            } : styles.heroSubtitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={{
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
              hidden: {}
            }}
          >
            {/* Chinese: animate per sentence segment instead of per word */}
            {HERO_SUBTITLE.map((seg, i) => (
              <React.Fragment key={i}>
                <span style={{ overflow: 'hidden', display: 'inline-flex', verticalAlign: 'top' }}>
                  <motion.span
                    variants={{
                      hidden: { y: '-100%', opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                    }}
                  >
                    {seg}
                  </motion.span>
                </span>
                {i < HERO_SUBTITLE.length - 1 && ' '}
              </React.Fragment>
            ))}
          </motion.p>
          <a href="/articles" className="animated-btn" style={{ ...(isMobile ? { ...styles.ctaWrapper, marginTop: 0 } : styles.ctaWrapper), textDecoration: 'none' }}>
            <div style={styles.ctaIconCircle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 5L13 12L6 19" stroke="white" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="4 5" />
                <path d="M13 5L20 12L13 19" stroke="white" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="4 5" />
              </svg>
            </div>
            <div style={styles.ctaTextPill}>
              <span style={styles.ctaText}>开始看教程</span>
            </div>
          </a>
        </div>

        {/* Social Media Curved Icons - Hidden on Mobile */}
        {!isMobile && (
          <motion.div style={styles.iconsContainer}
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {socialIcons.map((icon, idx) => {
              const N = socialIcons.length;
              const startIdx = idx + 1; 

              const getSequence = (arr: any[], sIdx: number) => {
                const seq = [];
                for (let i = 0; i <= arr.length; i++) {
                  seq.push(arr[(sIdx + i) % arr.length]);
                }
                return seq;
              };

              const xSeq = getSequence(socialIcons.map(s => parseInt(s.left)), startIdx);
              const ySeq = getSequence(socialIcons.map(s => parseInt(s.top)), startIdx);
              const rotateSeq = getSequence(socialIcons.map(s => s.rotate), startIdx);

              const segments = socialIcons.map((p1, i) => {
                if (i === N - 1) return 0.0001;
                const p2 = socialIcons[i + 1];
                const dx = parseInt(p2.left) - parseInt(p1.left);
                const dy = parseInt(p2.top) - parseInt(p1.top);
                return Math.sqrt(dx * dx + dy * dy);
              });
              
              const totalDistance = segments.reduce((sum, val) => sum + val, 0);
              const segmentTimes = segments.map(d => d / totalDistance);

              const times = [0];
              let currentTime = 0;
              for (let i = 0; i < N; i++) {
                const currentSegmentIdx = (startIdx + i) % N;
                currentTime += segmentTimes[currentSegmentIdx];
                if (currentTime > 1) currentTime = 1;
                times.push(currentTime);
              }
              times[times.length - 1] = 1;

              return (
                <motion.div key={idx} style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '70.44px',
                  height: '70.44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  opacity: 1
                }}
                animate={{ x: xSeq, y: ySeq, rotate: rotateSeq, opacity: 1 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear", times: times }}
                >
                  <img 
                    src={icon.url} 
                    alt={`Social Icon ${idx}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Hero Image Container */}
        <motion.div style={isMobile ? {
          width: '100%',
          height: '400px',
          backgroundColor: '#024F47',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative'
        } : styles.heroImageContainer}
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={isMobile ? {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '6px 12px',
            position: 'absolute',
            right: '12px',
            top: '12px',
            backgroundColor: '#FEFFFE',
            borderRadius: '999px',
            zIndex: 20,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          } : styles.viewsBadge}>
            <span style={styles.viewsText}>{STATS.total} 篇实测图文</span>
          </div>
          <video 
            src="/jiro/smm.mp4"
            autoPlay 
            loop 
            muted 
            playsInline 
            style={isMobile ? { ...styles.heroImage, borderRadius: 'inherit' } : styles.heroImage} 
          />
        </motion.div>
        </>
        )}

      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  /* showHero=false: plain nav bar — no reserved hero height, no scale transform */
  navOnlyWrapper: {
    width: '100%',
    height: 'auto',
    minHeight: 0,
    backgroundColor: '#FAFADC',
    padding: '24px 40px',
    boxSizing: 'border-box',
    position: 'relative',
    display: 'block',
    overflow: 'visible',
  },
  navOnlyContainer: {
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    height: 'auto',
    position: 'relative',
  },
  navOnlyBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 'auto',
    position: 'relative',
    top: 'auto',
    left: 'auto',
    zIndex: 20,
  },
  fullWidthWrapper: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#FAFADC',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // This guarantees vertical centering
    overflow: 'hidden',
  },
  container: {
    width: '1440px',
    height: '805px',
    position: 'relative',
    transformOrigin: 'center center',
    flexShrink: 0, 
  },
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%', // Fully stretches within the 1440px
    height: '24px',
    top: '30px',
    left: '0px',
    zIndex: 20,
  },
  logoGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  logoText: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 600,
    fontSize: '22px',
    textTransform: 'capitalize',
    color: '#010101',
  },
  menuGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '32px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'opacity 0.2s'
  },
  menuDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#010101',
    borderRadius: '1px',
  },
  menuText: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 500,
    fontSize: '16px',
    color: '#010101',
  },
  startProject: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'opacity 0.2s'
  },
  startProjectText: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 500,
    fontSize: '16px',
    color: '#010101',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '32px',
    position: 'absolute',
    width: '640px',
    left: '0px', // Adjusted from 80px since container is now 1440px
    top: '160px',
    zIndex: 20
  },
  heroTitle: {
    width: '642.76px',
    fontFamily: "'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: '94px',
    lineHeight: '1.1',
    letterSpacing: '0.01em',
    color: '#024F47',
    flex: 'none',
    order: 0,
    alignSelf: 'stretch',
    flexGrow: 0,
    margin: 0,
  },
  heroSubtitle: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#024F47',
    margin: 0,
    maxWidth: '560px'
  },
  ctaWrapper: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '6px',
    gap: '8px',
    border: '1.5px solid #024F47',
    borderRadius: '100px',
    marginTop: '10px',
    cursor: 'pointer'
  },
  ctaIconCircle: {
    width: '54px',
    height: '54px',
    backgroundColor: '#024F47',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ctaTextPill: {
    height: '54px',
    padding: '0 32px',
    backgroundColor: '#024F47',
    borderRadius: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ctaText: {
    fontFamily: "'Goudy Bookletter 1911', 'Goudy Old Style', serif",
    fontWeight: 700,
    fontSize: '22px',
    color: '#FEFFFE',
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap'
  },
  iconsContainer: {
    position: 'absolute',
    width: '1600px', // Original width
    height: '805px',
    left: '-80px', // Shifts all absolute icon coordinates correctly onto the 1440px canvas
    top: '0px',
    pointerEvents: 'none'
  },
  heroImageContainer: {
    position: 'absolute',
    width: '480px',
    height: '680px',
    right: '0px', // Adjusted from 80px to align to right edge of 1440px container
    bottom: '0px',
    backgroundColor: '#024F47',
    borderRadius: '40px 40px 0px 0px',
    zIndex: 15,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '40px 40px 0px 0px',
  },
  viewsBadge: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 20px',
    position: 'absolute',
    right: '24px',
    top: '24px',
    backgroundColor: '#FEFFFE',
    borderRadius: '999px',
    zIndex: 20,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  },
  viewsText: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 600,
    fontSize: '14px',
    color: '#024F47',
  }
};

export default Header;
