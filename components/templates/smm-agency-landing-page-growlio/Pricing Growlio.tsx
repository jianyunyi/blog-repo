import React from 'react';
import { motion } from 'framer-motion';
import { PATH_TIERS, tierPosts, postHref } from '@/lib/site-content';

/** Per-tier non-price headline + phase label (no prices anywhere). */
const TIER_AMOUNT: Record<string, string> = { start: '免费', steady: '进阶', payment: '落地' };
const TIER_PHASE: Record<string, string> = { start: '从零开始', steady: '系统上手', payment: '办成收尾' };

const Pricing = () => {
  return (
    <section className="pricing-section">
      <style>{`
        .pricing-section {
          width: 100%;
          background: #FAFADC;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 80px 0;
          font-family: 'Inter Tight', sans-serif;
          position: relative;
        }

        .pricing-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-bottom: 60px;
        }

        .pricing-tag {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 5px;
        }

        .pricing-tag-dot {
          width: 8px;
          height: 8px;
          background: #024F47;
          border-radius: 2px;
        }

        .pricing-tag-text {
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          text-align: center;
          text-transform: capitalize;
          color: #000100;
        }

        .pricing-title-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .pricing-title {
          font-family: 'Goudy Old Style', serif;
          font-weight: 700;
          font-size: 70px;
          line-height: 70px;
          text-align: center;
          letter-spacing: -0.02em;
          color: #024F47;
          margin: 0;
        }

        .pricing-subtitle {
          font-weight: 400;
          font-size: 16px;
          line-height: 26px;
          text-align: center;
          text-transform: capitalize;
          color: #024F47;
          max-width: 490px;
          margin: 0;
        }

        .pricing-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 899px;
        }

        .pricing-card {
          width: 100%;
          background: #FFFFFF;
          border-radius: 24px;
          display: flex;
          flex-direction: row;
          padding: 30px;
          position: relative;
          box-sizing: border-box;
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .pricing-card:hover {
          background: #024F47;
        }

        .pricing-card:hover .plan-name,
        .pricing-card:hover .price-amount,
        .pricing-card:hover .plan-description,
        .pricing-card:hover .included-title,
        .pricing-card:hover .feature-text {
          color: #FFFFFF;
        }

        .pricing-card:hover .price-period {
          color: rgba(255, 255, 255, 0.7);
        }

        .pricing-card:hover .feature-dot {
          background: #FFFFFF;
        }
        
        .pricing-card.enterprise {
          background: #024F47;
          color: #FFFFFF;
        }

        .card-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 324px;
        }

        .enterprise .card-left {
          width: 368px;
        }

        .plan-name {
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          text-transform: capitalize;
          color: #024F47;
          margin: 0;
        }
        
        .enterprise .plan-name {
          color: #FFFFFF;
        }

        .plan-price-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .price-row {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
        }

        .price-amount {
          font-family: 'Goudy Old Style', serif;
          font-weight: 700;
          font-size: 40px;
          line-height: 50px;
          letter-spacing: -0.02em;
          color: #024F47;
          margin: 0;
        }
        
        .enterprise .price-amount {
          color: #FFFFFF;
        }

        .price-period {
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          text-align: center;
          text-transform: capitalize;
          color: #698783;
          margin: 0;
        }

        .plan-description {
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          text-transform: capitalize;
          color: #024F47;
          margin: 0;
        }
        
        .enterprise .plan-description {
          color: #FFFFFF;
        }

        .get-started-btn {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 4px;
          gap: 2px;
          border: 1px solid #FAFADC;
          border-radius: 999px;
          width: max-content;
          cursor: pointer;
          margin-top: 50px;
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

        .card-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 188px;
        }

        .enterprise .card-right {
          width: 248px;
        }

        .included-title {
          font-weight: 500;
          font-size: 18px;
          line-height: 24px;
          text-transform: capitalize;
          color: #024F47;
          margin: 0;
        }
        
        .enterprise .included-title {
          color: #FFFFFF;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .feature-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 5px;
        }

        .feature-dot {
          width: 8px;
          height: 8px;
          background: #024F47;
          border-radius: 2px;
        }
        
        .enterprise .feature-dot {
          background: #FFFFFF;
        }

        .feature-text {
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          text-align: center;
          text-transform: capitalize;
          color: #024F47;
          margin: 0;
        }
        
        .enterprise .feature-text {
          color: #FFFFFF;
        }

        @media (max-width: 900px) {
          .pricing-section {
            padding: 60px 20px;
          }
          .pricing-cards {
            width: 100%;
          }
          .pricing-card {
            flex-direction: column;
            gap: 40px;
          }
          .card-left, .enterprise .card-left, .card-right, .enterprise .card-right {
            width: 100%;
          }
          .pricing-title {
            font-size: 40px;
            line-height: 46px;
          }
        }
      `}</style>

      <div className="pricing-header">
        <div className="pricing-tag">
          <div className="pricing-tag-dot"></div>
          <div className="pricing-tag-text">新手路径</div>
        </div>
        <div className="pricing-title-container">
          <motion.h2 
            className="pricing-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {}
            }}
          >
            {/* Chinese: animate per character segment instead of per word */}
            {'新手路径三档'.split('').map((char, i) => (
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
          <motion.p className="pricing-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            三条路从零走到收款：每档都只列真实教程，跟着走完，域名、服务器、收款账户都办成。
          </motion.p>
        </div>
      </div>

      <motion.div 
        className="pricing-cards"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {}
        }}
      >
        {/* 三档新手路径 — every feature is a real post link, no prices */}
        {PATH_TIERS.map((tier, tIdx) => (
          <motion.div
            key={tier.key}
            className={tIdx === 2 ? 'pricing-card enterprise' : 'pricing-card'}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <div className="card-left">
              <h3 className="plan-name">{tier.name}</h3>
              <div className="plan-price-container">
                <div className="price-row">
                  <p className="price-amount">{TIER_AMOUNT[tier.key]}</p>
                  <p className="price-period">{TIER_PHASE[tier.key]}</p>
                </div>
                <p className="plan-description">{tier.desc}</p>
              </div>
              <a href={postHref(tierPosts(tier)[0])} className="get-started-btn animated-btn" style={{ textDecoration: 'none' }}>
                <div className="btn-text-container">
                  <p className="btn-text">看这些教程</p>
                </div>
                <div className="btn-arrow-container">
                  <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L7.5 6L1 11" stroke="#024F47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2"/>
                  </svg>
                </div>
              </a>
            </div>
            <div className="card-right">
              <h4 className="included-title">照着这些教程走</h4>
              <div className="features-list">
                {tierPosts(tier).map((post) => (
                  <a key={post.slug} href={postHref(post)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px', textDecoration: 'none', width: '100%', minWidth: 0 }}>
                    <div className="feature-dot" style={{ flexShrink: 0 }}></div>
                    <p className="feature-text" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}>{post.title}</p>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

      </motion.div>
    </section>
  );
};

export default Pricing;
