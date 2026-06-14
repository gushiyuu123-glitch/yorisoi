// src/pages_sp/NewsListSP.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../components/Seo";

gsap.registerPlugin(ScrollTrigger);

const SITE_URL = "https://yorisoi-nine.vercel.app";
const SITE_NAME = "ヨリソイ Hair＆Spa";
const DEFAULT_OG = `${SITE_URL}/yorisoi/ogp.png`;

const ENDPOINT =
  "https://pqhxs89idk.microcms.io/api/v1/news?orders=-date&limit=100&fields=id,title,date,body,image,publishedAt,createdAt,updatedAt";

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

function toPlainText(value) {
  if (!value || typeof value !== "string") return "";

  const stripped = value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return decodeHtmlEntities(stripped);
}

function makeExcerpt(text, max = 78) {
  if (!text || typeof text !== "string") return "";

  const clean = text.replace(/\s+/g, " ").trim();

  if (clean.length <= max) return clean;

  return `${clean.slice(0, max).trim()}…`;
}

function isPlaceholder(item, plain) {
  const title = (item?.title || "").trim();
  const body = (plain || "").trim();

  if (!item?.id) return true;
  if (!title && !body) return true;

  const badWords = ["テスト", "test", "TEST"];

  if (badWords.includes(title)) return true;
  if (badWords.includes(body)) return true;

  return false;
}

