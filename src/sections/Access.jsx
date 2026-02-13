// ============================================================================
// Access — PC Final Balanced Version
// 静かな拡張 × 1280最適化 × 1920余白逃がし
// ============================================================================

import React, { useState } from "react";

const BirdIcon = () => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke="rgba(96,78,62,0.55)"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[20px] h-[20px]">
    <path d="M3 12s4-1 7-6c1.5 3 4 5 8 6-2 2-5 6-10 6-3 0-5-2-5-6z" />
  </svg>
);

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none"
    stroke="rgba(96,78,62,0.55)"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[20px] h-[20px]">
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

function AccordionItem({ label, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/70 rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.05)] px-6 py-5 backdrop-blur-[3px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center text-left text-[14.5px] text-[#5d4c3f] font-medium"
      >
        {label}
        <Arrow open={open} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-400 ${
          open ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-4 text-[14px] leading-[1.8] text-[rgba(96,78,62,0.8)]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Access() {
  return (
    <section
      id="access"
      className="w-full bg-[#f7f4ef] py-[150px] px-[5vw]"
    >
      <div className="mx-auto w-full max-w-[960px]">

        {/* =========================
            TITLE
        ========================== */}
        <div className="mb-20 text-center">
          <p className="text-[11px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-5">
            ACCESS / アクセス
          </p>
          <h2 className="text-[28px] text-[#5d4c3f] leading-[1.55] font-medium">
            お店へのアクセスと営業時間
          </h2>
        </div>

        {/* =========================
            TOP INFO — 3 Columns
        ========================== */}
        <div className="mb-24">
          <div className="grid grid-cols-3 gap-10 text-center
                          text-[15px] leading-[1.9]
                          text-[rgba(96,78,62,0.85)]">

            {/* 住所 */}
            <div className="max-w-[240px] mx-auto">
              <div className="flex justify-center mb-4">
                <BirdIcon />
              </div>
              <h3 className="text-[16px] font-medium text-[#5d4c3f] mb-3">
                住所
              </h3>
              沖縄県浦添市内間2丁目20-3<br />
              （パイプライン沿い）
            </div>

            {/* 営業時間 */}
            <div className="max-w-[240px] mx-auto">
              <div className="flex justify-center mb-4">
                <BirdIcon />
              </div>
              <h3 className="text-[16px] font-medium text-[#5d4c3f] mb-3">
                営業時間
              </h3>
              AM7:00〜19:00<br />
              （カット18時 / カラー17時）
            </div>

            {/* 駐車場 */}
            <div className="max-w-[240px] mx-auto">
              <div className="flex justify-center mb-4">
                <CarIcon />
              </div>
              <h3 className="text-[16px] font-medium text-[#5d4c3f] mb-3">
                駐車場
              </h3>
              2台＋バイク1台<br />
              （満車時は近隣P）
            </div>

          </div>
        </div>

        {/* =========================
            ACCORDION
        ========================== */}
        <div className="grid grid-cols-2 gap-8 mb-24">
          <div className="space-y-6">
            <AccordionItem label="アクセス・道案内">
              古島駅徒歩7分 / 浦添年金事務所向かい
            </AccordionItem>
            <AccordionItem label="支払い方法">
              Visa / Mastercard / JCB / PayPay
            </AccordionItem>
            <AccordionItem label="備考">
              理容室 / メンズ / フェード
            </AccordionItem>
          </div>

          <div className="space-y-6">
            <AccordionItem label="予約・最終受付">
              カット18:00 / カラー17:00
            </AccordionItem>
            <AccordionItem label="サロン情報">
              2席 / スタイリスト1名
            </AccordionItem>
            <AccordionItem label="こだわり条件">
              半個室 / 早朝受付OK
            </AccordionItem>
          </div>
        </div>

        {/* =========================
            PHOTO
        ========================== */}
        <div className="relative rounded-[16px] overflow-hidden shadow-[0_10px_34px_rgba(0,0,0,0.06)]">
          <img
            src="/yorisoi/outside.png"
            alt="YORISOI 外観"
            className="w-full h-[360px] object-cover scale-[1.02]"
          />
        </div>

      </div>
    </section>
  );
}
