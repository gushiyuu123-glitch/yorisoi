// src/components/ReserveFloating.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ReserveFloating() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ふわっと浮かぶフェードイン
    gsap.fromTo(
      el,
      { opacity: 0, y: -8, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.25,
        ease: "power3.out",
        delay: 1.0, // ロゴ → ナビ → 予約 の順番で出てくる
      }
    );
  }, []);

  return (
    <a
      ref={ref}
      href="https://beauty.hotpepper.jp/" // ← 本番では正式URLを入れる
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed top-[4vh] right-[6vw] z-[50]
        px-6 py-2.5
        text-[14px]
        tracking-[0.14em]
        rounded-[8px]

        bg-[rgba(96,78,62,0.14)]
        text-[#5d4c3f]
        backdrop-blur-[5px]

        shadow-[0_4px_14px_rgba(0,0,0,0.07)]
        hover:bg-[rgba(96,78,62,0.22)]
        hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)]
        hover:text-[#4f3f33]

        transition-all cursor-pointer
      "
    >
      予約する
    </a>
  );
}
