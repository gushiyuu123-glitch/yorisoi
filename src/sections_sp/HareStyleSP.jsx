// src/sections/HareStyleSP.jsx
import React from "react";

export default function HareStyleSP() {
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
      id="hare-style-sp"
      className="
        w-full bg-[#f7f4ef]
        pt-[14vh] pb-[10vh] px-[6vw]
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
          HARE STYLE
        </p>

        <h2
          className="
            text-[24px]
            leading-[1.45]
            text-[#5d4c3f]
            font-medium
          "
        >
          “自然に綺麗” が続く、<br />
          実際のお客様スタイル。
        </h2>
      </div>

      {/* 横スクロール */}
      <div className="relative w-full overflow-hidden mb-[6vh]">
        <div
          className="
            flex gap-[5vw]
            animate-scrollLoopSP
            whitespace-nowrap
          "
        >
          {loop.map((s, i) => (
            <div
              key={i}
              className="
                relative
                min-w-[68vw]
                aspect-[4/5]
                rounded-[14px]
                overflow-hidden
                shadow-[0_4px_18px_rgba(0,0,0,0.10)]
                bg-[#ddd]
              "
            >
              <img
                src={s.img}
                alt={s.name}
                className="
                  w-full h-full object-cover
                  scale-[1.03]
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
                  text-[13px]
                  font-medium
                  px-3 py-2.5
                "
              >
                {s.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA（HotPepperへの導線） */}
      <div className="text-center">
        <a
          href="https://beauty.hotpepper.jp/slnH000706136/style/"
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
          他のスタイルを見る
        </a>
      </div>

      <style>{`
        @keyframes scrollLoopSP {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scrollLoopSP {
          animation: scrollLoopSP 15s linear infinite;
        }
      `}</style>
    </section>
  );
}
