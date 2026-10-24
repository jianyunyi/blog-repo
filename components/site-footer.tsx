/** Site footer — old brand block plus the three friend links. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="foot-brand">出海实操教程 · Going Global Tutorials</p>
      <nav className="foot-links" aria-label="友情链接 / Friends">
        <a href="https://digiboy.xyz" rel="noopener">
          出海第一课
        </a>
        <a href="https://seo.web.cafe" rel="noopener">
          哥飞的朋友们
        </a>
        <a href="https://webworker.dev" rel="noopener">
          数字移民
        </a>
      </nav>
      <p className="foot-mono">jianyunyi.gv.uy</p>
    </footer>
  );
}
