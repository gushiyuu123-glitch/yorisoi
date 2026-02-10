// Hero_C.jsx（YUTO × NOA：100億点・完全最終版）
import { useEffect, useRef } from "react";
import gsap from "gsap";
import NavYorisoiFloating from "../components/NavYorisoiFloating";

export default function HeroC() {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const logoRef = useRef(null);
  const photoRef = useRef(null);

  /* ============================================
      GSAP（丁寧・静けさ・空気のアニメ）
  ============================================ */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.18 });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 14, filter: "blur(7px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.25,
        ease: "power3.out",
      }
    );

    const letters = titleRef.current.querySelectorAll(".char");
    tl.fromTo(
      letters,
      { opacity: 0, y: 20, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.036,
        duration: 1.15,
        ease: "power3.out",
      },
      "-=0.7"
    );

    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 16, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      },
      "-=0.62"
    );

tl.fromTo(
  photoRef.current,
  {
    opacity: 0.48,       // ← 0.38 → 0.54（気配が早く出る）
    filter: "blur(12px)",
    scale: 1.045,
    x: 18,
  },
  {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    x: 0,
    duration: 1.33,     // ← 少し短くして “自然に”
    ease: "power3.out",
  },
  "-=0.18"              // ← ここで“前のアニメと少し重ねる”
);

  }, []);

  const splitText = (text) =>
    text.split("").map((c, i) => (
      <span key={i} className="char inline-block">
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-[#f7f4ef]">

      {/* ナビ */}
      <NavYorisoiFloating bottom="10vh" />

      {/* 左：空気 × 光膜 */}
      <div className="absolute inset-y-0 left-0 w-[60vw] pointer-events-none z-[0] overflow-hidden">
        <img
          src="/yorisoi/hero1.png"
          className="
            absolute inset-0 w-full h-full object-cover
            opacity-[0.10] blur-[40px] scale-[1.22]
            [mask-image:linear-gradient(
              to_right,
              rgba(0,0,0,1) 0%,
              rgba(0,0,0,0.42) 30%,
              rgba(0,0,0,0.12) 56%,
              rgba(0,0,0,0) 100%
            )]
          "
        />

        <div
          className="
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(
              circle at 32% 40%,
              rgba(255,255,255,0.32) 0%,
              rgba(255,255,255,0.15) 45%,
              rgba(255,255,255,0) 100%
            )]
            opacity-[0.55]
            blur-[18px]
          "
        />
      </div>

      {/* 右：写真 */}
      <div className="absolute inset-y-0 right-0 w-[42vw] overflow-hidden z-[2] bg-[#eae6df]">
        <img
          ref={photoRef}
          src="/yorisoi/hero1.png"
          className="h-full w-full object-cover [filter:brightness(1.03)_contrast(0.93)]"
        />
      </div>

      {/* 朝光の薄膜 */}
      <div
        className="
          absolute inset-y-0 right-0 w-[42vw] z-[3]
          bg-[linear-gradient(to_left,
            rgba(255,255,255,0.50) 0%,
            rgba(255,255,255,0.26) 35%,
            rgba(255,255,255,0.12) 72%,
            rgba(255,255,255,0) 100%
          )]
        "
      />

      {/* テキスト */}
      <div className="relative z-[10] pt-[20vh] pl-[8vw] max-w-[560px]">

        {/* ロゴ行 */}
        <div className="relative mb-8 flex items-center gap-2">
          <svg
            className="w-[18px] h-[18px] text-[rgba(96,78,62,0.55)]"
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
            className="text-[19px] tracking-[0.36em] text-[rgba(96,78,62,0.80)] font-light"
          >
            〇〇〇〇
          </div>

          <div
            className="
              h-[1px] w-[120px]
              border-t border-dashed
              border-[rgba(96,78,62,0.35)]
              translate-y-[0.5px]
            "
          />
        </div>

{/* キャッチコピー */}
<h1
  ref={titleRef}
  className="
    whitespace-nowrap
    text-[clamp(30px,3.6vw,42px)]
    leading-[1.32]
    font-medium
    text-[#5d4c3f]
    translate-y-[-6px]
  "
>
  {splitText("話しすぎない、でも〇〇〇。")} <br />
  {splitText("あなたに合わせて整えるサロンです。")}
</h1>

{/* サブコピー */}
<p
  ref={subRef}
  className="
    mt-7  whitespace-nowrap
    text-[clamp(13px,1.3vw,17px)]
    leading-[1.95]
    text-[rgba(115,92,75,0.88)]
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
