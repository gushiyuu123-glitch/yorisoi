// src/sections/Footer.jsx
import React from "react";

// Instagram icon（極細ライン）
const InstaIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[16px] h-[16px]"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1" />
  </svg>
);

export default function Footer() {
  return (
    <footer
      className="
        relative
        w-full
        pt-[14vh] pb-[8vh] px-[6vw]
        overflow-hidden
        border-t border-[rgba(96,78,62,0.14)]
      "
    >
      {/* 背景 */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src="/yorisoi/footer.png"
          alt=""
          className="w-full h-full object-cover opacity-[0.42] scale-[1.05]"
        />
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_40%_20%,rgba(255,253,249,0.55),rgba(255,253,249,0.10) 70%)]
          "
        />
      </div>

      {/* 上段 */}
      <div className="max-w-[900px] mx-auto text-center mb-12">
        <img
          src="/yorisoi/bird-logo.png"
          alt="YORISOI Bird Logo"
          className="w-[60px] h-[60px] mx-auto mb-5 opacity-100"
        />

        <h3
          className="
            text-[#5d4c3f]
            text-[20px]
            tracking-[0.12em]
            font-medium
          "
        >
          〇〇〇〇 — hair salon
        </h3>

        <p
          className="
            mt-4 text-[14.5px]
            text-[rgba(96,78,62,0.75)]
            leading-[1.8]
          "
        >
          静けさの中で、あなたらしさに寄り添うサロン。<br />
          心地よい時間を、これからも。
        </p>
      </div>

      {/* 店舗情報 */}
      <div className="max-w-[680px] mx-auto text-center mb-10">
        <p className="text-[14px] text-[rgba(96,78,62,0.78)] leading-[1.85]">
          沖縄県 ○○市 ○○町 1-2-3（駐車場あり）<br />
          営業時間：10:00〜19:00（定休日：火曜）
        </p>
      </div>

      {/* Site Design & Instagram */}
      <div className="max-w-[680px] mx-auto text-center mb-12">
        <div
          className="
            flex items-center justify-center gap-6
            text-[14px]
            text-[rgba(96,78,62,0.70)]
          "
        >
          <a
            href="https://gushikendesign.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[rgba(96,78,62,0.95)] transition-all"
          >
            Site Design : GUSHIKEN
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

      {/* コピーライト */}
      <div className="text-center">
        <p className="text-[12px] tracking-wide text-[rgba(96,78,62,0.55)]">
          © 〇〇〇 hair salon
        </p>
      </div>
    </footer>
  );
}
