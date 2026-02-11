// ============================================================================
// ReserveFloatingSP — 左上常駐（淡スモーキーピンク × 世界観 × 呼吸）
// GUSHIKEN DESIGN × NOA
// ============================================================================
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ReserveFloatingSP() {
  const ref = useRef(null);

  /* ----------------------------------------------------
        初回フェードイン（上質・静かな入り）
  ---------------------------------------------------- */
  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: -8, filter: "blur(0.25px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power3.out",
        delay: 1.4,
      }
    );
  }, []);

  /* ----------------------------------------------------
        呼吸アニメ（0.22%）：高級感の最適値
  ---------------------------------------------------- */
  useEffect(() => {
    gsap.to(ref.current, {
      scale: 1.0022,        // “気配だけの呼吸”
      duration: 3.6,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <a
      ref={ref}
      href="https://beauty.hotpepper.jp/slnH000706136/"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed top-[20px] left-[20px] z-[110]

        px-[14px] py-[7px]
        text-[11.5px]
        tracking-[0.14em]
        font-medium
        rounded-[10px]

        /* ★ 世界観と最も相性の良い淡スモーキーピンク */
        bg-[rgba(232,208,213,0.55)]
        text-[rgba(85,68,60,0.88)]
        backdrop-blur-[10px]

        shadow-[0_3px_14px_rgba(0,0,0,0.09)]
        active:scale-[0.94]

        transition-all duration-300
      "
    >
      HotPepperへ
    </a>
  );
}