function safeJson(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function NewsListSP() {
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const [news, setNews] = useState([]);
  const [status, setStatus] = useState("loading");

  const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;

  useEffect(() => {
    let ignore = false;
    const ac = new AbortController();

    async function getNews() {
      try {
        if (!apiKey) {
          throw new Error("Missing microCMS API key");
        }

        setStatus("loading");

        const res = await fetch(ENDPOINT, {
          signal: ac.signal,
          headers: {
            "X-MICROCMS-API-KEY": apiKey,
          },
        });

        if (!res.ok) {
          throw new Error(`NEWS fetch failed: ${res.status}`);
        }

        const data = await res.json();

        if (ignore) return;

        setNews(Array.isArray(data?.contents) ? data.contents : []);
        setStatus("ok");
      } catch (err) {
        if (ignore) return;

        console.error("NEWS list fetch error:", err);
        setNews([]);
        setStatus("error");
      }
    }

    getNews();

    return () => {
      ignore = true;
      ac.abort();
    };
  }, [apiKey]);

  const list = useMemo(() => {
    return (news || [])
      .map((item) => {
        const plain = toPlainText(item?.body);

        if (isPlaceholder(item, plain)) return null;

        const published = item?.date || item?.publishedAt || item?.createdAt;
        const modified = item?.updatedAt || published;

        return {
          id: item.id,
          date: formatDate(published),
          dateTime: toIsoDateTime(published),
          modifiedTime: toIsoDateTime(modified),
          title: item.title || "最新情報",
          excerpt: makeExcerpt(plain, 78),
          imageUrl: item?.image?.url || "",
          url: `${SITE_URL}/news/${item.id}`,
        };
      })
      .filter(Boolean);
  }, [news]);

  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "@id": `${SITE_URL}/news#breadcrumb`,
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
          ],
        },
        {
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/news#webpage`,
          url: `${SITE_URL}/news`,
          name: `${SITE_NAME} 最新情報一覧`,
          description:
            "ヨリソイ Hair＆Spaの営業情報、メニュー、予約前の確認、メンズカット、パーマ、シェービング、ヘッドスパに関する最新情報一覧です。",
          inLanguage: "ja-JP",
          isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
          },
          about: {
            "@type": "LocalBusiness",
            name: SITE_NAME,
            url: SITE_URL,
          },
        },
        {
          "@type": "ItemList",
          "@id": `${SITE_URL}/news#itemlist`,
          name: `${SITE_NAME}の最新情報`,
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          numberOfItems: list.length,
          itemListElement: list.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: item.url,
            item: {
              "@type": "Article",
              "@id": `${item.url}#article`,
              url: item.url,
              headline: item.title,
              description: item.excerpt || undefined,
              image: item.imageUrl || DEFAULT_OG,
              datePublished: item.dateTime || undefined,
              dateModified: item.modifiedTime || item.dateTime || undefined,
              author: {
                "@type": "Organization",
                name: SITE_NAME,
                url: SITE_URL,
              },
              publisher: {
                "@type": "Organization",
                name: SITE_NAME,
                url: SITE_URL,
              },
            },
          })),
        },
      ],
    };
  }, [list]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (hasAnimatedRef.current) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;

    if (reduce || coarse) return;
    if (status !== "ok") return;

    hasAnimatedRef.current = true;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(".nw-list");
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y: 12, filter: "blur(0.12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.54,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [status]);

  const isLoading = status === "loading";
  const isError = status === "error";
  const isEmpty = status === "ok" && list.length === 0;

  return (
    <section
      ref={sectionRef}
      className="
        w-full min-h-[100svh]
        bg-[#f7f4ef]
        pt-[18vh]
        px-[6vw]
        pb-[calc(14vh+110px+env(safe-area-inset-bottom))]
      "
      aria-label="最新情報一覧"
      aria-busy={isLoading ? "true" : "false"}
    >
      <Seo
        title="最新情報一覧"
        description="ヨリソイ Hair＆Spaの営業情報、メニュー、予約前の確認など、ご来店前に役立つ最新情報一覧です。"
        path="/news"
        image={DEFAULT_OG}
      />

      <Helmet>
        <script type="application/ld+json">{safeJson(jsonLd)}</script>
      </Helmet>

      <p className="sr-only">
        ヨリソイ Hair＆Spaの最新情報一覧です。営業情報、メニュー、予約前の確認、
        メンズカット、パーマ、シェービング、ヘッドスパに関する案内を掲載しています。
      </p>

      <div className="mx-auto max-w-[600px]">
        <p
          data-kicker
          className="
            nw-list
            mb-3
            text-[12px]
            tracking-[0.26em]
            text-[rgba(96,78,62,0.55)]
          "
        >
          NEWS
        </p>

        <h1
          className="
            nw-list
            mb-5
            text-[clamp(24px,6.4vw,28px)]
            leading-[1.55]
            text-[#5d4c3f]
            font-medium
          "
        >
          最新情報一覧
        </h1>

        <p
          className="
            nw-list
            mb-10
            text-[16px]
            leading-[1.9]
            text-[rgba(96,78,62,0.72)]
          "
        >
          営業日・メニュー・予約前の確認など、ご来店前に役立つ情報をまとめています。
        </p>

        {isLoading && (
          <div className="space-y-10" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="pb-8 border-b border-[rgba(96,78,62,0.12)]"
              >
                <div className="h-[11px] w-[82px] bg-[rgba(96,78,62,0.10)]" />
                <div className="mt-3 h-[14px] w-[78%] bg-[rgba(96,78,62,0.12)]" />
                <div className="mt-2 h-[12px] w-[92%] bg-[rgba(96,78,62,0.10)]" />
                <div className="mt-5 h-[160px] w-full bg-[rgba(96,78,62,0.08)]" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="pb-8 border-b border-[rgba(96,78,62,0.12)]">
            <p className="text-[16px] leading-[1.9] text-[rgba(96,78,62,0.74)]">
              最新情報の読み込みに失敗しました。時間をおいて再度お試しください。
            </p>
          </div>
        )}

        {isEmpty && (
          <div className="pb-8 border-b border-[rgba(96,78,62,0.12)]">
            <p className="text-[16px] leading-[1.9] text-[rgba(96,78,62,0.74)]">
              現在、掲載準備中です。
            </p>
          </div>
        )}

        {status === "ok" && !isEmpty && (
          <>
            <div className="space-y-12" aria-live="polite">
              {list.map((item) => (
                <Link
                  to={`/news/${item.id}`}
                  key={item.id}
                  className="
                    nw-list
                    block
                    pb-8
                    border-b border-[rgba(96,78,62,0.12)]
                    transition
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[rgba(96,78,62,0.22)]
                    focus-visible:ring-offset-4
                    focus-visible:ring-offset-[#f7f4ef]
                  "
                  aria-label={`${item.date} ${item.title}`}
                >
                  {!!item.date && (
                    <time
                      dateTime={item.dateTime}
                      className="
                        mb-2 block
                        text-[13px]
                        tracking-[0.08em]
                        text-[rgba(96,78,62,0.62)]
                      "
                    >
                      {item.date}
                    </time>
                  )}

                  <h2
                    className="
                      mb-2
                      text-[18px]
                      font-medium
                      text-[#5d4c3f]
                      leading-[1.65]
                    "
                  >
                    {item.title}
                  </h2>

                  {!!item.excerpt && (
                    <p
                      className="
                        mb-5
                        text-[16px]
                        leading-[1.85]
                        text-[rgba(96,78,62,0.74)]
                        [display:-webkit-box]
                        [-webkit-box-orient:vertical]
                        [-webkit-line-clamp:2]
                        overflow-hidden
                      "
                    >
                      {item.excerpt}
                    </p>
                  )}

                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="
                        w-full object-cover
                        rounded-[4px]
                        shadow-[0_6px_18px_rgba(72,55,40,0.10)]
                        [filter:brightness(1.02)_contrast(0.95)_saturate(0.96)]
                        aspect-[4/3]
                      "
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="mt-14 nw-list">
              <Link
                to="/"
                className="
                  inline-block
                  text-[14px]
                  tracking-[0.22em]
                  text-[#5d4c3f]
                  border-b border-[#5d4c3f]/45
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
                サイトに戻る
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}