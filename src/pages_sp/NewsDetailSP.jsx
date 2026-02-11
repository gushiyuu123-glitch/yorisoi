// src/pages_sp/NewsDetailSP.jsx
import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewsDetailSP() {
  const { id } = useParams();
  const sectionRef = useRef(null);
  const [item, setItem] = useState(null);

  /* =============================
      microCMS 1件取得
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
      { opacity: 0, y: 26, filter: "blur(0.3px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0,
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
        pt-[16vh] pb-[12vh]
        px-[6vw]
      "
    >
      <div className="mx-auto max-w-[520px]">

        {/* 戻る */}
        <Link
          to="/news"
          className="
            nw-detail inline-block mb-6
            text-[13px]
            text-[rgba(96,78,62,0.6)]
            underline underline-offset-4
          "
        >
           一覧へ戻る
        </Link>

        {/* 日付 */}
        <p className="nw-detail text-[12px] text-[rgba(96,78,62,0.65)] mb-1">
          {formatDate(item.date)}
        </p>

        {/* タイトル */}
        <h1
          className="
            nw-detail text-[20px]
            font-medium
            leading-[1.55]
            text-[#5d4c3f]
            mb-4
          "
        >
          {item.title}
        </h1>

        {/* 本文 */}
        <p
          className="
            nw-detail text-[15px]
            leading-[1.9]
            text-[rgba(96,78,62,0.8)]
            whitespace-pre-line
            mb-6
          "
        >
          {item.body}
        </p>

        {/* 画像（オプション） */}
        {item.image?.url && (
          <div className="nw-detail w-full flex justify-center mt-4">
            <img
              src={item.image.url}
              alt={item.title}
              className="
                max-w-[360px] w-full
                rounded-[12px]
                shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                object-cover
              "
            />
          </div>
        )}

      </div>
    </section>
  );
}
