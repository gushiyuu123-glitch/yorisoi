// src/sections/ReviewSP.jsx
import React from "react";

export default function ReviewSP() {
  const reviews = [
    {
      name: "20代後半 男性（会社員）",
      text: "毎回同じ仕上がりで整えてくれるので、自分でも扱いやすく助かっています。落ち着いた空間で過ごせるところも気に入っています。",
    },
    {
      name: "30代後半 男性（会社員）",
      text: "カットもスパも丁寧で、静かに過ごしたい自分に合うサロンでした。仕上がりも良く、またお願いしたいです。",
    },
    {
      name: "40代 男性（会社員）",
      text: "毎回安定した技術で任せられます。施術中はとてもリラックスできる居心地の良さがあります。",
    },
    {
      name: "20代後半 男性（会社員）",
      text: "初めてのパーマでしたが丁寧に説明してくれて安心できました。理想通りの仕上がりで満足です。",
    },
    {
      name: "30代後半 男性（自営業）",
      text: "朝の時間も対応してくれて助かります。落ち着く空気感で心地よく、仕上がりにも満足しています。",
    },
  ];

  const loop = [...reviews, ...reviews];
  const avg = "5.0";

  return (
    <section
      id="review-sp"
      className="w-full bg-[#f7f4ef] pt-[14vh] pb-[14vh] px-[6vw] overflow-hidden"
    >
      {/* TITLE */}
      <div className="mx-auto max-w-[520px] mb-10 text-center">
        <p className="text-[11px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-6">
          REVIEW / 口コミ
        </p>

        <h2 className="text-[23px] text-[#5d4c3f] leading-[1.45] font-medium mb-4">
          ご来店いただいた<br />お客様の声
        </h2>

        {/* 平均評価 */}
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="text-[13px] text-[#5d4c3f]">平均</span>
          <span className="text-[17px] font-semibold text-[#b38b4d]">
            {avg}
          </span>
          <span className="text-[12px] text-[rgba(96,78,62,0.6)]">/ 5.0</span>
        </div>
      </div>

      {/* 横スクロール */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-[5vw] pb-3 animate-reviewScrollSP">
          {loop.map((r, i) => (
            <div
              key={i}
              className="
                min-w-[74vw]
                bg-white/75
                border border-[rgba(96,78,62,0.12)]
                rounded-[16px]
                shadow-[0_8px_22px_rgba(0,0,0,0.05)]
                p-6
                relative
                overflow-hidden
              "
            >
              {/* 光膜 */}
              <div
                className="
                  absolute inset-0 pointer-events-none
                  bg-[linear-gradient(
                    to_bottom,
                    rgba(255,255,255,0.28) 0%,
                    rgba(255,255,255,0.08) 50%,
                    rgba(255,255,255,0.0) 100%
                  )]
                  opacity-[0.7]
                "
              />

              {/* 星（常に5） */}
              <div className="flex items-center gap-1 mb-3 relative z-[2]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <svg
                    key={idx}
                    viewBox="0 0 24 24"
                    fill="#d4af37"
                    stroke="#b38b4d"
                    strokeWidth="0.6"
                    className="w-[16px] h-[16px]"
                  >
                    <polygon points="12 2 15 9 22 9 17 13 19 21 12 17 5 21 7 13 2 9 9 9" />
                  </svg>
                ))}
              </div>

              <p className="text-[14px] leading-[1.85] text-[rgba(96,78,62,0.87)] mb-4 relative z-[2]">
                {r.text}
              </p>

              <p className="text-[12px] text-[rgba(96,78,62,0.55)] tracking-wide relative z-[2]">
                {r.name}
              </p>
            </div>
          ))}
        </div>

        {/* 端フェード */}
        <div className="absolute left-0 top-0 h-full w-[8vw] bg-gradient-to-r from-[#f7f4ef] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-[8vw] bg-gradient-to-l from-[#f7f4ef] to-transparent pointer-events-none" />
      </div>

      {/* CTA */}
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
            bg-[linear-gradient(90deg,rgba(96,78,62,0.14),rgba(96,78,62,0.08))]
            tracking-[0.1em]
            hover:opacity-80
            transition-all duration-300
            shadow-[0_6px_18px_rgba(0,0,0,0.06)]
          "
        >
          すべての口コミを見る（HotPepper）
        </a>
      </div>

      <style>{`
        @keyframes reviewScrollSP {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-reviewScrollSP {
          animation: reviewScrollSP 42s linear infinite;
        }
      `}</style>
    </section>
  );
}
