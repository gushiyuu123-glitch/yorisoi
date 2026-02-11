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
          ヨリソイ — Hair & Spa
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
          沖縄県浦添市内間2丁目20-3（駐車場2台＋バイク1台）<br />
          営業時間：7:00〜19:00（最終受付：カット18:00）<br />
          定休日：毎週月曜日
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
            サイト制作 : GUSHIKEN DESIGN
          </a>

          <span className="text-[rgba(96,78,62,0.35)]">｜</span>

          <a
            href="https://www.instagram.com/yorisoihair/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1
              hover:text-[rgba(96,78,62,0.95)]
              transition-all
            "
          >
            <InstaIcon />
            ヨリソイ : Instagram
          </a>
        </div>
      </div>

      {/* コピーライト */}
      <div className="text-center">
        <p className="text-[12px] tracking-wide text-[rgba(96,78,62,0.55)]">
          © ヨリソイ Hair & Spa
        </p>
      </div>

      {/* ===============================
          ★ SEO（JSON-LD）- Google に制作実績の関連性を通知
      =============================== */}

      {/* ① GUSHIKEN DESIGN の定義 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "GUSHIKEN DESIGN",
            "url": "https://gushikendesign.com/",
            "image": "https://gushikendesign.com/ogp.png",
            "description":
              "世界観×構造で魅せるWeb制作スタジオ。美容室・EC・ブランドサイトなど高品質なLP制作を行っています。",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "沖縄県",
              "addressCountry": "JP",
            },
            "sameAs": ["https://www.instagram.com/gushiken_design/"],
          }),
        }}
      />

      {/* ② このサイトが “GUSHIKEN DESIGN の制作実績” である証明 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "YORISOI Hair & Spa Webサイト",
            "url": "https://yorisoi-nine.vercel.app",
            "creator": {
              "@type": "Organization",
              "name": "GUSHIKEN DESIGN",
              "url": "https://gushikendesign.com/",
            },
            "about": {
              "@type": "HairSalon",
              "name": "ヨリソイ Hair & Spa",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "浦添市",
                "addressRegion": "沖縄県",
                "streetAddress": "内間2丁目20-3",
              },
              "sameAs": "https://www.instagram.com/yorisoihair/",
            },
          }),
        }}
      />

      {/* ③ 制作実績の ItemList（Google が評価しやすくなる） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "制作実績",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "url": "https://yorisoi-nine.vercel.app",
              },
            ],
          }),
        }}
      />
    </footer>
  );
}
