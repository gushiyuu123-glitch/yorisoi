// src/sections_sp/ConceptSP.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ConceptSP() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(
      el.querySelectorAll(".cpSP"),
      { opacity: 0, y: 26, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.16,
        scrollTrigger: { trigger: el, start: "top 82%" }
      }
    );
  }, []);

  return (
    <section
      id="concept"
      ref={sectionRef}
      className="
        relative
        w-full
        pt-[12vh] pb-[18vh] px-[6vw]
        bg-[#f7f4ef]
        overflow-hidden
      "
    >
      {/* 背景（鳥 × 柔光） */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/yorisoi/bird.png"
          alt=""
          className="
            w-full h-full object-cover
            opacity-[0.38]
            scale-[1.14]
          "
        />

        {/* 光膜 */}
        <div
          className="
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(
              circle_at_32%_24%,
              rgba(255,253,249,0.55),
              rgba(255,253,249,0.12) 60%
            )]
          "
        />
      </div>

      {/* 見出し */}
      <div className="cpSP mx-auto max-w-[480px] text-center mb-10">
        <p className="text-[11px] tracking-[0.28em] text-[rgba(96,78,62,0.55)] mb-5">
          ヨリソイ / SALON PHILOSOPHY
        </p>

        <h2
          className="
            text-[clamp(22px,6vw,28px)]
            leading-[1.45]
            text-[#5d4c3f]
            font-medium
          "
        >
          ヨリソイが大切にしていること
        </h2>
      </div>

      {/* コンテンツ（縦並び） */}
      <div className="mx-auto max-w-[520px] space-y-8">

        {/* ---- 01 ---- */}
        <div
          className="
            cpSP
            bg-white/65 backdrop-blur-[1px]
            rounded-[10px] p-7
            shadow-[0_6px_18px_rgba(0,0,0,0.06)]
          "
        >
          <svg
            className="w-[32px] h-[32px] mb-4 text-[rgba(96,78,62,0.75)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v12" />
            <path d="M16 7v8" />
            <path d="M8 5v10" />
            <path d="M4 15c0 4 4 6 8 6s8-2 8-6" />
          </svg>

          <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-2.5">
            過ごしやすさを大切にした、やわらかな接客
          </h3>

          <p className="text-[14.5px] leading-[1.9] text-[rgba(96,78,62,0.78)]">
            お客様のペースに寄り添い、無理のない “ちょうどよい距離感の接客” を大切にしています。
          </p>
        </div>

        {/* ---- 02 ---- */}
        <div
          className="
            cpSP
            bg-white/65 backdrop-blur-[1px]
            rounded-[10px] p-7
            shadow-[0_6px_18px_rgba(0,0,0,0.06)]
          "
        >
          <svg
            className="w-[32px] h-[32px] mb-4 text-[rgba(96,78,62,0.75)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M9 6l13 8M9 18l13-8" />
          </svg>

          <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-2.5">
            自然に馴染む“扱いやすい髪”
          </h3>

          <p className="text-[14.5px] leading-[1.9] text-[rgba(96,78,62,0.78)]">
            乾かすだけで形が整う、頑張らなくても自然にまとまる髪をつくります。
          </p>
        </div>

        {/* ---- 03 ---- */}
        <div
          className="
            cpSP
            bg-white/65 backdrop-blur-[1px]
            rounded-[10px] p-7
            shadow-[0_6px_18px_rgba(0,0,0,0.06)]
          "
        >
          <svg
            className="w-[32px] h-[32px] mb-4 text-[rgba(96,78,62,0.75)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M9 3h6l1 3H8l1-3z" />
            <path d="M4 8h16v10H4z" />
            <path d="M10 12h4" />
          </svg>

          <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-2.5">
            光・香り・空気の “心地よさ”
          </h3>

          <p className="text-[14.5px] leading-[1.9] text-[rgba(96,78,62,0.78)]">
            自然光・香り・音のバランスを整え、五感がやすらぐ空間づくりを大切にしています。
          </p>
        </div>

      </div>
    </section>
  );
}
