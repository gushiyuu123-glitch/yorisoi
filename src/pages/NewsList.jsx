// src/pages/NewsList.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const ENDPOINT =
  "https://pqhxs89idk.microcms.io/api/v1/news?orders=-date&limit=100";

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ja-JP").replace(/\//g, ".");
}

// microCMSのbodyがHTMLでも壊れないようにプレーン化
function toPlainText(value) {
  if (!value || typeof value !== "string") return "";
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ok | error

  const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;

  useEffect(() => {
    let ignore = false;
    const ac = new AbortController();

    async function getNews() {
      try {
        if (!apiKey) throw new Error("Missing API key");
        setStatus("loading");

        const res = await fetch(ENDPOINT, {
          signal: ac.signal,
          headers: { "X-MICROCMS-API-KEY": apiKey },
        });

        if (!res.ok) throw new Error(`NEWS fetch failed: ${res.status}`);
        const data = await res.json();

        if (ignore) return;
        setNews(data?.contents || []);
        setStatus("ok");
      } catch (err) {
        if (ignore) return;
        console.error(err);
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
    return news.map((item) => {
      const plain = toPlainText(item?.body);
      return {
        id: item.id,
        date: formatDate(item.date),
        title: item.title,
        // 一覧は“短い要約”があると読まれやすい（でも説明臭は出さない）
        excerpt: plain ? plain.slice(0, 52) : "",
        imageUrl: item?.image?.url || "",
      };
    });
  }, [news]);

  return (
    <main className="w-full bg-[#f7f4ef] py-[18vh] px-[8vw]" aria-label="NEWS一覧">
      <div className="mx-auto max-w-[920px]">
        {/* タイトル */}
        <div className="mb-12">
          <p className="text-[13px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-3">
            NEWS
          </p>
          <h1 className="text-[clamp(22px,2.4vw,30px)] leading-[1.5] text-[#5d4c3f] font-medium">
            一覧
          </h1>
        </div>

        {/* リスト */}
        <div className="space-y-10">
          {status === "loading" && (
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

          {status === "error" && (
            <div className="pb-10 border-b border-[rgba(96,78,62,0.12)]">
              <p className="text-[14.5px] leading-[1.9] text-[rgba(96,78,62,0.72)]">
                お知らせの読み込みに失敗しました。時間をおいて再度お試しください。
              </p>
            </div>
          )}

          {status === "ok" && list.length === 0 && (
            <div className="pb-10 border-b border-[rgba(96,78,62,0.12)]">
              <p className="text-[14.5px] leading-[1.9] text-[rgba(96,78,62,0.72)]">
                現在、お知らせはありません。
              </p>
            </div>
          )}

          {status === "ok" &&
            list.map((item) => (
              <Link
                to={`/news/${item.id}`}
                key={item.id}
                className="
                  group block
                  pb-10 border-b border-[rgba(96,78,62,0.12)]
                "
                aria-label={`${item.date} ${item.title}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-x-10 gap-y-6 items-start">
                  {/* 左：テキスト */}
                  <div>
                    <p className="text-[12.5px] tracking-[0.08em] text-[rgba(96,78,62,0.62)] mb-2">
                      {item.date}
                    </p>

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
                          text-[14.5px]
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

                  {/* 右：サムネ（カード感を出さない：丸角小さめ） */}
                  {item.imageUrl ? (
                    <div className="w-full">
                      <img
                        src={item.imageUrl}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="
                          w-full object-cover
                          rounded-[6px]
                          shadow-[0_6px_18px_rgba(0,0,0,0.08)]
                          [filter:brightness(1.02)_contrast(0.95)]
                          aspect-[4/3]
                        "
                      />
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>
              </Link>
            ))}
        </div>

        {/* サイトに戻る */}
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
              hover:opacity-55
              transition
            "
          >
            サイトに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}