// src/components/LogoYorisoiFloating.jsx
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function LogoYorisoiFloating() {
  const wrapRef = useRef(null);

  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const reduce =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : false;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // ✅ LP以外は「即表示」(news等で消えた体感を潰す)
    if (pathname !== "/" || reduce) {
      gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    // ✅ LPでも delay を短く（透明時間が長いと「消えた」になる）
    gsap.fromTo(
      el,
      { opacity: 0, y: 8, filter: "blur(0.35px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.78,
        ease: "power3.out",
        delay: 1.1,
      }
    );

    return () => gsap.killTweensOf(el);
  }, [pathname, reduce]);

  const goHome = () => {
    if (pathname !== "/") {
      navigate({ pathname: "/", hash: "#home" });
      return;
    }
    if (hash !== "#home") {
      navigate({ hash: "#home" });
      return;
    }
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      ref={wrapRef}
      type="button"
      onClick={goHome}
      aria-label="トップへ戻る"
      className="
        fixed top-[4vh] left-[3vw] z-[120]
        flex items-center gap-3
        cursor-pointer select-none
      "
    >
      {/* 光膜 */}
      <span
        aria-hidden="true"
        className="
          absolute inset-0 -z-10 opacity-[0.30]
          blur-[18px] rounded-full pointer-events-none
          bg-[rgba(255,255,255,0.45)]
        "
      />

      <img
        src="/yorisoi/bird-logo.png"
        alt=""
        className="w-[52px] h-[52px] opacity-85 pointer-events-none"
        decoding="async"
      />

      <span className="text-[17px] tracking-[0.18em] font-medium text-[rgba(96,78,62,0.82)]">
        ヨリソイ Hair＆Spa
      </span>
    </button>
  );
}