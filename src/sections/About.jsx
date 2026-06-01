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
          任せやすさの理由
        </Reveal>

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
          かまえず頼める、ちょうどいい距離感。
        </Reveal>

        {/* ✅ 本文：クライアント指定のコンセプト文に差し替え */}
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
          <p className="mb-0">
            「ヨリソイ」は、お客様に寄り添った形を日々追求するサロンでございます。お客様が一生涯通いたくなるような、魅力的なサロンを目指しており、お客様の年代によって髪の悩みが異なりますので、一緒に考えながら年を重ねていきたいと思います。
          </p>
        </Reveal>

        <Reveal delay={0.20} y={14} blur={0.14} duration={0.68} className="mt-14 w-full">
          <img
            src="/yorisoi/about2.png"
            alt="ヨリソイの空間イメージ"
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
          話す量も、進めるテンポも。その日の様子を見てこちらで調節します。
          <br />
          最初は、直したい点をおしえてください。
        </Reveal>
      </div>
    </section>
  );
}