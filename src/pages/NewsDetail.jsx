// src/pages/NewsDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    async function getDetail() {
      try {
        const res = await fetch(
          `https://pqhxs89idk.microcms.io/api/v1/news/${id}`,
          {
            headers: {
              "X-MICROCMS-API-KEY": import.meta.env.VITE_MICROCMS_API_KEY,
            },
          }
        );
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
      }
    }
    getDetail();
  }, [id]);

  if (!news)
    return (
      <p className="text-center mt-20 text-[rgba(96,78,62,0.55)]">
        読み込み中…
      </p>
    );

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("ja-JP").replace(/\//g, ".");

  return (
    <main
      className="
        w-full bg-[#faf7f2]
        py-[18vh] px-[6vw]
      "
    >
      <div className="mx-auto max-w-[720px] space-y-8">

        {/* 戻る */}
        <Link
          to="/news"
          className="
            inline-block mb-4
            text-[14px]
            text-[rgba(96,78,62,0.55)]
            underline underline-offset-4
          "
        >
           一覧へ戻る
        </Link>

        {/* 日付 */}
        <p className="text-[14px] text-[rgba(96,78,62,0.65)]">
          {formatDate(news.date)}
        </p>

        {/* タイトル */}
        <h1
          className="
            text-[28px]
            text-[#5d4c3f]
            font-medium
            leading-[1.55]
          "
        >
          {news.title}
        </h1>

        {/* ★ 画像（記事用サイズ 360px × センター） */}
        {news.image?.url && (
          <div className="w-full flex justify-center my-6">
            <img
              src={news.image.url}
              alt={news.title}
              className="
                max-w-[360px] w-full
                rounded-[12px]
                shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                object-cover
              "
            />
          </div>
        )}

        {/* 本文 */}
        <p
          className="
            text-[17px]
            leading-[1.9]
            text-[rgba(96,78,62,0.75)]
            whitespace-pre-line
          "
        >
          {news.body}
        </p>
      </div>
    </main>
  );
}
