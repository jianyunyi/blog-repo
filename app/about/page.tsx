import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: '关于本站 · 出海实操教程',
  description:
    '出海实操教程是一个面向国内读者的境外服务实操博客：域名邮箱、VPS、税号身份、手机保号、跨境收款与 AI 工具，选题来自作者本人办过的手续和踩过的坑。',
  alternates: { canonical: 'https://jianyunyi.gv.uy/about' },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <article className="post">
          <h1>关于本站</h1>
          <p>
            出海实操教程（jianyunyi.gv.uy）是一个面向国内读者的境外服务实操博客，
            主题包括免费域名与域名邮箱、VPS 服务器、境外税号与身份、手机保号与 eSIM、
            跨境收款与 AI 工具。选题来自作者本人办过的手续和踩过的坑，
            不是从别处搬来的步骤清单。
          </p>
          <h2>本站的写作方法</h2>
          <p>
            多数教程来自作者本人的开通与使用过程：按步骤截图、写清花费与耗时、
            标出卡住的地方和绕过去的办法，以及这项服务不适合谁。
            凡是没有实测的，文章里会明确注明；这类文章正在逐步并入实测长文或删除，
            不再单独成篇。
          </p>
          <p>
            境外服务的价格、免费额度与政策经常变动。文章会标注信息核实日期，
            重新核实过的文章会显示“最后更新”日期；但在你付费或提交身份资料之前，
            请务必以官方网站的最新说明为准。
          </p>
          <h2>本站不是什么</h2>
          <p>
            本站不卖账号、不做代办、不提供 API 中转服务；文中提到的第三方服务
            （域名注册商、云厂商、银行、运营商）均与本站无关，办理结果以各服务方为准。
            文中出现的价格均为作者核实当日的公开价格，不构成购买建议。
          </p>
          <h2>作者</h2>
          <p>
            本站作者署名 <strong>jianyunyi</strong>，
            常年在国内实操境外服务开通与使用，文章选题来自本人办过的手续和踩过的坑。
            联系方式见<a href="/contact">联系方式</a>页。
            如果某篇文章的价格、政策或步骤已经过时，欢迎在该文章下留言指出，
            作者核实后会更新或更正。
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
