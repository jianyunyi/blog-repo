# 给本站写新文章

本站是纯中文站（英文稿只发海外 Blogger，不进本仓库）。新文章统一放在
`articles/`，文件名为 `YYYY-MM-DD-<slug>.md`，构建由 `scripts/prebuild.js`
扫描生成 `data/articles.json`、sitemap 与 llms.txt。

## 新文必填清单

1. **frontmatter 分类**：文件开头写
   `---\ncategory: <key>\n---`，key 只能是六个分类之一：
   `domain-email`、`vps-server`、`tax-id`、`sim-keep`、`payment`、`ai-tools`。
   不写就靠标题关键词兜底，分错了构建只警告不报错，别依赖它。
2. **slug 用英文/拼音短 slug**：新文的文件名 slug 只用英文或拼音，
   越短越好（例如 `2026-11-12-japan-esim-comparison.md`）。
   **旧文章的中文 slug 与 URL 一律不动**——改了就丢已有收录与外链。
   构建会在新文（2026-11-12 之后）仍用中文长 slug 时打一条警告。
3. **FAQ**：文末有「常见问题」就按 `### 问题？` + 段落回答的格式写，
   构建会自动生成 FAQPage 结构化数据。
4. **日期标记**：正文里写「最后核实：YYYY-MM-DD」或「更新于：YYYY-MM-DD」，
   文章页会显示「最后更新」日期；不写就不显示，构建不会替你补。
5. **实测口径**：价格、免费额度、政策以核实当日的官方说明为准，
   写清核实日期；没实测的要明确注明，不要编数字。
