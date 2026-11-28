import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/articles';
import { FRIEND_LINKS } from '@/lib/friend-links';

export const metadata: Metadata = {
  title: '友情链接 · 出海实操教程',
  description: '本站的友情链接。',
  alternates: { canonical: SITE_URL + '/friends' },
};

export default function FriendsPage() {
  return (
    <div className="lp-page friends-page">
      <section className="lp-hero">
        <span className="lp-kicker">站点导航</span>
        <h1 className="lp-title">友情链接</h1>
        <p className="lp-sub">本站收录的站点链接。</p>
      </section>
      <ul className="friends-list">
        {FRIEND_LINKS.map((friend) => <li key={friend.href}><a href={friend.href} rel="noopener">{friend.name}</a></li>)}
      </ul>
    </div>
  );
}
