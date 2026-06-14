// src/sections/Footer.jsx
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
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1" />
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
    className="w-[15px] h-[15px]"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <line x1="8" y1="20" x2="16" y2="20" />
    <line x1="12" y1="16" x2="12" y2="20" />
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
      inline-flex items-center justify-between gap-4
      px-4 py-[10px]
      rounded-full

      text-[13.5px]
      tracking-[0.045em]
      text-ink/74

      bg-[linear-gradient(90deg,rgba(255,255,255,0.30),rgba(255,255,255,0.06))]
      border border-white/44
      shadow-[0_1px_0_rgba(255,255,255,0.44)_inset,0_8px_22px_rgba(62,47,35,0.045)]

      backdrop-blur-[7px]
      backdrop-saturate-[1.06]

      hover:text-ink/90
      hover:-translate-y-[1px]
      hover:bg-[linear-gradient(90deg,rgba(255,255,255,0.40),rgba(255,255,255,0.10))]
      transition-[color,background,transform,box-shadow]
      duration-300
      ease-out
    "
  >
    <span className="inline-flex items-center gap-2">{children}</span>

    <span
      aria-hidden="true"
      className="
        text-ink/38
        transition-transform duration-300
        group-hover:translate-x-[2px]
      "
    >
      ↗
    </span>
  </a>
);

