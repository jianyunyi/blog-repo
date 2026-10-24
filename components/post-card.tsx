import { postHref } from '@/lib/site-content';
import type { Article } from '@/lib/articles';

/**
 * One post card for the second-level listing pages
 * (/articles, /categories): real cover thumbnail, real
 * title (clamped to 2 lines), real date, link to the
 * /posts/<slug>.html article page. Server component —
 * no client JS, same DOM shape as the homepage cards.
 *
 * Visual tokens only (inline styles override the .lp-* CSS):
 * cream card, deep-green title/border, mint accent shadow,
 * homepage-sampled date/badge colors. Title font is the
 * Growlio Hero main-title font, reused verbatim.
 */
export function PostCard({ article }: { article: Article }) {
  return (
    <a
      className="lp-card"
      href={postHref(article)}
      style={{
        background: '#FAFADC',
        border: '1px solid rgba(3, 79, 70, 0.3)',
        boxShadow: '3px 3px 0 rgba(16, 184, 129, 0.45)',
      }}
    >
      <img
        className="lp-cover"
        src={`/img/thumbs/${article.slug}.webp`}
        width={article.thumbSize[0]}
        height={article.thumbSize[1]}
        alt={article.title}
        loading="lazy"
      />
      <div className="lp-body">
        <div className="lp-top">
          <time className="lp-date" dateTime={article.date} style={{ color: '#65758B' }}>
            {article.date}
          </time>
          <span
            className={`lp-tag ${article.isEn ? 'lp-tag-en' : 'lp-tag-zh'}`}
            style={
              article.isEn
                ? {
                    color: '#024F47',
                    backgroundColor: '#F6F7F6',
                    border: '1px solid rgba(3, 79, 70, 0.35)',
                  }
                : { color: '#FEFFFE', backgroundColor: '#024F47' }
            }
          >
            {article.isEn ? 'English' : '中文'}
          </span>
        </div>
        <h3
          className="lp-post-title"
          style={{
            fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
            color: '#024F47',
          }}
        >
          {article.title}
        </h3>
      </div>
    </a>
  );
}
