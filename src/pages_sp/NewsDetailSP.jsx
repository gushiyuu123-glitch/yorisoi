// src/pages_sp/NewsDetailSP.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import Seo from "../components/Seo";

const BASE = "https://pqhxs89idk.microcms.io/api/v1/news";
const HOTPEPPER = "https://beauty.hotpepper.jp/slnH000706136/";

// ✅ Seo.jsxと合わせる（絶対URLを安定生成）
const SITE_URL = "https://yorisoi-nine.vercel.app";
const DEFAULT_OG = `${SITE_URL}/yorisoi/ogp1.png`;

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ja-JP").replace(/\//g, ".");
}

function toPlainTextWithBreaks(value) {
  if (!value || typeof value !== "string") return "";
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildExcerpt(text, max = 120) {
  if (!text) return "";
  const one = text.replace(/\s+/g, " ").trim();
  if (one.length <= max) return one;
  return one.slice(0, max).trim() + "…";
}

export default function NewsDetailSP() {
  const { id } = useParams();
  const loc = useLocation();
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const [item, setItem] = useState(null);
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

        setItem(data);
        setStatus("ok");
      } catch (err) {
        if (ignore) return;
        console.error("NEWS DETAIL fetch error:", err);
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

  // ✅ mainEntityOfPage / canonical を window依存せず固定
  const pagePath = loc?.pathname || `/news/${id}`;
  const pageUrl = `${SITE_URL}${pagePath}`;

  const ogImage = item?.image?.url || DEFAULT_OG;

  const published = item?.date || item?.publishedAt || item?.createdAt;
  const modified = item?.updatedAt || published;

  // JSON-LD（記事が取れた時だけ）
  const jsonLd = useMemo(() => {
    if (status !== "ok" || !item?.title) return null;
    return {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      mainEntityOfPage: pageUrl,
      headline: item.title,
      datePublished: published,
      dateModified: modified,
      image: ogImage ? [ogImage] : undefined,
      author: { "@type": "Organization", name: "ヨリソイ Hair＆Spa" },
      publisher: {
        "@type": "Organization",
        name: "ヨリソイ Hair＆Spa",
        logo: { "@type": "ImageObject", url: DEFAULT_OG },
      },
      description: excerpt || undefined,
    };
  }, [status, item, pageUrl, published, modified, ogImage, excerpt]);

  // GSAP：1回だけ / 短く / blur極薄
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || status !== "ok" || !item) return;
    if (hasAnimatedRef.current) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) return;

    hasAnimatedRef.current = true;

    const targets = el.querySelectorAll(".nw-detail");
    if (!targets.length) return;

    gsap.fromTo(
      targets,
      { opacity: 0, y: 12, filter: "blur(0.14px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.56,
        ease: "power3.out",
        stagger: 0.06,
      }
    );
  }, [status, item]);

  // ===== Loading =====
  if (status === "loading") {
    return (
      <section className="w-full bg-[#f7f4ef] min-h-[100svh] pt-[18vh] px-[6vw]">
        <Seo title="NEWS" description="お知らせを読み込み中です。" path={pagePath} />
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

  // ===== Error =====
  if (status === "error" || !item) {
    return (
      <section className="w-full bg-[#f7f4ef] min-h-[100svh] pt-[18vh] px-[6vw]">
        <Seo
          title="NEWS"
          description="お知らせの読み込みに失敗しました。"
          path={pagePath}
          noindex={true}
        />
        <div className="mx-auto max-w-[520px]">
          <p className="text-[14px] leading-[1.9] text-[rgba(96,78,62,0.72)]">
            読み込みに失敗しました。時間をおいて再度お試しください。
          </p>
          <div className="mt-10">
            <Link
              to="/news"
              className="inline-block text-[14px] tracking-[0.18em] text-[#5d4c3f] border-b border-[#5d4c3f]/40 pb-[3px]"
            >
              一覧へ戻る
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ===== OK =====
  return (
    <section
      ref={sectionRef}
      className="
        w-full bg-[#f7f4ef]
        min-h-[100svh]
        pt-[16vh]
        px-[6vw]
        pb-[calc(14vh+110px+env(safe-area-inset-bottom))]
      "
      aria-label="NEWS詳細"
    >
      {/* ✅ 記事SEO */}
      <Seo
        title={item.title}
        description={excerpt || `ヨリソイ Hair＆Spa のお知らせ「${item.title}」`}
        path={pagePath}
        image={ogImage}
        type="article"
      />

      {/* ✅ 活動してる感（publish/modified） + JSON-LD を head に */}
      <Helmet>
        {published ? (
          <meta property="article:published_time" content={published} />
        ) : null}
        {modified ? (
          <meta property="article:modified_time" content={modified} />
        ) : null}
        {jsonLd ? (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        ) : null}
      </Helmet>

      <article className="mx-auto max-w-[520px] space-y-6">
        <Link
          to="/news"
          className="nw-detail inline-block text-[12px] text-[rgba(96,78,62,0.62)] border-b border-[rgba(96,78,62,0.30)] pb-[2px] hover:opacity-70 transition"
        >
          一覧へ戻る
        </Link>

        <p className="nw-detail text-[12px] tracking-[0.08em] text-[rgba(96,78,62,0.62)]">
          {formatDate(published)}
        </p>

        <h1 className="nw-detail text-[21px] font-medium leading-[1.55] text-[#5d4c3f]">
          {item.title}
        </h1>

        {item.image?.url && (
          <img
            src={item.image.url}
            alt={`${item.title}｜ヨリソイ Hair＆Spa`}
            loading="lazy"
            decoding="async"
            className="
              nw-detail w-full object-cover
              rounded-[6px]
              shadow-[0_8px_20px_rgba(0,0,0,0.10)]
              [filter:brightness(1.02)_contrast(0.95)]
              aspect-[4/3]
            "
          />
        )}

        <div
          className="
            nw-detail
            text-[15px]
            leading-[1.95]
            text-[rgba(96,78,62,0.78)]
            whitespace-pre-line
          "
        >
          {bodyText}
        </div>

        <div className="nw-detail pt-8 border-t border-[rgba(96,78,62,0.10)] text-center">
          <p className="text-[13px] text-[rgba(96,78,62,0.70)] mb-3">
            ご予約・メニューの詳細は下記よりご確認ください。
          </p>

          <a
            href={HOTPEPPER}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[13px] tracking-[0.22em] text-[#5d4c3f] border-b border-[#5d4c3f]/40 pb-[4px] hover:opacity-60 transition"
          >
            HOT PEPPER で予約する
          </a>
        </div>
      </article>
    </section>
  );
}