// src/pages/NewsDetail.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Seo from "../components/Seo";

const BASE = "https://pqhxs89idk.microcms.io/api/v1/news";
const HOTPEPPER = "https://beauty.hotpepper.jp/slnH000706136/";

const SITE_URL = "https://yorisoi-nine.vercel.app";
const SITE_NAME = "ヨリソイ Hair＆Spa";
const DEFAULT_OG = `${SITE_URL}/yorisoi/ogp.png`;

function formatDate(value) {
  if (!value) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value.replace(/-/g, ".");
  }

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString("ja-JP").replace(/\//g, ".");
}

function toIsoDateTime(value) {
  if (!value) return undefined;

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `${value}T00:00:00+09:00`;
  }

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;

  return d.toISOString();
}

function decodeHtmlEntities(text) {
  if (!text || typeof text !== "string") return "";
  if (typeof window === "undefined") return text;

  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function toPlainTextWithBreaks(value) {
  if (!value || typeof value !== "string") return "";

  const stripped = value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]*>/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return decodeHtmlEntities(stripped);
}

function buildExcerpt(text, max = 120) {
  if (!text || typeof text !== "string") return "";

  const clean = text.replace(/\s+/g, " ").trim();

  if (clean.length <= max) return clean;

  return `${clean.slice(0, max).trim()}…`;
}

