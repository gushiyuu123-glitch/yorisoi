import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* =====================================================
    NEWS（最新情報）— microCMS × 静けさ × 木漏れ日
===================================================== */

export default function NewsSP() {
  const sectionRef = useRef(null);
  const [news, setNews] = useState([]);

  /* -----------------------------
      microCMS から最新 5件取得
  ----------------------------- */
  useEffect(() => {
    async function getNews() {
      try {
        const res = await fetch(
          "https://pqhxs89idk.microcms.io/api/v1/news?limit=5",
          {
            headers: {
              "X-MICROCMS-API-KEY": import.meta.env.VITE_MICROCMS_API_KEY,
            },
          }
        );

        const data = await res.json();
        setNews(data.contents || []);
      } catch (err) {
        console.error("NEWS fetch error:", err);
      }
    }

    getNews();
  }, []);

  /* -----------------------------
      GSAP フェードイン（静けさ）
  ----------------------------- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".nw-sp"),
      { opacity: 0, y: 24, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
        },
      }
    );
  }, [news]);

  /* -----------------------------
      日付フォーマット（2026.02.18）
  ----------------------------- */
  const formatDate = (iso) =>
    new Date(iso)
      .toLocaleDateString("ja-JP")
      .replace(/\//g, ".");

  /* =====================================================
                      JSX
  ===================================================== */

  return (
    <section
      ref={sectionRef}
      className="
        w-full
        bg-[#faf7f2]
        py-[14vh]
        px-[6vw]
      "
    >
      {/* 見出し */}
      <p
        className="
          nw-sp text-center mb-6
          text-[12px]
          tracking-[0.28em]
          text-[rgba(96,78,62,0.55)]
        "
      >
        NEWS
      </p>

      <div className="space-y-12">
        {news.map((item, i) => (
          <div key={i} className="nw-sp">
            {/* 日付 */}
            <p className="text-[12px] text-[rgba(96,78,62,0.65)] mb-1">
              {formatDate(item.date)}
            </p>

            {/* タイトル */}
            <p className="text-[15px] font-medium text-[#5d4c3f] mb-1">
              {item.title}
            </p>

            {/* 本文 */}
            <p className="text-[14px] leading-[1.85] text-[rgba(96,78,62,0.78)] mb-3">
              {item.body}
            </p>

            {/* 画像（オプション） */}
            {item.image?.url && (
              <img
                src={item.image.url}
                alt={item.title}
                className="
                  w-full mt-3
                  rounded-[12px]
                  shadow-[0_2px_10px_rgba(0,0,0,0.06)]
                "
              />
            )}
          </div>
        ))}

        {/* データが無い場合 */}
        {news.length === 0 && (
          <p className="nw-sp text-center text-[13px] text-[rgba(96,78,62,0.5)]">
            現在、最新情報はありません。
          </p>
        )}
      </div>
    </section>
  );
}
