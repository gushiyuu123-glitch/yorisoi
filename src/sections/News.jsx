import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* =============================================
    NEWS（最新情報）— microCMS仕様
    世界観：静けさ × 木漏れ日 × 余白
============================================= */

export default function News() {
  const sectionRef = useRef(null);
  const [news, setNews] = useState([]);

  /* ---------------------------
      microCMS fetch
  --------------------------- */
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

  /* ---------------------------
      GSAP（静けさのフェード）
  --------------------------- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".nw"),
      { opacity: 0, y: 28, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  }, [news]);

  /* ---------------------------
      JSX
  --------------------------- */

  return (
    <section
      id="news"
      ref={sectionRef}
      className="
        w-full bg-[#faf7f2]
        py-[18vh] px-[8vw]
      "
    >
      {/* タイトル */}
      <div className="mx-auto max-w-[720px] text-center mb-[6vh]">
        <p
          className="
            nw text-[13px]
            tracking-[0.32em]
            text-[rgba(96,78,62,0.55)]
            mb-6
          "
        >
          NEWS — 最新情報
        </p>

        <h2
          className="
            nw text-[clamp(22px,2.8vw,30px)]
            text-[#5d4c3f]
            font-medium leading-[1.55]
          "
        >
          ご来店前にご確認いただける<br />
          最新のお知らせを掲載しています。
        </h2>
      </div>

      {/* 本文 */}
      <div className="mx-auto max-w-[720px] space-y-12">
        {news.map((item, i) => (
          <div key={i} className="nw text-left">
            {/* 日付 */}
            <p className="text-[13px] text-[rgba(96,78,62,0.65)] mb-1">
              {item.date}
            </p>

            {/* タイトル */}
            <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
              {item.title}
            </h3>

            {/* 本文 */}
            <p className="text-[15px] leading-[1.85] text-[rgba(96,78,62,0.78)] mb-4">
              {item.body}
            </p>

            {/* ★ 画像（任意） */}
            {item.image && item.image.url && (
              <img
                src={item.image.url}
                alt={item.title}
                className="
                  w-full rounded-[12px]
                  shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                  mb-1
                "
              />
            )}
          </div>
        ))}

        {/* 空表示 */}
        {news.length === 0 && (
          <p className="nw text-[14px] text-[rgba(96,78,62,0.55)] text-center">
            現在、最新情報はありません。
          </p>
        )}
      </div>
    </section>
  );
}
