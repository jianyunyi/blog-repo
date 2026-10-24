import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  RECENT_POSTS,
  STATS,
  CATEGORIES,
  categoryCount,
  topicLabel,
  oneLineSummary,
  postHref,
} from '@/lib/site-content';

/** Section stats row — real numbers only (from data/articles.json). */
const STATS_ROW = [
  `文章总数 ${STATS.total}`,
  '持续更新 每日一篇起',
  `主题分类 ${CATEGORIES.length}`,
];

const AnimatedMetric = ({ metric, index, studyIndex }: { metric: string, index: number, studyIndex: number }) => {
  const match = metric.match(/^([^\d]*)(\d+)(.*)$/);
  
  if (match) {
    const prefix = match[1];
    const value = parseInt(match[2], 10);
    const suffix = match[3];

    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
      count.set(0);
      const timeout = setTimeout(() => {
        animate(count, value, { duration: 1.2, ease: 'easeOut' });
      }, 100 + index * 100);
      return () => {
        clearTimeout(timeout);
        count.stop();
      };
    }, [value, index, studyIndex, count]);

    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        {prefix}<motion.span>{rounded}</motion.span>{suffix}
      </span>
    );
  }

  return <span>{metric}</span>;
};

const CaseStudy = () => {
  const [scale, setScale] = useState(1);
  const [activeStudyIndex, setActiveStudyIndex] = useState(0);
  
  const navRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  // The 4 most recent real posts (title, cover, link, date all from the manifest).
  const caseStudiesData = RECENT_POSTS.map((article) => ({
    article,
    name: topicLabel(article),
    logo: topicLabel(article),
    description: oneLineSummary(article, 66),
    date: article.date,
    title: article.title,
    cover: `/img/thumbs/${article.slug}.webp`,
    href: postHref(article),
    metrics: STATS_ROW,
  }));

  const activeData = caseStudiesData[activeStudyIndex];

  // Real topic categories with real post counts (replaces client logos).
  const renderLogos = () => (
    <>
      {CATEGORIES.map((cat, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#024E46', borderRadius: '2px' }}></div>
          <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600, fontSize: '22px', color: '#024E46', whiteSpace: 'nowrap' }}>
            {cat.name} · {categoryCount(cat.key)} 篇
          </span>
        </div>
      ))}
    </>
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - navRef.current.offsetLeft);
    setScrollLeft(navRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !navRef.current) return;
    e.preventDefault();
    const x = e.pageX - navRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    navRef.current.scrollLeft = scrollLeft - walk;
  };

  if (isMobile) {
    return (
      <div id="cases" style={{ width: '100%', backgroundColor: '#FAFBDD', padding: '60px 20px', boxSizing: 'border-box' }}>
        <style>
          {`
            @keyframes scrollMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>
        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare}></div>
            <span style={styles.pillText}>最新文章</span>
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
            {/* Chinese: animate per character segment instead of per word */}
            {'最新图文教程'.split('').map((char, i) => (
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
            最近四周的新帖，每篇都亲手实测：真实封面、标题、日期和分步截图，点开就能照着做。
          </motion.p>
        </div>

        {/* Content Wrapper */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Nav Bar */}
          <div 
            ref={navRef}
            style={{ 
              ...styles.navBar, 
              width: '100%',
              padding: '12px 16px',
              height: 'auto',
              cursor: isDragging ? 'grabbing' : 'grab' 
            }} 
            className="hide-scrollbar"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {caseStudiesData.map((pill, index) => {
              const isActive = index === activeStudyIndex;
              return (
                <div 
                  key={index}
                  onClick={() => setActiveStudyIndex(index)}
                  style={{ 
                    ...styles.navPill, 
                    backgroundColor: isActive ? '#024E46' : '#F6F7F6',
                    color: isActive ? '#FFFFFF' : '#024E46',
                    fontSize: '16px',
                    padding: '8px 16px'
                  }}
                >
                  {pill.name}
                </div>
              );
            })}
          </div>

          {/* Top Card Stacked */}
          <motion.div 
            style={{ width: '100%', backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <a href={activeData.href} style={{ display: 'block', width: '100%', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', textDecoration: 'none' }}>
              <img src={activeData.cover} alt={activeData.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </a>

            <div>
              <h3 style={{ ...styles.cardLogoText, fontSize: '28px', marginBottom: '16px' }}>{activeData.logo}</h3>
              <a href={activeData.href} style={{ textDecoration: 'none' }}>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: '20px', lineHeight: '28px', color: '#024E46', margin: '0 0 4px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', whiteSpace: 'normal', wordBreak: 'break-all', minWidth: 0, flexBasis: 'auto' }}>{activeData.title}</p>
              </a>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#65758B', margin: '0 0 10px 0', whiteSpace: 'nowrap', flexShrink: 0, minWidth: 0 }}>{activeData.date} · 实测图文教程</p>
              <motion.div 
                key={`desc-mobile-${activeStudyIndex}`}
                style={{ ...styles.cardDescription, fontSize: '16px', lineHeight: '24px', marginBottom: '20px' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={{
                  visible: { transition: { staggerChildren: 0.02 } },
                  hidden: {}
                }}
              >
                {/* Chinese: animate per phrase segment instead of per word */}
                {activeData.description.split(/(?<=[，。；])/).map((seg, i) => (
                  <React.Fragment key={i}>
                    <span style={{ overflow: 'hidden', display: 'inline-flex', verticalAlign: 'bottom' }}>
                      <motion.span
                        variants={{
                          hidden: { y: '100%', opacity: 0 },
                          visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                        }}
                      >
                        {seg}
                      </motion.span>
                    </span>
                  </React.Fragment>
                ))}
              </motion.div>
              <motion.div 
                key={`metrics-mobile-${activeStudyIndex}`}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {activeData.metrics.map((metric, idx) => (
                  <div key={idx} style={{ ...styles.metricPill, fontSize: '14px', padding: '6px 12px' }}>
                    <AnimatedMetric metric={metric} index={idx} studyIndex={activeStudyIndex} />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Logo Marquee Bar */}
          <div style={{ ...styles.logoBarWrapper, width: '100%' }}>
            <div style={styles.logoBarScroller}>
              <div style={styles.marqueeTrack}>
                {renderLogos()}
              </div>
              <div style={styles.marqueeTrack}>
                {renderLogos()}
              </div>
            </div>
          </div>

          {/* Bottom Card Stacked */}
          <motion.div 
            style={{ width: '100%', aspectRatio: '16/9', borderRadius: '24px', overflow: 'hidden', marginTop: '10px' }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
             <a href={caseStudiesData[3].href} style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}>
               <img src={caseStudiesData[3].cover} alt={caseStudiesData[3].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             </a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div id="cases" style={styles.fullWidthWrapper}>
      <style>
        {`
          @keyframes scrollMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      <div style={{ 
        ...styles.container, 
        transform: `scale(${scale})`,
        marginBottom: `${-1593 * (1 - scale)}px`
      }}>
        
        {/* Header Section */}
        <div style={styles.headerFrame}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare}></div>
            <span style={styles.pillText}>最新文章</span>
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
              {/* Chinese: animate per character segment instead of per word */}
              {'最新图文教程'.split('').map((char, i) => (
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
              最近四周的新帖，每篇都亲手实测：真实封面、标题、日期和分步截图，点开就能照着做。
            </motion.p>
          </div>
        </div>

        {/* Content Wrapper */}
        <div style={styles.contentWrapper}>
          
          {/* Top Nav Bar */}
          <div 
            ref={navRef}
            style={{ 
              ...styles.navBar, 
              cursor: isDragging ? 'grabbing' : 'grab' 
            }} 
            className="hide-scrollbar"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {caseStudiesData.map((pill, index) => {
              const isActive = index === activeStudyIndex;
              return (
                <div 
                  key={index}
                  onClick={() => setActiveStudyIndex(index)}
                  style={{ 
                    ...styles.navPill, 
                    backgroundColor: isActive ? '#024E46' : '#F6F7F6',
                    color: isActive ? '#FFFFFF' : '#024E46'
                  }}
                >
                  {pill.name}
                </div>
              );
            })}
          </div>

          {/* Top Card */}
          <motion.div 
            style={styles.topCard}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            
            <a href={activeData.href} style={{ ...styles.cardMainImageWrapper, textDecoration: 'none' }}>
              <img src={activeData.cover} alt={activeData.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </a>

            <div style={styles.cardLogoWrapper}>
              <h3 style={styles.cardLogoText}>{activeData.logo}</h3>
              <a href={activeData.href} style={{ textDecoration: 'none' }}>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: '20px', lineHeight: '28px', color: '#024E46', margin: '0 0 4px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', whiteSpace: 'normal', wordBreak: 'break-all', minWidth: 0, flexBasis: 'auto' }}>{activeData.title}</p>
              </a>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#65758B', margin: '0 0 10px 0', whiteSpace: 'nowrap', flexShrink: 0, minWidth: 0 }}>{activeData.date} · 实测图文教程</p>
            </div>

            <div style={{ ...styles.cardTextGroup, height: '168px' }}>
              <motion.div 
                key={`desc-desktop-${activeStudyIndex}`}
                style={styles.cardDescription}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={{
                  visible: { transition: { staggerChildren: 0.02 } },
                  hidden: {}
                }}
              >
                {activeData.description.split(" ").map((word, i, arr) => (
                  <React.Fragment key={i}>
                    <span style={{ overflow: 'hidden', display: 'inline-flex', verticalAlign: 'bottom' }}>
                      <motion.span
                        variants={{
                          hidden: { y: '100%', opacity: 0 },
                          visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                    {i < arr.length - 1 && ' '}
                  </React.Fragment>
                ))}
              </motion.div>

              <motion.div 
                key={`metrics-desktop-${activeStudyIndex}`}
                style={styles.metricsRow}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {activeData.metrics.map((metric, idx) => (
                  <div key={idx} style={styles.metricPill}>
                    <AnimatedMetric metric={metric} index={idx} studyIndex={activeStudyIndex} />
                  </div>
                ))}
              </motion.div>
            </div>

          </motion.div>

          {/* Logo Marquee Bar */}
          <div style={styles.logoBarWrapper}>
            <div style={styles.logoBarScroller}>
              <div style={styles.marqueeTrack}>
                {renderLogos()}
              </div>
              <div style={styles.marqueeTrack}>
                {renderLogos()}
              </div>
            </div>
          </div>

          {/* Bottom Card */}
          <motion.div 
            style={styles.bottomCard}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
             <a href={caseStudiesData[3].href} style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}>
               <img src={caseStudiesData[3].cover} alt={caseStudiesData[3].title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px' }} />
             </a>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  fullWidthWrapper: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#FAFBDD',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  container: {
    width: '1600px',
    height: '1593px',
    position: 'relative',
    transformOrigin: 'top center',
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
    width: '115px',
    height: '24px',
  },
  pillSquare: {
    width: '8px',
    height: '8px',
    backgroundColor: '#024E46',
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
    height: '138px',
  },
  mainTitle: {
    fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
    fontWeight: 700,
    fontSize: '70px',
    lineHeight: '70px',
    textAlign: 'center',
    letterSpacing: '-0.02em',
    color: '#024E46',
    margin: 0,
    width: '695px',
  },
  subTitle: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#024E46',
    margin: 0,
    width: '516px',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '9px',
    position: 'absolute',
    width: '945px',
    height: '1191px',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '322px',
  },
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // allow it to scroll from left
    gap: '10px',
    width: '945px',
    height: '72px',
    backgroundColor: '#FFFFFF',
    borderRadius: '999px',
    flexShrink: 0,
    padding: '0 20px',
    overflowX: 'auto',
    boxSizing: 'border-box',
    userSelect: 'none',
  },
  navPill: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 16px',
    borderRadius: '999px',
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '28px',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  topCard: {
    width: '945px',
    height: '510px',
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    position: 'relative',
    flexShrink: 0,
  },
  cardMainImageWrapper: {
    position: 'absolute',
    width: '640px',
    height: '261px',
    left: '30px',
    top: '30px',
  },
  cardLogoWrapper: {
    position: 'absolute',
    width: '240px',
    height: '261px',
    left: '675px',
    top: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '10px',
  },
  cardLogoText: {
    fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
    fontWeight: 700,
    fontSize: '32px', // slightly smaller to accommodate longer names safely
    color: '#024E46',
    margin: 0,
    whiteSpace: 'nowrap',
    minWidth: 0,
    flexShrink: 0,
  },
  cardTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '14px',
    position: 'absolute',
    width: '683px',
    height: '138px',
    left: '30px',
    top: '342px',
  },
  cardDescription: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '28px',
    textTransform: 'capitalize',
    color: '#024E46',
    margin: 0,
    width: '100%',
  },
  metricsRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
  },
  metricPill: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 16px',
    backgroundColor: '#F6F7F6',
    borderRadius: '999px',
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '28px',
    textTransform: 'capitalize',
    color: '#024E46',
    whiteSpace: 'nowrap',
  },
  logoBarWrapper: {
    width: '945px',
    height: '72px',
    backgroundColor: '#FFFFFF',
    borderRadius: '999px',
    flexShrink: 0,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  logoBarScroller: {
    display: 'flex',
    width: 'max-content',
    animation: 'scrollMarquee 20s linear infinite',
  },
  marqueeTrack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '60px',
    paddingRight: '60px',
    width: 'max-content',
    flexShrink: 0,
  },
  bottomCard: {
    width: '945px',
    height: '510px',
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    position: 'relative',
    flexShrink: 0,
  }
};

export default CaseStudy;
