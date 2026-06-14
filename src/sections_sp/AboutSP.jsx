// src/sections_sp/AboutSP.jsx
import { Reveal } from "../components/Reveal";

export default function AboutSP() {
  return (
    <div
      className="
        relative w-full overflow-hidden bg-base
        pt-[18vh]
        px-[6vw]
        pb-[calc(76px+env(safe-area-inset-bottom))]
      "
      aria-label="ヨリソイについて"
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-[-24vw] top-[8vh]
          h-[34vh] w-[58vw] rounded-full
          bg-[radial-gradient(circle,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.24)_48%,rgba(255,255,255,0)_72%)]
          blur-[28px] opacity-[0.72]
        "
      />

      <div className="relative z-[2] mx-auto max-w-[520px]">
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

        <Reveal
          delay={0.05}
          y={12}
          blur={0.14}
          duration={0.62}
          className="overflow-hidden mb-3"
        >
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
          data-kicker
          delay={0.10}
          y={12}
          blur={0.14}
          duration={0.62}
          className="
            text-[11px]
            tracking-[0.24em]
            text-[rgba(96,78,62,0.50)]
            mb-3
          "
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
            mb-7
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
          "
        >
          <p>
            「ヨリソイ」は、お客様に寄り添った形を日々追求するサロンでございます。お客様が一生涯通いたくなるような、魅力的なサロンを目指しており、お客様の年代によって髪の悩みが異なりますので、一緒に考えながら年を重ねていきたいと思います。
          </p>
        </Reveal>

        <Reveal
          delay={0.28}
          y={12}
          blur={0.12}
          duration={0.62}
          className="mt-11 mx-[-6vw]"
        >
          <img
            src="/yorisoi/about2.png"
            alt="ヨリソイ Hair＆Spaの落ち着いた半個室空間"
            loading="lazy"
            decoding="async"
            className="
              w-full object-cover
              rounded-none
              shadow-[0_8px_24px_rgba(72,55,40,0.10)]
              [filter:brightness(1.02)_contrast(0.95)_saturate(0.96)]
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
            言いづらいことは途中のひと言でも大丈夫です。
          </p>
        </Reveal>
      </div>
    </div>
  );
}