// src/components_sp/LogoYorisoiFloatingSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LogoYorisoiFloatingSP() {
  const wrapRef = useRef(null);

  /* ==================================
        初回フェードイン（静けさ）
  ================================== */
  useEffect(() => {
    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, y: 12, filter: "blur(0.28px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.12,
        ease: "power3.out",
        delay: 1.55,
      }
    );
  }, []);

  /* ==================================
        呼吸アニメ（ゆらぎ 0.4%）
  ================================== */
  useEffect(() => {
    gsap.to(wrapRef.current, {
      scale: 1.004,
      duration: 3.9,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  /* ==================================
        スクロールで隠れる（ナビ同期）
  ================================== */
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const isDown = currentY > lastY;

      gsap.to(wrapRef.current, {
        y: isDown ? 70 : 0,
        opacity: isDown ? 0 : 1,
        duration: 0.34,
        ease: "power3.out",
      });

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ==================================
        ロゴをクリック → Heroへ戻る
  ================================== */
  const scrollToHero = () => {
    document.querySelector("#home")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      ref={wrapRef}
      onClick={scrollToHero}
      className="
        fixed bottom-[85vh] right-[4vw] z-[90]
        w-[58px] h-[58px]

        /* 背景膜（自然光） */
        bg-[linear-gradient(
          to_bottom,
          rgba(255,255,255,0.65) 0%,
          rgba(255,255,255,0.52) 30%,
          rgba(255,255,255,0.32) 70%,
          rgba(255,255,255,0) 100%
        )]

        backdrop-blur-[11px]
        rounded-full
        shadow-[0_4px_16px_rgba(0,0,0,0.08)]
        flex items-center justify-center
        active:scale-[0.94]
        transition-all
      "
    >
      {/* 内側の淡い光膜 */}
      <div
        className="
          absolute inset-0 rounded-full
          bg-[rgba(255,255,255,0.45)]
          opacity-[0.32]
          blur-[14px]
          pointer-events-none -z-10
        "
      />

      <img
        src="/yorisoi/bird-logo.png"
        alt="logo"
        className="
          w-[34px] h-[34px]
          opacity-[0.94]
          pointer-events-none
        "
      />
    </div>
  );
}
