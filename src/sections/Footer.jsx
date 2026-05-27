// src/sections/Footer.jsx

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
      hover:text-ink/92
      hover:decoration-ink/34
      transition-colors
    "
  >
    {label}
    <span aria-hidden className="text-ink/50">
      ↗
    </span>
  </a>
);

export default function Footer({
  // ✅ PC/SPを同時DOM表示する構成なら、片方だけ true にして重複JSON-LD回避
  withJsonLd = true,
}) {
  const siteUrl = "https://yorisoi-nine.vercel.app/";
  const hotpepperUrl = "https://beauty.hotpepper.jp/slnH000706136/";
  const hotpepperReviewUrl = "https://beauty.hotpepper.jp/slnH000706136/review/";
  const instaYorisoi = "https://www.instagram.com/yorisoihair/";
  const gushikenUrl = "https://gushikendesign.com/";
  const gushikenInsta = "https://www.instagram.com/gushiken_design/";

  // ✅ 表示と一致させて統一（必要なら全体で同じ数に揃える）
  const ratingValue = 5.0;
  const reviewCount = 63;

  // 画像
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
      "沖縄県浦添市のメンズ専門理容室。朝7時から営業。半個室の2席で、最初から最後まで丁寧に担当します。",
    telephone: "090-7357-0926",
    address: {
      "@type": "PostalAddress",
      streetAddress: "内間2丁目20-3",
      addressLocality: "浦添市",
      addressRegion: "沖縄県",
      postalCode: "901-2121",
      addressCountry: "JP",
    },
    openingHours: ["Tu-Su 07:00-19:00"],
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
    paymentAccepted:
      "Cash, Visa, Mastercard, JCB, PayPay, QUICPay, iD, Suica, PASMO, Apple Pay",
    priceRange: "¥¥",
    sameAs: [hotpepperUrl, hotpepperReviewUrl, instaYorisoi],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      bestRating: 5,
      worstRating: 1,
      reviewCount,
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

  // GUSHIKEN DESIGN（制作主体）
  const jsonLdGushiken = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${gushikenUrl}#org`,
    name: "GUSHIKEN DESIGN",
    url: gushikenUrl,
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

  // CreativeWork（制作実績の証明）
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

  // Portfolio
  const jsonLdPortfolio = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${gushikenUrl}#portfolio`,
    name: "GUSHIKEN DESIGN Portfolio",
    url: gushikenUrl,
    inLanguage: "ja-JP",
  };

  // ItemList
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
        w-full bg-base
        pt-[14vh] pb-[8vh] px-[6vw]
        relative overflow-hidden
        border-t border-[rgba(96,78,62,0.14)]
      "
      aria-label="フッター"
    >
      {/* 背景（z-0） */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={footerBg}
          alt=""
          loading="lazy"
          decoding="async"
          className="
            w-full h-full object-cover
            opacity-[0.62] scale-[1.05]
            [filter:brightness(0.92)_contrast(0.96)]
          "
        />
        {/* ✅ 白モヤを“強制弱体化” */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(255,253,249,0.12),rgba(255,253,249,0.00)_74%)]" />
      </div>

      {/* ✅ 中身を必ず前面（z-10）へ */}
      <div className="relative z-10">
        {/* ================= 上段 ================= */}
        <div className="max-w-[900px] mx-auto text-center mb-12">
          <img
            src={birdLogo}
            alt="YORISOI Bird Logo"
            className="w-[60px] h-[60px] mx-auto mb-5 opacity-90"
            loading="lazy"
            decoding="async"
          />

          <h3 className="text-ink/90 text-[20px] tracking-[0.12em] font-medium">
            ヨリソイ — Hair &amp; Spa
          </h3>

          {/* ✅ 文字が沈まない濃度（ink基準） */}
          <p className="mt-4 text-[14.5px] text-ink/76 leading-[1.85]">
            朝7時から。半個室の2席で、最初から最後まで担当します。
            <br />
            伸びてきても崩れにくい形を基準に、仕上げます。
          </p>


        </div>

        {/* ================= 店舗情報 ================= */}
        <div className="max-w-[680px] mx-auto text-center mb-10">
          <p className="text-[14px] text-ink/76 leading-[1.85]">
            沖縄県浦添市内間2丁目20-3（駐車場2台＋バイク1台）
            <br /> <br />
            営業時間：7:00〜19:00（最終受付：カット18:00）
            <br />
            定休日：毎週月曜日
          </p>
          <p className="mt-4 text-[12px] leading-[1.75] text-ink/55">
            ※ 最新の営業時間・メニューはHotPepperをご確認ください。
          </p>
        </div>

        {/* ================= 制作クレジット ================= */}
        <div className="max-w-[680px] mx-auto text-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-3 text-[13.5px]">
            <a
              href={gushikenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-1.5
                px-3.5 py-1.5
                rounded-full
                border border-ink/14
                text-ink/80
                bg-[linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]
                hover:bg-[linear-gradient(90deg,rgba(46,42,39,0.06),rgba(46,42,39,0.02))]
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
                inline-flex items-center gap-1.5
                px-3.5 py-1.5
                rounded-full
                border border-ink/14
                text-ink/80
                bg-[linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]
                hover:bg-[linear-gradient(90deg,rgba(46,42,39,0.06),rgba(46,42,39,0.02))]
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

        {/* ================= コピーライト ================= */}
        <div className="text-center">
          <p className="text-[12px] tracking-wide text-ink/55">
            © ヨリソイ Hair &amp; Spa
          </p>
        </div>

        {/* ================= SEO（JSON-LD） ================= */}
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
          </>
        )}
      </div>
    </footer>
  );
}