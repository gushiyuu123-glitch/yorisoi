// src/pages_sp/NewsListSP.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewsListSP() {
  const sectionRef = useRef(null);
  const [news, setNews] = useState([]);

  /* microCMS fetch */
  useEffect(() => {
    async function getNews() {
      try {
        const res = await fetch(
          "https://pqhxs89idk.microcms.io/api/v1/news?orders=-date&limit=100",
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

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("ja-JP").replace(/\//g, ".");

  /* GSAP */
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".nw-list"),
      { opacity: 0, y: 26, filter: "blur(0.18px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      }
    );
  }, [news]);

  return (
    <section
      ref={sectionRef}
      className="
        w-full bg-[#f7f4ef]
        min-h-screen
        pt-[18vh] pb-[14vh]
        px-[6vw]
      "
    >
      <div className="mx-auto max-w-[600px]">

        {/* タイトル */}
        <p className="
          nw-list text-center mb-4
          text-[12px]
          tracking-[0.28em]
          text-[rgba(96,78,62,0.55)]
        ">
          NEWS — 一覧
        </p>

        <h1 className="
          nw-list text-center
          text-[23px]
          leading-[1.6]
          text-[#5d4c3f]
          font-medium
          mb-14
        ">
          最新のお知らせをすべて掲載しています。
        </h1>

        {/* 一覧 */}
        <div className="space-y-14">
          {news.map((item) => (
            <Link to={`/news/${item.id}`} key={item.id} className="block nw-list">
              
              {/* 日付 */}
              <p className="text-[12px] text-[rgba(96,78,62,0.60)] mb-1">
                {formatDate(item.date)}
              </p>

              {/* タイトル */}
              <p className="text-[18px] font-medium text-[#5d4c3f] mb-2">
                {item.title}
              </p>

              {/* 本文（短い抜粋） */}
              <p className="
                text-[15px]
                leading-[1.85]
                text-[rgba(96,78,62,0.75)]
                mb-4
              ">
                {item.body?.slice(0, 70)}…
              </p>

              {/* 画像（フル幅で記事感UP） */}
              {item.image?.url && (
                <img
                  src={item.image.url}
                  alt={item.title}
                  className="
                    w-full
                    rounded-[12px]
                    shadow-[0_2px_10px_rgba(0,0,0,0.05)]
                    object-cover
                  "
                />
              )}

              {/* 仕切り線（薄く） */}
              <div className="h-px bg-[rgba(96,78,62,0.12)] mt-8"></div>
            </Link>
          ))}

          {news.length === 0 && (
            <p className="nw-list text-center text-[14px] text-[rgba(96,78,62,0.55)]">
              現在、最新情報はありません。
            </p>
          )}
        </div>

        {/* サイトに戻る */}
        <div className="mt-16 text-center nw-list">
          <Link
            to="/"
            className="
              inline-block
              text-[14px]
              tracking-[0.22em]
              text-[#5d4c3f]
              border-b border-[#5d4c3f]/50
              pb-[3px]
              hover:opacity-60
              transition
            "
          >
            サイトに戻る
          </Link>
        </div>

      </div>
    </section>
  );
}
