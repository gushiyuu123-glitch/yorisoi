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
          背景（白膜 × こもれび）
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
          ロゴ & コピー
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
          ヨリソイ — Hair & Spa
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
          店舗情報（公式データ）
      =============================== */}
      <div className="max-w-[420px] mx-auto text-center mb-10">
        <p className="text-[13.5px] text-[rgba(96,78,62,0.80)] leading-[1.85]">
          沖縄県浦添市内間2丁目20-3（駐車場2台＋バイク1台）<br />
          営業時間：7:00〜19:00（最終受付：カット18:00）<br />
          定休日：毎週月曜日
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

      {/* ===============================
          コピーライト
      =============================== */}
      <div className="text-center">
        <p className="text-[11.5px] tracking-wide text-[rgba(96,78,62,0.55)]">
          © ヨリソイ Hair＆Spa
        </p>
      </div>

      {/* ===============================
          ★ Google に“制作実績”を伝える SEO（JSON-LD）
      =============================== */}

      {/* --- ① GUSHIKEN DESIGN の定義 --- */}
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
              "世界観と構造で魅せるWeb制作スタジオ。美容室・EC・ブランドサイトを中心に高品質LPを制作。",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "沖縄県",
              "addressCountry": "JP",
            },
            "sameAs": ["https://www.instagram.com/gushiken_design/"],
          }),
        }}
      />

      {/* --- ② このサイトが “GUSHIKEN DESIGN 制作” という証明 --- */}
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

      {/* --- ③（任意だけど強い）制作実績リスト --- */}
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
