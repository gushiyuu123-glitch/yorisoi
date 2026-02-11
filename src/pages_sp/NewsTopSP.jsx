// src/pages_sp/NewsTopSP.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewsTopSP() {
  const sectionRef = useRef(null);
  const [news, setNews] = useState([]);

  /* =============================
      microCMS 最新3件
  ============================= */
  useEffect(() => {
    async function getNews() {
      try {
        const res = await fetch(
          "https://pqhxs89idk.microcms.io/api/v1/news?orders=-date&limit=3",
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

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("ja-JP").replace(/\//g, ".");

  /* =============================
      GSAP（静かなフェード）
  ============================= */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".nw-top"),
      { opacity: 0, y: 26, filter: "blur(0.3px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  }, [news]);

  return (
    <section
      ref={sectionRef}
      className="
        w-full bg-[#f7f4ef]
        pt-[14vh] pb-[12vh]
        px-[6vw]
      "
    >
      <div className="mx-auto max-w-[520px]">

        {/* タイトル */}
        <p
          className="
            nw-top text-center mb-4
            text-[12px]
            tracking-[0.28em]
            text-[rgba(96,78,62,0.55)]
          "
        >
          NEWS — 最新情報
        </p>

        {/* リード文 */}
        <h2
          className="
            nw-top text-center
            text-[20px]
            leading-[1.55]
            text-[#5d4c3f]
            font-medium
            mb-8
          "
        >
          ご来店前にご確認いただける<br />
          最新のお知らせを掲載しています。
        </h2>

        {/* 最新3件 */}
        <div className="space-y-8">
          {news.map((item) => (
            <Link
              to={`/news/${item.id}`}
              key={item.id}
              className="block nw-top"
            >
              {/* 日付 */}
              <p className="text-[12px] text-[rgba(96,78,62,0.65)] mb-1">
                {formatDate(item.date)}
              </p>

              {/* タイトル */}
              <p className="text-[15px] font-medium text-[#5d4c3f] mb-1">
                {item.title}
              </p>

              {/* 本文抜粋（2行で美しい長さに） */}
              <p className="text-[14px] leading-[1.7] text-[rgba(96,78,62,0.75)] mb-2">
                {item.body?.slice(0, 44)}...
              </p>
            </Link>
          ))}
        </div>

        {/* もっと見る */}
        <div className="mt-12 text-center nw-top">
          <Link
            to="/news"
            className="
              inline-block
              text-[14px]
              tracking-[0.22em]
              text-[#5d4c3f]
              border-b border-[#5d4c3f]/50
              pb-[5px]
              hover:opacity-70
              transition
            "
          >
            もっと見る
          </Link>
        </div>
      </div>
    </section>
  );
}
