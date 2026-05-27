// src/pages/NewsTop.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const LIMIT = 3;
// ✅ payload軽量化：fields追加
const ENDPOINT =
  `https://pqhxs89idk.microcms.io/api/v1/news?orders=-date&limit=${LIMIT}&fields=id,title,date,body`;

// 帯（public 配下）
const BAND_SRC = "/yorisoi/bird1.png";
const BAND_MIN_H = "clamp(320px,44vh,580px)";

function formatDate(value) {
  if (!value) return "";
  // microCMSで YYYY-MM-DD の時、Dateにするとズレる可能性があるので素直に整形
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

// ✅ “テスト”を弾く（公開事故防止）
function isPlaceholder(item, plain) {
  const t = (item?.title || "").trim();
  const b = (plain || "").trim();
  if (!t && !b) return true;
  const badTitle = ["テスト", "test", "TEST"];
  if (badTitle.includes(t)) return true;
  if (b === "テスト" || b === "test" || b === "TEST") return true;
  return false;
}

export default function NewsTop() {
  const sectionRef = useRef(null);
  const bandRef = useRef(null);

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

  // 帯：微パララックス（酔い防止で小さく）
  useEffect(() => {
    const root = sectionRef.current;
    const band = bandRef.current;
    if (!root || !band) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    if (reduce || coarse) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        band,
        { yPercent: -6 },
        {
          yPercent: 6,
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
          excerpt: plain ? plain.slice(0, 72) : "",
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
        py-[12vh] px-[5vw]
        overflow-hidden
      "
      aria-label="最新のお知らせ"
    >
      <div className="relative z-10 mx-auto max-w-[1320px]">
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
                opacity-[0.88]
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
                  rgba(247,244,239,0.10) 32%,
                  rgba(247,244,239,0.10) 68%,
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
                  rgba(247,244,239,0.74) 34%,
                  rgba(247,244,239,0.22) 64%,
                  rgba(247,244,239,0.10) 100%
                )]
              "
            />
          </div>

          {/* コンテンツ */}
          <div className="relative z-10 w-full grid grid-cols-12 gap-x-[4vw] gap-y-10 items-start">
            {/* Left */}
            <div className="col-span-12 lg:col-span-4">
              <Reveal
                as="p"
                y={12}
                blur={0.14}
                duration={0.62}
                className="text-[13px] tracking-[0.30em] text-[rgba(96,78,62,0.55)]"
              >
                NEWS
              </Reveal>

              <Reveal
                as="h2"
                delay={0.06}
                y={12}
                blur={0.14}
                duration={0.62}
                className="
                  mt-4
                  text-[clamp(22px,2.1vw,32px)]
                  leading-[1.5]
                  text-[#5d4c3f]
                  font-medium
                "
              >
                最新情報
              </Reveal>

              <Reveal
                as="p"
                delay={0.10}
                y={10}
                blur={0.12}
                duration={0.56}
                className="
                  mt-6
                  text-[14.5px]
                  leading-[1.9]
                  text-[rgba(96,78,62,0.72)]
                  max-w-[34ch]
                "
              >
                ご来店前に確認できるお知らせを掲載しています。
              </Reveal>

              <div className="mt-10">
                <Reveal y={10} blur={0.12} duration={0.56} delay={0.06}>
                  <Link
                    to="/news"
                    className="
                      inline-block
                      text-[14px]
                      tracking-[0.22em]
                      text-[#5d4c3f]
                      border-b border-[#5d4c3f]/45
                      pb-[4px]
                      hover:opacity-70 transition
                    "
                  >
                    もっと見る
                  </Link>
                </Reveal>
              </div>
            </div>

            {/* Right */}
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              {status === "loading" && (
                <div className="space-y-10" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="pb-8 border-b border-[rgba(96,78,62,0.12)]">
                      <div className="h-[12px] w-[92px] bg-[rgba(96,78,62,0.10)]" />
                      <div className="mt-4 h-[16px] w-[72%] bg-[rgba(96,78,62,0.12)]" />
                      <div className="mt-3 h-[13px] w-[88%] bg-[rgba(96,78,62,0.10)]" />
                    </div>
                  ))}
                </div>
              )}

              {status === "error" && (
                <div className="pb-8 border-b border-[rgba(96,78,62,0.12)]">
                  <p className="text-[15px] leading-[1.95] text-[rgba(96,78,62,0.72)]">
                    最新情報の読み込みに失敗しました。時間をおいて再度お試しください。
                  </p>
                </div>
              )}

              {isEmpty && (
                <div className="pb-8 border-b border-[rgba(96,78,62,0.12)]">
                  <p className="text-[15px] leading-[1.95] text-[rgba(96,78,62,0.72)]">
                    現在、お知らせを準備中です。
                  </p>
                  <div className="mt-4">
                    <Link
                      to="/news"
                      className="
                        inline-block
                        text-[14px]
                        tracking-[0.22em]
                        text-[#5d4c3f]
                        border-b border-[#5d4c3f]/45
                        pb-[4px]
                        hover:opacity-70 transition
                      "
                    >
                      お知らせ一覧を見る
                    </Link>
                  </div>
                </div>
              )}

              {status === "ok" && !isEmpty && (
                <div className="space-y-10">
                  {list.map((item, idx) => (
                    <Reveal
                      key={item.id}
                      y={12}
                      blur={0.14}
                      duration={0.62}
                      delay={Math.min(0.06 + idx * 0.05, 0.22)}
                    >
                      <Link
                        to={`/news/${item.id}`}
                        className="block pb-8 border-b border-[rgba(96,78,62,0.12)] group"
                        aria-label={`${item.date} ${item.title}`}
                      >
                        <p className="text-[13px] tracking-[0.08em] text-[rgba(96,78,62,0.62)] mb-2">
                          {item.date}
                        </p>
                        <p className="text-[18px] font-medium text-[#5d4c3f] leading-[1.65] mb-2 group-hover:opacity-75 transition">
                          {item.title}
                        </p>
                        {!!item.excerpt && (
                          <p
                            className="
                              text-[14.5px] leading-[1.8]
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
                      </Link>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}