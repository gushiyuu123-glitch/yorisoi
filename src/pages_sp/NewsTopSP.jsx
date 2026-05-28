// src/pages_sp/NewsTopSP.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const LIMIT = 3;
const ENDPOINT =
  `https://pqhxs89idk.microcms.io/api/v1/news?orders=-date&limit=${LIMIT}&fields=id,title,date,body`;

const BAND_SRC = "/yorisoi/bird2.png";
const BAND_MIN_H = "clamp(280px,38vh,420px)";

function formatDate(value) {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value.replace(/-/g, ".");
  const d = new Date(value);
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

function isPlaceholder(item, plain) {
  const t = (item?.title || "").trim();
  const b = (plain || "").trim();
  if (!t && !b) return true;
  const badTitle = ["テスト", "test", "TEST"];
  if (badTitle.includes(t)) return true;
  if (b === "テスト" || b === "test" || b === "TEST") return true;
  return false;
}

export default function NewsTopSP() {
  const sectionRef = useRef(null);
  const bandRef = useRef(null);

  const [news, setNews] = useState([]);
  const [status, setStatus] = useState("loading");
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
        console.error("NEWS fetch error:", err);
        setStatus("error");
      }
    }

    getNews();
    return () => {
      ignore = true;
      ac.abort();
    };
  }, [apiKey]);

  // 帯：微パララックス（PCでSP表示してる時だけ少し動く）
  useEffect(() => {
    const root = sectionRef.current;
    const band = bandRef.current;
    if (!root || !band) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) return;

    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    if (coarse) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        band,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const list = useMemo(() => {
    return (news || [])
      .map((item) => {
        const plain = toPlainText(item?.body);
        if (isPlaceholder(item, plain)) return null;
        return {
          id: item.id,
          date: formatDate(item.date),
          title: item.title,
          excerpt: plain ? plain.slice(0, 52) : "",
        };
      })
      .filter(Boolean)
      .slice(0, LIMIT);
  }, [news]);

  const isEmpty = status === "ok" && list.length === 0;

  return (
    <section
      ref={sectionRef}
      className="
        relative isolate w-full bg-[#f7f4ef]
        py-[12vh] px-[6vw]
        overflow-hidden
      "
      aria-label="最新のお知らせ"
    >
      <div className="relative z-10 mx-auto max-w-[560px]">
        <div className="relative flex items-center" style={{ minHeight: BAND_MIN_H }}>
          {/* 帯 */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 z-0 overflow-hidden"
          >
            <img
              ref={bandRef}
              src={BAND_SRC}
              alt=""
              className="
                absolute inset-0 w-full h-full object-cover
                opacity-[0.86]
                [filter:brightness(1.03)_contrast(0.92)_saturate(1.02)]
                scale-[1.08] transform-gpu will-change-transform
              "
            />
            <div
              className="
                absolute inset-0
                bg-[linear-gradient(
                  to_bottom,
                  rgba(247,244,239,0.94) 0%,
                  rgba(247,244,239,0.14) 30%,
                  rgba(247,244,239,0.14) 70%,
                  rgba(247,244,239,0.94) 100%
                )]
              "
            />
            <div
              className="
                absolute inset-0
                bg-[linear-gradient(
                  to_right,
                  rgba(247,244,239,0.92) 0%,
                  rgba(247,244,239,0.72) 46%,
                  rgba(247,244,239,0.22) 100%
                )]
              "
            />
          </div>

          {/* コンテンツ */}
          <div className="relative z-10 w-full">
            <Reveal
              as="p"
              className="text-center text-[11px] tracking-[0.28em] text-[rgba(96,78,62,0.55)]"
              y={10}
              blur={0.12}
              duration={0.56}
            >
              NEWS
            </Reveal>

            <Reveal
              as="h2"
              className="mt-3 text-center text-[22px] leading-[1.55] text-[#5d4c3f] font-medium"
              delay={0.06}
              y={10}
              blur={0.12}
              duration={0.56}
            >
              最新情報
            </Reveal>

            <Reveal
              as="p"
              className="mt-4 text-center text-[13.8px] leading-[1.85] text-[rgba(96,78,62,0.72)]"
              delay={0.10}
              y={10}
              blur={0.12}
              duration={0.56}
            >
              ご来店前に確認できるお知らせを掲載しています。
            </Reveal>

            <div className="mt-8 space-y-7">
              {status === "loading" && (
                <div className="space-y-7" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="pb-6 border-b border-[rgba(96,78,62,0.12)]">
                      <div className="h-[11px] w-[92px] bg-[rgba(96,78,62,0.10)]" />
                      <div className="mt-3 h-[15px] w-[78%] bg-[rgba(96,78,62,0.12)]" />
                      <div className="mt-2 h-[12px] w-[90%] bg-[rgba(96,78,62,0.10)]" />
                    </div>
                  ))}
                </div>
              )}

              {status === "error" && (
                <div className="pb-6 border-b border-[rgba(96,78,62,0.12)]">
                  <p className="text-[14px] leading-[1.9] text-[rgba(96,78,62,0.72)]">
                    最新情報の読み込みに失敗しました。時間をおいて再度お試しください。
                  </p>
                </div>
              )}

              {isEmpty && (
                <div className="pb-6 border-b border-[rgba(96,78,62,0.12)]">
                  <p className="text-[14px] leading-[1.9] text-[rgba(96,78,62,0.72)]">
                    現在、お知らせを準備中です。
                  </p>
     
                </div>
              )}

              {status === "ok" && !isEmpty &&
                list.map((item, idx) => (
                  <Reveal
                    key={item.id}
                    y={10}
                    blur={0.12}
                    duration={0.56}
                    delay={Math.min(0.10 + idx * 0.05, 0.22)}
                  >
                    <Link to={`/news/${item.id}`} className="block pb-6 border-b border-[rgba(96,78,62,0.12)]">
                      <p className="text-[12px] tracking-[0.08em] text-[rgba(96,78,62,0.62)] mb-2">
                        {item.date}
                      </p>
                      <p className="text-[15.5px] font-medium text-[#5d4c3f] leading-[1.65] mb-2">
                        {item.title}
                      </p>
                      {!!item.excerpt && (
                        <p className="text-[13.8px] leading-[1.8] text-[rgba(96,78,62,0.72)]">
                          {item.excerpt}…
                        </p>
                      )}
                    </Link>
                  </Reveal>
                ))}

              <div className="pt-3 text-center">
                <Reveal y={10} blur={0.12} duration={0.56} delay={0.12}>
                  <Link
                    to="/news"
                    className="
                      inline-block
                      text-[14px]
                      tracking-[0.22em]
                      text-[#5d4c3f]
                      border-b border-[#5d4c3f]/50
                      pb-[4px]
                      hover:opacity-70 transition
                    "
                  >
      
                      お知らせ一覧を見る
        
  
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}