// src/pages_sp/NewsTopSP.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LIMIT = 3;

const ENDPOINT = `https://pqhxs89idk.microcms.io/api/v1/news?orders=-date&limit=${LIMIT}&fields=id,title,date,body`;

const BAND_SRC = "/yorisoi/bird2.png";
const BAND_MIN_H = "clamp(300px,39vh,430px)";

function formatDate(value) {
  if (!value) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value.replace(/-/g, ".");
  }

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString("ja-JP").replace(/\//g, ".");
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

export default function NewsTopSP() {
  const rootRef = useRef(null);
  const bandRef = useRef(null);

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

        console.error("NEWS fetch error:", err);
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

  // SP実機では動かさない。PCでSP幅表示している時だけ微パララックス
  useEffect(() => {
    const root = rootRef.current;
    const band = bandRef.current;

    if (!root || !band) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;

    if (reduce || coarse) return;

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
          title: item.title || "お知らせ",
        };
      })
      .filter(Boolean)
      .slice(0, LIMIT);
  }, [news]);

  const isLoading = status === "loading";
  const isError = status === "error";
  const isEmpty = status === "ok" && list.length === 0;

  return (
    <div
      ref={rootRef}
      role="region"
      className="
        relative isolate w-full overflow-hidden
        bg-[#f7f4ef]
        py-[12vh] px-[6vw]
      "
      aria-label="最新情報"
      aria-busy={isLoading ? "true" : "false"}
    >
      <p className="sr-only">
        ヨリソイ Hair＆Spaの最新情報です。浦添市内間のメンズ専門理容室として、
        営業情報、メニュー、予約前の確認、メンズカット、パーマ、シェービング、
        ヘッドスパに関する案内を掲載しています。
      </p>

      <div className="relative z-10 mx-auto max-w-[560px]">
        <div
          className="relative flex items-center"
          style={{ minHeight: BAND_MIN_H }}
        >
          {/* 帯 */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-y-0 left-1/2 z-0
              w-screen -translate-x-1/2 overflow-hidden
            "
          >
            <img
              ref={bandRef}
              src={BAND_SRC}
              alt=""
              loading="lazy"
              decoding="async"
              className="
                absolute inset-0 h-full w-full object-cover
                opacity-[0.84]
                scale-[1.08]
                transform-gpu will-change-transform
                [filter:brightness(1.035)_contrast(0.92)_saturate(1.02)]
              "
            />

            <div
              className="
                absolute inset-0
                bg-[linear-gradient(
                  to_bottom,
                  rgba(247,244,239,0.95)_0%,
                  rgba(247,244,239,0.16)_30%,
                  rgba(247,244,239,0.16)_70%,
                  rgba(247,244,239,0.95)_100%
                )]
              "
            />

            <div
              className="
                absolute inset-0
                bg-[linear-gradient(
                  to_right,
                  rgba(247,244,239,0.93)_0%,
                  rgba(247,244,239,0.76)_46%,
                  rgba(247,244,239,0.24)_100%
                )]
              "
            />

            <div
              className="
                absolute inset-x-0 top-0 h-px
                bg-[linear-gradient(to_right,rgba(96,78,62,0),rgba(96,78,62,0.12),rgba(96,78,62,0))]
              "
            />

            <div
              className="
                absolute inset-x-0 bottom-0 h-px
                bg-[linear-gradient(to_right,rgba(96,78,62,0),rgba(96,78,62,0.10),rgba(96,78,62,0))]
              "
            />
          </div>

          {/* コンテンツ */}
          <div className="relative z-10 w-full">
            <Reveal
              as="div"
              className="
                text-center
                text-[11px]
                tracking-[0.28em]
                text-[rgba(96,78,62,0.55)]
              "
              y={10}
              blur={0.12}
              duration={0.56}
            >
              NEWS
            </Reveal>

            <Reveal
              as="h2"
              className="
                mt-3
                text-center
                text-[clamp(22px,6vw,26px)]
                leading-[1.55]
                text-[#5d4c3f]
                font-medium
              "
              delay={0.06}
              y={10}
              blur={0.12}
              duration={0.56}
            >
              最新情報
            </Reveal>

            <Reveal
              as="p"
              className="
                mt-4
                text-center
                text-[16px]
                leading-[1.9]
                text-[rgba(96,78,62,0.90)]
              "
              delay={0.10}
              y={10}
              blur={0.12}
              duration={0.56}
            >
              営業日・メニュー・予約前の確認など、
              <br />
              ご来店前に役立つ情報を掲載しています。
            </Reveal>

            <div className="mt-8 space-y-7" aria-live="polite">
              {isLoading && (
                <div className="space-y-7" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="
                        pb-6
                        border-b border-[rgba(96,78,62,0.12)]
                      "
                    >
                      <div className="h-[11px] w-[92px] bg-[rgba(96,78,62,0.10)]" />
                      <div className="mt-3 h-[16px] w-[86%] bg-[rgba(96,78,62,0.12)]" />
                    </div>
                  ))}
                </div>
              )}

              {isError && (
                <div className="pb-6 border-b border-[rgba(96,78,62,0.12)]">
                  <p className="text-[16px] leading-[1.9] text-[rgba(96,78,62,0.74)]">
                    最新情報の読み込みに失敗しました。時間をおいて再度お試しください。
                  </p>
                </div>
              )}

              {isEmpty && (
                <div className="pb-6 border-b border-[rgba(96,78,62,0.12)]">
                  <p className="text-[16px] leading-[1.9] text-[rgba(96,78,62,0.74)]">
                    現在、掲載準備中です。
                  </p>
                </div>
              )}

              {status === "ok" &&
                !isEmpty &&
                list.map((item, idx) => (
                  <Reveal
                    key={item.id}
                    y={10}
                    blur={0.12}
                    duration={0.56}
                    delay={Math.min(0.10 + idx * 0.05, 0.22)}
                  >
                    <Link
                      to={`/news/${item.id}`}
                      className="
                        group block
                        pb-6
                        border-b border-[rgba(96,78,62,0.12)]
                        transition
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[rgba(96,78,62,0.22)]
                        focus-visible:ring-offset-4
                        focus-visible:ring-offset-[#f7f4ef]
                      "
                      aria-label={`${item.date} ${item.title} 本文を確認する`}
                    >
                      {!!item.date && (
                        <time
                          dateTime={item.date.replace(/\./g, "-")}
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

                      <h3
                        className="
                          text-[17px]
                          font-medium
                          leading-[1.65]
                          text-[#5d4c3f]
                          transition
                          group-hover:opacity-75
                        "
                      >
                        {item.title}
                      </h3>

                      <span
                        className="
                          mt-2 inline-block
                          text-[12.5px]
                          tracking-[0.10em]
                          text-[rgba(96,78,62,0.52)]
                        "
                      >
                        本文を見る
                      </span>
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
                      transition
                      hover:opacity-70
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[rgba(96,78,62,0.22)]
                      focus-visible:ring-offset-4
                      focus-visible:ring-offset-[#f7f4ef]
                    "
                  >
                    一覧を見る
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}