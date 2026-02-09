// src/sections_sp/FinalCTA_SP.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA_SP() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".fc-sp"),
      { opacity: 0, y: 26, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.16,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        w-full bg-[#f7f4ef]
        pt-[14vh] pb-[16vh] px-[6vw]
        border-t border-[rgba(96,78,62,0.12)]
      "
    >
      {/* ===============================
          背景：柔らかい木漏れ日の“白膜”
      =============================== */}
      <div
        aria-hidden
        className="
          absolute inset-0 pointer-events-none
          opacity-[0.32]
          [background:radial-gradient(
            680px_420px_at_50%_28%,
            rgba(230,215,200,0.10),
            transparent 70%
          )]
        "
      />

      {/* ===============================
          見出し
      =============================== */}
      <div className="fc-sp relative mx-auto max-w-[480px] text-center mb-10">
        <p className="text-[11px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-4">
          RESERVE
        </p>

        <h2
          className="
            text-[clamp(22px,6vw,26px)]
            text-[#5d4c3f]
            leading-[1.55]
            font-medium
          "
        >
          ゆったり過ごせる空間で、  
          <br />
          ご来店をお待ちしております。
        </h2>
      </div>

      {/* ===============================
          CTA CARD（SP最適版）
      =============================== */}
      <div
        className="
          fc-sp relative mx-auto max-w-[480px]
          bg-white/65 backdrop-blur-[2px]
          rounded-[12px]
          shadow-[0_6px_20px_rgba(0,0,0,0.10)]
          border border-[rgba(96,78,62,0.10)]
          px-6 py-8 text-center
        "
      >
        <p
          className="
            text-[14.5px]
            leading-[1.85]
            text-[rgba(96,78,62,0.75)]
            mb-6
          "
        >
          予約は HotPepper Beauty にて承っております。
          <br />
          メニュー・空き状況をご確認いただけます。
        </p>

        {/* ===============================
            ボタン（光膜 × 高級感 × ふわ浮き）
        =============================== */}
        <a
          href="#"
          className="
            inline-block
            w-full
            py-3.5
            text-white text-[14.5px]
            rounded-[6px]
            bg-[#7d6655]
            tracking-[0.05em]
            shadow-[0_5px_14px_rgba(0,0,0,0.16)]
            hover:shadow-[0_8px_20px_rgba(0,0,0,0.22)]
            hover:-translate-y-[2px]
            transition-all relative overflow-hidden
          "
        >
          {/* 光膜 */}
          <span
            className="
              absolute inset-0 pointer-events-none
              opacity-[0.22]
              [background:linear-gradient(
                135deg,
                rgba(255,255,255,0.28),
                rgba(255,255,255,0)
              )]
              mix-blend-screen
            "
          />
          HotPepperで予約する
        </a>
      </div>
    </section>
  );
}
