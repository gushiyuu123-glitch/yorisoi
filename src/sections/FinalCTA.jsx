// src/sections/FinalCTA.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".fc"),
      { opacity: 0, y: 26, filter: "blur(0.2px)" }, // ← 修正
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.15,
        ease: "power3.out",
        stagger: 0.16,
        scrollTrigger: { trigger: el, start: "top 80%" }
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        w-full bg-[#f7f4ef]
        pt-[18vh] pb-[22vh] px-[6vw]
        border-t border-[rgba(96,78,62,0.12)]
      "
    >
      {/* 柔光 */}
      <div
        aria-hidden
        className="
          absolute inset-0 pointer-events-none
          opacity-[0.28]
          [background:radial-gradient(
            1000px_700px_at_50%_30%,
            rgba(180,150,120,0.07),
            transparent_72%
          )]
        "
      />

      {/* TITLE */}
      <div className="fc relative mx-auto max-w-[760px] text-center mb-[9vh]">
        <p className="text-[12px] tracking-[0.34em] text-[rgba(96,78,62,0.55)] mb-6">
          RESERVE
        </p>

        <h2
          className="
            text-[clamp(26px,2.6vw,30px)]
            text-[#5d4c3f]
            font-medium
            leading-[1.55]
          "
        >
          ゆったりと整う時間を、<br />
          ぜひご体験ください。
        </h2>
      </div>

      {/* CARD */}
      <div
        className="
          fc relative mx-auto max-w-[720px]
          bg-white/80 backdrop-blur-[1px]
          rounded-[18px]
          shadow-[0_18px_48px_rgba(0,0,0,0.08)]
          border border-[rgba(96,78,62,0.10)]
          px-12 py-14
          text-center
        "
      >
        <p
          className="
            text-[15px]
            leading-[1.9]
            text-[rgba(96,78,62,0.72)]
            mb-9
          "
        >
          ご予約は HotPepper Beauty より承っております。
          <br />
          空き状況の確認・メニュー選択も簡単に行えます。
        </p>

        {/* BUTTON */}
        <a
          href="https://beauty.hotpepper.jp/slnH000706136/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            relative inline-block
            px-12 py-3.5
            text-[15px] text-white
            rounded-[8px]
            bg-[#7d6655]
            shadow-[0_12px_28px_rgba(0,0,0,0.18)]
            transition-all duration-300
            hover:-translate-y-[2px]
            hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]
          "
        >
          {/* 微光 */}
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
