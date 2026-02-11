// src/pages/NewsList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NewsList() {
  const [news, setNews] = useState([]);

  /* microCMS Fetch */
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

  /* 日付整形 */
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("ja-JP").replace(/\//g, ".");

  return (
    <main className="w-full bg-[#faf7f2] py-[18vh] px-[8vw]">

      {/* タイトル */}
      <div className="mx-auto max-w-[760px] text-center mb-12">
        <p className="text-[13px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-6">
          NEWS — 一覧
        </p>
      </div>

      {/* 記事一覧 */}
      <div className="mx-auto max-w-[760px] space-y-16">

        {news.map((item) => (
          <Link
            to={`/news/${item.id}`}
            key={item.id}
            className="block group"
          >
            {/* 日付 */}
            <p className="text-[13px] text-[rgba(96,78,62,0.65)] mb-1">
              {formatDate(item.date)}
            </p>

            {/* タイトル */}
            <p className="
              text-[20px]
              text-[#5d4c3f]
              font-medium
              leading-[1.55]
              group-hover:opacity-70
              transition
              mb-4
            ">
              {item.title}
            </p>

            {/* 画像 */}
            {item.image?.url && (
              <div className="flex justify-center">
                <img
                  src={item.image.url}
                  alt={item.title}
                  className="
                    w-full max-w-[320px]
                    rounded-[12px]
                    shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                    object-cover
                  "
                />
              </div>
            )}

            {/* 仕切り線 */}
            <div className="h-px bg-[rgba(96,78,62,0.12)] mt-10"></div>
          </Link>
        ))}

        {/* サイトに戻る */}
        <div className="mt-20 text-center">
          <Link
            to="/"
            className="
              inline-block
              text-[14px]
              tracking-[0.22em]
              text-[#5d4c3f]
              border-b border-[#5d4c3f]/40
              pb-[3px]
              hover:opacity-55
              transition
            "
          >
            サイトに戻る
          </Link>
        </div>

      </div>
    </main>
  );
}
