// ============================================================================
// AccessSP — 重要3つは即表示 × その他は最小4項目アコーデオン
// （SP情報密度 最適化版）
// GUSHIKEN DESIGN × NOA
// ============================================================================

import React, { useState } from "react";

// ---- Icons ----
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

const Arrow = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    className={`
      w-[18px] h-[18px] ml-auto
      transition-transform duration-300
      ${open ? "rotate-180" : "rotate-0"}
    `}
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

  // ---- アコーデオン（SP向けに4項目に削減） ----
  const accordionItems = [
    {
      key: "guide",
      title: "アクセス・道案内",
      icon: <BirdIcon />,
      content: (
        <>
          【青いお店です】古島駅より徒歩7分。<br />
          近隣：セブン内間2丁目店 / 東公園 / 内間バス停。<br />
          向かいに年金事務所があります。
        </>
      ),
    },
    {
      key: "pay",
      title: "支払い方法",
      icon: <BirdIcon />,
      content: (
        <>
          Visa / Mastercard / JCB / Amex / PayPay / QUICPay /
          iD / Suica / PASMO / ApplePay
        </>
      ),
    },
    {
      key: "salon",
      title: "サロン情報",
      icon: <BirdIcon />,
      content: (
        <>
          セット面：2席（半個室）<br />
          スタイリスト：1名<br />
          カット価格：¥3,480〜
        </>
      ),
    },
    {
      key: "kodawari",
      title: "こだわり・特徴",
      icon: <BirdIcon />,
      content: (
        <>
          マンツーマン施術 / 半個室 / 男性比率高め / お子さま同伴OK /
          早朝OK / 駐車場あり
        </>
      ),
    },
  ];

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

      {/* ---- IMPORTANT TOP 3（SP強化） ---- */}
      <div
        className="
          mx-auto max-w-[520px]
          space-y-8 mb-14
          text-[14.5px] leading-[1.9]
          text-[rgba(96,78,62,0.82)]
        "
      >
        {/* 住所 */}
        <div className="flex items-start gap-3">
          <BirdIcon />
          <div>
            <h3 className="text-[16px] text-[#5d4c3f] font-medium">住所</h3>
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
            <h3 className="text-[16px] text-[#5d4c3f] font-medium">営業時間</h3>
            <p>
              AM7:00〜19:00<br />
              最終受付：カット18:00 / カラー17:00<br />
              定休日：毎週月曜
            </p>
          </div>
        </div>

        {/* 駐車場 */}
        <div className="flex items-start gap-3">
          <CarIcon />
          <div>
            <h3 className="text-[16px] text-[#5d4c3f] font-medium">駐車場</h3>
            <p>2台＋バイク1台（満車時は近隣Pをご利用ください）</p>
          </div>
        </div>
      </div>

      {/* ---- Accordion ---- */}
      <div className="mx-auto max-w-[520px] space-y-4">
        {accordionItems.map((item) => (
          <div
            key={item.key}
            className="
              bg-white/50
              rounded-[12px]
              shadow-[0_2px_10px_rgba(0,0,0,0.06)]
              backdrop-blur-[3px]
              px-5 py-4
            "
          >
            {/* header */}
            <button
              onClick={() => toggle(item.key)}
              className="
                w-full flex items-center gap-3
                text-left
                text-[#5d4c3f]
                text-[15px]
                font-medium
              "
            >
              {item.icon}
              <span>{item.title}</span>
              <Arrow open={open === item.key} />
            </button>

            {/* content */}
            <div
              className={`
                overflow-hidden transition-all duration-350
                ${open === item.key ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}
              `}
            >
              <div
                className="
                  pt-3 pb-1 pl-9 pr-2
                  text-[14px] leading-[1.8]
                  text-[rgba(96,78,62,0.82)]
                "
              >
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---- Photo ---- */}
      <div
        className="
          mx-auto mt-[12vh] max-w-[520px]
          relative rounded-[12px] overflow-hidden
          shadow-[0_6px_22px_rgba(0,0,0,0.08)]
        "
      >
        <div
          aria-hidden
          className="
            absolute inset-0 z-[2] pointer-events-none
            opacity-[0.50]
            [background:radial-gradient(circle_at_36%_20%,rgba(255,255,255,0.42),transparent_70%)]
          "
        />

        <img
          src="/yorisoi/outside.png"
          alt="YORISOI 外観"
          className="
            w-full h-[300px] object-cover
            [filter:saturate(0.9)_contrast(0.92)]
            scale-[1.04]
          "
        />
      </div>

      {/* ---- HotPepper ---- */}
      <div className="mt-[10vh] text-center">
        <p className="text-[13px] text-[rgba(96,78,62,0.65)] mb-4">
          最新の空き状況・ご予約はホットペッパーから
        </p>

        <a
          href="https://beauty.hotpepper.jp/slnH000706136/"
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

      {/* ---- Strength ---- */}
      <div className="mt-[12vh] text-center text-[13px] text-[rgba(96,78,62,0.65)] leading-[1.8]">
        <p>口コミ評価 ★5.00（56件）</p>
        <p>完全マンツーマン・半個室サロン</p>
        <p>朝7時OPEN / メンズ専門</p>
      </div>
    </section>
  );
}
