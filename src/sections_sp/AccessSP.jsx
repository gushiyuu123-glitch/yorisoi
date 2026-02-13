// ============================================================================
// AccessSP — Refined Version
// 静けさ維持 × 情報整理 × 呼吸最適化
// ============================================================================

import React, { useState } from "react";

const BirdIcon = () => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke="rgba(96,78,62,0.55)"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[20px] h-[20px] mt-[3px]">
    <path d="M3 12s4-1 7-6c1.5 3 4 5 8 6-2 2-5 6-10 6-3 0-5-2-5-6z" />
  </svg>
);

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke="rgba(96,78,62,0.55)"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[20px] h-[20px] mt-[3px]">
    <path d="M3 13l2-5h14l2 5" />
    <circle cx="7.5" cy="16.5" r="1.5" />
    <circle cx="16.5" cy="16.5" r="1.5" />
    <path d="M5 13h14" />
  </svg>
);

const Arrow = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    className={`w-[18px] h-[18px] ml-auto transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    stroke="rgba(96,78,62,0.55)"
    strokeWidth="1.6"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 10l6 6 6-6" />
  </svg>
);

export default function AccessSP() {
  const [open, setOpen] = useState(null);
  const toggle = (key) => setOpen((prev) => (prev === key ? null : key));

  const accordionItems = [
    {
      key: "guide",
      title: "アクセス・道案内",
      content: (
        <>
          古島駅より徒歩7分。<br />
          内間バス停 / 浦添年金事務所向かい。
        </>
      ),
    },
    {
      key: "pay",
      title: "支払い方法",
      content: <>Visa / Mastercard / JCB / PayPay</>,
    },
    {
      key: "salon",
      title: "サロン情報",
      content: (
        <>
          セット面：2席（半個室）<br />
          スタイリスト：1名
        </>
      ),
    },
    {
      key: "kodawari",
      title: "こだわり・特徴",
      content: <>マンツーマン施術 / 半個室 / 早朝OK</>,
    },
  ];

  return (
    <section
      id="access-sp"
      className="w-full bg-[#f7f4ef] pt-[13vh] pb-[14vh] px-[6vw]"
    >
      {/* TITLE */}
      <div className="mx-auto max-w-[480px] mb-14 text-center">
        <p className="text-[11px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-5">
          ACCESS / アクセス
        </p>
        <h2 className="text-[23px] text-[#5d4c3f] leading-[1.5] font-medium">
          お店へのアクセスと<br />営業時間のご案内
        </h2>
      </div>

      {/* TOP3 */}
      <div className="mx-auto max-w-[520px] space-y-9 mb-16
                      text-[14.5px] leading-[1.9]
                      text-[rgba(96,78,62,0.82)]">

        <div className="flex gap-3">
          <BirdIcon />
          <div>
            <h3 className="text-[15.5px] text-[#5d4c3f] font-medium mb-2">
              住所
            </h3>
            沖縄県浦添市内間2丁目20-3<br />
            （パイプライン沿い）
          </div>
        </div>

        <div className="flex gap-3">
          <BirdIcon />
          <div>
            <h3 className="text-[15.5px] text-[#5d4c3f] font-medium mb-2">
              営業時間
            </h3>
            AM7:00〜19:00<br />
            最終受付：カット18:00 / カラー17:00
          </div>
        </div>

        <div className="flex gap-3">
          <CarIcon />
          <div>
            <h3 className="text-[15.5px] text-[#5d4c3f] font-medium mb-2">
              駐車場
            </h3>
            2台＋バイク1台（満車時は近隣P）
          </div>
        </div>
      </div>

      {/* ACCORDION */}
      <div className="mx-auto max-w-[520px] space-y-4">
        {accordionItems.map((item) => (
          <div
            key={item.key}
            className="
              bg-white/40
              rounded-[14px]
              shadow-[0_2px_8px_rgba(0,0,0,0.04)]
              px-5 py-4
            "
          >
            <button
              onClick={() => toggle(item.key)}
              className="
                w-full flex items-center
                text-left
                text-[#5d4c3f]
                text-[14.5px]
                font-medium
              "
            >
              {item.title}
              <Arrow open={open === item.key} />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                open === item.key ? "max-h-[200px] opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-[14px] leading-[1.8]
                              text-[rgba(96,78,62,0.8)]">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PHOTO */}
<div className="mx-auto mt-[11vh] max-w-[520px]
                rounded-[14px] overflow-hidden
                shadow-[0_10px_28px_rgba(0,0,0,0.05)]">

  <div className="aspect-[4/3]">
    <img
      src="/yorisoi/outside.png"
      alt="YORISOI 外観"
      className="w-full h-full object-cover
                 [filter:saturate(0.95)_contrast(0.96)]"
    />
  </div>
</div>

    </section>
  );
}
