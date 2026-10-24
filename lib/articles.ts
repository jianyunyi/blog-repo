import manifest from '@/data/articles.json';

export interface Article {
  slug: string;
  date: string;
  title: string;
  lang: 'zh-CN' | 'en';
  isEn: boolean;
  excerpt: string;
  /** site-absolute path, e.g. /img/2026-10-21-xxx/step1.webp or /img/covers/<slug>.webp */
  cover: string;
  coverSize: [number, number];
  thumbSize: [number, number];
  mdFile: string;
}

export interface SiteManifest {
  site: string;
  count: { zh: number; en: number };
  thumb: { width: number; quality: number; engine: string };
  imgDims: Record<string, [number, number]>;
  articles: Article[];
}

export const site = manifest as unknown as SiteManifest;

export const SITE_URL: string = site.site;

export function zhArticles(): Article[] {
  return sortDesc(site.articles.filter((a) => !a.isEn));
}

export function enArticles(): Article[] {
  return sortDesc(site.articles.filter((a) => a.isEn));
}

/** Old site order: date desc, then title desc (python tuple sort, reverse=True). */
export function sortDesc(list: Article[]): Article[] {
  return [...list].sort((a, b) =>
    a.date === b.date ? (a.title < b.title ? 1 : -1) : a.date < b.date ? 1 : -1,
  );
}

export function findArticle(slug: string): Article | undefined {
  return site.articles.find((a) => a.slug === slug);
}

/** Absolute cover URL (OG image, JSON-LD image). */
export function coverAbsolute(a: Article): string {
  return `${SITE_URL}${a.cover}`;
}

/** Markdown sources live in the repo at articles/ (read at build time). */
export const SRC_DIR = (): string => `${process.cwd()}/articles`;
