// src/sections_sp/AboutSP.jsx
import { Reveal } from "../components/Reveal";

export default function AboutSP() {
  return (
    <section
      id="about-sp"
      className="
        w-full bg-base
        pt-[18vh]
        px-[6vw]
        pb-[calc(14vh+110px+env(safe-area-inset-bottom))]
      "
      aria-label="ヨリソイについて"
    >
      <div className="mx-auto max-w-[520px]">
        <Reveal
          delay={0.0}
          y={12}
          blur={0.14}
          duration={0.62}
          className="flex justify-start mb-4 opacity-85"
        >
          <img
            src="/yorisoi/bird-logo.png"
            alt=""
            className="w-[30px] h-[30px] opacity-75"
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <Reveal delay={0.05} y={12} blur={0.14} duration={0.62} className="overflow-hidden mb-3">
          <div style={{ width: "min(68vw, 240px)", minWidth: 170 }}>
            <img
              src="/yorisoi/about.svg"
              alt="ABOUT"
              loading="lazy"
              decoding="async"
              className="block w-full h-auto"
            />
          </div>
        </Reveal>

        <Reveal
          as="p"
          delay={0.10}
          y={12}
          blur={0.14}
          duration={0.62}
          className="text-[11px] tracking-[0.24em] text-[rgba(96,78,62,0.50)] mb-3"
        >
          安心のつくり方
        </Reveal>

        <Reveal
          as="h2"
          delay={0.14}
          y={12}
          blur={0.14}
          duration={0.62}
          className="
            text-[clamp(20px,6vw,26px)]
            leading-[1.48]
            tracking-[0.005em]
            text-[#5d4c3f]
            font-medium
            mb-6
          "
        >
          話さなくても、
          <br />
          伝わるように。
        </Reveal>

        <Reveal
          delay={0.20}
          y={12}
          blur={0.14}
          duration={0.62}
          className="
            text-[15px]
            leading-[1.95]
            text-[rgba(96,78,62,0.80)]
            space-y-5
          "
        >
          <p>
            髪の悩みは同じでも、求めるゴールは日によって変わります。
            <br />
            今日は整えるだけ。今日は相談したい。どちらでも大丈夫です。
          </p>

          <p>
            最初に、直したい箇所と、いつもの整え方を確認します。
            <br />
            そこから仕上がりを組みます。
          </p>

          {/* ✅ 修正④（重複回避） */}
          <p>
            仕上げは、家でも再現しやすい収まりへ。
            <br />
            朝のひと手間が減る形を目指します。
          </p>
        </Reveal>

        <Reveal delay={0.28} y={12} blur={0.12} duration={0.62} className="mt-10 w-full">
          <img
            src="/yorisoi/about2.png"
            alt="半個室の落ち着いた空間"
            loading="lazy"
            decoding="async"
            className="
              w-full rounded-[6px] object-cover
              shadow-[0_6px_20px_rgba(0,0,0,0.12)]
              [filter:brightness(1.02)_contrast(0.95)]
            "
          />
        </Reveal>

        <Reveal
          delay={0.34}
          y={12}
          blur={0.12}
          duration={0.62}
          className="
            mt-10
            pt-6
            border-t border-[rgba(96,78,62,0.12)]
          "
        >
          <p className="text-[13.6px] text-[rgba(96,78,62,0.74)] leading-[1.9]">
            会話の量もペースも、空気を見てこちらで揃えます。
            <br />
            言いづらいことは途中のひと言でも大丈夫です。
          </p>
        </Reveal>
      </div>
    </section>
  );
}