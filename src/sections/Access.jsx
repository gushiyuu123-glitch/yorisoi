// src/sections/Access.jsx
import React from "react";

// 小鳥
const BirdIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(96,78,62,0.55)"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px]"
  >
    <path d="M3 12s4-1 7-6c1.5 3 4 5 8 6-2 2-5 6-10 6-3 0-5-2-5-6z" />
  </svg>
);

// 車
const CarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(96,78,62,0.55)"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px]"
  >
    <path d="M3 13l2-5h14l2 5" />
    <circle cx="7.5" cy="16.5" r="1.5" />
    <circle cx="16.5" cy="16.5" r="1.5" />
    <path d="M5 13h14" />
  </svg>
);

export default function Access() {
  return (
    <section
      id="access"
      className="
        w-full bg-[#f7f4ef]
        pt-[18vh] pb-[18vh] px-[6vw]
      "
    >
      {/* ---- TITLE ---- */}
      <div className="mx-auto max-w-[760px] mb-14 text-center">
        <p className="text-[13px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-7">
          ACCESS / アクセス
        </p>
        <h2 className="text-[clamp(26px,3vw,34px)] text-[#5d4c3f] leading-[1.45] font-medium">
          お店へのアクセス・営業時間のご案内
        </h2>
      </div>

      {/* ---- INFO ---- */}
      <div
        className="
          mx-auto max-w-[720px]
          space-y-12
          text-[15px] leading-[1.9]
          text-[rgba(96,78,62,0.82)]
        "
      >
        {/* 住所 */}
        <div className="flex items-start gap-3">
          <BirdIcon />
          <div>
            <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
              住所
            </h3>
            <p>
              沖縄県浦添市内間2丁目20-3<br />
              （パイプライン沿い / 年金事務所向かい）
            </p>
          </div>
        </div>

        {/* 営業時間 */}
        <div className="flex items-start gap-3">
          <BirdIcon />
          <div>
            <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
              営業時間
            </h3>
            <p>
              平日・土日祝 7:00〜19:00<br />
              ※7時台のご予約はWEB限定<br />
              最終受付：カット18:00 / カラー17:00 / パーマ16:30<br />
              定休日：毎週月曜日
            </p>
          </div>
        </div>

        {/* 駐車場 */}
        <div className="flex items-start gap-3">
          <CarIcon />
          <div>
            <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1">
              駐車場
            </h3>
            <p>
              専用駐車場：2台（＋バイク1台）<br />
              満車時は近隣パーキングをご利用ください。
            </p>
          </div>
        </div>
      </div>

      {/* ---- 外観写真（世界観フィルム） ---- */}
      <div
        className="
          mx-auto mt-[12vh] max-w-[900px]
          relative rounded-[14px] overflow-hidden
          shadow-[0_6px_26px_rgba(0,0,0,0.08)]
        "
      >
        <div
          className="
            absolute inset-0 z-[2] pointer-events-none
            opacity-[0.45]
            [background:linear-gradient(120deg,rgba(255,255,255,0.45),transparent)]
          "
        />
        <img
          src="/yorisoi/outside.png"
          alt="YORISOI 外観"
          className="
            w-full h-[380px] object-cover
            [filter:saturate(0.92)_contrast(0.92)]
            scale-[1.02]
          "
        />
      </div>

      {/* ---- HOT PEPPER（予約導線） ---- */}
      <div className="mt-[10vh] text-center">
        <p className="text-[14px] text-[rgba(96,78,62,0.65)] mb-4">
          ※最新の空き状況・ご予約はホットペッパーにてご案内しています
        </p>

        <a
          href="https://beauty.hotpepper.jp/slnH000706136/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block
            px-8 py-4
            rounded-full
            bg-[rgba(96,78,62,0.12)]
            text-[#5d4c3f]
            text-[15px]
            tracking-[0.08em]
            backdrop-blur-[2px]
            hover:bg-[rgba(96,78,62,0.18)]
            transition-all duration-300
            shadow-[0_4px_16px_rgba(0,0,0,0.05)]
          "
        >
          日程を確認する
        </a>
      </div>

      {/* ---- サロン強み（CV上昇ブロック） ---- */}
      <div className="mt-[12vh] text-center text-[14px] text-[rgba(96,78,62,0.65)] leading-[1.8]">
        <p>口コミ評価 ★5.00（56件）</p>
        <p>完全マンツーマン・半個室サロン</p>
        <p>朝7時OPEN / メンズ比率 94%</p>
      </div>
    </section>
  );
}
