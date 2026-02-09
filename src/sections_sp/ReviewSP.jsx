// src/sections/ReviewSP.jsx
import React from "react";

export default function ReviewSP() {
  const reviews = [
    {
      name: "30代 女性",
      text: "初めての来店でしたが、とても丁寧にカウンセリングしてくださり、仕上がりも自然で大満足です。家でも扱いやすくなりました。",
      stars: 5,
    },
    {
      name: "20代 女性",
      text: "静かで落ち着くサロンでした。カラーの色味も綺麗で、髪がつるんとまとまります。また伺います。",
      stars: 5,
    },
    {
      name: "40代 男性",
      text: "短時間で丁寧に仕上げていただきました。セットしやすく、家族にも好評です。",
      stars: 4,
    },
  ];

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
          {reviews.concat(reviews).map((r, i) => (
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

              <p className="text-[14px] leading-[1.85] text-[rgba(96,78,62,0.87)] mb-4 relative z-[5]">
                {r.text}
              </p>

              <p className="text-[12px] text-[rgba(96,78,62,0.58)] tracking-wide relative z-[5]">
                {r.name}
              </p>
            </div>
          ))}
        </div>
      </div>

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
