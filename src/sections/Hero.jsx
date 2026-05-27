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

      // ロゴ（極薄blurで“像が立つ”）
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

      // 強みタグ（S-1：最優先で見せる）
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

      // H1（文字ごと）
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

      // サブ
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

      // CTA（A-7：Hero内で予約へ）
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

      // 写真（過剰blur禁止：scale/xで“入ってくる”）
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

  // ✅ 禁止ワード回避（静かに/整う なし）
  const LINE_1 = "朝7時から、身だしなみが決まる。";
  const LINE_2 = "半個室で、1対1で仕上げます。";

  // S-1：強み5つ（タグ）
  const TAGS = ["朝7:00〜", "マンツーマン", "半個室", "駐車場あり", "メンズ専門"];

  // A-7：Hero内CTA（テキストリンク）
  const RESERVE_URL = "https://beauty.hotpepper.jp/slnH000706136/";

  // A-4：サブテキスト（受け入れ → 具体 → パーマは最後）
  const SUB_1 = "気になるところだけ教えてください。";
  const SUB_2 = "髪質とセットの癖に合わせて、朝が楽になる形を作ります。";
  const SUB_3 = "パーマで扱いやすくなる方には、あわせてご提案します。";

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#f7f4ef]"
      aria-label="ヨリソイ Hero"
    >
      {/* ナビ */}
      <NavYorisoiFloating bottom="10vh" />

      {/* 左：光膜（装飾） */}
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

      {/* 右：写真 */}
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

      {/* 薄膜（装飾） */}
      <div
        aria-hidden="true"
        className="
          absolute inset-y-0 right-0 w-[42vw] z-[3]
          bg-[linear-gradient(to_left,rgba(255,255,255,0.50)_0%,rgba(255,255,255,0.26)_35%,rgba(255,255,255,0.12)_72%,rgba(255,255,255,0)_100%)]
        "
      />

      {/* テキスト */}
      <div className="relative z-[10] pt-[20vh] pl-[8vw] max-w-[620px]">
        {/* ロゴ行 */}
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
          </div>

          <div className="h-[1px] w-[120px] border-t border-dashed border-[rgba(96,78,62,0.35)] translate-y-[0.5px]" />
        </div>

        {/* S-1：強み5つ（タグ） */}
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

        {/* H1 */}
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

        {/* A-4：サブ（受け入れ→具体→パーマ） */}
        <p
          ref={subRef}
          className="
            mt-6
            text-[clamp(12.5px,3.6vw,14.5px)]
            leading-[2.0]
            font-normal
            tracking-[0.01em]
            text-[rgba(115,92,75,0.70)]
            max-w-[520px]
          "
        >
          {SUB_1}
          <br />
          {SUB_2}
          <br />
          {SUB_3}
        </p>


      </div>
    </section>
  );
}