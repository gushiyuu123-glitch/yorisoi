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
        {/* 小鳥アイコン */}
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
            className="w-[26px] h-[26px] opacity-75"
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        {/* ABOUT SVG（小さめ） */}
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

        {/* ラベル */}
        <Reveal
          as="p"
          delay={0.10}
          y={12}
          blur={0.14}
          duration={0.62}
          className="text-[11px] tracking-[0.24em] text-[rgba(96,78,62,0.50)] mb-3"
        >
          寄り添いの理由
        </Reveal>

        {/* タイトル */}
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
          気をつかわず、<br />
          任せられる距離感。
        </Reveal>

        {/* 本文 */}
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
            髪の悩みは人それぞれです。<br />
            しっかり相談して決めたい日もあれば、今日は長さを揃えるだけで十分な日もある。
          </p>

          <p>
            最初に「気になるところ」と「普段のセット」を確認して、<br />
            無理なく合う形を一緒に決めていきます。
          </p>

          <p>
            仕上げは、家でも同じ形になりやすいように収めます。<br />
            朝のセットが楽になるラインを目指します。
          </p>
        </Reveal>



        {/* 写真 */}
        <Reveal delay={0.28} y={12} blur={0.12} duration={0.62} className="mt-10 w-full">
          <img
            src="/yorisoi/about2.png"
            alt="ヨリソイの店内の雰囲気"
            loading="lazy"
            decoding="async"
            className="
              w-full rounded-[6px] object-cover
              shadow-[0_6px_20px_rgba(0,0,0,0.12)]
              [filter:brightness(1.02)_contrast(0.95)]
            "
          />
        </Reveal>

        {/* 締め（カード感を消す：線＋余白） */}
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
             お客さまの雰囲気に合わせて、<br />進め方をこちらで調整します。<br />
  気になるところだけ、先に聞かせてください。
          </p>
        </Reveal>
      </div>
    </section>
  );
}