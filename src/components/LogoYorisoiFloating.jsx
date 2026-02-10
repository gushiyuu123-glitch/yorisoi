// src/components/LogoYorisoiFloating.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LogoYorisoiFloating() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 8, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        delay: 4.5,
      }
    );
  }, []);

  /* ================================
     ロゴクリック → Hero に戻る
  ================================ */
  const scrollToHero = () => {
    const target = document.getElementById("home");
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      ref={wrapRef}
      onClick={scrollToHero}
      className="
        fixed top-[4vh] left-[3vw] z-[50]
        flex items-center gap-3
        cursor-pointer   /* ← 追加 */
      "
    >
      {/* 薄い光膜 */}
      <div
        className="
          absolute inset-0 -z-10
          pointer-events-none
          opacity-[0.35]
          blur-[18px]
          rounded-full
          bg-[rgba(255,255,255,0.45)]
        "
      />

      {/* 小鳥ロゴ画像 */}
      <img
        src="/yorisoi/bird-logo.png"
        alt="YORISOI Bird Logo"
        className="
          w-[52px] h-[52px]
          opacity-85
          select-none pointer-events-none
        "
      />

      {/* 文字ロゴ */}
      <span
        className="
          text-[17px]
          tracking-[0.18em]
          font-medium
          text-[rgba(96,78,62,0.82)]
          select-none
        "
      >
        〇〇〇
      </span>
    </div>
  );
}
