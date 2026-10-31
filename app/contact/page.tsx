import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: '联系方式 · 出海实操教程',
  description:
    '联系出海实操教程：文章纠错、政策变动提醒、建议与删除请求，请在对应文章下留言，或通过本页公布的邮箱联系。',
  alternates: { canonical: 'https://jianyunyi.gv.uy/contact' },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <article className="post">
          <h1>联系方式</h1>
          <p>
            如果你发现某篇文章的价格、政策或步骤已经过时，或者某一步按文中方法走不通，
            最快的办法是在那篇文章下方留言，作者核实后会更新或更正，
            其他读者也能看到同样的提醒。
          </p>
          <h2>邮箱</h2>
          <p>
            联系邮箱（上线前由作者确认后填写）：
            <strong>待补充</strong>。来信请注明文章标题与链接，
            以及你遇到的具体问题或最新官方说明，作者会按收到的顺序处理。
          </p>
          <h2>请勿通过本站办理以下事项</h2>
          <p>
            本站不受理账号代办、代充、代注册与资金往来请求，
            也不收集任何账号密码、身份证件或银行卡信息。
            请勿在留言或邮件中发送这类敏感信息。
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
