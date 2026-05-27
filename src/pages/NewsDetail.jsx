// src/pages/NewsDetail.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Seo from "../components/Seo";

const BASE = "https://pqhxs89idk.microcms.io/api/v1/news";
const HOTPEPPER = "https://beauty.hotpepper.jp/slnH000706136/";

// ✅ Seo.jsx と揃える（canonical/og:url も安定させる）
const SITE_URL = "https://yorisoi-nine.vercel.app";
const DEFAULT_OG = `${SITE_URL}/yorisoi/ogp1.png`;

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ja-JP").replace(/\//g, ".");
}

/** bodyがHTMLでも壊れない：改行を残してプレーン化 */
function toPlainTextWithBreaks(value) {
  if (!value || typeof value !== "string") return "";
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** 説明文：本文の先頭を自然に切り出す（臭いテンプレ文を避ける） */
function buildExcerpt(text, max = 120) {
  if (!text) return "";
  const one = text.replace(/\s+/g, " ").trim();
  if (one.length <= max) return one;
  return one.slice(0, max).trim() + "…";
}

export default function NewsDetail() {
  const { id } = useParams();
  const loc = useLocation();
  const [news, setNews] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | error

  const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;

  useEffect(() => {
    let ignore = false;
    const ac = new AbortController();

    async function getDetail() {
      try {
        if (!apiKey) throw new Error("Missing API key");
        setStatus("loading");

        const res = await fetch(`${BASE}/${id}`, {
          signal: ac.signal,
          headers: { "X-MICROCMS-API-KEY": apiKey },
        });
        if (!res.ok) throw new Error(`NEWS detail fetch failed: ${res.status}`);

        const data = await res.json();
        if (ignore) return;

        setNews(data);
        setStatus("ok");
      } catch (err) {
        if (ignore) return;
        console.error(err);
        setStatus("error");
      }
    }

    getDetail();
    return () => {
      ignore = true;
      ac.abort();
    };
  }, [id, apiKey]);

  const bodyText = useMemo(() => toPlainTextWithBreaks(news?.body), [news]);
  const excerpt = useMemo(() => buildExcerpt(bodyText, 120), [bodyText]);

  // canonical / og:url を “絶対URL” に固定（window依存を排除）
  const pagePath = loc?.pathname || `/news/${id}`;
  const pageUrl = `${SITE_URL}${pagePath}`;

  // OGP image（記事画像があれば優先）
  const ogImage = news?.image?.url || DEFAULT_OG;

  // JSON-LD（記事が取れた時だけ）
  const jsonLd = useMemo(() => {
    if (status !== "ok" || !news?.title) return null;

    // microCMSのフィールド名が違う可能性もあるので保険
    const published = news?.date || news?.publishedAt || news?.createdAt;
    const modified = news?.updatedAt || published;

    return {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      mainEntityOfPage: pageUrl,
      headline: news.title,
      datePublished: published,
      dateModified: modified,
      image: ogImage ? [ogImage] : undefined,
      author: { "@type": "Organization", name: "ヨリソイ Hair＆Spa" },
      publisher: {
        "@type": "Organization",
        name: "ヨリソイ Hair＆Spa",
        logo: {
          "@type": "ImageObject",
          url: DEFAULT_OG,
        },
      },
      description: excerpt || undefined,
    };
  }, [status, news, pageUrl, ogImage, excerpt]);

  // ============== states ==============
  if (status === "loading") {
    return (
      <main className="w-full bg-[#f7f4ef] py-[18vh] px-[6vw]">
        {/* ✅ loading中は固定のSEO（重すぎない） */}
        <Seo title="NEWS" description="お知らせを読み込み中です。" path={pagePath} />
        <div className="mx-auto max-w-[760px]">
          <div className="h-[12px] w-[120px] bg-[rgba(96,78,62,0.10)]" />
          <div className="mt-5 h-[18px] w-[82%] bg-[rgba(96,78,62,0.12)]" />
          <div className="mt-8 h-[220px] w-full bg-[rgba(96,78,62,0.08)]" />
          <div className="mt-8 h-[12px] w-[92%] bg-[rgba(96,78,62,0.10)]" />
          <div className="mt-3 h-[12px] w-[88%] bg-[rgba(96,78,62,0.10)]" />
        </div>
      </main>
    );
  }

  if (status === "error" || !news) {
    return (
      <main className="w-full bg-[#f7f4ef] py-[18vh] px-[6vw]">
        <Seo
          title="NEWS"
          description="お知らせの読み込みに失敗しました。"
          path={pagePath}
          noindex={true}
        />
        <div className="mx-auto max-w-[760px]">
          <p className="text-[15px] leading-[1.9] text-[rgba(96,78,62,0.72)]">
            読み込みに失敗しました。時間をおいて再度お試しください。
          </p>
          <div className="mt-10">
            <Link
              to="/news"
              className="inline-block text-[14px] tracking-[0.18em] text-[#5d4c3f] border-b border-[#5d4c3f]/40 pb-[3px] hover:opacity-60 transition"
            >
              一覧へ戻る
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const published = news?.date || news?.publishedAt || news?.createdAt;
  const modified = news?.updatedAt || published;

  return (
    <main className="w-full bg-[#f7f4ef] py-[18vh] px-[6vw]" aria-label="NEWS詳細">
      {/* ✅ 記事SEO：title/description/canonical/OGP を確定 */}
      <Seo
        title={news.title}
        description={excerpt || `ヨリソイ Hair＆Spa のお知らせ「${news.title}」`}
        path={pagePath}
        image={ogImage}
        type="article"
      />

      {/* ✅ “更新してる感” をGoogleに渡す（活動アピール） */}
      <Helmet>
        {published ? <meta property="article:published_time" content={published} /> : null}
        {modified ? <meta property="article:modified_time" content={modified} /> : null}

        {/* ✅ JSON-LD（headへ） */}
        {jsonLd ? (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        ) : null}
      </Helmet>

      <article className="mx-auto max-w-[760px] space-y-7">
        {/* 戻る */}
        <Link
          to="/news"
          className="inline-block text-[13px] text-[rgba(96,78,62,0.62)] border-b border-[rgba(96,78,62,0.30)] pb-[2px] hover:opacity-70 transition"
        >
          一覧へ戻る
        </Link>

        {/* 日付 */}
        <p className="text-[13px] tracking-[0.08em] text-[rgba(96,78,62,0.62)]">
          {formatDate(published)}
        </p>

        {/* タイトル */}
        <h1 className="text-[clamp(22px,2.6vw,30px)] text-[#5d4c3f] font-medium leading-[1.55]">
          {news.title}
        </h1>

        {/* 画像：記事感を保つ */}
        {news.image?.url && (
          <img
            src={news.image.url}
            alt={`${news.title}｜ヨリソイ Hair＆Spa`}
            loading="lazy"
            decoding="async"
            className="
              w-full object-cover
              rounded-[6px]
              shadow-[0_8px_22px_rgba(0,0,0,0.08)]
              [filter:brightness(1.02)_contrast(0.95)]
              aspect-[16/9]
            "
          />
        )}

        {/* 本文（プレーン化＋改行維持） */}
        <div
          className="
            text-[16.5px]
            leading-[2.0]
            text-[rgba(96,78,62,0.76)]
            whitespace-pre-line
          "
        >
          {bodyText}
        </div>

        {/* 導線 */}
        <div className="pt-10 border-t border-[rgba(96,78,62,0.12)]">
          <p className="text-[14px] leading-[1.9] text-[rgba(96,78,62,0.72)] mb-4">
            ご予約・メニューの詳細は下記よりご確認ください。
          </p>
          <a
            href={HOTPEPPER}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[14px] tracking-[0.18em] text-[#5d4c3f] border-b border-[#5d4c3f]/40 pb-[3px] hover:opacity-60 transition"
          >
            HOT PEPPER で予約する
          </a>
        </div>
      </article>
    </main>
  );
}