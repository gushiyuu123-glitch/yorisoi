// src/sections/HareStyle.jsx
import React from "react";

export default function HareStyle() {
  const styles = [
    { name: "自然におさまるショート", img: "/gallery/short1.png" },
    { name: "柔らかく揺れるボブ", img: "/gallery/bob1.png" },
    { name: "手ぐしで整うミディ", img: "/gallery/midi1.png" },
    { name: "透明感ストレート", img: "/gallery/straight1.png" },
    { name: "ゆるやかウェーブ", img: "/gallery/wave1.png" },
  ];

  const loop = [...styles, ...styles];

  return (
    <section
      id="hare-style"
      className="
        w-full bg-[#f7f4ef]
        pt-[18vh] pb-[14vh] px-[4vw]
        overflow-hidden
      "
    >
      {/* TITLE */}
      <div className="mx-auto max-w-[760px] mb-14 text-center">
        <p
          className="
            text-[13px]
            tracking-[0.32em]
            text-[rgba(96,78,62,0.55)]
            mb-7
          "
        >
          HARE STYLE
        </p>

        <h2
          className="
            text-[clamp(26px,3vw,34px)]
            text-[#5d4c3f]
            leading-[1.45]
            font-medium
          "
        >
          仕上がりが“自然に綺麗”な、実際のスタイルを<br/>
          お届けします。
        </h2>
      </div>

      {/* 横スクロール */}
      <div className="relative w-full overflow-hidden mb-[10vh]">
        <div
          className="
            flex gap-[3vw] 
            animate-scrollLoop 
            whitespace-nowrap
          "
        >
          {loop.map((s, i) => (
            <div
              key={i}
              className="
                relative 
                min-w-[32vw] max-w-[420px]
                aspect-[4/5]
                rounded-[16px]
                overflow-hidden
                shadow-[0_6px_26px_rgba(0,0,0,0.12)]
                bg-[#ddd]
              "
            >
              <img
                src={s.img}
                alt={s.name}
                className="
                  w-full h-full object-cover
                  scale-[1.02]
                  select-none pointer-events-none
                "
              />

              {/* スタイル名 */}
              <div
                className="
                  absolute bottom-0 left-0 right-0
                  bg-[rgba(0,0,0,0.38)]
                  backdrop-blur-[2px]
                  text-white
                  text-[15px]
                  font-medium
                  px-4 py-3
                "
              >
                {s.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- 他のヘアスタイルを見る CTA ---- */}
      <div className="text-center">
        <a
          href="#gallery"  /* ← 後で作品一覧 id をここに合わせる */
          className="
            inline-block
            px-8 py-3
            rounded-full
            text-[15px]
            text-[#5d4c3f]
            bg-[rgba(96,78,62,0.12)]
            backdrop-blur-[2px]
            tracking-[0.08em]
            hover:bg-[rgba(96,78,62,0.18)]
            transition-all duration-300
            shadow-[0_4px_14px_rgba(0,0,0,0.05)]
          "
        >
          他のヘアスタイルも見る
        </a>
      </div>

      <style>{`
        @keyframes scrollLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scrollLoop {
          animation: scrollLoop 28s linear infinite;
        }
      `}</style>
    </section>
  );
}
