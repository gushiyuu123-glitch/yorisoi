// ============================================================================
// LogoYorisoiFloatingSP — 右上常駐（HotPepper と水平揃え）
// 完全版：どのページにいても Home に帰還できる
// GUSHIKEN DESIGN × NOA
// ============================================================================
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function LogoYorisoiFloatingSP() {
  const wrapRef = useRef(null);

  /* ==================================
        初回フェードイン
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
        呼吸アニメ（ゆらぎ）
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
        スクロールで隠す
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
        ★ 完全版：どのページでも Hero へ帰還
  ================================== */
  const scrollToHero = () => {
    const hero = document.getElementById("home");

    // ▼ Home セクションが存在しないページ（NewsDetail 等）
    if (!hero) {
      window.location.href = "/";
      return;
    }

    // ▼ Home にいる時はスムーススクロール
    gsap.to(window, {
      duration: 0,
      scrollTo: hero,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={wrapRef}
      onClick={scrollToHero}
      className="
        fixed top-[20px] right-[20px] z-[110]

        w-[58px] h-[58px]

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
        cursor-pointer
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
