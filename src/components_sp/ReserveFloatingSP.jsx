// src/components_sp/ReserveFloatingSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ReserveFloatingSP() {
  const ref = useRef(null);

  /* ============================================
        初回フェードイン（静気 × 高級感）
  ============================================ */
  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 14, filter: "blur(0.28px)" },   // ★ blur最適化
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.15,
        ease: "power3.out",
        delay: 1.9,
      }
    );
  }, []);

  /* ============================================
        呼吸のゆらぎ（0.25%）＝ 高級感の最適解
  ============================================ */
  useEffect(() => {
    gsap.to(ref.current, {
      scale: 1.005,    // ★ 0.5% → 0.25% に調整（上質・控えめ）
      duration: 3.8,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  /* ============================================
        スクロールで自然に消える（ナビSPと同期）
  ============================================ */
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const isDown = currentY > lastY;

      gsap.to(ref.current, {
        y: isDown ? 70 : 0,           // ★ 80 → 70（挙動を柔らかく）
        opacity: isDown ? 0 : 1,
        duration: 0.36,
        ease: "power3.out",
      });

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      ref={ref}
      href="https://beauty.hotpepper.jp/"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-[18vh] right-[4vw] z-[90]

        px-[22px] py-[13px]
        text-[13.2px]
        tracking-[0.16em]      /* ★ 文字間少し広げて“品”を出す */
        font-medium            /* ★ 明瞭さUP */
        rounded-[12px]

        bg-[rgba(96,78,62,0.14)]   /* ★ 膜の濃度を最適化 */
        backdrop-blur-[12px]       /* ★ 透明感UP */
        text-[rgba(76,62,52,0.92)] /* ★ 最適なブラウン階調 */
        
        shadow-[0_4px_18px_rgba(0,0,0,0.08)]
        active:scale-[0.94]        /* ★ 高級感 × 操作感の最適値 */

        transition-all duration-300
      "
    >
      予約
    </a>
  );
}
