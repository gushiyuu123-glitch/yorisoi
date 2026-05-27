// src/sections_sp/HeroSP.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSP() {
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const tagsRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const photoRef = useRef(null);
  const ctxRef = useRef(null);

  const reduce =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : false;

  // 1行をnowrapで保持（改行事故防止）
  const splitLine = (text) => (
    <span className="inline-block whitespace-nowrap" aria-hidden="true">
      {text.split("").map((c, i) => (
        <span key={i} className="char inline-block">
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );

  useLayoutEffect(() => {
    if (reduce) return;

    ctxRef.current = gsap.context(() => {
      const logo = logoRef.current;
      const tags = tagsRef.current;
      const title = titleRef.current;
      const sub = subRef.current;
      const cta = ctaRef.current;
      const photo = photoRef.current;

      if (!logo || !title || !sub || !photo) return;

      const chars = title.querySelectorAll(".char");
      if (!chars.length) return;

      const tl = gsap.timeline({ delay: 0.16 });

      // ロゴ（極薄blur）
      tl.fromTo(
        logo,
        { opacity: 0, y: 10, filter: "blur(0.22px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.66, ease: "power3.out" }
      );

      // タグ（S-1）
      if (tags) {
        tl.fromTo(
          tags,
          { opacity: 0, y: 8, filter: "blur(0.18px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.52, ease: "power3.out" },
          "-=0.44"
        );
      }

      // H1（文字）
      tl.fromTo(
        chars,
        { opacity: 0, y: 14, filter: "blur(0.22px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.72,
          stagger: 0.020,
          ease: "power3.out",
        },
        "-=0.18"
      );

      // サブ
      tl.fromTo(
        sub,
        { opacity: 0, y: 10, filter: "blur(0.18px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.58, ease: "power3.out" },
        "-=0.38"
      );

      // CTA（A-7）
      if (cta) {
        tl.fromTo(
          cta,
          { opacity: 0, y: 10, filter: "blur(0.16px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.56, ease: "power3.out" },
          "-=0.44"
        );
      }

      // 写真（過剰blur禁止：極薄＋scaleで像が立つ）
      tl.fromTo(
        photo,
        { opacity: 0.72, scale: 1.02, x: 8, filter: "blur(0.24px)" },
        { opacity: 1, scale: 1, x: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
        "-=0.78"
      );
    }, rootRef);

    return () => ctxRef.current?.revert?.();
  }, [reduce]);

  // ✅ 禁止ワード回避（静かに/整う なし）
  const LINE1 = "朝7時から、身だしなみが決まる。";
  const LINE2 = "半個室で、1対1で仕上げます。";

  // S-1：強み5つ
  const TAGS = ["朝7:00〜", "マンツーマン", "半個室", "駐車場あり", "メンズ専門"];

  // A-7：Hero内CTA
  const RESERVE_URL = "https://beauty.hotpepper.jp/slnH000706136/";

  // A-4：サブテキスト
  const SUB_1 = "気になるところだけ教えてください。";
  const SUB_2 = "髪質とセットの癖に合わせて、朝が楽になる形を作ります。";
  const SUB_3 = "パーマで扱いやすくなる方には、あわせてご提案します。";

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative w-full overflow-hidden bg-[#f7f4ef]"
      aria-label="ヨリソイ Hero（スマホ）"
    >
      {/* 1) 背景写真 */}
      <div className="relative w-full min-h-[100svh] z-[0] overflow-hidden">
        <img
          ref={photoRef}
          src="/yorisoi/hero2.jpg"
          alt="ヨリソイ Hair&Spa 店内"
          className="
            w-full h-[100svh] object-cover
            [filter:brightness(1.02)_contrast(0.90)_saturate(0.95)]
            scale-[1.02]
          "
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* 2) テキスト帯（可読性の土台） */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0
          top-[20vh] bottom-[12vh]
          z-[30] pointer-events-none
          bg-[linear-gradient(
            to_bottom,
            rgba(247,244,239,0.00) 0%,
            rgba(247,244,239,0.56) 12%,
            rgba(247,244,239,0.82) 34%,
            rgba(247,244,239,0.86) 68%,
            rgba(247,244,239,0.64) 100%
          )]
          backdrop-blur-[2.4px]
        "
      />

      {/* 3) テキスト（帯の中に収める） */}
      <div
        className="
          absolute inset-x-0
          top-[22vh] bottom-[12vh]
          px-[6vw]
          z-[80]
          flex flex-col
        "
      >
        <div>
          <div
            ref={logoRef}
            className="
              text-[13px]
              tracking-[0.22em]
              text-[rgba(46,42,39,0.66)]
              font-light
            "
          >
            ヨリソイ Hair&Spa
          </div>

          {/* S-1：強み5つ（タグ） */}
          <ul
            ref={tagsRef}
            className="
              mt-3
              flex flex-wrap
              gap-x-2.5 gap-y-1.5
              text-[11px]
              tracking-[0.18em]
              text-[rgba(46,42,39,0.58)]
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
            aria-label={`${LINE1} ${LINE2}`}
            className="
              mt-[5vh]
              text-[clamp(19px,6.0vw,25px)]
              leading-[1.24]
              tracking-[0.005em]
              font-medium
              text-[rgba(46,42,39,0.94)]
            "
          >
            <span className="block whitespace-nowrap">{splitLine(LINE1)}</span>
            <span className="block whitespace-nowrap mt-[0.28em]">{splitLine(LINE2)}</span>
          </h1>

          {/* A-4：サブ（カード化しない） */}
          <p
            ref={subRef}
            className="
              mt-8
              text-[clamp(11px,3.1vw,13px)]
              leading-[1.9]
              tracking-[0.01em]
              text-[rgba(46,42,39,0.76)]
              max-w-[32em]
            "
          >
            {SUB_1}
            <br />
            {SUB_2}
            <br />
            {SUB_3}
          </p>

  
        </div>

        {/* 下側は空ける：下固定UIに被らない */}
        <div className="flex-1" />
      </div>

      {/* reduce-motion：強制表示（念のため） */}
      {reduce && (
        <style>{`
          .char { opacity: 1 !important; transform: none !important; filter: none !important; }
        `}</style>
      )}
    </section>
  );
}