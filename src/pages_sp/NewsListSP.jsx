// src/pages_sp/NewsListSP.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ENDPOINT =
  "https://pqhxs89idk.microcms.io/api/v1/news?orders=-date&limit=100";

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ja-JP").replace(/\//g, ".");
}

function toPlainText(value) {
  if (!value || typeof value !== "string") return "";
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function NewsListSP() {
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);

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
        excerpt: plain ? plain.slice(0, 70) : "",
        imageUrl: item?.image?.url || "",
      };
    });
  }, [news]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (hasAnimatedRef.current) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) return;

    if (status !== "ok") return;

    hasAnimatedRef.current = true;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(".nw-list");
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y: 12, filter: "blur(0.16px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.56,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [status]);

  return (
    <section
      ref={sectionRef}
      className="
        w-full bg-[#f7f4ef]
        min-h-[100svh]
        pt-[18vh]
        px-[6vw]
        pb-[calc(14vh+110px+env(safe-area-inset-bottom))]
      "
      aria-label="NEWS一覧"
    >
      <div className="mx-auto max-w-[600px]">
        {/* タイトル */}
        <p className="nw-list text-[11px] tracking-[0.28em] text-[rgba(96,78,62,0.55)] mb-3">
          NEWS
        </p>

        <h1 className="nw-list text-[clamp(20px,5.6vw,24px)] leading-[1.6] text-[#5d4c3f] font-medium mb-10">
          お知らせ一覧
        </h1>

        {/* 状態 */}
        {status === "loading" && (
          <div className="space-y-10" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="pb-8 border-b border-[rgba(96,78,62,0.12)]">
                <div className="h-[11px] w-[82px] bg-[rgba(96,78,62,0.10)]" />
                <div className="mt-3 h-[14px] w-[78%] bg-[rgba(96,78,62,0.12)]" />
                <div className="mt-2 h-[12px] w-[92%] bg-[rgba(96,78,62,0.10)]" />
                <div className="mt-5 h-[160px] w-full bg-[rgba(96,78,62,0.08)]" />
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="pb-8 border-b border-[rgba(96,78,62,0.12)]">
            <p className="text-[14px] leading-[1.9] text-[rgba(96,78,62,0.72)]">
              お知らせの読み込みに失敗しました。時間をおいて再度お試しください。
            </p>
          </div>
        )}

        {status === "ok" && (
          <>
            <div className="space-y-12">
              {list.map((item) => (
                <Link
                  to={`/news/${item.id}`}
                  key={item.id}
                  className="block nw-list pb-8 border-b border-[rgba(96,78,62,0.12)]"
                  aria-label={`${item.date} ${item.title}`}
                >
                  <p className="text-[12px] tracking-[0.08em] text-[rgba(96,78,62,0.62)] mb-2">
                    {item.date}
                  </p>

                  <p className="text-[17px] font-medium text-[#5d4c3f] leading-[1.65] mb-2">
                    {item.title}
                  </p>

                  {!!item.excerpt && (
                    <p
                      className="
                        text-[14px] leading-[1.85]
                        text-[rgba(96,78,62,0.72)]
                        [display:-webkit-box]
                        [-webkit-box-orient:vertical]
                        [-webkit-line-clamp:2]
                        overflow-hidden
                        mb-5
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
                        rounded-[6px]
                        shadow-[0_6px_18px_rgba(0,0,0,0.10)]
                        [filter:brightness(1.02)_contrast(0.95)]
                        aspect-[4/3]
                      "
                    />
                  )}
                </Link>
              ))}

              {list.length === 0 && (
                <p className="nw-list text-center text-[14px] text-[rgba(96,78,62,0.55)]">
                  現在、お知らせはありません。
                </p>
              )}
            </div>

            {/* サイトに戻る */}
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
                  hover:opacity-60
                  transition
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