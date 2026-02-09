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
      { opacity: 0, y: 28, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.25,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: { trigger: el, start: "top 78%" }
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        w-full bg-[#f7f4ef]
        pt-[16vh] pb-[20vh] px-[6vw]
        border-t border-[rgba(96,78,62,0.14)]
      "
    >
      {/* ---- 背景の柔光（薄い木漏れ日） ---- */}
      <div
        aria-hidden
        className="
          absolute inset-0 pointer-events-none
          opacity-[0.32]
          [background:radial-gradient(900px_600px_at_50%_30%,rgba(180,150,120,0.08),transparent_70%)]
        "
      />

      {/* ---- 見出し ---- */}
      <div className="fc relative mx-auto max-w-[760px] text-center mb-12">
        <p
          className="
            text-[13px]
            tracking-[0.32em]
            text-[rgba(96,78,62,0.55)]
            mb-6
          "
        >
          RESERVE
        </p>

        <h2
          className="
            text-[clamp(26px,3vw,32px)]
            text-[#5d4c3f]
            font-medium
            leading-[1.55]
          "
        >
          ゆったりと過ごせる空間で、<br />
          ご来店を心よりお待ちしております。
        </h2>
      </div>

      {/* ---- CTA CARD（浮遊） ---- */}
      <div
        className="
          fc relative mx-auto max-w-[680px]
          bg-white/75 backdrop-blur-[2px]
          rounded-[14px]
          shadow-[0_8px_28px_rgba(0,0,0,0.12)]
          border border-[rgba(96,78,62,0.12)]
          p-10 text-center
          translate-y-0
        "
      >
        <p
          className="
            text-[15px]
            leading-[1.9]
            text-[rgba(96,78,62,0.75)]
            mb-7
          "
        >
          予約はHotPepper Beautyより承っております。
          <br />
          ご希望のメニューをお選びいただけます。
        </p>

        {/* ---- ボタン：光膜 × 微blur × ふわ浮き ---- */}
        <a
          href="#"
          className="
            inline-block
            px-10 py-3
            text-white text-[15px]
            rounded-[6px]
            bg-[#7d6655]
            shadow-[0_5px_14px_rgba(0,0,0,0.16)]
            hover:shadow-[0_8px_20px_rgba(0,0,0,0.22)]
            transition-all
            relative overflow-hidden
            hover:-translate-y-[2px]
          "
        >
          {/* 光膜 */}
          <span
            className="
              absolute inset-0 pointer-events-none
              opacity-[0.22]
              [background:linear-gradient(135deg,rgba(255,255,255,0.25),rgba(255,255,255,0))]
              mix-blend-screen
            "
          />
          HotPepperで予約する
        </a>
      </div>
    </section>
  );
}
