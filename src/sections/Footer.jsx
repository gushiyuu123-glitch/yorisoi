// src/sections/Footer.jsx
import React from "react";

/* ===============================
   Icons（極細ライン統一）
=============================== */

// Instagram icon
const InstaIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.35"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[16px] h-[16px]"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1" />
  </svg>
);

// Design/PC icon（制作バッジ用）
const DesignIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.35"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[15px] h-[15px]"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <line x1="8" y1="20" x2="16" y2="20" />
    <line x1="12" y1="16" x2="12" y2="20" />
  </svg>
);

export default function Footer() {
  const siteUrl = "https://yorisoi-nine.vercel.app/";
  const hotpepperUrl = "https://beauty.hotpepper.jp/slnH000706136/";
  const hotpepperReviewUrl = "https://beauty.hotpepper.jp/slnH000706136/review/";
  const instaYorisoi = "https://www.instagram.com/yorisoihair/";
  const gushikenUrl = "https://gushikendesign.com/";
  const gushikenInsta = "https://www.instagram.com/gushiken_design/";

  // 口コミ（このサイト内の表示値と一致させる：全部5固定の方針）
  const ratingValue = 5.0;
  const reviewCount = 6; // ここは実数があるなら合わせる（仮：Review.jsxの件数）

  // 画像（存在するURLに置き換えてOK）
  const ogImage = `${siteUrl}yorisoi/ogp1.png`;
  const footerBg = "/yorisoi/footer.png";
  const birdLogo = "/yorisoi/bird-logo.png";

  // LocalBusiness（店舗の実体）
  const jsonLdSalon = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${siteUrl}#salon`,
    name: "YORISOI Hair & Spa",
    url: siteUrl,
    image: ogImage,
    description:
      "沖縄県浦添市のプライベートサロン。朝7時から営業。静かで落ち着く空間で、扱いやすさと再現性を大切にした施術をご提供します。",
    telephone: "090-7357-0926",
    address: {
      "@type": "PostalAddress",
      streetAddress: "内間2丁目20-3",
      addressLocality: "浦添市",
      addressRegion: "沖縄県",
      postalCode: "901-2121",
      addressCountry: "JP",
    },
    // 位置情報は確定値があるなら入れる（なければ削除推奨）
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.245",
      longitude: "127.718",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday"],
        opens: "00:00",
        closes: "00:00",
        description: "定休日",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "19:00",
      },
    ],
    priceRange: "¥¥",
    sameAs: [hotpepperUrl, instaYorisoi],
    // ★ AggregateRating（Reviewセクションの表示と整合）
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      bestRating: 5,
      worstRating: 1,
      reviewCount: reviewCount,
    },
  };

  // WebSite（サイトの定義）
  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name: "YORISOI Hair & Spa",
    url: siteUrl,
    inLanguage: "ja-JP",
    publisher: {
      "@type": "Organization",
      name: "YORISOI Hair & Spa",
      url: siteUrl,
    },
  };

  // GUSHIKEN DESIGN（制作主体：過剰主張しないが、Googleに明確に伝える）
  const jsonLdGushiken = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${gushikenUrl}#org`,
    name: "GUSHIKEN DESIGN",
    url: gushikenUrl,
    // logo/ogpは存在するURLに合わせる（なければ削除 or 正しいURLに）
    logo: `${gushikenUrl}ogp.png`,
    image: `${gushikenUrl}ogp.png`,
    description:
      "世界観×構造で魅せるWeb制作。美容室・EC・ブランドサイトの高品質LP/サイト制作。",
    address: {
      "@type": "PostalAddress",
      addressRegion: "沖縄県",
      addressCountry: "JP",
    },
    sameAs: [gushikenInsta],
    founder: {
      "@type": "Person",
      name: "裕人 具志堅",
    },
    knowsAbout: [
      "Web Design",
      "Landing Page Design",
      "Hair Salon Website Design",
      "Brand Website",
      "UX Design",
      "Front-end Development",
    ],
  };

  // CreativeWork（このWebサイトが制作実績である “証明”）
  const jsonLdWorkProof = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${siteUrl}#work`,
    name: "YORISOI Hair & Spa Webサイト",
    url: siteUrl,
    about: { "@id": `${siteUrl}#salon` },
    creator: { "@id": `${gushikenUrl}#org` },
    publisher: {
      "@type": "Organization",
      name: "YORISOI Hair & Spa",
      url: siteUrl,
    },
    isPartOf: { "@id": `${gushikenUrl}#portfolio` },
  };

  // Portfolio（GUSHIKEN DESIGN側の文脈を補強）
  const jsonLdPortfolio = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${gushikenUrl}#portfolio`,
    name: "GUSHIKEN DESIGN Portfolio",
    url: gushikenUrl,
    inLanguage: "ja-JP",
  };

  // ItemList（制作実績：この1本を明示）
  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "制作実績",
    itemListOrder: "http://schema.org/ItemListOrderAscending",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: siteUrl,
        name: "YORISOI Hair & Spa Webサイト",
      },
    ],
  };

  return (
    <footer
      className="
        relative w-full
        pt-[14vh] pb-[8vh] px-[6vw]
        overflow-hidden
        border-t border-[rgba(96,78,62,0.14)]
      "
    >
      {/* 背景 */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src={footerBg}
          alt=""
          className="w-full h-full object-cover opacity-[0.40] scale-[1.05]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(255,253,249,0.55),rgba(255,253,249,0.10)_70%)]" />
      </div>

      {/* ================= 上段 ================= */}
      <div className="max-w-[900px] mx-auto text-center mb-12">
        <img
          src={birdLogo}
          alt="YORISOI Bird Logo"
          className="w-[60px] h-[60px] mx-auto mb-5"
          loading="lazy"
          decoding="async"
        />

        <h3 className="text-[#5d4c3f] text-[20px] tracking-[0.12em] font-medium">
          ヨリソイ — Hair & Spa
        </h3>

        <p className="mt-4 text-[14.5px] text-[rgba(96,78,62,0.75)] leading-[1.8]">
          静けさの中で、あなたらしさに寄り添うサロン。<br />
          心地よい時間を、これからも。
        </p>
      </div>

      {/* ================= 店舗情報 ================= */}
      <div className="max-w-[680px] mx-auto text-center mb-10">
        <p className="text-[14px] text-[rgba(96,78,62,0.78)] leading-[1.85]">
          沖縄県浦添市内間2丁目20-3（駐車場2台＋バイク1台）<br />
          営業時間：7:00〜19:00（最終受付：カット18:00）<br />
          定休日：毎週月曜日
        </p>
      </div>

      {/* ================= 制作クレジット ================= */}
      <div className="max-w-[680px] mx-auto text-center mb-12">
        <div className="flex flex-wrap items-center justify-center gap-3 text-[13.5px]">
          {/* --- 制作（控えめに“気づかせる”） --- */}
          <a
            href={gushikenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-1.5
              px-3.5 py-1.5
              rounded-full
              border border-[rgba(96,78,62,0.18)]
              text-[rgba(96,78,62,0.85)]
              bg-[linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]
              hover:bg-[linear-gradient(90deg,rgba(96,78,62,0.08),rgba(96,78,62,0.03))]
              hover:border-[rgba(96,78,62,0.26)]
              transition-all duration-300
              shadow-[0_4px_14px_rgba(0,0,0,0.04)]
              hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]
            "
            aria-label="サイト制作：GUSHIKEN DESIGN（外部サイト）"
          >
            <DesignIcon />
            サイト制作 — GUSHIKEN DESIGN
          </a>

          {/* --- Instagram（同等の扱いで平等性） --- */}
          <a
            href={instaYorisoi}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-1.5
              px-3.5 py-1.5
              rounded-full
              border border-[rgba(96,78,62,0.18)]
              text-[rgba(96,78,62,0.85)]
              bg-[linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]
              hover:bg-[linear-gradient(90deg,rgba(96,78,62,0.08),rgba(96,78,62,0.03))]
              hover:border-[rgba(96,78,62,0.26)]
              transition-all duration-300
              shadow-[0_4px_14px_rgba(0,0,0,0.04)]
              hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]
            "
            aria-label="ヨリソイ Instagram（外部サイト）"
          >
            <InstaIcon />
            YORISOI — Instagram
          </a>
        </div>
      </div>

      {/* ================= コピーライト ================= */}
      <div className="text-center">
        <p className="text-[12px] tracking-wide text-[rgba(96,78,62,0.55)]">
          © ヨリソイ Hair &amp; Spa
        </p>
      </div>

      {/* ================= SEO（JSON-LD） ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSalon) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGushiken) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPortfolio) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWorkProof) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />
    </footer>
  );
}
