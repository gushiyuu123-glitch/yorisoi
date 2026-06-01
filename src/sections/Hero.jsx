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
  const ctaRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.12 });

      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { opacity: 0, y: 10, filter: "blur(0.22px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.66,
            ease: "power3.out",
          }
        );
      }

      if (tagsRef.current) {
        tl.fromTo(
          tagsRef.current,
          { opacity: 0, y: 8, filter: "blur(0.18px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.56,
            ease: "power3.out",
          },
          "-=0.42"
        );
      }

      const letters = titleRef.current?.querySelectorAll?.(".char");
      if (letters?.length) {
        tl.fromTo(
          letters,
          { opacity: 0, y: 14, filter: "blur(0.22px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.028,
            duration: 0.72,
            ease: "power3.out",
          },
          "-=0.22"
        );
      }

      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 12, filter: "blur(0.18px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.66,
            ease: "power3.out",
          },
          "-=0.44"
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 10, filter: "blur(0.16px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.58,
            ease: "power3.out",
          },
          "-=0.42"
        );
      }

      if (photoRef.current) {
        tl.fromTo(
          photoRef.current,
          { opacity: 0.62, filter: "blur(0.24px)", scale: 1.03, x: 10 },
          {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            x: 0,
            duration: 0.88,
            ease: "power3.out",
          },
          "-=0.72"
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const splitChunk = (text) => (
    <span className="inline-block whitespace-nowrap" aria-hidden="true">
      {text.split("").map((c, i) => (
        <span key={i} className="char inline-block">
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );

  const LINE_1 = "浦添のメンズ専門理容室。";
  const LINE_2 = "朝7時から。";

  // ✅ PCサブ文（2行に圧縮）
  const SUB_1 = "担当はひとり。最後まで仕上げます。";
  const SUB_2 = "毛流れを見て、乾かすだけで決まる形に。必要ならパーマも。";

  const TAGS = ["半個室", "マンツーマン", "シェービング", "駐車場あり"];

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#f7f4ef]"
      aria-label="ヨリソイ Hero"
    >
      <NavYorisoiFloating bottom="10vh" />

      <div
        className="absolute inset-y-0 left-0 w-[60vw] pointer-events-none z-[0] overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="/yorisoi/hero1.png"
          alt=""
          className="
            absolute inset-0 w-full h-full object-cover
            opacity-[0.10] blur-[40px] scale-[1.22]
            [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.42)_30%,rgba(0,0,0,0.12)_56%,rgba(0,0,0,0)_100%)]
          "
          decoding="async"
        />
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_32%_40%,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.15)_45%,rgba(255,255,255,0)_100%)]
            opacity-[0.55] blur-[18px]
          "
        />
      </div>

      <div className="absolute inset-y-0 right-0 w-[42vw] overflow-hidden z-[2] bg-[#eae6df]">
        <img
          ref={photoRef}
          src="/yorisoi/hero2.jpg"
          alt="ヨリソイ Hair&Spa の店内・施術イメージ"
          className="h-full w-full object-cover [filter:brightness(1.03)_contrast(0.93)]"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div
        aria-hidden="true"
        className="
          absolute inset-y-0 right-0 w-[42vw] z-[3]
          bg-[linear-gradient(to_left,rgba(255,255,255,0.50)_0%,rgba(255,255,255,0.26)_35%,rgba(255,255,255,0.12)_72%,rgba(255,255,255,0)_100%)]
        "
      />

      <div className="relative z-[10] pt-[20vh] pl-[8vw] max-w-[620px]">
        <div className="relative mb-4 flex items-center gap-2">
          <svg
            className="w-[18px] h-[18px] text-[rgba(96,78,62,0.55)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
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
            className="text-[19px] tracking-[0.36em] text-[rgba(96,78,62,0.80)] font-light"
          >
            ヨリソイ
            <span className="ml-2 text-[12px] tracking-[0.28em] text-[rgba(96,78,62,0.62)]">
              Hair&Spa
            </span>
          </div>

          <div className="h-[1px] w-[120px] border-t border-dashed border-[rgba(96,78,62,0.35)] translate-y-[0.5px]" />
        </div>

        <ul
          ref={tagsRef}
          className="
            mb-7
            flex flex-wrap
            gap-x-3 gap-y-1.5
            text-[12px]
            tracking-[0.18em]
            text-[rgba(96,78,62,0.62)]
          "
          aria-label="店舗の特徴"
        >
          {TAGS.map((t) => (
            <li key={t} className="whitespace-nowrap">
              [{t}]
            </li>
          ))}
        </ul>

        <h1
          ref={titleRef}
          aria-label={`${LINE_1} ${LINE_2}`}
          className="
            text-[clamp(30px,3.4vw,44px)]
            leading-[1.22]
            font-medium
            text-[#5d4c3f]
            max-w-[520px]
            tracking-[0.005em]
          "
        >
          {splitChunk(LINE_1)}
          <br />
          {splitChunk(LINE_2)}
        </h1>

        <div ref={subRef} className="mt-6 max-w-[520px]">
          {/* ✅ 2行だけ */}
          <p className="text-[15px] leading-[1.9] tracking-[0.01em] text-[rgba(93,76,63,0.78)]">
            {SUB_1}
            <br />
            {SUB_2}
          </p>
        </div>
      </div>
    </section>
  );
}