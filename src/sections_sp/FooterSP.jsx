// src/sections_sp/FooterSP.jsx
import React from "react";

/* ===============================
   Icons（極細ライン統一）
=============================== */

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
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.9" />
  </svg>
);

const DesignIcon = () => (
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
    <path d="M4 17l6-6" />
    <path d="M7 20h10" />
    <path d="M14 4l6 6" />
    <path d="M9.5 6.5l8 8" />
  </svg>
);

const FooterLink = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="
      inline-flex items-center gap-2
      text-[13px]
      text-ink/78
      underline underline-offset-[5px]
      decoration-ink/20
      active:opacity-80
      transition
    "
  >
    {label}
    <span aria-hidden className="text-ink/50">
      ↗
    </span>
  </a>
);

export default function FooterSP({
  // ✅ PC/SPをCSSで同時に出し分けてるなら false のままが安全
  withJsonLd = false,
}) {
  // ✅ 本番ドメインになったらここだけ差し替え推奨
  const siteUrl = "https://yorisoi-nine.vercel.app/";

  const hotpepperUrl = "https://beauty.hotpepper.jp/slnH000706136/";
  const hotpepperMapUrl = "https://beauty.hotpepper.jp/slnH000706136/map/";
  const instaYorisoi = "https://www.instagram.com/yorisoihair/";
  const gushikenUrl = "https://gushikendesign.com/";
  const gushikenInsta = "https://www.instagram.com/gushiken_design/";

  // ✅ TEL（予約変更・キャンセル用）
  const TEL_DISPLAY = "090-7357-0926";
  const TEL_HREF = "tel:09073570926";

  const ogImage = `${siteUrl}yorisoi/ogp1.png`;
  const footerBg = "/yorisoi/footer.png";
  const birdLogo = "/yorisoi/bird-logo.png";

  const jsonLdSalon = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    "@id": `${siteUrl}#salon`,
    name: "ヨリソイ Hair & Spa",
    url: siteUrl,
    image: ogImage,
    description:
      "沖縄県浦添市のメンズ専門理容室。朝7時から営業。半個室の2席で、最初から最後まで丁寧に担当します。",
    telephone: TEL_DISPLAY,
    address: {
      "@type": "PostalAddress",
      streetAddress: "内間2丁目20-3",
      addressLocality: "浦添市",
      addressRegion: "沖縄県",
      postalCode: "901-2121",
      addressCountry: "JP",
    },
    openingHoursSpecification: [
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
    hasMap:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("沖縄県浦添市内間2丁目20-3 ヨリソイ Hair＆Spa"),
    sameAs: [hotpepperUrl, hotpepperMapUrl, instaYorisoi],
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name: "ヨリソイ Hair & Spa",
    url: siteUrl,
    inLanguage: "ja-JP",
    publisher: {
      "@type": "Organization",
      name: "ヨリソイ Hair & Spa",
      url: siteUrl,
    },
  };

  const jsonLdWorkProof = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${siteUrl}#work`,
    name: "ヨリソイ Hair & Spa Webサイト",
    url: siteUrl,
    about: { "@id": `${siteUrl}#salon` },
    creator: {
      "@type": "Organization",
      name: "GUSHIKEN DESIGN",
      url: gushikenUrl,
      sameAs: [gushikenInsta],
    },
    publisher: {
      "@type": "Organization",
      name: "ヨリソイ Hair & Spa",
      url: siteUrl,
    },
  };

  return (
    <footer
      className="
        relative w-full bg-base
        pt-[12vh] pb-[calc(10vh+env(safe-area-inset-bottom))] px-[6vw]
        overflow-hidden
        border-t border-ink/14
      "
      aria-label="フッター"
    >
      {/* 背景（z-0） */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={footerBg}
          alt=""
          className="
            w-full h-full object-cover
            opacity-[0.62] scale-[1.06]
            [filter:brightness(0.92)_contrast(0.96)]
          "
          loading="lazy"
          decoding="async"
        />
        {/* ✅ 白モヤを下げる */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_18%,rgba(255,253,249,0.12),rgba(255,253,249,0.00)_74%)]" />
      </div>

      {/* ✅ 中身を前面（z-10） */}
      <div className="relative z-10">
        {/* 上段 */}
        <div className="max-w-[520px] mx-auto text-center mb-10">
          <img
            src={birdLogo}
            alt="YORISOI Bird Logo"
            className="w-[54px] h-[54px] mx-auto mb-4 opacity-90"
            loading="lazy"
            decoding="async"
          />

          <h3 className="text-ink/90 text-[18px] tracking-[0.12em] font-medium">
            ヨリソイ — Hair &amp; Spa
          </h3>

          <p className="mt-3 text-[13.5px] text-ink/76 leading-[1.85]">
            朝7時から。半個室の2席で、<br />
            最初から最後まで担当します。<br />
            <br />
            伸びてきても崩れにくい形を基準に、仕上げます。
          </p>

          <p className="mt-5 text-[11px] leading-[1.75] text-ink/50">
            ※ 最新の営業時間・メニューはHotPepperをご確認ください。
          </p>
        </div>

        {/* 店舗情報 */}
        <div className="max-w-[520px] mx-auto text-center mb-10">
          <p className="text-[13.5px] text-ink/76 leading-[1.9]">
            沖縄県浦添市内間2丁目20-3
            <br />
            （駐車場2台＋バイク1台）
            <br />
            <br />
            営業時間：7:00〜19:00（最終受付：カット18:00）
            <br />
            定休日：毎週月曜日
          </p>

          {/* ✅ 追加：変更・キャンセルTEL */}
  <p className="mt-4 text-[13px] leading-[1.75] text-ink/70">
  <a
    href={TEL_HREF}
    className="underline underline-offset-2 decoration-ink/25 hover:decoration-ink/40"
    aria-label={`TEL番号 ${TEL_DISPLAY}`}
  >
    TEL {TEL_DISPLAY}
  </a>
</p>
        </div>

        {/* 制作クレジット */}
        <div className="max-w-[520px] mx-auto text-center mb-10">
          <div className="mx-auto max-w-[420px] flex flex-col gap-3 text-[13px]">
            <a
              href={gushikenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full inline-flex items-center justify-center gap-1.5
                px-4 py-2
                rounded-full
                border border-ink/14
                text-ink/82
                bg-[linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]
                active:opacity-90
                transition-all duration-300
                shadow-[0_4px_14px_rgba(0,0,0,0.04)]
              "
              aria-label="サイト制作：GUSHIKEN DESIGN（外部サイト）"
            >
              <DesignIcon />
              サイト制作 — GUSHIKEN DESIGN
            </a>

            <a
              href={instaYorisoi}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full inline-flex items-center justify-center gap-1.5
                px-4 py-2
                rounded-full
                border border-ink/14
                text-ink/82
                bg-[linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]
                active:opacity-90
                transition-all duration-300
                shadow-[0_4px_14px_rgba(0,0,0,0.04)]
              "
              aria-label="ヨリソイ Instagram（外部サイト）"
            >
              <InstaIcon />
              Instagram — YORISOI
            </a>
          </div>
        </div>

        {/* コピーライト */}
        <div className="text-center">
          <p className="text-[12px] tracking-wide text-ink/55">
            © ヨリソイ Hair &amp; Spa
          </p>
        </div>

        {/* SEO（JSON-LD） */}
        {withJsonLd && (
          <>
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
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWorkProof) }}
            />
          </>
        )}
      </div>
    </footer>
  );
}