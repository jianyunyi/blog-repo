/** Homepage banner introducing cs-tool as the direct-navigation hub.
 *  Point: readers should know that cs-tool's 官网 button goes straight to
 *  the tool's own site, and its 教程 button comes back to a gv.uy tutorial.
 *  Light theme only, matching the site skin (cream background, #024f47 headings).
 */
export default function CsToolBanner() {
  return (
    <section
      aria-label="工具直达 cs-tool"
      style={{
        background: 'linear-gradient(180deg, #fff8dc 0%, #fdf6e3 100%)',
        borderTop: '2px solid #024f47',
        borderBottom: '2px solid #024f47',
        padding: '36px 20px',
      }}
    >
      <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#024f47', fontSize: '28px', margin: '0 0 12px' }}>
          工具直达：cs-tool 出海工具导航
        </h2>
        <p style={{ fontSize: '17px', lineHeight: 1.8, margin: '0 0 8px' }}>
          本站教程里提到的工具，都汇总在 cs-tool 里了：共 170 个工具，
          其中“出海工具”分类有 11 个。点卡片上的
          <strong>“官网”按钮，就直接跳转到该工具自己的官网</strong>，不用再翻教程找链接；
          点<strong>“教程”按钮，就回到本站对应的那篇教程</strong>，照着步骤做。
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', margin: '0 0 20px' }}>
          比如 Wise、Render、Pollinations、Firsty：先在 cs-tool 点官网去注册，
          卡住了再点教程回来看本站的实测步骤。
        </p>
        <a
          href="https://cs-tool.us.ci/"
          target="_blank"
          rel="noopener"
          style={{
            display: 'inline-block',
            background: '#024f47',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '999px',
            fontSize: '17px',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          打开 cs-tool，直接跳转目标网址 →
        </a>
      </div>
    </section>
  );
}
