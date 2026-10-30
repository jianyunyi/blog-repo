import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { STARTER_POST, STATS, postHref } from '@/lib/site-content';

const FAQ = () => {
  const [scale, setScale] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);

  // 5 real questions about this blog — no invented claims.
  const faqs = [
    {
      question: '内容收费吗？',
      answer: `不收费。${STATS.total} 篇教程全部免费可读，无需注册，直接点开就能看。`
    },
    {
      question: '更新频率如何？',
      answer: '每日一篇起，持续更新；每篇正文都标注了实测日期，随时可以核对时效。'
    },
    {
      question: '新手先看哪篇？',
      answer: '先看这篇：把免费资源、域名、邮箱一条线串起来，再按分类深入。',
      link: postHref(STARTER_POST),
      linkText: STARTER_POST.title
    },
    {
      question: '教程会过期吗？',
      answer: '政策或入口变化时会更新正文。每篇都标注了时效和前提条件，动手前先看准。'
    },
    {
      question: '能否照着办成？',
      answer: '每篇都是亲手实操的记录：注册入口、分步截图、踩过的坑和维护动作都写在文中。'
    }
  ];

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        const availableWidth = window.innerWidth - 160; 
        let newScale = availableWidth / 1440;
        
        const availableHeight = window.innerHeight;
        const heightScale = availableHeight / 766;
        
        newScale = Math.min(newScale, heightScale);

        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <style>{`
        .faq-section-wrapper {
          width: 100%;
          height: 100vh;
          background: #FAFADC;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          font-family: 'Inter Tight', sans-serif;
        }

        .faq-container {
          width: 1440px;
          height: 766px;
          position: relative;
          transform-origin: center center;
          flex-shrink: 0;
        }

        .faq-header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0px;
          gap: 20px;
          position: absolute;
          width: 844.16px;
          height: 182px;
          left: calc(50% - 844.16px/2);
          top: 80px;
        }

        .faq-tag {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 5px;
        }

        .faq-tag-dot {
          width: 8px;
          height: 8px;
          background: #024F47;
          border-radius: 2px;
        }

        .faq-tag-text {
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          text-align: center;
          text-transform: capitalize;
          color: #000100;
        }

        .faq-title-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          width: 100%;
        }

        .faq-title {
          font-family: 'Goudy Old Style', serif;
          font-weight: 700;
          font-size: 70px;
          line-height: 70px;
          text-align: center;
          letter-spacing: -0.02em;
          color: #024F47;
          margin: 0;
          width: 833px;
        }

        .faq-subtitle {
          font-weight: 400;
          font-size: 16px;
          line-height: 26px;
          text-align: center;
          text-transform: capitalize;
          color: #024F47;
          max-width: 600px;
          margin: 0;
        }

        .faq-content {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 20px;
          position: absolute;
          width: 1092px;
          height: 364px;
          left: 184px; 
          top: 322px;
        }

        .questions-card {
          width: 536px;
          height: 364px;
          background: #024F47;
          border-radius: 16px;
          position: relative;
        }

        .questions-label {
          position: absolute;
          width: 81px;
          height: 30px;
          left: 30px;
          top: 30px;
          font-family: 'Goudy Old Style', serif;
          font-weight: 400;
          font-size: 20px;
          line-height: 30px;
          color: #FAFADC;
          margin: 0;
        }

        .questions-list {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 11px;
          position: absolute;
          width: 463px;
          height: 244px;
          left: 23px;
          top: 90px;
        }

        .question-item {
          font-family: 'Goudy Old Style', serif;
          font-weight: 400;
          font-size: 28px;
          line-height: 40px;
          color: #FAFADC;
          margin: 0;
          cursor: pointer;
          opacity: 0.5;
          transition: opacity 0.2s;
        }
        
        .question-item:hover {
          opacity: 0.8;
        }

        .question-item.active {
          opacity: 1;
        }

        .answer-card {
          width: 536px;
          height: 364px;
          background: #FFFFFF;
          border-radius: 16px;
          position: relative;
        }

        .answer-label {
          position: absolute;
          height: 30px;
          left: 30px;
          top: 30px;
          font-family: 'Goudy Old Style', serif;
          font-weight: 400;
          font-size: 20px;
          line-height: 30px;
          color: #024F47;
          margin: 0;
        }

        .answer-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 11px;
          position: absolute;
          width: 438px;
          left: 30px;
          top: 90px;
        }

        .answer-title {
          font-family: 'Goudy Old Style', serif;
          font-weight: 400;
          font-size: 28px;
          line-height: 40px;
          color: #024F47;
          margin: 0;
        }

        .answer-text {
          font-weight: 400;
          font-size: 16px;
          line-height: 26px;
          color: #024F47;
          margin: 0;
        }

        .contact-cta {
          position: absolute;
          left: 0;
          top: 285px; /* Slightly adjusted to center vertically with button */
          width: 100%;
          padding: 0 20px 0 30px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }

        .contact-text {
          font-weight: 400;
          font-size: 16px;
          line-height: 26px;
          color: #024F47;
          margin: 0;
        }

        .contact-btn {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 4px;
          gap: 2px;
          border: 1px solid #FAFADC;
          border-radius: 999px;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .contact-btn:hover {
          opacity: 0.8;
        }

        .btn-text-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 6px 16px;
          background: #FAFADC;
          border-radius: 999px;
        }

        .btn-text {
          font-family: 'Goudy Old Style', serif;
          font-weight: 700;
          font-size: 16px;
          line-height: 26px;
          color: #024F47;
          margin: 0;
          white-space: nowrap; /* Fixes text wrapping */
        }

        .btn-arrow-container {
          width: 38px;
          height: 38px;
          background: #FAFADC;
          border-radius: 999px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
      
      {isMobile ? (
        <div id="faq" style={{ width: '100%', backgroundColor: '#FAFADC', padding: '60px 20px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            <div className="faq-tag">
              <div className="faq-tag-dot"></div>
              <div className="faq-tag-text">常见问题</div>
            </div>
            
            <motion.h2 
              className="faq-title"
              style={{ width: '100%', fontSize: '40px', lineHeight: '46px' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
                hidden: {}
              }}
            >
              {/* Chinese: animate per character segment instead of per word */}
              {'常见问题'.split('').map((char, i) => (
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
            <motion.p className="faq-subtitle"
              style={{ width: '100%', maxWidth: '100%' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              关于收费、更新、先从哪篇看起、时效与能否照着办——都在这里。
            </motion.p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            <div className="questions-card" style={{ width: '100%', height: 'auto', padding: '30px', minHeight: '300px', boxSizing: 'border-box' }}>
              <p className="questions-label" style={{ position: 'relative', left: 0, top: 0, marginBottom: '20px' }}>问题</p>
              <div className="questions-list" style={{ position: 'relative', left: 0, top: 0, width: '100%', height: 'auto' }}>
                {faqs.map((faq, idx) => (
                  <p 
                    key={idx}
                    className={`question-item ${activeQuestion === idx ? 'active' : ''}`}
                    onClick={() => setActiveQuestion(idx)}
                    style={{ fontSize: '20px', lineHeight: '28px' }}
                  >
                    {faq.question}
                  </p>
                ))}
              </div>
            </div>

            <div className="answer-card" style={{ width: '100%', height: 'auto', padding: '30px', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
              <div>
                <p className="answer-label" style={{ position: 'relative', left: 0, top: 0, marginBottom: '20px' }}>回答</p>
                <div className="answer-content" style={{ position: 'relative', left: 0, top: 0, width: '100%' }}>
                  <motion.h3 
                    className="answer-title"
                    style={{ fontSize: '24px', lineHeight: '32px' }}
                    key={`title-${activeQuestion}`}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.02 } },
                      hidden: {}
                    }}
                  >
                    {faqs[activeQuestion].question.split('').map((char, i) => (
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
                  </motion.h3>
                  
                  <motion.p 
                    className="answer-text"
                    key={`text-${activeQuestion}`}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.01, delayChildren: 0.2 } },
                      hidden: {}
                    }}
                  >
                    {faqs[activeQuestion].answer.split(/(?<=[，。；])/).map((seg, i) => (
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
                  </motion.p>
                  {faqs[activeQuestion].link && (
                    <a href={faqs[activeQuestion].link} style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '26px', color: '#109D74', textDecoration: 'none' }}>
                      → {faqs[activeQuestion].linkText}
                    </a>
                  )}
                </div>
              </div>
              
              <div className="contact-cta" style={{ position: 'relative', left: 0, top: 0, padding: 0, marginTop: '40px', flexWrap: 'wrap', gap: '15px', justifyContent: 'flex-start' }}>
                <p className="contact-text">还有别的问题？</p>
                
                <a href="/articles" className="contact-btn animated-btn" style={{ textDecoration: 'none' }}>
                  <div className="btn-text-container">
                    <p className="btn-text">看全部教程</p>
                  </div>
                  <div className="btn-arrow-container">
                    <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L7.5 6L1 11" stroke="#024F47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="faq-section-wrapper">
          <div className="faq-container" style={{ transform: `scale(${scale})` }}>
        <div className="faq-header">
          <div className="faq-tag">
            <div className="faq-tag-dot"></div>
            <div className="faq-tag-text">常见问题</div>
          </div>
          <div className="faq-title-container">
            <motion.h2 
              className="faq-title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
                hidden: {}
              }}
            >
              {/* Chinese: animate per character segment instead of per word */}
              {'常见问题'.split('').map((char, i) => (
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
            <motion.p className="faq-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              关于收费、更新、先从哪篇看起、时效与能否照着办——都在这里。
            </motion.p>
          </div>
        </div>

        <div className="faq-content">
          <div className="questions-card">
            <p className="questions-label">问题</p>
            <div className="questions-list">
              {faqs.map((faq, idx) => (
                <p 
                  key={idx}
                  className={`question-item ${activeQuestion === idx ? 'active' : ''}`}
                  onClick={() => setActiveQuestion(idx)}
                >
                  {faq.question}
                </p>
              ))}
            </div>
          </div>

          <div className="answer-card">
            <p className="answer-label">回答</p>
            <div className="answer-content">
              <motion.h3 
                className="answer-title"
                key={`title-${activeQuestion}`}
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.02 } },
                  hidden: {}
                }}
              >
                {faqs[activeQuestion].question.split('').map((char, i) => (
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
              </motion.h3>
              
              <motion.p 
                className="answer-text"
                key={`text-${activeQuestion}`}
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.01, delayChildren: 0.2 } },
                  hidden: {}
                }}
              >
                {faqs[activeQuestion].answer.split(/(?<=[，。；])/).map((seg, i) => (
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
              </motion.p>
              {faqs[activeQuestion].link && (
                <a href={faqs[activeQuestion].link} style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '26px', color: '#109D74', textDecoration: 'none' }}>
                  → {faqs[activeQuestion].linkText}
                </a>
              )}
            </div>
            
            <div className="contact-cta">
              <p className="contact-text">还有别的问题？</p>
              
              <a href="/articles" className="contact-btn animated-btn" style={{ textDecoration: 'none' }}>
                <div className="btn-text-container">
                  <p className="btn-text">看全部教程</p>
                </div>
                <div className="btn-arrow-container">
                  <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L7.5 6L1 11" stroke="#024F47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>

          </div>
        </div>
      )}
    </>
  );
};

export default FAQ;
