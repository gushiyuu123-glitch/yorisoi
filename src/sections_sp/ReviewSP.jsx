// src/sections/ReviewSP.jsx
import React from "react";

export default function ReviewSP() {
  const reviews = [
    {
      name: "20代後半 男性（会社員）",
      text: "毎回同じ仕上がりで整えてくれるので、自分でも扱いやすく助かっています。落ち着いた空間で過ごせるところも気に入っています。",
      stars: 5,
    },
    {
      name: "30代後半 男性（会社員）",
      text: "カットもスパも丁寧で、静かに過ごしたい自分に合うサロンでした。仕上がりも良く、またお願いしたいです。",
      stars: 5,
    },
    {
      name: "40代 男性（会社員）",
      text: "毎回安定した技術で任せられます。施術中はとてもリラックスできる居心地の良さがあります。",
      stars: 5,
    },
    {
      name: "20代後半 男性（会社員）",
      text: "初めてのパーマでしたが丁寧に説明してくれて安心できました。理想通りの仕上がりで満足です。",
      stars: 5,
    },
    {
      name: "30代後半 男性（自営業）",
      text: "朝の時間も対応してくれて助かります。落ち着く空気感で心地よく、仕上がりにも満足しています。",
      stars: 5,
    },
  ];

  const loop = [...reviews, ...reviews]; // 無限スクロール用

  return (
    <section
      id="review-sp"
      className="
        w-full bg-[#f7f4ef]
        pt-[14vh] pb-[14vh] px-[6vw]
        overflow-hidden
      "
    >
      {/* TITLE */}
      <div className="mx-auto max-w-[520px] mb-12 text-center">
        <p
          className="
            text-[11px]
            tracking-[0.32em]
            text-[rgba(96,78,62,0.55)]
            mb-6
          "
        >
          REVIEW / 口コミ
        </p>

        <h2
          className="
            text-[24px]
            text-[#5d4c3f]
            leading-[1.45]
            font-medium
          "
        >
          ご来店いただいた<br />お客様の声を掲載しています。
        </h2>
      </div>

      {/* 横スクロール（SP専用） */}
      <div className="relative w-full overflow-hidden">
        <div
          className="
            flex gap-[5vw]
            pb-3
            animate-reviewScrollSP
          "
        >
          {loop.map((r, i) => (
            <div
              key={i}
              className="
                min-w-[72vw]
                bg-white/70
                backdrop-blur-[2.2px]
                border border-[rgba(96,78,62,0.14)]
                rounded-[14px]
                shadow-[0_4px_16px_rgba(0,0,0,0.06)]
                p-6
                relative
                overflow-hidden
              "
            >
              {/* 白膜（自然光） */}
              <div
                className="
                  absolute inset-0 pointer-events-none
                  bg-[linear-gradient(
                    to_bottom,
                    rgba(255,255,255,0.32) 0%,
                    rgba(255,255,255,0.12) 45%,
                    rgba(255,255,255,0.0) 100%
                  )]
                  opacity-[0.75]
                  rounded-[14px]
                "
              />

              {/* 星評価 */}
              <div className="flex items-center gap-1 mb-3 relative z-[5]">
                {Array.from({ length: r.stars }).map((_, idx) => (
                  <svg
                    key={idx}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(96,78,62,0.78)"
                    strokeWidth="1.45"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[16px] h-[16px]"
                  >
                    <polygon points="12 2 15 9 22 9 17 13 19 21 12 17 5 21 7 13 2 9 9 9" />
                  </svg>
                ))}
              </div>

              {/* TEXT */}
              <p className="text-[14px] leading-[1.85] text-[rgba(96,78,62,0.87)] mb-4 relative z-[5]">
                {r.text}
              </p>

              {/* name */}
              <p className="text-[12px] text-[rgba(96,78,62,0.58)] tracking-wide relative z-[5]">
                {r.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* HotPepperへの導線 */}
      <div className="text-center mt-[8vh]">
        <a
          href="https://beauty.hotpepper.jp/slnH000706136/review/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block
            px-7 py-3
            rounded-full
            text-[12.5px]
            text-[#5d4c3f]
            bg-[rgba(96,78,62,0.12)]
            backdrop-blur-[2px]
            tracking-[0.1em]
            hover:bg-[rgba(96,78,62,0.18)]
            transition-all duration-300
            shadow-[0_4px_14px_rgba(0,0,0,0.05)]
          "
        >
          すべての口コミを見る（HotPepper）
        </a>
      </div>

      {/* アニメーション */}
      <style>{`
        @keyframes reviewScrollSP {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-reviewScrollSP {
          animation: reviewScrollSP 38s linear infinite;
        }
      `}</style>
    </section>
  );
}
