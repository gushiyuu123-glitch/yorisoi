// src/pages_sp/NewsDetailSP.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
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

export default function NewsDetailSP() {
  const { id } = useParams();
  const location = useLocation();

  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const [item, setItem] = useState(null);
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
        setItem(null);

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

        setItem(data);
        setStatus("ok");
      } catch (err) {
        if (ignore) return;

        console.error("NEWS detail fetch error:", err);
        setItem(null);
        setStatus("error");
      }
    }

    getDetail();

    return () => {
      ignore = true;
      ac.abort();
    };
  }, [id, apiKey]);

  const bodyText = useMemo(() => toPlainTextWithBreaks(item?.body), [item]);
  const excerpt = useMemo(() => buildExcerpt(bodyText, 120), [bodyText]);

  const published = item?.date || item?.publishedAt || item?.createdAt;
  const modified = item?.updatedAt || published;

  const publishedDateTime = toIsoDateTime(published);
  const modifiedDateTime = toIsoDateTime(modified);

  const ogImage = item?.image?.url || DEFAULT_OG;

  const jsonLd = useMemo(() => {
    if (status !== "ok" || !item?.title) return null;

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
              name: item.title,
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
          headline: item.title,
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
    item,
    pageUrl,
    excerpt,
    bodyText,
    ogImage,
    publishedDateTime,
    modifiedDateTime,
  ]);

  useEffect(() => {
    const el = sectionRef.current;

    if (!el || status !== "ok" || !item) return;
    if (hasAnimatedRef.current) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;

    if (reduce || coarse) return;

    hasAnimatedRef.current = true;

    const targets = el.querySelectorAll(".nw-detail");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 12, filter: "blur(0.10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.54,
          ease: "power3.out",
          stagger: 0.05,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [status, item]);

  if (status === "loading") {
    return (
      <section
        className="
          w-full min-h-[100svh]
          bg-[#f7f4ef]
          pt-[18vh]
          px-[6vw]
          pb-[calc(14vh+110px+env(safe-area-inset-bottom))]
        "
        aria-label="最新情報を読み込み中"
      >
        <Seo
          title="NEWS"
          description="最新情報を読み込み中です。"
          path={pagePath}
          noindex={true}
        />

        <div className="mx-auto max-w-[520px]">
          <div className="h-[12px] w-[110px] bg-[rgba(96,78,62,0.10)]" />
          <div className="mt-4 h-[16px] w-[86%] bg-[rgba(96,78,62,0.12)]" />
          <div className="mt-6 h-[220px] w-full bg-[rgba(96,78,62,0.08)]" />
          <div className="mt-6 h-[12px] w-[92%] bg-[rgba(96,78,62,0.10)]" />
          <div className="mt-3 h-[12px] w-[88%] bg-[rgba(96,78,62,0.10)]" />
        </div>
      </section>
    );
  }

  if (status === "error" || !item) {
    return (
      <section
        className="
          w-full min-h-[100svh]
          bg-[#f7f4ef]
          pt-[18vh]
          px-[6vw]
          pb-[calc(14vh+110px+env(safe-area-inset-bottom))]
        "
        aria-label="最新情報の読み込みエラー"
      >
        <Seo
          title="NEWS"
          description="最新情報の読み込みに失敗しました。"
          path={pagePath}
          noindex={true}
        />

        <div className="mx-auto max-w-[520px]">
          <p className="text-[16px] leading-[1.9] text-[rgba(96,78,62,0.74)]">
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
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="
        w-full min-h-[100svh]
        bg-[#f7f4ef]
        pt-[16vh]
        px-[6vw]
        pb-[calc(14vh+110px+env(safe-area-inset-bottom))]
      "
      aria-label="最新情報詳細"
    >
      <Seo
        title={item.title}
        description={excerpt || `${SITE_NAME}の最新情報「${item.title}」です。`}
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

      <article className="mx-auto max-w-[520px] space-y-6">
        <Link
          to="/news"
          className="
            nw-detail
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
              nw-detail
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
            nw-detail
            text-[clamp(23px,6.1vw,28px)]
            font-medium
            leading-[1.58]
            text-[#5d4c3f]
          "
        >
          {item.title}
        </h1>

        {item.image?.url && (
          <img
            src={item.image.url}
            alt={`${item.title}｜${SITE_NAME}`}
            loading="lazy"
            decoding="async"
            className="
              nw-detail
              w-full object-cover
              rounded-[4px]
              shadow-[0_8px_20px_rgba(72,55,40,0.10)]
              [filter:brightness(1.02)_contrast(0.95)_saturate(0.96)]
              aspect-[4/3]
            "
          />
        )}

        <div
          className="
            nw-detail
            text-[16px]
            leading-[1.98]
            text-[rgba(96,78,62,0.80)]
            whitespace-pre-line
          "
        >
          {bodyText || "本文を準備中です。"}
        </div>

        <div
          className="
            nw-detail
            pt-8
            border-t border-[rgba(96,78,62,0.10)]
            text-center
          "
        >
          <p className="mb-3 text-[15px] leading-[1.85] text-[rgba(96,78,62,0.72)]">
            ご予約・メニューの詳細は、Hot Pepper Beautyよりご確認ください。
          </p>

          <a
            href={HOTPEPPER}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              text-[14px]
              tracking-[0.20em]
              text-[#5d4c3f]
              border-b border-[#5d4c3f]/40
              pb-[4px]
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
    </section>
  );
}