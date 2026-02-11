// src/pages/NewsTop.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NewsTop() {
  const [news, setNews] = useState([]);

  /* Fetch 最新3件 */
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
        console.error(err);
      }
    }
    getNews();
  }, []);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("ja-JP").replace(/\//g, ".");

  return (
    <section className="w-full bg-[#faf7f2] py-[14vh] px-[8vw]">
      
      {/* タイトル */}
      <div className="mx-auto max-w-[760px] text-center mb-10">
        <p className="text-[13px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-3">
          NEWS — 最新情報
        </p>
      </div>

      {/* 最新3件 */}
      <div className="mx-auto max-w-[760px] space-y-10">
        {news.map((item) => (
          <Link 
            to={`/news/${item.id}`}
            key={item.id}
            className="block group pb-6 border-b border-[rgba(96,78,62,0.12)]"
          >
            {/* 日付 */}
            <p className="text-[13px] text-[rgba(96,78,62,0.65)] mb-1">
              {formatDate(item.date)}
            </p>

            {/* タイトル */}
            <p className="
              text-[18px]
              text-[#5d4c3f]
              font-medium
              leading-[1.6]
              group-hover:opacity-70
              transition
            ">
              {item.title}
            </p>
          </Link>
        ))}
      </div>

      {/* もっと見る */}
      <div className="mt-12 text-center">
        <Link
          to="/news"
          className="
            inline-block
            text-[14px]
            tracking-[0.22em]
            text-[#5d4c3f]
            border-b border-[#5d4c3f]/40
            pb-[3px]
            hover:opacity-60
            transition
          "
        >
          もっと見る
        </Link>
      </div>

    </section>
  );
}
