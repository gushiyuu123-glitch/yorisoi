import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function NewsSP() {
  const sectionRef = useRef(null);
  const [news, setNews] = useState([]);

  /* =============================
        microCMS 取得
  ============================= */
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
        console.error(err);
      }
    }
    getNews();
  }, []);

  /* =============================
        フェードイン
  ============================= */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".nw-sp"),
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 88%" },
      }
    );
  }, [news]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#faf7f2] py-[12vh] px-[6vw]"
    >
      {/* タイトル */}
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

      <div className="space-y-9">
        {news.map((item, i) => (
          <div key={i} className="nw-sp">
            {/* 日付 */}
            <p className="text-[12px] text-[rgba(96,78,62,0.65)] mb-1">
              {item.date}
            </p>

            {/* タイトル */}
            <p className="text-[15px] font-medium text-[#5d4c3f] mb-1">
              {item.title}
            </p>

            {/* 本文 */}
            <p className="text-[14px] leading-[1.85] text-[rgba(96,78,62,0.78)] mb-3">
              {item.body}
            </p>

            {/* ★ 画像（オプション） */}
            {item.image && item.image.url && (
              <img
                src={item.image.url}
                alt={item.title}
                className="
                  w-full rounded-[10px]
                  shadow-[0_2px_10px_rgba(0,0,0,0.06)]
                  mb-2
                "
              />
            )}
          </div>
        ))}

        {/* 空のとき */}
        {news.length === 0 && (
          <p className="nw-sp text-center text-[13px] text-[rgba(96,78,62,0.5)]">
            現在、最新情報はありません。
          </p>
        )}
      </div>
    </section>
  );
}
