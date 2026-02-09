// src/sections/Review.jsx
import React from "react";

export default function Review() {
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
    </section>
  );
}
