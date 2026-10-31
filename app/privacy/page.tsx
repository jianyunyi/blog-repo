import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: '隐私政策 · 出海实操教程',
  description:
    '出海实操教程的隐私政策：本站不要求登录、不收集账号密码与身份证件；统计、广告、评论与点赞分别由 Cloudflare、Google AdSense、Waline 与 Cloudflare Worker 提供。',
  alternates: { canonical: 'https://jianyunyi.gv.uy/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <article className="post">
          <h1>隐私政策</h1>
          <p>最后更新：2026-10-31。本政策说明本站收集哪些信息、用于什么目的。</p>
          <h2>本站本身收集的信息</h2>
          <p>
            本站为静态网站，不要求注册或登录，不收集账号密码、身份证件、
            银行卡号等敏感信息。请勿在留言或邮件中发送这类信息。
          </p>
          <h2>统计分析</h2>
          <p>
            本站使用 Cloudflare Web Analytics 统计 aggregate 访问量
            （如浏览量、热门页面与大致地区），不使用 Cookie 横幅，
            不用于跨站追踪个人身份。
          </p>
          <h2>广告</h2>
          <p>
            本站接入 Google AdSense 展示广告。Google 及其合作伙伴可能使用
            Cookie 或类似技术用于广告投放与效果衡量，具体以 Google
            的隐私政策与广告政策为准；你可以在浏览器设置中管理 Cookie。
          </p>
          <h2>评论与点赞</h2>
          <p>
            文章评论由第三方评论服务 Waline 提供：你提交的昵称、评论内容
            以及你自愿填写的邮箱将按该服务的规则存储与展示。
            文章点赞由本站的 Cloudflare Worker 计数，仅记录每篇文章的点赞总数，
            不关联个人身份。
          </p>
          <h2>第三方链接</h2>
          <p>
            文中指向第三方网站（域名注册商、云厂商、银行、运营商等）的链接
            不受本政策约束，访问那些网站时以对方的隐私政策为准。
          </p>
          <h2>联系与更正</h2>
          <p>
            关于本政策的问题，或要求删除你提交的评论内容，
            请通过<a href="/contact">联系方式</a>页与作者联系。
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
