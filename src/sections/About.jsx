// src/sections/About.jsx
import { Reveal } from "../components/Reveal";
import HandwrittenSvgTitle from "../components/HandwrittenSvgTitle";

export default function About() {
  return (
    <section
      id="about"
      className="
        w-full bg-base
        pt-[18vh] pb-[14vh] px-[8vw]
      "
      aria-label="ヨリソイについて"
    >
      <div className="mx-auto max-w-[860px]">
        {/* ✅ SVG見出し（控えめサイズ） */}
        <div className="mb-6 overflow-hidden">
          <div style={{ width: "min(22vw, 330px)", minWidth: 190 }}>
            <HandwrittenSvgTitle
              src="/yorisoi/about.svg"
              label="ABOUT"
              className="block w-full"
              mode="preserve"
              start="top 84%"
              once={true}
              revealY={10}
              revealBlur={0.12}
              revealDuration={0.66}
            />
          </div>
        </div>

        {/* ラベル */}
        <Reveal
          as="p"
          delay={0.0}
          y={14}
          blur={0.16}
          duration={0.68}
          className="
            text-[13px]
            tracking-[0.32em]
            text-[rgba(96,78,62,0.55)]
            mb-6
          "
        >
          寄り添いの理由
        </Reveal>

        {/* タイトル */}
        <Reveal
          as="h2"
          delay={0.06}
          y={14}
          blur={0.16}
          duration={0.68}
          className="
            text-[clamp(26px,3vw,34px)]
            leading-[1.42]
            text-[#5d4c3f]
            font-medium
            tracking-[0.005em]
            max-w-[760px]
          "
        >
          気をつかわず、任せられる距離感。
        </Reveal>

        {/* 本文（抽象を増やさず、初回が安心する順） */}
        <Reveal
          delay={0.12}
          y={14}
          blur={0.16}
          duration={0.68}
          className="
            mt-10
            text-[15.75px]
            leading-[2.0]
            text-[rgba(96,78,62,0.82)]
            max-w-[44em]
          "
        >
          <p className="mb-5">
            髪の悩みは人それぞれです。<br />
            しっかり相談して決めたい日もあれば、今日は長さを揃えるだけで十分な日もある。
          </p>

          <p className="mb-5">
            最初に「気になるところ」と「普段のセット」を確認して、<br />
            無理なく合う形を一緒に決めていきます。
          </p>

          <p className="mb-0">
            仕上げは、家でも同じ形になりやすいように収めます。<br />
            朝のセットが楽になるラインを目指します。
          </p>
        </Reveal>


        {/* 写真 */}
        <Reveal delay={0.20} y={14} blur={0.14} duration={0.68} className="mt-14 w-full">
          <img
            src="/yorisoi/about2.png"
            alt="ヨリソイの店内の雰囲気"
            loading="lazy"
            decoding="async"
            className="
              w-full object-cover
              rounded-[6px]
              shadow-[0_8px_26px_rgba(0,0,0,0.10)]
              [filter:brightness(1.02)_contrast(0.94)]
            "
          />
        </Reveal>

   <Reveal
  as="p"
  delay={0.26}
  y={14}
  blur={0.14}
  duration={0.68}
  className="
    mt-10
    text-[14.5px]
    text-[rgba(96,78,62,0.72)]
    leading-[1.95]
    max-w-[760px]
  "
>
  お客さまの雰囲気に合わせて、進め方をこちらで調整します。<br />
  気になるところだけ、先に聞かせてください。
</Reveal>
      </div>
    </section>
  );
}