import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Whychooseus = () => {
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

  // Real differentiators (no invented claims).
  const approachItems = [
    {
      text: '每篇亲测',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#024E46" strokeWidth="1.5">
          <path d="M9 18h6M10 21h4M12 2v2M4.22 4.22l1.42 1.42M1 12h2M21 12h2M18.36 5.64l1.42-1.42M12 6a5 5 0 0 0-4.54 7.07A5.4 5.4 0 0 1 9 16h6a5.4 5.4 0 0 1 1.54-2.93A5 5 0 0 0 12 6z"/>
        </svg>
      )
    },
    {
      text: '真实截图分步',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#024E46" strokeWidth="1.5">
          <path d="M12 19l7-7 3 3-7 7-3-3z"/>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
          <path d="M2 2l7.586 7.586"/>
          <circle cx="11" cy="11" r="2"/>
        </svg>
      )
    },
    {
      text: '标注时效与风险',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#024E46" strokeWidth="1.5">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )
    },
    {
      text: '免费可读',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#024E46" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      )
    }
  ];

  if (isMobile) {
    return (
      <div id="why" style={{ width: '100%', backgroundColor: '#FAFBDD', padding: '60px 20px', boxSizing: 'border-box' }}>
        
        {/* Top Image */}
        <motion.div 
          style={{ width: '92%', maxWidth: '560px', margin: '0 auto 40px', backgroundColor: '#FFFFFF', padding: '10px', border: '1.5px solid #024E46', borderRadius: '20px', boxShadow: '0 12px 32px rgba(2, 78, 70, 0.12)', boxSizing: 'border-box', aspectRatio: '16/9', overflow: 'hidden' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <a href="/posts/2026-10-15-免费出海资源大集合-图文攻略.html" style={{ textDecoration: 'none' }}>
            <img src="/img/covers/2026-10-15-免费出海资源大集合-图文攻略.webp" alt="2026 免费出海资源大集合：7 个亲测能用的白嫖姿势（图文攻略）" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '12px' }} />
          </a>
        </motion.div>

        {/* Text Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare}></div>
            <span style={styles.pillText}>为什么看这里</span>
          </div>

          <motion.h2 
            style={{ ...styles.mainTitle, width: '100%', fontSize: '40px', lineHeight: '46px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {}
            }}
          >
            {/* Chinese: animate per character segment instead of per word */}
            {'为什么看这里'.split('').map((char, i) => (
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

          <motion.p style={{ ...styles.subTitle, width: '100%', textAlign: 'left' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            这里不是广告合集。每篇教程都在家亲手办过，截图、步骤、避坑和时效都写在正文里，免费阅读。
          </motion.p>
        </div>

        {/* Approach List Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare}></div>
            <span style={styles.pillText}>Our Approach</span>
          </div>

          <motion.div 
            style={styles.approachList}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
          >
            {approachItems.map((item, index) => (
              <motion.div 
                key={index} 
                style={styles.approachItem}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
              >
                <div style={styles.approachIconBox}>
                  {item.icon}
                </div>
                <span style={styles.approachItemText}>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Description */}
        <motion.p 
          style={{ ...styles.bottomRightText, position: 'relative', left: 'auto', top: 'auto', width: '100%', height: 'auto', textAlign: 'left' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          每篇教程都标注了实测日期和前提条件；政策或入口变化时会更新正文，办成后的保号与维护动作也一并写进文中。
        </motion.p>

        {/* CTA Button */}
        <motion.a 
          href="/articles"
          className="animated-btn" 
          style={{ ...styles.ctaWrapper, position: 'relative', left: 'auto', top: 'auto', marginTop: '40px', textDecoration: 'none' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <div style={styles.ctaIconBox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FEFFFE" strokeWidth="2">
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
            </svg>
          </div>
          <div style={styles.ctaTextBox}>
            <span style={styles.ctaText}>开始看教程</span>
          </div>
        </motion.a>

      </div>
    );
  }

  return (
    <div id="why" style={styles.fullWidthWrapper}>
      <div style={{ 
        ...styles.container, 
        transform: `scale(${scale})`,
        marginBottom: `${-1248 * (1 - scale)}px`
      }}>
        
        {/* Top Image */}
        <motion.div 
          style={styles.topImage}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <a href="/posts/2026-10-15-免费出海资源大集合-图文攻略.html" style={{ textDecoration: 'none' }}>
          <img src="/img/covers/2026-10-15-免费出海资源大集合-图文攻略.webp" alt="2026 免费出海资源大集合：7 个亲测能用的白嫖姿势（图文攻略）" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '12px' }} />
        </a>
        </motion.div>

        {/* Composed content block — normal document flow (heading, text, link, approach list) */}
        <div style={styles.contentRow}>

        {/* Left Column (Main text) */}
        <div style={styles.leftStack}>
        <div style={styles.leftColumn}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare}></div>
            <span style={styles.pillText}>为什么看这里</span>
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
              {'为什么看这里'.split('').map((char, i) => (
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
              这里不是广告合集。每篇教程都在家亲手办过，截图、步骤、避坑和时效都写在正文里，免费阅读。
            </motion.p>
          </div>
        </div>

        {/* CTA Button */}
        <a href="/articles" className="animated-btn" style={{ ...styles.ctaWrapper, textDecoration: 'none' }}>
          <div style={styles.ctaIconBox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FEFFFE" strokeWidth="2">
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
            </svg>
          </div>
          <div style={styles.ctaTextBox}>
            <span style={styles.ctaText}>开始看教程</span>
          </div>
        </a>
        </div>

        {/* Right Column (Approach list) + bottom description */}
        <div style={styles.rightStack}>
        <div style={styles.rightColumn}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare}></div>
            <span style={styles.pillText}>Our Approach</span>
          </div>

          <motion.div 
            style={styles.approachList}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
          >
            {approachItems.map((item, index) => (
              <motion.div 
                key={index} 
                style={styles.approachItem}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
              >
                <div style={styles.approachIconBox}>
                  {item.icon}
                </div>
                <span style={styles.approachItemText}>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Right Description */}
        <motion.p 
          style={styles.bottomRightText}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          每篇教程都标注了实测日期和前提条件；政策或入口变化时会更新正文，办成后的保号与维护动作也一并写进文中。
        </motion.p>
        </div>
        </div>

      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  fullWidthWrapper: {
    width: '100%',
    backgroundColor: '#FAFBDD',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  container: {
    width: '1600px',
    height: 'auto',
    paddingBottom: '80px',
    position: 'relative',
    transformOrigin: 'top center',
    flexShrink: 0, 
  },
  topImage: {
    width: '880px',
    maxWidth: '100%',
    height: 'auto',
    aspectRatio: '16/9',
    margin: '0 auto',
    backgroundColor: '#FFFFFF',
    padding: '10px',
    border: '1.5px solid #024E46',
    borderRadius: '20px',
    boxShadow: '0 12px 32px rgba(2, 78, 70, 0.12)',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: '60px',
    padding: '0 80px',
    boxSizing: 'border-box',
  },
  leftStack: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '91px',
    width: '657px',
  },
  rightStack: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '50px',
    width: '429px',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '20px',
    width: '657px',
    height: '252px',
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
    backgroundColor: '#024E46',
    borderRadius: '2px',
  },
  pillText: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '24px',
    textTransform: 'capitalize',
    color: '#010101',
  },
  titleGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '16px',
    width: '657px',
  },
  mainTitle: {
    fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
    fontWeight: 700,
    fontSize: '70px',
    lineHeight: '70px',
    letterSpacing: '-0.02em',
    color: '#024E46',
    margin: 0,
    width: '657px',
  },
  subTitle: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
    textTransform: 'capitalize',
    color: '#024E46',
    margin: 0,
    width: '598px',
  },
  ctaWrapper: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4px',
    gap: '2px',
    width: '220px',
    height: '56px',
    border: '1px solid #024E46',
    borderRadius: '999px',
    cursor: 'pointer',
  },
  ctaIconBox: {
    width: '46px',
    height: '46px',
    backgroundColor: '#024E46',
    borderRadius: '999px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  ctaTextBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px 20px',
    gap: '5px',
    width: '162px',
    height: '46px',
    backgroundColor: '#024E46',
    borderRadius: '999px',
    justifyContent: 'center',
  },
  ctaText: {
    fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '26px',
    color: '#FEFFFE',
    margin: 0,
    whiteSpace: 'nowrap',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
    width: '301px',
    height: '245px',
  },
  approachList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '14px',
    width: '301px',
  },
  approachItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    width: '301px',
    height: '29px',
  },
  approachIconBox: {
    width: '29px',
    height: '29px',
    backgroundColor: 'rgba(3, 79, 70, 0.04)',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  approachItemText: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '22px',
    textTransform: 'capitalize',
    color: '#024E46',
  },
  bottomRightText: {
    width: '429px',
    height: '104px',
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
    textTransform: 'capitalize',
    color: '#024E46',
    margin: 0,
  }
};

export default Whychooseus;
