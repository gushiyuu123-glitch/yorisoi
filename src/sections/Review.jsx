// src/sections/Review.jsx
import React from "react";

export default function Review() {
  const reviews = [
    {
      name: "20代後半 男性（会社員）",
      text: "毎回同じスタイルを正確に再現してくれるので安心して任せられます。落ち着いた空間で居心地もよく、細かな要望にも丁寧に対応してくれます。",
      stars: 5,
    },
    {
      name: "30代後半 男性（会社員）",
      text: "カットもスパも非常に丁寧でリラックスできる時間でした。仕上がりも満足で、今後も通いたいと思えるサロンです。",
      stars: 5,
    },
    {
      name: "40代 男性（会社員）",
      text: "照明や空間の気遣いが心地よく、施術中に眠りそうになるほどリラックスできます。技術も安定していて、毎回安心して任せられます。",
      stars: 5,
    },
    {
      name: "20代後半 男性（会社員）",
      text: "初めてパーマをお願いしましたが、理想的な仕上がりでした。待ち時間の配慮など細かなサービスも良かったです。",
      stars: 5,
    },
    {
      name: "40代 男性（会社員）",
      text: "カウンセリングが丁寧で、細かい部分まで確認してくれます。仕上がりも扱いやすく、信頼できるサロンです。",
      stars: 4,
    },
    {
      name: "30代後半 男性（自営業）",
      text: "朝早くからの予約にも対応してくれて助かります。落ち着いた店内で丁寧にカットしてくれて、気持ちが整います。",
      stars: 5,
    },
  ];

  return (
    <section
      id="review"
      className="
        w-full bg-[#f7f4ef]
        pt-[18vh] pb-[18vh] px-[6vw]
      "
    >
      {/* TITLE */}
      <div className="mx-auto max-w-[760px] mb-14 text-center">
        <p className="text-[13px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-7">
          REVIEW / 口コミ
        </p>

        <h2 className="text-[clamp(26px,3vw,34px)] text-[#5d4c3f] leading-[1.45] font-medium">
          実際にご来店いただいた<br />お客様の声をご紹介します。
        </h2>
      </div>

      {/* REVIEWS */}
      <div
        className="
          mx-auto max-w-[900px]
          grid grid-cols-3 gap-[2.4vw]
          md:grid-cols-2 sm:grid-cols-1
        "
      >
        {reviews.map((r, i) => (
          <div
            key={i}
            className="
              bg-white/70 backdrop-blur-[1px]
              border border-[rgba(96,78,62,0.14)]
              rounded-[12px]
              shadow-[0_4px_14px_rgba(0,0,0,0.06)]
              p-7
            "
          >
            {/* 星評価 */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: r.stars }).map((_, idx) => (
                <svg
                  key={idx}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(96,78,62,0.7)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[18px] h-[18px]"
                >
                  <polygon points="12 2 15 9 22 9 17 13 19 21 12 17 5 21 7 13 2 9 9 9" />
                </svg>
              ))}
            </div>

            <p className="text-[14.5px] leading-[1.9] text-[rgba(96,78,62,0.82)] mb-4">
              {r.text}
            </p>

            <p className="text-[13px] text-[rgba(96,78,62,0.6)] tracking-wide">
              {r.name}
            </p>
          </div>
        ))}
      </div>

      {/* HOTPEPPER：全口コミへの導線 */}
      <div className="text-center mt-[8vh]">
        <a
          href="https://beauty.hotpepper.jp/slnH000706136/review/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block
            px-8 py-3
            rounded-full
            text-[14px]
            text-[#5d4c3f]
            bg-[rgba(96,78,62,0.12)]
            backdrop-blur-[2px]
            tracking-[0.08em]
            hover:bg-[rgba(96,78,62,0.18)]
            transition-all duration-300
            shadow-[0_4px_14px_rgba(0,0,0,0.05)]
          "
        >
          すべての口コミを見る（HotPepper Beauty）
        </a>
      </div>
    </section>
  );
}
