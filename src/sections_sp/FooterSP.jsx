// src/sections_sp/FooterSP.jsx
import React from "react";

// Instagram icon（極細ライン）
const InstaIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[15px] h-[15px]"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1" />
  </svg>
);

export default function FooterSP() {
  return (
    <footer
      className="
        relative w-full overflow-hidden
        pt-[12vh] pb-[10vh] px-[6vw]
        bg-[#f7f4ef]
        border-t border-[rgba(96,78,62,0.12)]
      "
    >
      {/* ===============================
          背景：上質な“白膜 × 木漏れ日”
      =============================== */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src="/yorisoi/footer.png"
          alt=""
          className="
            w-full h-full object-cover
            opacity-[0.32]
            scale-[1.06]
          "
        />

        <div
          className="
            absolute inset-0
            bg-[radial-gradient(
              circle_at_45%_22%,
              rgba(255,253,249,0.55),
              rgba(255,253,249,0.08) 70%
            )]
          "
        />
      </div>

      {/* ===============================
          ロゴ & コピー（世界観の核）
      =============================== */}
      <div className="max-w-[480px] mx-auto text-center mb-10">
        <img
          src="/yorisoi/bird-logo.png"
          alt="YORISOI Bird Logo"
          className="w-[50px] h-[50px] mx-auto mb-4 opacity-90"
        />

        <h3
          className="
            text-[#5d4c3f]
            text-[18px]
            tracking-[0.10em]
            font-medium
          "
        >
          YORISOI — hair salon
        </h3>

        <p
          className="
            mt-3 text-[13.5px]
            text-[rgba(96,78,62,0.75)]
            leading-[1.8]
          "
        >
          静けさに寄り添い、  
          あなたらしさを大切にするサロン。
        </p>
      </div>

      {/* ===============================
          店舗情報（SP 読みやすさ最適化）
      =============================== */}
      <div className="max-w-[420px] mx-auto text-center mb-10">
        <p className="text-[13.5px] text-[rgba(96,78,62,0.78)] leading-[1.85]">
          沖縄県 ○○市 ○○町 1-2-3（駐車場あり）<br />
          営業時間：10:00〜19:00（定休日：火曜）
        </p>
      </div>

      {/* ===============================
          Instagram & 制作クレジット
      =============================== */}
      <div className="max-w-[420px] mx-auto text-center mb-10">
        <div
          className="
            flex items-center justify-center gap-5
            text-[13px]
            text-[rgba(96,78,62,0.70)]
          "
        >
          <a
            href="https://gushikendesign.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[rgba(96,78,62,0.95)] transition-all"
          >
            Design : GUSHIKEN
          </a>

          <span className="text-[rgba(96,78,62,0.35)]">｜</span>

          <a
            href="https://www.instagram.com/yorisoi_salon"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1
              hover:text-[rgba(96,78,62,0.95)]
              transition-all
            "
          >
            <InstaIcon />
            Instagram
          </a>
        </div>
      </div>

      {/* ===============================
          コピーライト
      =============================== */}
      <div className="text-center">
        <p className="text-[11.5px] tracking-wide text-[rgba(96,78,62,0.55)]">
          © YORISOI hair salon
        </p>
      </div>
    </footer>
  );
}
