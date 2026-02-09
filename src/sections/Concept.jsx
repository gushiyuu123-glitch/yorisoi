// src/sections/Concept.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Concept() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".cp"),
      { opacity: 0, y: 26, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.16,
        scrollTrigger: { trigger: el, start: "top 75%" },
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
        pt-[18vh] pb-[18vh] px-[8vw]
        overflow-hidden
      "
    >

      {/* ===========================
          背景：小鳥 × 柔光にじませ
      =========================== */}
      <div
        aria-hidden
        className="
          absolute inset-0 -z-10 
        "
      >
        {/* 画像の柔光レイヤー */}
        <img
          src='/yorisoi/bird.png'
          alt=''
          className="
            w-full h-full object-cover
            opacity-[0.55]
            scale-[1.08]
          "
        />

        {/* 光膜（白膜 × ほんのり暖色） */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(
              circle_at_30%_30%,
              rgba(255,253,249,0.55),
              rgba(255,253,249,0.12) 60%
            )]
          "
        />
      </div>

      {/* ===========================
          見出し
      =========================== */}
      <div className="cp mx-auto max-w-[760px] mb-10 text-center">
        <p
          className="
            text-[13px]
            tracking-[0.32em]
            text-[rgba(96,78,62,0.55)]
            mb-8
          "
        >
          YORISOI / SALON PHILOSOPHY
        </p>

        <h2
          className="
            text-[clamp(26px,3vw,34px)]
            leading-[1.45]
            text-[#5d4c3f]
            font-medium
          "
        >
          YORISOI が大切にしていること
        </h2>
      </div>

      {/* ===========================
          3 ブロック
      =========================== */}
      <div
        className="
          mt-[10vh]
          grid grid-cols-3 gap-[3vw]
          max-w-[1080px] mx-auto
        "
      >

        {/* ---- 01：接客 ---- */}
        <div
          className="
            cp bg-white/65 backdrop-blur-[1px]
            rounded-[10px] p-10
            shadow-[0_6px_18px_rgba(0,0,0,0.06)]
          "
        >
          <svg
            className="w-[40px] h-[40px] mb-5 text-[rgba(96,78,62,0.75)]"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v12" />
            <path d="M16 7v8" />
            <path d="M8 5v10" />
            <path d="M4 15c0 4 4 6 8 6s8-2 8-6" />
          </svg>

          <h3 className="text-[18px] text-[#5d4c3f] font-medium mb-3">
            過ごしやすさを大切にした、やわらかな接客
          </h3>

          <p className="text-[14.5px] leading-[1.85] text-[rgba(96,78,62,0.78)]">
            お客様のペースに寄り添い、  
            無理のない “ちょうどよい距離感の接客” を大切にしています。
          </p>
        </div>

        {/* ---- 02：カット ---- */}
        <div
          className="
            cp bg-white/65 backdrop-blur-[1px]
            rounded-[10px] p-10
            shadow-[0_6px_18px_rgba(0,0,0,0.06)]
          "
        >
          <svg
            className="w-[40px] h-[40px] mb-5 text-[rgba(96,78,62,0.75)]"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M9 6l13 8M9 18l13-8" />
          </svg>

          <h3 className="text-[18px] text-[#5d4c3f] font-medium mb-3">
            自然に馴染む“扱いやすい髪”
          </h3>

          <p className="text-[14.5px] leading-[1.85] text-[rgba(96,78,62,0.78)]">
            乾かすだけで形が整う、  
            頑張らなくても自然にまとまる髪をつくります。
          </p>
        </div>

        {/* ---- 03：空間 ---- */}
        <div
          className="
            cp bg-white/65 backdrop-blur-[1px]
            rounded-[10px] p-10
            shadow-[0_6px_18px_rgba(0,0,0,0.06)]
          "
        >
          <svg
            className="w-[40px] h-[40px] mb-5 text-[rgba(96,78,62,0.75)]"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M9 3h6l1 3H8l1-3z" />
            <path d="M4 8h16v10H4z" />
            <path d="M10 12h4" />
          </svg>

          <h3 className="text-[18px] text-[#5d4c3f] font-medium mb-3">
            光・香り・空気の “心地よさ”
          </h3>

          <p className="text-[14.5px] leading-[1.85] text-[rgba(96,78,62,0.78)]">
            自然光・香り・音のバランスを整え、  
            五感がやすらぐ空間づくりを大切にしています。
          </p>
        </div>

      </div>
    </section>
  );
}
