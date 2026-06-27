// src/components/Seo.jsx
import { Helmet } from "react-helmet-async";

const SITE_NAME = "ヨリソイ Hair＆Spa";
const SITE_URL = "https://yorisoi-nine.vercel.app";
const DEFAULT_IMAGE = `${SITE_URL}/yorisoi/ogp.png`;

const DEFAULT_TITLE =
  "浦添・内間のメンズ専門理容室｜朝7時からメンズカット・パーマ・フェード｜ヨリソイ Hair＆Spa 公式";

const DEFAULT_DESCRIPTION =
  "浦添市内間のメンズ専門理容室「ヨリソイ Hair＆Spa」公式サイト。朝7時から営業。メンズカット、フェード、メンズパーマ、眉シェービング、顔剃り、ヘッドスパ、白髪ぼかしに対応。那覇・宜野湾からも通いやすい、マンツーマン×半個室の理容室です。";

const DEFAULT_IMAGE_ALT =
  "ヨリソイ Hair＆Spa（浦添・内間のメンズ専門理容室）";

const ensureLeadingSlash = (path = "/") =>
  String(path).startsWith("/") ? String(path) : `/${path}`;

const normalizePath = (path = "/") => {
  const withSlash = ensureLeadingSlash(path);

  if (withSlash === "/") return "/";

  return withSlash.endsWith("/") ? withSlash.slice(0, -1) : withSlash;
};

const absoluteUrl = (path = "/") => {
  const value = String(path || "/");

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  const normalizedPath = normalizePath(value);
  return `${SITE_URL}${normalizedPath}`;
};

const safeJson = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

export function makeBreadcrumbJsonLd(items = []) {
  const itemListElement = items
    .filter((item) => item?.name)
    .map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path || item.url || "/"),
    }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

export function makeNewsArticleJsonLd({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  datePublished,
  dateModified,
}) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description,
    image: imageUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: "ja-JP",
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/yorisoi/bird-logo.png`,
      },
    },
  };
}

export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  imageAlt = DEFAULT_IMAGE_ALT,
  noindex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  breadcrumbs = [],
  jsonLd = [],
  appendSiteName = true,
}) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  const pageTitle = title
    ? appendSiteName
      ? `${title}｜${SITE_NAME}`
      : title
    : DEFAULT_TITLE;

  const pageDescription = description || DEFAULT_DESCRIPTION;

  const robotsContent = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

  const jsonLdList = [
    ...(breadcrumbs.length ? [makeBreadcrumbJsonLd(breadcrumbs)] : []),
    ...jsonLdArray.filter(Boolean),
  ];

  return (
    <Helmet htmlAttributes={{ lang: "ja" }}>
      <title>{pageTitle}</title>

      <meta name="description" content={pageDescription} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />

      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {type === "article" && publishedTime ? (
        <meta property="article:published_time" content={publishedTime} />
      ) : null}

      {type === "article" && modifiedTime ? (
        <meta property="article:modified_time" content={modifiedTime} />
      ) : null}

      {jsonLdList.map((data, index) => (
        <script type="application/ld+json" key={`jsonld-${index}`}>
          {safeJson(data)}
        </script>
      ))}
    </Helmet>
  );
}