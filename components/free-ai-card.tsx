import type { FreeAiEntry } from '@/lib/free-ai-coding';

/**
 * One entry card for /free-ai-coding — deliberately the same visual
 * tokens as PostCard (cream card, deep-green title, mint offset
 * shadow, Goudy serif) so the section reads as part of the blog,
 * not an embedded foreign widget. Text-only: upstream entries have
 * no cover images, so the card leads with badges + offering text.
 */
export function FreeAiCard({ entry }: { entry: FreeAiEntry }) {
  const models = entry.models.slice(0, 6);
  const more = entry.models.length - models.length;
  return (
    <a
      className="lp-card"
      href={entry.url}
      target="_blank"
      rel="noopener"
      style={{
        background: '#FAFADC',
        border: '1px solid rgba(3, 79, 70, 0.3)',
        boxShadow: '3px 3px 0 rgba(16, 184, 129, 0.45)',
      }}
    >
      <div className="lp-body">
        <div className="lp-top">
          <span
            className="lp-tag"
            style={
              entry.cardRequired
                ? {
                    color: '#65758B',
                    backgroundColor: '#F6F7F6',
                    border: '1px solid rgba(101, 117, 139, 0.4)',
                  }
                : { color: '#FEFFFE', backgroundColor: '#024F47' }
            }
          >
            {entry.cardRequired ? '需绑卡' : '免绑卡'}
          </span>
          {entry.noAccount && (
            <span
              className="lp-tag"
              style={{
                color: '#024F47',
                backgroundColor: '#F6F7F6',
                border: '1px solid rgba(3, 79, 70, 0.35)',
              }}
            >
              无需注册
            </span>
          )}
          {entry.lastVerified && (
            <time
              className="lp-date"
              dateTime={entry.lastVerified}
              style={{ color: '#65758B' }}
            >
              验证 {entry.lastVerified}
            </time>
          )}
        </div>
        <h3
          className="lp-post-title"
          style={{
            fontFamily: "'Goudy Old Style', 'Goudy Bookletter 1911', serif",
            color: '#024F47',
          }}
        >
          {entry.name}
          {entry.provisional ? ' 🧪' : ''}
        </h3>
        <p
          style={{
            margin: '6px 0 0',
            fontSize: '0.92rem',
            lineHeight: 1.55,
            color: '#334155',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {entry.offering}
        </p>
        {models.length > 0 && (
          <p
            style={{
              margin: '8px 0 0',
              fontSize: '0.8rem',
              lineHeight: 1.6,
              color: '#65758B',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {models.join(' · ')}
            {more > 0 ? ` · +${more}` : ''}
          </p>
        )}
      </div>
    </a>
  );
}
