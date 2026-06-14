// src/sections_sp/FooterSP.jsx
import React from "react";

/* ===============================
   Icons
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

const MapIcon = () => (
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
    <circle cx="12" cy="10" r="3" />
    <path d="M12 2C7.5 2 4 5.6 4 10c0 6.5 8 12 8 12s8-5.5 8-12c0-4.4-3.5-8-8-8z" />
  </svg>
);

const CalendarIcon = () => (
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
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
    <path d="M4 10h16" />
  </svg>
);

const FooterAction = ({ href, label, children, rel = "noopener noreferrer" }) => (
  <a
    href={href}
    target="_blank"
    rel={rel}
    aria-label={label}
    className="
      group
      w-full
      inline-flex items-center justify-center gap-2
      px-4 py-[10px]
      rounded-[12px]

      text-[13px]
      tracking-[0.055em]
      text-ink/78

      bg-[linear-gradient(135deg,rgba(255,255,255,0.30),rgba(255,255,255,0.07))]
      border border-white/45
      shadow-[0_1px_0_rgba(255,255,255,0.46)_inset,0_8px_22px_rgba(62,47,35,0.055)]

      backdrop-blur-[7px]
      backdrop-saturate-[1.06]

      active:scale-[0.985]
      transition-[opacity,transform,background-color]
      duration-200
    "
  >
    {children}
    <span
      aria-hidden="true"
      className="text-ink/42 transition-transform group-active:translate-x-[1px]"
    >
      ↗
    </span>
  </a>
);

export default function FooterSP({ withJsonLd = false }) {
  const siteUrl = "https://yorisoi-nine.vercel.app/";

  const hotpepperUrl = "https://beauty.hotpepper.jp/slnH000706136/";
  const hotpepperReserveUrl =
    "https://beauty.hotpepper.jp/CSP/bt/reserve/?storeId=H000706136";
  const hotpepperMapUrl = "https://beauty.hotpepper.jp/slnH000706136/map/";
  const instaYorisoi = "https://www.instagram.com/yorisoihair/";

  const gushikenUrl = "https://gushikendesign.com/";
  const gushikenInsta = "https://www.instagram.com/gushiken_design/";

  const TEL_DISPLAY = "090-7357-0926";
  const TEL_HREF = "tel:09073570926";
  const TEL_SCHEMA = "+81-90-7357-0926";

  const ogImage = `${siteUrl}yorisoi/ogp1.png`;
  const footerBg = "/yorisoi/footer.png";
  const birdLogo = "/yorisoi/bird-logo.png";

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: "ヨリソイ Hair & Spa",
        url: siteUrl,
        inLanguage: "ja-JP",
        publisher: {
          "@id": `${siteUrl}#salon`,
        },
      },
      {
        "@type": "BarberShop",
        "@id": `${siteUrl}#salon`,
        name: "ヨリソイ Hair & Spa",
        url: siteUrl,
        image: [ogImage],
        description:
          "沖縄県浦添市内間のメンズ専門理容室。朝7時から営業。半個室の2席で、最初から最後まで丁寧に担当します。",
        telephone: TEL_SCHEMA,
        priceRange: "¥¥",
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
        hasMap:
          "https://www.google.com/maps/search/?api=1&query=" +
          encodeURIComponent("沖縄県浦添市内間2丁目20-3 ヨリソイ Hair＆Spa"),
        sameAs: [hotpepperUrl, hotpepperMapUrl, instaYorisoi],
        potentialAction: {
          "@type": "ReserveAction",
          target: hotpepperReserveUrl,
          name: "HotPepperで予約する",
        },
      },
      {
        "@type": "CreativeWork",
        "@id": `${siteUrl}#website-design`,
        name: "ヨリソイ Hair & Spa Webサイト制作",
        url: siteUrl,
        about: {
          "@id": `${siteUrl}#salon`,
        },
        creator: {
          "@type": "Organization",
          name: "GUSHIKEN DESIGN",
          url: gushikenUrl,
          sameAs: [gushikenInsta],
        },
        publisher: {
          "@id": `${siteUrl}#salon`,
        },
        creditText: "Web Design by GUSHIKEN DESIGN",
      },
    ],
  };

  return (
    <footer
      className="
        relative w-full overflow-hidden
        bg-base
        pt-[8vh]
        pb-[calc(11vh+env(safe-area-inset-bottom))]
        px-[6vw]
        border-t border-ink/12
      "
      aria-label="フッター"
    >
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={footerBg}
          alt=""
          className="
            w-full h-full object-cover
            opacity-[0.74]
            scale-[1.06]
            [filter:brightness(0.88)_contrast(1.02)_saturate(0.98)]
          "
          loading="lazy"
          decoding="async"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(247,244,239,0.08),rgba(247,244,239,0.26)_52%,rgba(247,244,239,0.48))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_12%,rgba(255,253,249,0.08),rgba(255,253,249,0.00)_64%)]" />

        <div
          className="
            absolute left-1/2 top-[7vh]
            -translate-x-1/2
            text-[18vw]
            leading-none
            tracking-[-0.10em]
            text-ink/[0.075]
            font-serif
            whitespace-nowrap
          "
        >
          YORISOI
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[520px]">
        <div className="text-center">
          <img
            src={birdLogo}
            alt="YORISOI Bird Logo"
            className="
              block
              w-[58px] h-[58px]
              mx-auto
              mt-[55px]
              mb-4
              opacity-[0.98]
              drop-shadow-[0_4px_14px_rgba(46,42,39,0.12)]
            "
            loading="lazy"
            decoding="async"
          />

          <p
            className="
              mb-3
              inline-block
              text-[10.5px]
              tracking-[0.36em]
              font-normal
              text-ink/54
              italic
              -skew-x-[6deg]
              origin-left
              [font-family:'Cormorant_Garamond',serif]
            "
          >
            Thank you for visiting
          </p>

          <h3 className="text-ink/90 text-[18px] tracking-[0.12em] font-medium">
           Hair &amp; Spa
          </h3>

          <p className="mt-4 text-[14px] text-ink/76 leading-[1.9]">
            朝7時から。半個室の2席で、
            <br />
            最初から最後まで担当します。
            <br />
            <br />
            伸びてきても崩れにくい形を基準に、
            <br />
            家で扱いやすい仕上がりへ。
          </p>
        </div>

        <div
          className="
            mt-9
            rounded-[18px]
            px-5 py-6
            bg-[linear-gradient(135deg,rgba(255,255,255,0.30),rgba(255,255,255,0.07))]
            border border-white/42
            shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_12px_30px_rgba(62,47,35,0.055)]
            backdrop-blur-[7px]
            backdrop-saturate-[1.06]
          "
        >
          <p className="text-center text-[13.5px] text-ink/74 leading-[1.9]">
            沖縄県浦添市内間2丁目20-3
            <br />
            駐車場2台＋バイク1台
            <br />
            <br />
            営業時間：7:00〜19:00
            <br />
            最終受付：カット18:00
            <br />
            定休日：毎週月曜日
          </p>

          <p className="mt-4 text-center text-[13px] leading-[1.75] text-ink/70">
            <a
              href={TEL_HREF}
              className="
                underline underline-offset-[4px]
                decoration-ink/25
                active:opacity-80
              "
              aria-label={`電話番号 ${TEL_DISPLAY}`}
            >
              TEL {TEL_DISPLAY}
            </a>
          </p>

          <p className="mt-4 text-center text-[11.5px] leading-[1.75] text-ink/48">
            ※ 最新の営業時間・メニューはHotPepperをご確認ください。
          </p>
        </div>

        <div className="mt-7 grid gap-3">
          <FooterAction href={hotpepperReserveUrl} label="HotPepperで予約する">
            <CalendarIcon />
            HotPepperで予約する
          </FooterAction>

          <FooterAction href={hotpepperMapUrl} label="地図・アクセスを見る">
            <MapIcon />
            地図・アクセスを見る
          </FooterAction>

          <FooterAction href={instaYorisoi} label="ヨリソイ Instagramを見る">
            <InstaIcon />
            Instagram — YORISOI
          </FooterAction>
        </div>

        <div className="mt-10 text-center">
          <a
            href={gushikenUrl}
            target="_blank"
            rel="author noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              px-4 py-2
              rounded-full

              text-[12.5px]
              tracking-[0.055em]
              text-ink/62

              bg-[rgba(255,255,255,0.18)]
              border border-white/34
              shadow-[0_1px_0_rgba(255,255,255,0.36)_inset,0_6px_18px_rgba(62,47,35,0.04)]

              backdrop-blur-[6px]
              active:opacity-80
              transition
            "
            aria-label="サイト制作：GUSHIKEN DESIGN"
          >
            <DesignIcon />
            Web Design by GUSHIKEN DESIGN
            <span aria-hidden="true" className="text-ink/34">
              ↗
            </span>
          </a>
        </div>

        <div className="mt-9 text-center">
          <p className="text-[12px] tracking-wide text-ink/50">
            © ヨリソイ Hair &amp; Spa
          </p>
        </div>
      </div>

      {withJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      )}
    </footer>
  );
}