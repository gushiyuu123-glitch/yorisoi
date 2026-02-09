// src/sections_sp/AccessSP.jsx
import React from "react";

// ---- 小鳥アイコン ----
const BirdIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(96,78,62,0.55)"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[20px] h-[20px] mt-[2px]"
  >
    <path d="M3 12s4-1 7-6c1.5 3 4 5 8 6-2 2-5 6-10 6-3 0-5-2-5-6z" />
  </svg>
);

// ---- 車アイコン ----
const CarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(96,78,62,0.55)"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[20px] h-[20px] mt-[2px]"
  >
    <path d="M3 13l2-5h14l2 5" />
    <circle cx="7.5" cy="16.5" r="1.5" />
    <circle cx="16.5" cy="16.5" r="1.5" />
    <path d="M5 13h14" />
  </svg>
);

export default function AccessSP() {
  return (
    <section
      id="access-sp"
      className="
        w-full bg-[#f7f4ef]
        pt-[14vh] pb-[14vh] px-[6vw]
      "
    >
      {/* ---- TITLE ---- */}
      <div className="mx-auto max-w-[480px] mb-12 text-center">
        <p className="text-[11px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-5">
          ACCESS / アクセス
        </p>

        <h2 className="text-[24px] text-[#5d4c3f] leading-[1.45] font-medium">
          お店へのアクセスと<br />営業時間のご案内
        </h2>
      </div>

      {/* ---- INFO ---- */}
      <div
        className="
          mx-auto max-w-[520px]
          space-y-10
          text-[14.5px] leading-[1.9]
          text-[rgba(96,78,62,0.82)]
        "
      >
        {/* 住所 */}
        <div className="flex items-start gap-3">
          <BirdIcon />
          <div>
            <h3 className="text-[16px] text-[#5d4c3f] font-medium mb-1">
              住所
            </h3>
            <p>沖縄県○○市○○町 1-2-3（YORISOI）</p>
          </div>
        </div>

        {/* 営業時間 */}
        <div className="flex items-start gap-3">
          <BirdIcon />
          <div>
            <h3 className="text-[16px] text-[#5d4c3f] font-medium mb-1">
              営業時間
            </h3>
            <p>
              平日 10:00〜19:00<br />
              土日祝 09:00〜18:00<br />
              定休日：火曜日
            </p>
          </div>
        </div>

        {/* 駐車場 */}
        <div className="flex items-start gap-3">
          <CarIcon />
          <div>
            <h3 className="text-[16px] text-[#5d4c3f] font-medium mb-1">
              駐車場
            </h3>
            <p>
              店舗前に専用駐車場が2台ございます。<br />
              満車の場合は近隣パーキングをご利用ください。
            </p>
          </div>
        </div>
      </div>

      {/* ---- 外観写真（白膜フィルム） ---- */}
      <div
        className="
          mx-auto mt-[12vh] max-w-[520px]
          relative rounded-[12px] overflow-hidden
          shadow-[0_6px_22px_rgba(0,0,0,0.08)]
        "
      >
        {/* 白膜 */}
        <div
          aria-hidden
          className="
            absolute inset-0 z-[2] pointer-events-none
            opacity-[0.50]
            [background:radial-gradient(circle_at_36%_20%,rgba(255,255,255,0.42),transparent_70%)]
          "
        />

        <img
          src='/yorisoi/outside.png'
          alt='YORISOI 外観'
          className="
            w-full h-[300px] object-cover
            [filter:saturate(0.9)_contrast(0.92)]
            scale-[1.04]
          "
        />
      </div>

      {/* ---- ホットペッパー（最終導線） ---- */}
      <div className="mt-[10vh] text-center">
        <p className="text-[13px] text-[rgba(96,78,62,0.65)] mb-4">
          ※最新の空き状況・ご予約はホットペッパーにてご案内しています
        </p>

        <a
          href="https://beauty.hotpepper.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block
            px-8 py-3
            rounded-full
            bg-[rgba(96,78,62,0.12)]
            text-[#5d4c3f]
            text-[14.5px]
            tracking-[0.08em]
            backdrop-blur-[2px]
            hover:bg-[rgba(96,78,62,0.18)]
            transition-all duration-300
            shadow-[0_4px_14px_rgba(0,0,0,0.05)]
          "
        >
          日程を確認する
        </a>
      </div>
    </section>
  );
}