export default function Footer({ withJsonLd = true }) {
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
        pt-[14vh]
        pb-[9vh]
        px-[6vw]
        border-t border-[rgba(96,78,62,0.12)]
      "
      aria-label="フッター"
    >
      <style>
        {`
          @keyframes yorisoiFooterImageBreath {
            0%, 100% {
              transform: scale(1.055) translate3d(0, 0, 0);
              filter: brightness(0.88) contrast(1.03) saturate(0.98);
            }
            50% {
              transform: scale(1.075) translate3d(-0.35%, -0.25%, 0);
              filter: brightness(0.91) contrast(1.04) saturate(1.01);
            }
          }

          @keyframes yorisoiFooterWordBreath {
            0%, 100% {
              opacity: 0.065;
              transform: translateX(-50%) translateY(0) skewX(-1deg);
              letter-spacing: -0.10em;
            }
            50% {
              opacity: 0.092;
              transform: translateX(-50%) translateY(-4px) skewX(-2deg);
              letter-spacing: -0.085em;
            }
          }

          @keyframes yorisoiFooterLogoBreath {
            0%, 100% {
              transform: translateY(0) scale(1);
              opacity: 0.94;
            }
            50% {
              transform: translateY(-3px) scale(1.025);
              opacity: 0.99;
            }
          }

          .yorisoi-footer-bg {
            transform: scale(1.055);
            animation: yorisoiFooterImageBreath 18s ease-in-out infinite;
            transform-origin: center;
            will-change: transform, filter;
          }

          .yorisoi-footer-word {
            animation: yorisoiFooterWordBreath 14s ease-in-out infinite;
            transform-origin: center;
            will-change: transform, opacity, letter-spacing;
          }

          .yorisoi-footer-logo {
            animation: yorisoiFooterLogoBreath 9s ease-in-out infinite;
            transform-origin: center;
            will-change: transform, opacity;
          }

          @media (prefers-reduced-motion: reduce) {
            .yorisoi-footer-bg,
            .yorisoi-footer-word,
            .yorisoi-footer-logo {
              animation: none !important;
            }
          }
        `}
      </style>

      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={footerBg}
          alt=""
          loading="lazy"
          decoding="async"
          className="
            yorisoi-footer-bg
            w-full h-full object-cover
            opacity-[0.74]
          "
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(247,244,239,0.06),rgba(247,244,239,0.21)_48%,rgba(247,244,239,0.42))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_18%,rgba(255,253,249,0.08),rgba(255,253,249,0.00)_66%)]" />

        <div
          className="
            yorisoi-footer-word
            absolute left-1/2 top-[5vh]
            text-[11.4vw]
            leading-none
            text-ink
            font-serif
            whitespace-nowrap
          "
        >
          YORISOI
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[980px]">
        <div className="text-center">
          <img
            src={birdLogo}
            alt="YORISOI Bird Logo"
            className="
              yorisoi-footer-logo
              w-[64px] h-[64px]
              mx-auto
              mb-5
              drop-shadow-[0_6px_18px_rgba(46,42,39,0.12)]
            "
            loading="lazy"
            decoding="async"
          />

          <div className="mt-[52px]">
            <p
              className="
                mb-3
                inline-block
                text-[11px]
                tracking-[0.38em]
                font-normal
                text-ink/52
                italic
                -skew-x-[6deg]
                origin-left
                [font-family:'Cormorant_Garamond',serif]
              "
            >
              Thank you for visiting
            </p>

            <h3 className="text-ink/92 text-[21px] tracking-[0.13em] font-medium">
              Hair &amp; Spa
            </h3>

            <p className="mt-4 text-[14.5px] text-ink/76 leading-[1.9]">
              朝7時から。半個室の2席で、最初から最後まで担当します。
              <br />
              伸びてきても崩れにくい形を基準に、家で扱いやすい仕上がりへ。
            </p>
          </div>
        </div>

        <div
          className="
            mt-12
            grid grid-cols-[1.08fr_0.92fr]
            gap-7
            items-stretch
          "
        >
          <section
            className="
              rounded-[22px]
              px-8 py-8
              bg-[linear-gradient(135deg,rgba(255,255,255,0.32),rgba(255,255,255,0.07))]
              border border-white/44
              shadow-[0_1px_0_rgba(255,255,255,0.46)_inset,0_14px_34px_rgba(62,47,35,0.06)]
              backdrop-blur-[7px]
              backdrop-saturate-[1.06]
            "
            aria-label="店舗情報"
          >
            <p className="text-[12px] tracking-[0.26em] text-ink/44 mb-5">
              SHOP INFORMATION
            </p>

            <p className="text-[14px] text-ink/76 leading-[1.95]">
              沖縄県浦添市内間2丁目20-3
              <br />
              駐車場2台＋バイク1台
              <br />
              <br />
              営業時間：7:00〜19:00（最終受付：カット18:00）
              <br />
              定休日：毎週月曜日
            </p>

            <p className="mt-5 text-[13px] leading-[1.75] text-ink/70">
              <a
                href={TEL_HREF}
                className="
                  underline underline-offset-[4px]
                  decoration-ink/25
                  hover:decoration-ink/45
                  transition
                "
                aria-label={`電話番号 ${TEL_DISPLAY}`}
              >
                TEL {TEL_DISPLAY}
              </a>
            </p>

            <p className="mt-5 text-[12px] leading-[1.75] text-ink/50">
              ※ 最新の営業時間・メニューはHotPepperをご確認ください。
            </p>
          </section>

          <section
            className="
              rounded-[22px]
              px-8 py-8
              bg-[linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0.06))]
              border border-white/40
              shadow-[0_1px_0_rgba(255,255,255,0.42)_inset,0_14px_34px_rgba(62,47,35,0.05)]
              backdrop-blur-[7px]
              backdrop-saturate-[1.06]
              flex flex-col justify-between gap-7
            "
            aria-label="外部リンク"
          >
            <div>
              <p className="text-[12px] tracking-[0.26em] text-ink/44 mb-5">
                LINKS
              </p>

              <div className="flex flex-col gap-3">
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
            </div>

            <div>
              <p className="mb-3 text-[11px] tracking-[0.22em] text-ink/34">
                SITE CREDIT
              </p>

             <a
  href={gushikenUrl}
  target="_blank"
  rel="author noopener noreferrer"
  className="
    inline-flex w-fit items-center justify-center gap-2
    px-4 py-2
    rounded-full

    text-[13px]
    tracking-[0.065em]
    font-medium
    text-ink/82

    bg-[rgba(255,255,255,0.28)]
    border border-white/44
    shadow-[0_1px_0_rgba(255,255,255,0.42)_inset,0_7px_20px_rgba(62,47,35,0.055)]

    backdrop-blur-[6px]
    hover:text-ink/96
    hover:bg-[rgba(255,255,255,0.36)]
    hover:-translate-y-[1px]
    transition-[color,background-color,transform]
    duration-300
  "
  aria-label="サイト制作：GUSHIKEN DESIGN"
>
  <DesignIcon />
  <span className="text-ink/72">Web Design by</span>
  <span className="font-semibold tracking-[0.075em] text-ink/92">
    GUSHIKEN DESIGN
  </span>
  <span aria-hidden="true" className="text-ink/54">
    ↗
  </span>
</a>
            </div>
          </section>
        </div>

        <div className="mt-11 text-center">
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