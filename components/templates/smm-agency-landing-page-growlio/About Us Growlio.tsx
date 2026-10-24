import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/site-content';

/** Real topic categories shown as the wordmark row (replaces client logos). */
const CategoryMarks = () => (
  <>
    {CATEGORIES.map((c, idx) => (
      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '8px', height: '8px', backgroundColor: '#FEFEEA', borderRadius: '2px' }}></div>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600, fontSize: '20px', color: '#FEFEEA', letterSpacing: '-0.5px' }}>
          {c.name}
        </span>
      </div>
    ))}
  </>
);

const About = () => {
  const [scale, setScale] = useState(1);

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setScale(1);
      } else {
        const screenWidth = window.innerWidth;
        const baseWidth = 1600;
        let newScale = screenWidth / baseWidth;
        if (newScale > 1.2) newScale = 1.2;
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={isMobile ? { ...styles.fullWidthWrapper, height: 'auto', minHeight: '100vh', paddingBottom: '0' } : { ...styles.fullWidthWrapper, height: `${889 * scale}px`, minHeight: '100vh' }}>
      <div style={isMobile ? {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      } : { ...styles.container, transform: `scale(${scale})` }}>

                {/* Top Category Marks Row (real blog topics) */}
        <div style={isMobile ? {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          width: '100%',
          padding: '20px',
          boxSizing: 'border-box',
          marginTop: '20px'
        } : styles.logosRow}>
          <CategoryMarks />
        </div>


        <div style={isMobile ? {
          width: '100%',
          backgroundColor: '#1A1B1B',
          borderRadius: '40px 40px 0px 0px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 20px',
          boxSizing: 'border-box',
          marginTop: '20px'
        } : styles.darkSection}>

          {/* Two-column magazine layout: copy + CTA left, stacked photos right */}
          <div style={isMobile ? {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '20px',
            width: '100%'
          } : styles.aboutRow}>

            {/* Left column: eyebrow, headline, rule, paragraphs, CTA */}
            <div style={isMobile ? {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '20px',
              width: '100%'
            } : styles.aboutLeft}>

              {/* Eyebrow label row */}
              <div style={isMobile ? { ...styles.aboutEyebrow, width: '100%', padding: 0 } : styles.aboutEyebrow}>
                <div style={styles.aboutEyebrowDot}></div>
                <span style={styles.aboutEyebrowCn}>关于本站</span>
                <span style={styles.aboutEyebrowEn}>ABOUT THIS SITE</span>
              </div>

              {/* Headline: two block lines, each rising from its mask */}
              <motion.h1
                style={isMobile ? { ...styles.aboutHeadline, fontSize: '40px', lineHeight: 1.2, width: '100%', marginTop: 0 } : styles.aboutHeadline}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                  hidden: {}
                }}
              >
                <span style={{ display: 'block', overflow: 'hidden', color: '#FEFEEA' }}>
                  <motion.span
                    style={{ display: 'block' }}
                    variants={{
                      hidden: { y: '100%', opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                    }}
                  >
                    每篇亲测，
                  </motion.span>
                </span>
                <span style={{ display: 'block', overflow: 'hidden', color: '#7BD8B8' }}>
                  <motion.span
                    style={{ display: 'block' }}
                    variants={{
                      hidden: { y: '100%', opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                    }}
                  >
                    照着做就能办成
                  </motion.span>
                </span>
              </motion.h1>

              {/* Mint rule */}
              <div style={isMobile ? { ...styles.aboutRule, marginTop: 0 } : styles.aboutRule}></div>

              <motion.p style={isMobile ? { ...styles.aboutCopy, width: '100%', marginTop: 0 } : styles.aboutCopy}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                这里是一个人在家就能照着办的出海实操笔记：海外域名、企业邮箱、免费 VPS、各国税号、手机卡保号、跨境收款和 AI 工具，写给不想出门、但想把事办成的你。
              </motion.p>

              <motion.p style={isMobile ? { ...styles.aboutCopy, width: '100%', marginTop: 0 } : { ...styles.aboutCopy, marginTop: '20px' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                每篇教程都配了真实截图和分步说明，写明实测日期、前提条件和避坑点；免费可读，持续更新，照着做就能办下来。办成后的保号和维护，也一并写进文中。
              </motion.p>

              {/* Start Reading Button (desktop: bottom of left column) */}
              {!isMobile && (
                <a href="/articles" className="animated-btn" style={{ ...styles.ctaButtonWrapper, marginTop: '36px', textDecoration: 'none' }}>
                  <div style={styles.ctaIconCircle}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 5L13 12L6 19" stroke="#024F46" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="4 5" />
                      <path d="M13 5L20 12L13 19" stroke="#024F46" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="4 5" />
                    </svg>
                  </div>
                  <div style={styles.ctaTextPill}>
                    <span style={styles.ctaText}>开始看教程</span>
                  </div>
                </a>
              )}
            </div>

            {/* Right column: stacked photos (mobile: side-by-side row) */}
            <div style={isMobile ? {
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              width: '100%'
            } : styles.aboutRight}>
              {isMobile ? (
                <>
                  <a href="/posts/2026-10-13-免费com域名-northwest图文教程.html" style={{ textDecoration: 'none', width: '48%', minWidth: '0', boxSizing: 'border-box' }}>
                    <img src="/img/thumbs/2026-10-13-免费com域名-northwest图文教程.webp" alt="免费拿下你的第一个 .com 域名：Northwest 图文教程" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', border: '4px solid #FEFEEA', borderRadius: '12px', boxSizing: 'border-box', display: 'block' }} />
                  </a>
                  <a href="/posts/2026-10-15-免费esim-giffgaff保号图文教程.html" style={{ textDecoration: 'none', width: '48%', minWidth: '0', boxSizing: 'border-box' }}>
                    <img src="/img/thumbs/2026-10-15-免费esim-giffgaff保号图文教程.webp" alt="人在国内，免费领一张英国手机号：Giffgaff eSIM 保号全攻略" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', border: '4px solid #FEFEEA', borderRadius: '12px', boxSizing: 'border-box', display: 'block' }} />
                  </a>
                </>
              ) : (
                <>
                  <a href="/posts/2026-10-13-免费com域名-northwest图文教程.html" style={{ position: 'absolute', top: 0, right: '30px', textDecoration: 'none' }}>
                    <img src="/img/thumbs/2026-10-13-免费com域名-northwest图文教程.webp" alt="免费拿下你的第一个 .com 域名：Northwest 图文教程" style={styles.aboutPhoto} />
                  </a>
                  <a href="/posts/2026-10-15-免费esim-giffgaff保号图文教程.html" style={{ position: 'absolute', top: '250px', right: '300px', textDecoration: 'none' }}>
                    <img src="/img/thumbs/2026-10-15-免费esim-giffgaff保号图文教程.webp" alt="人在国内，免费领一张英国手机号：Giffgaff eSIM 保号全攻略" style={styles.aboutPhoto} />
                  </a>
                </>
              )}
            </div>

            {/* Start Reading Button (mobile: below the photos) */}
            {isMobile && (
              <a href="/articles" className="animated-btn" style={{ ...styles.ctaButtonWrapper, marginTop: '28px', textDecoration: 'none' }}>
                <div style={styles.ctaIconCircle}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 5L13 12L6 19" stroke="#024F46" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="4 5" />
                    <path d="M13 5L20 12L13 19" stroke="#024F46" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="4 5" />
                  </svg>
                </div>
                <div style={styles.ctaTextPill}>
                  <span style={styles.ctaText}>开始看教程</span>
                </div>
              </a>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  fullWidthWrapper: {
    width: '100%',
    backgroundColor: '#024F46',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '1600px',
    height: '889px',
    position: 'relative',
    transformOrigin: 'center center',
    flexShrink: 0, 
  },
  logosRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '46px',
    position: 'absolute',
    width: '1056px',
    height: '33px',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '50px',
  },
  logoImage: {
    height: '30px',
    objectFit: 'contain',
    opacity: 0.9,
  },
  darkSection: {
    position: 'absolute',
    width: '1600px',
    height: '756px',
    left: '0px',
    top: '133px',
    backgroundColor: '#1A1B1B',
    borderRadius: '60px 60px 0px 0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  aboutRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '1405px',
    marginTop: '72px',
    gap: '60px',
    alignItems: 'flex-start',
  },
  aboutLeft: {
    width: '700px',
    flex: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  aboutEyebrow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '14px',
  },
  aboutEyebrowDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#7BD8B8',
    borderRadius: '2px',
  },
  aboutEyebrowCn: {
    fontFamily: "'Noto Sans SC','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
    fontWeight: 700,
    fontSize: '16px',
    letterSpacing: '0.2em',
    color: '#FEFEEA',
  },
  aboutEyebrowEn: {
    fontFamily: "'Inter Tight',sans-serif",
    fontWeight: 700,
    fontSize: '13px',
    letterSpacing: '0.32em',
    color: '#7BD8B8',
  },
  aboutHeadline: {
    fontFamily: "'Noto Sans SC','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
    fontWeight: 800,
    fontSize: '76px',
    lineHeight: 1.15,
    textAlign: 'left',
    color: '#FEFEEA',
    margin: 0,
    marginTop: '26px',
  },
  aboutRule: {
    width: '88px',
    height: '4px',
    backgroundColor: '#7BD8B8',
    borderRadius: '2px',
    marginTop: '30px',
  },
  aboutCopy: {
    width: '640px',
    fontFamily: "'Inter Tight','Noto Sans SC',sans-serif",
    fontWeight: 500,
    fontSize: '17px',
    lineHeight: 1.65,
    color: '#D8D8D2',
    textAlign: 'left',
    margin: 0,
    marginTop: '30px',
  },
  aboutRight: {
    flex: 1,
    position: 'relative',
    height: '590px',
  },
  aboutPhoto: {
    width: '340px',
    height: '340px',
    objectFit: 'cover',
    border: '6px solid #FEFEEA',
    borderRadius: '16px',
    boxShadow: '0 24px 48px rgba(0,0,0,0.35)',
  },
  ctaButtonWrapper: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4px',
    gap: '2px',
    border: '1.5px solid #FFFFFF',
    borderRadius: '999px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  ctaIconCircle: {
    width: '46px',
    height: '46px',
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ctaTextPill: {
    height: '46px',
    padding: '0 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ctaText: {
    fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
    fontWeight: 700,
    fontSize: '16px',
    color: '#024F46',
  },
};

export default About;
