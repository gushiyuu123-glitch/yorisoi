// src/sections/HeroC.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import NavYorisoiFloating from "../components/NavYorisoiFloating";

export default function HeroC() {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const logoRef = useRef(null);
  const tagsRef = useRef(null);
  const photoRef = useRef(null);
  const noteRef = useRef(null);
  const lineRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.12 });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 18, filter: "blur(0.28px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.78,
          ease: "power3.out",
        }
      );

      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 9, filter: "blur(0.2px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.62,
          ease: "power3.out",
        },
        "-=0.52"
      );

      tl.fromTo(
        tagsRef.current,
        { opacity: 0, y: 8, filter: "blur(0.16px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.56,
          ease: "power3.out",
        },
        "-=0.42"
      );

      const letters = titleRef.current?.querySelectorAll?.(".char");

      if (letters?.length) {
        tl.fromTo(
          letters,
          { opacity: 0, y: 16, filter: "blur(0.22px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.026,
            duration: 0.72,
            ease: "power3.out",
          },
          "-=0.2"
        );
      }

      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 12, filter: "blur(0.16px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.66,
          ease: "power3.out",
        },
        "-=0.46"
      );

      tl.fromTo(
        noteRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.58,
          ease: "power3.out",
        },
        "-=0.36"
      );

      tl.fromTo(
        photoRef.current,
        { opacity: 0.72, scale: 1.045, x: 16, filter: "blur(0.28px)" },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power3.out",
        },
        "-=0.95"
      );

      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center", opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.64"
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const splitChunk = (text) => (
    <span className="inline-block whitespace-nowrap" aria-hidden="true">
      {Array.from(text).map((c, i) => (
        <span key={`${c}-${i}`} className="char inline-block">
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );

  const LINE_1 = "浦添のメンズ専門理容室。";
  const LINE_2 = "朝7時から。";

  const SUB_1 = "担当はひとり。最後まで仕上げます。";
  const SUB_2 = "毛流れを見て、乾かすだけで決まる形に。必要ならパーマも。";

  const TAGS = ["半個室", "マンツーマン", "シェービング", "駐車場あり"];

  return (
    <section
      ref={rootRef}
      id="hero"
      className="
        relative min-h-[100svh] w-full overflow-hidden
        bg-[#f7f4ef]
        text-[#5d4c3f]
      "
      aria-label="ヨリソイ Hair&Spa Hero"
    >
      <NavYorisoiFloating bottom="10vh" />

      {/* left atmosphere */}
      <div
        className="
          pointer-events-none absolute inset-y-0 left-0 z-[0]
          w-[68vw] overflow-hidden
        "
        aria-hidden="true"
      >
        <img
          src="/yorisoi/hero1.png"
          alt=""
          className="
            absolute inset-0 h-full w-full object-cover
            opacity-[0.095] blur-[38px] scale-[1.24]
            [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.52)_32%,rgba(0,0,0,0.16)_62%,rgba(0,0,0,0)_100%)]
          "
          decoding="async"
        />

        <div
          className="
            absolute left-[-12vw] top-[-18vh]
            h-[64vh] w-[52vw] rounded-full
            bg-[radial-gradient(circle,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.28)_44%,rgba(255,255,255,0)_70%)]
            blur-[24px] opacity-[0.78]
          "
        />

        <div
          className="
            absolute left-[18vw] top-[25vh]
            h-[52vh] w-[42vw] rounded-full
            bg-[radial-gradient(circle,rgba(221,206,188,0.34)_0%,rgba(221,206,188,0.12)_48%,rgba(221,206,188,0)_72%)]
            blur-[36px] opacity-[0.72]
          "
        />
      </div>

      {/* soft vertical editorial words */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-[3.4vw] top-[19vh] z-[4]
          hidden xl:block
          [writing-mode:vertical-rl]
          text-[10px] tracking-[0.42em]
          text-[rgba(96,78,62,0.34)]
        "
      >
        PRIVATE BARBER / URASOE
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute bottom-[7.5vh] left-[3.4vw] z-[4]
          hidden xl:block
          text-[10px] tracking-[0.34em]
          text-[rgba(96,78,62,0.32)]
        "
      >
        OPEN 7:00
      </div>

      {/* right photo */}
      <div
        className="
          absolute inset-y-0 right-0 z-[2]
          w-[43vw] overflow-hidden bg-[#e9e3db]
        "
      >
        <img
          ref={photoRef}
          src="/yorisoi/hero2.jpg"
          alt="ヨリソイ Hair&Spa の店内・施術イメージ"
          className="
            h-full w-full object-cover
            [filter:brightness(1.035)_contrast(0.94)_saturate(0.94)]
          "
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* photo veil */}
      <div
        aria-hidden="true"
        className="
          absolute inset-y-0 right-0 z-[3]
          w-[43vw]
          bg-[linear-gradient(to_left,rgba(247,244,239,0.32)_0%,rgba(247,244,239,0.18)_34%,rgba(247,244,239,0.08)_70%,rgba(247,244,239,0)_100%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute inset-y-0 right-[43vw] z-[4]
          w-[16vw]
          bg-[linear-gradient(to_right,rgba(247,244,239,0)_0%,rgba(247,244,239,0.72)_72%,rgba(247,244,239,0.92)_100%)]
        "
      />

      {/* fine hairline decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-[8vw] right-[48vw] top-[16vh] z-[5]
          h-[1px] overflow-hidden
        "
      >
        <div
          ref={lineRef}
          className="
            h-px w-full
            bg-[linear-gradient(to_right,rgba(96,78,62,0)_0%,rgba(96,78,62,0.28)_18%,rgba(96,78,62,0.10)_68%,rgba(96,78,62,0)_100%)]
          "
        />
      </div>

      {/* main copy card */}
<div className="relative z-[10] flex min-h-[100svh] items-center pl-[8vw]">
  <div
    ref={cardRef}
    className="
      relative max-w-[650px]
      mt-[-4.2vh]
      pt-[2vh]
    "
  >
    {/* 左にだけ細い気配。箱にはしない */}
    <div
      aria-hidden="true"
      className="
        absolute left-[-28px] top-[4px]
        h-[82%] w-px
        bg-[linear-gradient(
          to_bottom,
          rgba(96,78,62,0)_0%,
          rgba(96,78,62,0.18)_18%,
          rgba(96,78,62,0.12)_62%,
          rgba(96,78,62,0)_100%
        )]
      "
    />

    <div className="relative mb-5 flex items-center gap-2.5">
      <svg
        className="h-[18px] w-[18px] text-[rgba(96,78,62,0.54)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="10.12" />
        <line x1="8.12" y1="13.88" x2="20" y2="20" />
      </svg>

      <div
        ref={logoRef}
        className="
          text-[19px] font-light
          tracking-[0.36em]
          text-[rgba(96,78,62,0.82)]
        "
      >
        ヨリソイ
        <span
          className="
            ml-2 text-[12px] tracking-[0.28em]
            text-[rgba(96,78,62,0.58)]
          "
        >
          Hair&Spa
        </span>
      </div>

      <div
        className="
          h-px w-[118px]
          translate-y-[0.5px]
          border-t border-dashed border-[rgba(96,78,62,0.30)]
        "
        aria-hidden="true"
      />
    </div>

    <ul
      ref={tagsRef}
      className="
        mb-8 flex flex-wrap
        gap-x-3.5 gap-y-2
        text-[12px]
        tracking-[0.18em]
        text-[rgba(96,78,62,0.62)]
      "
      aria-label="店舗の特徴"
    >
      {TAGS.map((tag) => (
        <li key={tag} className="whitespace-nowrap">
          [{tag}]
        </li>
      ))}
    </ul>

    <h1
      ref={titleRef}
      aria-label={`${LINE_1} ${LINE_2}`}
      className="
        max-w-[560px]
        text-[clamp(34px,3.65vw,50px)]
        font-medium
        leading-[1.2]
        tracking-[0.005em]
        text-[#5d4c3f]
      "
    >
      {splitChunk(LINE_1)}
      <br />
      {splitChunk(LINE_2)}
    </h1>

    <div ref={subRef} className="mt-7 max-w-[540px]">
      <p
        className="
          text-[15.5px]
          leading-[1.95]
          tracking-[0.015em]
          text-[rgba(93,76,63,0.78)]
        "
      >
        {SUB_1}
        <br />
        {SUB_2}
      </p>
    </div>

    {/* 情報もカードにしない。細い区切りだけ */}
    <div
      ref={noteRef}
      className="
        mt-9 max-w-[540px]
        border-t border-[rgba(96,78,62,0.13)]
        pt-5
        text-[12px]
        leading-[1.95]
        tracking-[0.08em]
        text-[rgba(96,78,62,0.56)]
      "
    >
      <div className="grid grid-cols-[74px_1fr] gap-x-4 gap-y-1.5">
        <span className="text-[rgba(96,78,62,0.70)]">URASOE</span>
        <span>沖縄県浦添市内間2丁目20-3</span>

        <span className="text-[rgba(96,78,62,0.70)]">TIME</span>
        <span>7:00 — 19:00 / 毎週月曜定休</span>
      </div>
    </div>
  </div>
</div>

      {/* bottom atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute bottom-0 left-0 right-0 z-[6]
          h-[18vh]
          bg-[linear-gradient(to_top,rgba(247,244,239,0.96)_0%,rgba(247,244,239,0.58)_48%,rgba(247,244,239,0)_100%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute bottom-[5.8vh] left-[8vw] z-[7]
          text-[10px] tracking-[0.36em]
          text-[rgba(96,78,62,0.30)]
        "
      >
        CUT / PERM / SHAVING / HEAD SPA
      </div>
    </section>
  );
}