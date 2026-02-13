// src/pages_sp/NewsDetailSP.jsx
import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";

export default function NewsDetailSP() {
  const { id } = useParams();
  const sectionRef = useRef(null);
  const [item, setItem] = useState(null);

  /* =============================
      microCMS 取得
  ============================= */
  useEffect(() => {
    async function getDetail() {
      try {
        const res = await fetch(
          `https://pqhxs89idk.microcms.io/api/v1/news/${id}`,
          {
            headers: {
              "X-MICROCMS-API-KEY": import.meta.env.VITE_MICROCMS_API_KEY,
            },
          }
        );
        const data = await res.json();
        setItem(data);

        /* =============================
            🧠 SEO 動的設定
        ============================= */

        document.title = `${data.title}｜ヨリソイ｜沖縄の美容室`;

        const description = `沖縄の美容室ヨリソイより「${data.title}」のお知らせです。ご来店前にご確認ください。`;

        const setMeta = (name, content, property = false) => {
          let tag = property
            ? document.querySelector(`meta[property="${name}"]`)
            : document.querySelector(`meta[name="${name}"]`);

          if (!tag) {
            tag = document.createElement("meta");
            property
              ? tag.setAttribute("property", name)
              : tag.setAttribute("name", name);
            document.head.appendChild(tag);
          }
          tag.setAttribute("content", content);
        };

        setMeta("description", description);
        setMeta("og:title", data.title, true);
        setMeta("og:description", description, true);
        setMeta("og:type", "article", true);
        setMeta("og:url", window.location.href, true);

        if (data.image?.url) {
          setMeta("og:image", data.image.url, true);
        }

      } catch (err) {
        console.error("NEWS DETAIL fetch error:", err);
      }
    }

    getDetail();
  }, [id]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("ja-JP").replace(/\//g, ".");

  /* =============================
      GSAP（静かなフェード）
  ============================= */
  useEffect(() => {
    if (!item || !sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".nw-detail"),
      { opacity: 0, y: 20, filter: "blur(0.2px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      }
    );
  }, [item]);

  if (!item) {
    return (
      <p className="w-full text-center mt-[20vh] text-[14px] text-[#6a5a4d]">
        読み込み中…
      </p>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="
        w-full bg-[#f7f4ef]
        min-h-screen
        pt-[16vh] pb-[14vh]
        px-[6vw]
      "
    >
      <div className="mx-auto max-w-[520px] space-y-6">

        {/* 戻る */}
        <Link
          to="/news"
          className="
            nw-detail inline-block
            text-[12px]
            text-[rgba(96,78,62,0.6)]
            underline underline-offset-4
          "
        >
          一覧へ戻る
        </Link>

        {/* 日付 */}
        <p className="nw-detail text-[12px] text-[rgba(96,78,62,0.6)]">
          {formatDate(item.date)}
        </p>

        {/* タイトル */}
        <h1
          className="
            nw-detail
            text-[21px]
            font-medium
            leading-[1.55]
            text-[#5d4c3f]
          "
        >
          {item.title}
        </h1>

        {/* 画像（SPはタイトル直下が自然） */}
        {item.image?.url && (
          <div className="nw-detail w-full">
            <img
              src={item.image.url}
              alt={`${item.title}｜ヨリソイ美容室`}
              className="
                w-full
                rounded-[12px]
                shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                object-cover
              "
            />
          </div>
        )}

        {/* 本文 */}
        <p
          className="
            nw-detail
            text-[15px]
            leading-[1.9]
            text-[rgba(96,78,62,0.8)]
            whitespace-pre-line
          "
        >
          {item.body}
        </p>

        {/* 導線（信頼積み × CV） */}
        <div className="nw-detail pt-8 border-t border-[rgba(96,78,62,0.1)] text-center">
          <p className="text-[13px] text-[rgba(96,78,62,0.7)] mb-3">
            ご予約・メニューの詳細は下記よりご確認ください。
          </p>

          <a
            href="https://beauty.hotpepper.jp/slnH000706136/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              text-[13px]
              tracking-[0.22em]
              text-[#5d4c3f]
              border-b border-[#5d4c3f]/40
              pb-[4px]
              hover:opacity-60
              transition
            "
          >
            HOT PEPPER で予約する
          </a>
        </div>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: item.title,
              datePublished: item.date,
              dateModified: item.date,
              author: {
                "@type": "Organization",
                name: "ヨリソイ",
              },
              publisher: {
                "@type": "Organization",
                name: "ヨリソイ",
              },
            }),
          }}
        />

      </div>
    </section>
  );
}
