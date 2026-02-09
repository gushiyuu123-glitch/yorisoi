// src/sections_sp/HeroSP.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSP() {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const logoRef = useRef(null);
  const photoRef = useRef(null);
  const ctxRef = useRef(null);

  /* ======================================
        GSAP（ useLayoutEffect で同期保証 ）
  ======================================= */
  useLayoutEffect(() => {
    ctxRef.current = gsap.context(() => {
      const logo = logoRef.current;
      const title = titleRef.current;
      const sub = subRef.current;
      const photo = photoRef.current;

      if (!logo || !title || !sub || !photo) return;

      const chars = title.querySelectorAll(".char");
      if (!chars.length) return;

      const tl = gsap.timeline({ delay: 0.25 });

      // ロゴ
      tl.fromTo(
        logo,
        { opacity: 0, y: 12, filter: "blur(0.5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power3.out",
        }
      );

      // H1（バラバラ）
      tl.fromTo(
        chars,
        { opacity: 0, y: 18, filter: "blur(0.4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.03,
          ease: "power3.out",
        },
        "-=0.55"
      );

      // サブコピー
      tl.fromTo(
        sub,
        { opacity: 0, y: 16, filter: "blur(0.3px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.45"
      );

      // 背景写真
      tl.fromTo(
        photo,
        { opacity: 0.55, scale: 1.06, filter: "blur(1.6px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.25,
          ease: "power3.out",
        },
        "-=0.25"
      );
    });

    return () => ctxRef.current && ctxRef.current.revert();
  }, []);

  /* ==========================
        文字スプリット
  =========================== */
  const splitText = (text) =>
    text.split("").map((c, i) => (
      <span key={i} className="char inline-block">
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <section className="relative w-full overflow-hidden bg-[#f7f4ef]">

      {/* ===================================================
          ★ 1. 背景写真
      ==================================================== */}
      <div className="relative w-full h-[100vh] z-[0] overflow-hidden">
        <img
          ref={photoRef}
          src="/yorisoi/hero1.png"
          className="
            w-full h-full object-cover
            [filter:brightness(1.03)_contrast(0.94)]
            scale-[1.03]
          "
          alt="YORISOI Hero"
        />
      </div>

      {/* ===================================================
          ★ 2. 背景光（極薄・自然光）（※ screen 削除）
      ==================================================== */}
      <div
        className="
          absolute inset-0 z-[10] pointer-events-none
          bg-[linear-gradient(
            to_bottom,
            rgba(255,255,255,0.06) 0%,
            rgba(255,255,255,0.04) 35%,
            rgba(255,255,255,0.025) 65%,
            rgba(255,255,255,0.015) 85%,
            rgba(255,255,255,0) 100%
          )]
        "
      />

      {/* ===================================================
          ★ 3. 黒膜（視認性補助）
      ==================================================== */}
      <div
        className="
          absolute inset-0 z-[20] pointer-events-none
          bg-[linear-gradient(
            to_bottom,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.05) 30%,
            rgba(0,0,0,0.10) 55%,
            rgba(0,0,0,0.14) 70%,
            rgba(0,0,0,0.18) 100%
          )]
        "
      />

      {/* ===================================================
          ★ 4. テキスト背面の白にじみ膜（※ 最重要）
      ==================================================== */}
      <div
        className="
          absolute left-0 right-0
          top-[25vh] bottom-[0]
          z-[60] pointer-events-none

          bg-[linear-gradient(
            to_bottom,
            rgba(255,255,255,0.32) 0%,
            rgba(255,255,255,0.18) 16%,
            rgba(255,255,255,0.12) 34%,
            rgba(255,255,255,0.08) 56%,
            rgba(255,255,255,0.04) 78%,
            rgba(255,255,255,0) 100%
          )]

          backdrop-blur-[0.55px]
        "
      />

      {/* ===================================================
          ★ 5. テキスト（最前面）
      ==================================================== */}
      <div
        className="
          absolute left-0 right-0 top-[30vh]
          px-[6vw]
          z-[100]
        "
      >

        {/* ロゴ行 */}
        <div className="flex items-center gap-3 mb-4">
          <svg
            className="w-[16px] h-[16px] text-[rgba(96,78,62,0.60)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="10.12" />
            <line x1="8.12" y1="13.88" x2="20" y2="20" />
          </svg>

          <div
            ref={logoRef}
            className="
              text-[15px]
              tracking-[0.23em]
             text-[rgba(135,118,105,0.92)]
              font-light
            "
          >
            ヨリソイ
          </div>
        </div>

        {/* H1 */}
        <h1
          ref={titleRef}
          className="
            text-[clamp(18px,5.8vw,24px)]
            leading-[1.32]
            tracking-[0.01em]
            font-medium
           text-[#62564A]
            drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]
            drop-shadow-[0_0.5px_1.3px_rgba(255,255,255,0.38)]
            mb-[2vh]
          "
        >
          {splitText("話しすぎない、でも寄り添う。")}
          <br />
          {splitText("あなたに合わせて整える美容室。")}
        </h1>

        {/* サブコピー */}
        <p
          ref={subRef}
          className="
            text-[clamp(13px,3.6vw,15px)]
            leading-[1.9]
           text-[rgba(118,102,88,0.92)]
            drop-shadow-[0_1px_2.2px_rgba(0,0,0,0.33)]
            drop-shadow-[0_0.45px_1px_rgba(255,255,255,0.34)]
          "
        >
          無理なく相談できて、自然に任せられる距離感で。
          <br />
          あなたの日常に合うスタイルを、丁寧に仕上げていきます。
        </p>

      </div>
    </section>
  );
}
