// src/pages/NewsList.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const ENDPOINT =
  "https://pqhxs89idk.microcms.io/api/v1/news?orders=-date&limit=100&fields=id,title,date,body,image";

function formatDate(value) {
  if (!value) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value.replace(/-/g, ".");
  }

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString("ja-JP").replace(/\//g, ".");
}

function toDateTime(value) {
  if (!value) return undefined;

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;

  return d.toISOString().slice(0, 10);
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

function makeExcerpt(text, max = 92) {
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

export default function NewsList() {
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

        return {
          id: item.id,
          date: formatDate(item.date),
          dateTime: toDateTime(item.date),
          title: item.title || "最新情報",
          excerpt: makeExcerpt(plain, 92),
          imageUrl: item?.image?.url || "",
        };
      })
      .filter(Boolean);
  }, [news]);

  const isLoading = status === "loading";
  const isError = status === "error";
  const isEmpty = status === "ok" && list.length === 0;

  return (
    <div
      className="
        w-full min-h-[100svh]
        bg-[#f7f4ef]
        py-[18vh] px-[8vw]
      "
      role="region"
      aria-label="最新情報一覧"
      aria-busy={isLoading ? "true" : "false"}
    >
      <p className="sr-only">
        ヨリソイ Hair＆Spaの最新情報一覧です。営業情報、メニュー、予約前の確認、
        メンズカット、パーマ、シェービング、ヘッドスパに関する案内を掲載しています。
      </p>

      <div className="mx-auto max-w-[920px]">
        <div className="mb-12">
          <p
            data-kicker
            className="
              mb-3
              text-[13px]
              tracking-[0.32em]
              text-[rgba(96,78,62,0.55)]
            "
          >
            NEWS
          </p>

          <h1
            className="
              text-[clamp(24px,2.5vw,32px)]
              leading-[1.5]
              text-[#5d4c3f]
              font-medium
            "
          >
            最新情報一覧
          </h1>

          <p
            className="
              mt-5
              max-w-[42em]
              text-[14.8px]
              leading-[1.9]
              text-[rgba(96,78,62,0.68)]
            "
          >
            営業日・メニュー・予約前の確認など、ご来店前に役立つ情報をまとめています。
          </p>
        </div>

        <div className="space-y-10" aria-live="polite">
          {isLoading && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="pb-10 border-b border-[rgba(96,78,62,0.12)]"
                  aria-hidden="true"
                >
                  <div className="h-[12px] w-[96px] bg-[rgba(96,78,62,0.10)]" />
                  <div className="mt-3 h-[16px] w-[72%] bg-[rgba(96,78,62,0.12)]" />
                  <div className="mt-3 h-[12px] w-[88%] bg-[rgba(96,78,62,0.10)]" />
                </div>
              ))}
            </>
          )}

          {isError && (
            <div className="pb-10 border-b border-[rgba(96,78,62,0.12)]">
              <p className="text-[15px] leading-[1.95] text-[rgba(96,78,62,0.72)]">
                最新情報の読み込みに失敗しました。時間をおいて再度お試しください。
              </p>
            </div>
          )}

          {isEmpty && (
            <div className="pb-10 border-b border-[rgba(96,78,62,0.12)]">
              <p className="text-[15px] leading-[1.95] text-[rgba(96,78,62,0.72)]">
                現在、掲載準備中です。
              </p>
            </div>
          )}

          {status === "ok" &&
            !isEmpty &&
            list.map((item) => (
              <Link
                to={`/news/${item.id}`}
                key={item.id}
                className="
                  group block
                  pb-10
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
                <div
                  className="
                    grid grid-cols-1
                    md:grid-cols-[1fr_220px]
                    gap-x-10 gap-y-6
                    items-start
                  "
                >
                  <div>
                    {!!item.date && (
                      <time
                        dateTime={item.dateTime}
                        className="
                          mb-2 block
                          text-[12.5px]
                          tracking-[0.08em]
                          text-[rgba(96,78,62,0.62)]
                        "
                      >
                        {item.date}
                      </time>
                    )}

                    <h2
                      className="
                        text-[20px]
                        text-[#5d4c3f]
                        font-medium
                        leading-[1.6]
                        transition-opacity
                        group-hover:opacity-70
                      "
                    >
                      {item.title}
                    </h2>

                    {!!item.excerpt && (
                      <p
                        className="
                          mt-3
                          text-[14.8px]
                          leading-[1.9]
                          text-[rgba(96,78,62,0.72)]
                          [display:-webkit-box]
                          [-webkit-box-orient:vertical]
                          [-webkit-line-clamp:2]
                          overflow-hidden
                        "
                      >
                        {item.excerpt}
                      </p>
                    )}
                  </div>

                  {item.imageUrl ? (
                    <div className="w-full">
                      <img
                        src={item.imageUrl}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="
                          w-full object-cover
                          rounded-[3px]
                          shadow-[0_6px_18px_rgba(72,55,40,0.08)]
                          [filter:brightness(1.02)_contrast(0.95)_saturate(0.96)]
                          aspect-[4/3]
                        "
                      />
                    </div>
                  ) : (
                    <div className="hidden md:block" aria-hidden="true" />
                  )}
                </div>
              </Link>
            ))}
        </div>

        <div className="mt-16">
          <Link
            to="/"
            className="
              inline-block
              text-[14px]
              tracking-[0.22em]
              text-[#5d4c3f]
              border-b border-[#5d4c3f]/40
              pb-[3px]
              transition
              hover:opacity-55
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
      </div>
    </div>
  );
}