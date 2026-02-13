// src/sections/Review.jsx
import React from "react";

export default function Review() {

  const reviews = [
    {
      name: "20代後半 男性（会社員）",
      text: "毎回同じスタイルを正確に再現してくれるので安心して任せられます。落ち着いた空間で居心地もよく、細かな要望にも丁寧に対応してくれます。",
    },
    {
      name: "30代後半 男性（会社員）",
      text: "カットもスパも非常に丁寧でリラックスできる時間でした。仕上がりも満足で、今後も通いたいと思えるサロンです。",
    },
    {
      name: "40代 男性（会社員）",
      text: "照明や空間の気遣いが心地よく、施術中に眠りそうになるほどリラックスできます。技術も安定していて、毎回安心して任せられます。",
    },
    {
      name: "20代後半 男性（会社員）",
      text: "初めてパーマをお願いしましたが、理想的な仕上がりでした。待ち時間の配慮など細かなサービスも良かったです。",
    },
    {
      name: "40代 男性（会社員）",
      text: "カウンセリングが丁寧で、細かい部分まで確認してくれます。仕上がりも扱いやすく、信頼できるサロンです。",
    },
    {
      name: "30代後半 男性（自営業）",
      text: "朝早くからの予約にも対応してくれて助かります。落ち着いた店内で丁寧にカットしてくれて、気持ちが整います。",
    },
  ];

  const avg = "5.0";

  return (
    <section
      id="review"
      className="w-full bg-[#f7f4ef] pt-[18vh] pb-[18vh] px-[6vw]"
    >

      {/* =========================
          AggregateRating（SEO）
      ========================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HairSalon",
            "name": "YORISOI Hair & Spa",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": reviews.length.toString(),
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />

      {/* TITLE */}
      <div className="mx-auto max-w-[760px] mb-12 text-center">
        <p className="text-[12px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-6">
          REVIEW / 口コミ
        </p>

        <h2 className="text-[clamp(26px,3vw,34px)] text-[#5d4c3f] leading-[1.45] font-medium mb-4">
          実際にご来店いただいた<br />お客様の声
        </h2>

        {/* 平均評価 */}
        <div className="flex justify-center items-center gap-2 mt-3">
          <span className="text-[15px] text-[#5d4c3f] font-medium">
            平均評価
          </span>
          <span className="text-[20px] font-semibold text-[#b38b4d]">
            {avg}
          </span>
          <span className="text-[13px] text-[rgba(96,78,62,0.6)]">
            / 5.0
          </span>
        </div>
      </div>

      {/* GRID */}
      <div className="mx-auto max-w-[980px] grid grid-cols-3 gap-[2.2vw] md:grid-cols-2 sm:grid-cols-1">

        {reviews.map((r, i) => (
          <div
            key={i}
            className="
              bg-white/75 backdrop-blur-[1px]
              border border-[rgba(96,78,62,0.12)]
              rounded-[16px]
              shadow-[0_8px_24px_rgba(0,0,0,0.05)]
              p-8
              transition duration-300
              hover:shadow-[0_14px_34px_rgba(0,0,0,0.08)]
            "
          >
            {/* 星（常に5） */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <svg
                  key={idx}
                  viewBox="0 0 24 24"
                  fill="#d4af37"
                  stroke="#b38b4d"
                  strokeWidth="0.6"
                  className="w-[18px] h-[18px]"
                  style={{
                    filter: "drop-shadow(0 0 2px rgba(212,175,55,0.35))"
                  }}
                >
                  <polygon points="12 2 15 9 22 9 17 13 19 21 12 17 5 21 7 13 2 9 9 9" />
                </svg>
              ))}
            </div>

            <p className="text-[15px] leading-[1.9] text-[rgba(96,78,62,0.82)] mb-5">
              {r.text}
            </p>

            <p className="text-[13px] text-[rgba(96,78,62,0.55)] tracking-wide">
              {r.name}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-[9vh]">
        <a
          href="https://beauty.hotpepper.jp/slnH000706136/review/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block
            px-9 py-3.5
            rounded-full
            text-[14px]
            text-[#5d4c3f]
            bg-[linear-gradient(90deg,rgba(96,78,62,0.15),rgba(96,78,62,0.08))]
            tracking-[0.08em]
            hover:opacity-80
            transition-all duration-300
            shadow-[0_6px_18px_rgba(0,0,0,0.06)]
          "
        >
          すべての口コミを見る（HotPepper Beauty）
        </a>
      </div>

    </section>
  );
}
