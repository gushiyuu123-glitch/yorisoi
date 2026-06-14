// scripts/generate-sitemap.mjs

const SITE_URL = "https://yorisoi-nine.vercel.app";
const MICROCMS_ENDPOINT =
  "https://pqhxs89idk.microcms.io/api/v1/news?orders=-date&limit=100&fields=id,date,publishedAt,createdAt,updatedAt,title,body";

const API_KEY = process.env.VITE_MICROCMS_API_KEY || process.env.MICROCMS_API_KEY;

const STATIC_ROUTES = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/news",
    priority: "0.8",
    changefreq: "weekly",
  },
];

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toLastmod(value) {
  if (!value) return new Date().toISOString();

  // microCMS側で YYYY-MM-DD の日付だけの場合
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `${value}T00:00:00+09:00`;
  }

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return new Date().toISOString();

  return d.toISOString();
}

function isPlaceholder(item) {
  const title = (item?.title || "").trim();
  const body = String(item?.body || "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, "")
    .trim();

  if (!item?.id) return true;
  if (!title && !body) return true;

  const badWords = ["テスト", "test", "TEST"];

  if (badWords.includes(title)) return true;
  if (badWords.includes(body)) return true;

  return false;
}

async function fetchNews() {
  if (!API_KEY) {
    console.warn(
      "[sitemap] microCMS API key not found. Static routes only sitemap will be generated."
    );
    return [];
  }

  try {
    const res = await fetch(MICROCMS_ENDPOINT, {
      headers: {
        "X-MICROCMS-API-KEY": API_KEY,
      },
    });

    if (!res.ok) {
      throw new Error(`microCMS fetch failed: ${res.status}`);
    }

    const data = await res.json();
    const contents = Array.isArray(data?.contents) ? data.contents : [];

    return contents.filter((item) => !isPlaceholder(item));
  } catch (err) {
    console.error("[sitemap] Failed to fetch news:", err);
    return [];
  }
}

function buildSitemapXml(urls) {
  const body = urls
    .map((item) => {
      return `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <lastmod>${escapeXml(item.lastmod)}</lastmod>
    <changefreq>${escapeXml(item.changefreq)}</changefreq>
    <priority>${escapeXml(item.priority)}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

async function main() {
  const news = await fetchNews();

  const now = new Date().toISOString();

  const staticUrls = STATIC_ROUTES.map((route) => ({
    loc: `${SITE_URL}${route.path}`,
    lastmod: now,
    changefreq: route.changefreq,
    priority: route.priority,
  }));

  const newsUrls = news.map((item) => {
    const lastmod =
      item?.updatedAt || item?.date || item?.publishedAt || item?.createdAt || now;

    return {
      loc: `${SITE_URL}/news/${item.id}`,
      lastmod: toLastmod(lastmod),
      changefreq: "monthly",
      priority: "0.7",
    };
  });

  const urls = [...staticUrls, ...newsUrls];

  const xml = buildSitemapXml(urls);

  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  const publicDir = path.resolve(process.cwd(), "public");
  const sitemapPath = path.join(publicDir, "sitemap.xml");

  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(sitemapPath, xml, "utf8");

  console.log(`[sitemap] Generated public/sitemap.xml`);
  console.log(`[sitemap] URLs: ${urls.length}`);
}

main().catch((err) => {
  console.error("[sitemap] Fatal error:", err);
  process.exit(1);
});