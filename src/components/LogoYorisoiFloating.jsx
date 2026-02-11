// src/components/LogoYorisoiFloating.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// ScrollTo Plugin を有効化
gsap.registerPlugin(ScrollToPlugin);

export default function LogoYorisoiFloating() {
  const wrapRef = useRef(null);

  /* ================================
      初期フェードイン（静けさ × 高級感）
  ================================ */
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
        ★ 帰還：どこにいても Hero に戻る
  ================================ */
  const scrollToHero = () => {
    // 1) Hero セクションを取得
    const hero = document.getElementById("home");

    // 2) Hero が存在しない（記事ページなど）→ トップへ遷移
    if (!hero) {
      // いったんトップに遷移
      window.location.href = "/";
      return;
    }

    // 3) Hero セクションがある → スクロールで戻す
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
        fixed top-[4vh] left-[3vw] z-[50]
        flex items-center gap-3
        cursor-pointer
      "
    >
      {/* 光膜 */}
      <div
        className="
          absolute inset-0 -z-10 opacity-[0.35]
          blur-[18px] rounded-full pointer-events-none
          bg-[rgba(255,255,255,0.45)]
        "
      />

      {/* 鳥ロゴ */}
      <img
        src="/yorisoi/bird-logo.png"
        alt="YORISOI Bird Logo"
        className="w-[52px] h-[52px] opacity-85 select-none pointer-events-none"
      />

      {/* 文字ロゴ */}
      <span
        className="
          text-[17px] tracking-[0.18em] font-medium
          text-[rgba(96,78,62,0.82)] select-none
        "
      >
        ヨリソイ Hair＆Spa
      </span>
    </div>
  );
}
