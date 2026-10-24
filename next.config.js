/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: every route becomes an .html file in out/.
  output: 'export',
  // Default (false): /posts/[slug] exports to out/posts/<slug>.html —
  // exactly the same URL shape as the old site.
  trailingSlash: false,
};

module.exports = nextConfig;
