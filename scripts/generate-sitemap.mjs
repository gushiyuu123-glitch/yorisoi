// scripts/generate-sitemap.mjs
import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });
dotenv.config({ path: ".env.production", override: true });
dotenv.config({ path: ".env.production.local", override: true });

const SITE_URL = "https://yorisoi-nine.vercel.app";

const MICROCMS_ENDPOINT =
  "https://pqhxs89idk.microcms.io/api/v1/news?orders=-date&limit=100&fields=id,date,publishedAt,createdAt,updatedAt,title,body";

// サーバー側の生成スクリプトなので、本命は MICROCMS_API_KEY。
// VITE_ はフロント露出用なので、保険として後ろに置く。
const API_KEY = process.env.MICROCMS_API_KEY || process.env.VITE_MICROCMS_API_KEY;

const STATIC_ROUTES = [
  {
    path: "/",
  },
  {
    path: "/news",
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
  if (!value) return null;

  // microCMS側で YYYY-MM-DD の日付だけの場合
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `${value}T00:00:00+09:00`;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  return date.toISOString();
}

function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function isPlaceholder(item) {
  const id = String(item?.id || "").trim();
  const title = String(item?.title || "").trim();
  const body = stripHtml(item?.body || "");

  if (!id) return true;
  if (!title && !body) return true;

  const normalizedTitle = title.toLowerCase();
  const normalizedBody = body.toLowerCase();

  const badWords = ["テスト", "test"];

  if (badWords.some((word) => normalizedTitle === word.toLowerCase())) return true;
  if (badWords.some((word) => normalizedBody === word.toLowerCase())) return true;

  return false;
}

function getItemLastmod(item, fallback = null) {
  return (
    toLastmod(item?.updatedAt) ||
    toLastmod(item?.date) ||
    toLastmod(item?.publishedAt) ||
    toLastmod(item?.createdAt) ||
    fallback
  );
}

async function fetchNews() {
  if (!API_KEY) {
    console.warn(
      "[sitemap] microCMS API key not found. Static routes only sitemap will be generated."
    );
    return [];
  }

  try {
    const response = await fetch(MICROCMS_ENDPOINT, {
      headers: {
        "X-MICROCMS-API-KEY": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`microCMS fetch failed: ${response.status}`);
    }

    const data = await response.json();
    const contents = Array.isArray(data?.contents) ? data.contents : [];

    return contents.filter((item) => !isPlaceholder(item));
  } catch (error) {
    console.error("[sitemap] Failed to fetch news:", error);
    return [];
  }
}

function uniqueByLoc(urls) {
  const map = new Map();

  for (const item of urls) {
    if (!item?.loc) continue;
    map.set(item.loc, item);
  }

  return Array.from(map.values());
}

function buildUrlXml(item) {
  const lastmod = item.lastmod
    ? `\n    <lastmod>${escapeXml(item.lastmod)}</lastmod>`
    : "";

  return `  <url>
    <loc>${escapeXml(item.loc)}</loc>${lastmod}
  </url>`;
}

function buildSitemapXml(urls) {
  const body = urls.map(buildUrlXml).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

async function main() {
  const news = await fetchNews();

  const now = new Date().toISOString();

  const latestNewsLastmod =
    news
      .map((item) => getItemLastmod(item))
      .filter(Boolean)
      .sort()
      .at(-1) || now;

  const staticUrls = STATIC_ROUTES.map((route) => ({
    loc: `${SITE_URL}${route.path}`,
    lastmod: route.path === "/news" ? latestNewsLastmod : now,
  }));

  const newsUrls = news.map((item) => {
    const id = encodeURIComponent(item.id);
    const lastmod = getItemLastmod(item, now);

    return {
      loc: `${SITE_URL}/news/${id}`,
      lastmod,
    };
  });

  const urls = uniqueByLoc([...staticUrls, ...newsUrls]);

  const xml = buildSitemapXml(urls);

  const publicDir = path.resolve(process.cwd(), "public");
  const sitemapPath = path.join(publicDir, "sitemap.xml");

  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(sitemapPath, xml, "utf8");

  console.log("[sitemap] Generated public/sitemap.xml");
  console.log(`[sitemap] URLs: ${urls.length}`);

  urls.forEach((url) => {
    console.log(`[sitemap] - ${url.loc}`);
  });
}

main().catch((error) => {
  console.error("[sitemap] Fatal error:", error);
  process.exit(1);
});