function safeJson(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function NewsDetail() {
  const { id } = useParams();
  const location = useLocation();

  const [news, setNews] = useState(null);
  const [status, setStatus] = useState("loading");

  const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;

  const pagePath = location?.pathname || `/news/${id}`;
  const pageUrl = `${SITE_URL}${pagePath}`;

  useEffect(() => {
    let ignore = false;
    const ac = new AbortController();

    async function getDetail() {
      try {
        if (!apiKey) {
          throw new Error("Missing microCMS API key");
        }

        setStatus("loading");
        setNews(null);

        const res = await fetch(
          `${BASE}/${id}?fields=id,title,date,body,image,publishedAt,createdAt,updatedAt`,
          {
            signal: ac.signal,
            headers: {
              "X-MICROCMS-API-KEY": apiKey,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`NEWS detail fetch failed: ${res.status}`);
        }

        const data = await res.json();

        if (ignore) return;

        setNews(data);
        setStatus("ok");
      } catch (err) {
        if (ignore) return;

        console.error("NEWS detail fetch error:", err);
        setNews(null);
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

  const published = news?.date || news?.publishedAt || news?.createdAt;
  const modified = news?.updatedAt || published;

  const publishedDateTime = toIsoDateTime(published);
  const modifiedDateTime = toIsoDateTime(modified);

  const ogImage = news?.image?.url || DEFAULT_OG;

  const jsonLd = useMemo(() => {
    if (status !== "ok" || !news?.title) return null;

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "ホーム",
              item: `${SITE_URL}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "最新情報一覧",
              item: `${SITE_URL}/news`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: news.title,
              item: pageUrl,
            },
          ],
        },
        {
          "@type": "Article",
          "@id": `${pageUrl}#article`,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": pageUrl,
          },
          url: pageUrl,
          headline: news.title,
          description: excerpt || undefined,
          articleBody: bodyText || undefined,
          image: ogImage ? [ogImage] : undefined,
          datePublished: publishedDateTime || undefined,
          dateModified: modifiedDateTime || publishedDateTime || undefined,
          inLanguage: "ja-JP",
          about: [
            {
              "@type": "LocalBusiness",
              name: SITE_NAME,
              url: SITE_URL,
            },
            {
              "@type": "Thing",
              name: "浦添市内間のメンズ専門理容室",
            },
            {
              "@type": "Thing",
              name: "メンズカット・メンズパーマ・シェービング・ヘッドスパ",
            },
          ],
          author: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: {
              "@type": "ImageObject",
              url: DEFAULT_OG,
            },
          },
        },
      ],
    };
  }, [
    status,
    news,
    pageUrl,
    excerpt,
    bodyText,
    ogImage,
    publishedDateTime,
    modifiedDateTime,
  ]);

  if (status === "loading") {
    return (
      <div
        className="
          w-full min-h-[100svh]
          bg-[#f7f4ef]
          py-[18vh] px-[6vw]
        "
        aria-label="最新情報を読み込み中"
      >
        <Seo
          title="NEWS"
          description="最新情報を読み込み中です。"
          path={pagePath}
          noindex={true}
        />

        <div className="mx-auto max-w-[760px]">
          <div className="h-[12px] w-[120px] bg-[rgba(96,78,62,0.10)]" />
          <div className="mt-5 h-[18px] w-[82%] bg-[rgba(96,78,62,0.12)]" />
          <div className="mt-8 h-[220px] w-full bg-[rgba(96,78,62,0.08)]" />
          <div className="mt-8 h-[12px] w-[92%] bg-[rgba(96,78,62,0.10)]" />
          <div className="mt-3 h-[12px] w-[88%] bg-[rgba(96,78,62,0.10)]" />
        </div>
      </div>
    );
  }

  if (status === "error" || !news) {
    return (
      <div
        className="
          w-full min-h-[100svh]
          bg-[#f7f4ef]
          py-[18vh] px-[6vw]
        "
        aria-label="最新情報の読み込みエラー"
      >
        <Seo
          title="NEWS"
          description="最新情報の読み込みに失敗しました。"
          path={pagePath}
          noindex={true}
        />

        <div className="mx-auto max-w-[760px]">
          <p className="text-[15px] leading-[1.95] text-[rgba(96,78,62,0.72)]">
            読み込みに失敗しました。時間をおいて再度お試しください。
          </p>

          <div className="mt-10">
            <Link
              to="/news"
              className="
                inline-block
                text-[14px]
                tracking-[0.18em]
                text-[#5d4c3f]
                border-b border-[#5d4c3f]/40
                pb-[3px]
                transition
                hover:opacity-60
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[rgba(96,78,62,0.22)]
                focus-visible:ring-offset-4
                focus-visible:ring-offset-[#f7f4ef]
              "
            >
              一覧へ戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        w-full min-h-[100svh]
        bg-[#f7f4ef]
        py-[18vh] px-[6vw]
      "
      aria-label="最新情報詳細"
    >
      <Seo
        title={news.title}
        description={excerpt || `${SITE_NAME}の最新情報「${news.title}」です。`}
        path={pagePath}
        image={ogImage}
        type="article"
      />

      <Helmet>
        {publishedDateTime ? (
          <meta property="article:published_time" content={publishedDateTime} />
        ) : null}

        {modifiedDateTime ? (
          <meta property="article:modified_time" content={modifiedDateTime} />
        ) : null}

        {jsonLd ? (
          <script type="application/ld+json">{safeJson(jsonLd)}</script>
        ) : null}
      </Helmet>

      <article className="mx-auto max-w-[760px] space-y-7">
        <Link
          to="/news"
          className="
            inline-block
            text-[13px]
            text-[rgba(96,78,62,0.62)]
            border-b border-[rgba(96,78,62,0.30)]
            pb-[2px]
            transition
            hover:opacity-70
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[rgba(96,78,62,0.22)]
            focus-visible:ring-offset-4
            focus-visible:ring-offset-[#f7f4ef]
          "
        >
          一覧へ戻る
        </Link>

        {!!published && (
          <time
            dateTime={publishedDateTime}
            className="
              block
              text-[13px]
              tracking-[0.08em]
              text-[rgba(96,78,62,0.62)]
            "
          >
            {formatDate(published)}
          </time>
        )}

        <h1
          className="
            text-[clamp(24px,2.7vw,32px)]
            text-[#5d4c3f]
            font-medium
            leading-[1.55]
          "
        >
          {news.title}
        </h1>

        {news.image?.url && (
          <img
            src={news.image.url}
            alt={`${news.title}｜${SITE_NAME}`}
            loading="lazy"
            decoding="async"
            className="
              w-full object-cover
              rounded-[3px]
              shadow-[0_8px_22px_rgba(72,55,40,0.08)]
              [filter:brightness(1.02)_contrast(0.95)_saturate(0.96)]
              aspect-[16/9]
            "
          />
        )}

        <div
          className="
            text-[16.5px]
            leading-[2.0]
            text-[rgba(96,78,62,0.78)]
            whitespace-pre-line
          "
        >
          {bodyText || "本文を準備中です。"}
        </div>

        <div className="pt-10 border-t border-[rgba(96,78,62,0.12)]">
          <p className="mb-4 text-[14.5px] leading-[1.9] text-[rgba(96,78,62,0.72)]">
            ご予約・メニューの詳細は、Hot Pepper Beautyよりご確認ください。
          </p>

          <a
            href={HOTPEPPER}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              text-[14px]
              tracking-[0.18em]
              text-[#5d4c3f]
              border-b border-[#5d4c3f]/40
              pb-[3px]
              transition
              hover:opacity-60
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[rgba(96,78,62,0.22)]
              focus-visible:ring-offset-4
              focus-visible:ring-offset-[#f7f4ef]
            "
          >
            HOT PEPPER で予約する
          </a>
        </div>
      </article>
    </div>
  );
}