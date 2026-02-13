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
      { opacity: 0, y: 22, filter: "blur(0.2px)" }, // ← 修正
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
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
        pt-[16vh] pb-[18vh] px-[6vw]
        border-t border-[rgba(96,78,62,0.10)]
      "
    >
      {/* 柔光（弱め） */}
      <div
        aria-hidden
        className="
          absolute inset-0 pointer-events-none
          opacity-[0.26]
          [background:radial-gradient(
            720px_420px_at_50%_28%,
            rgba(200,175,150,0.08),
            transparent 72%
          )]
        "
      />

      {/* TITLE */}
      <div className="fc-sp relative mx-auto max-w-[480px] text-center mb-[9vh]">
        <p className="text-[11px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-4">
          RESERVE
        </p>

        <h2
          className="
            text-[clamp(21px,5.5vw,24px)]
            text-[#5d4c3f]
            leading-[1.55]
            font-medium
          "
        >
          ゆったり整う時間を、<br />
          ぜひご体験ください。
        </h2>
      </div>

      {/* CARD */}
      <div
        className="
          fc-sp relative mx-auto max-w-[480px]
          bg-white/80 backdrop-blur-[1px]
          rounded-[16px]
          shadow-[0_14px_36px_rgba(0,0,0,0.07)]
          border border-[rgba(96,78,62,0.08)]
          px-7 py-9
          text-center
        "
      >
        <p
          className="
            text-[14.5px]
            leading-[1.9]
            text-[rgba(96,78,62,0.72)]
            mb-7
          "
        >
          ご予約は HotPepper Beauty より承っております。
          <br />
          空き状況の確認・メニュー選択も簡単です。
        </p>

        {/* BUTTON */}
        <a
          href="https://beauty.hotpepper.jp/slnH000706136/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            relative inline-block w-full
            py-3.5
            text-white text-[14.5px]
            rounded-[8px]
            bg-[#7d6655]
            tracking-[0.04em]
            shadow-[0_10px_24px_rgba(0,0,0,0.18)]
            active:translate-y-[1px]
            transition-all duration-300
            overflow-hidden
          "
        >
          <span
            className="
              absolute inset-0 pointer-events-none
              opacity-[0.18]
              [background:linear-gradient(
                135deg,
                rgba(255,255,255,0.25),
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
