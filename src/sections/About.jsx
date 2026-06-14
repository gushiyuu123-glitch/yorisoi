// src/sections/About.jsx
import { Reveal } from "../components/Reveal";
import HandwrittenSvgTitle from "../components/HandwrittenSvgTitle";

export default function About() {
  return (
    <section
      id="about"
      className="
        relative isolate
        w-full overflow-hidden bg-base
        pt-[18vh] pb-[14vh] px-[8vw]
      "
      aria-labelledby="about-title"
    >
      {/* 空気だけ */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-[-18vw] top-[8vh] -z-10
          h-[52vh] w-[48vw] rounded-full
          bg-[radial-gradient(circle,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.24)_46%,rgba(255,255,255,0)_72%)]
          blur-[34px] opacity-[0.68]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute right-[-16vw] bottom-[6vh] -z-10
          h-[46vh] w-[42vw] rounded-full
          bg-[radial-gradient(circle,rgba(214,199,178,0.20)_0%,rgba(214,199,178,0.07)_48%,rgba(214,199,178,0)_72%)]
          blur-[38px] opacity-[0.68]
        "
      />

      <p className="sr-only">
        ヨリソイ Hair＆Spaについて。お客様に寄り添い、年代ごとの髪の悩みを一緒に考えながら、
        一生涯通いたくなるようなサロンを目指しています。
      </p>

      <div className="relative mx-auto max-w-[900px]">
        {/* 小さな編集線 */}
        <div
          aria-hidden="true"
          className="
            mb-10
            flex items-center gap-5
          "
        >

          <span className="h-px flex-1 bg-[linear-gradient(to_right,rgba(96,78,62,0.16),rgba(96,78,62,0.03),rgba(96,78,62,0))]" />
        </div>

        <div className="mb-6 overflow-hidden">
          <div
            style={{
              width: "min(22vw, 330px)",
              minWidth: 190,
              opacity: 0.94,
              filter: "contrast(0.92) saturate(0.92)",
            }}
          >
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
            mb-6
            text-[13px]
            tracking-[0.32em]
            text-[rgba(96,78,62,0.55)]
          "
        >
          任せやすさの理由
        </Reveal>

        <Reveal
          as="h2"
          id="about-title"
          delay={0.06}
          y={14}
          blur={0.16}
          duration={0.68}
          className="
            max-w-[760px]
            text-[clamp(27px,3vw,36px)]
            leading-[1.46]
            text-[#5d4c3f]
            font-medium
            tracking-[0.002em]
          "
        >
          かまえず頼める、ちょうどいい距離感。
        </Reveal>

        <Reveal
          delay={0.12}
          y={14}
          blur={0.16}
          duration={0.68}
          className="
            mt-10
            max-w-[44em]
            text-[15.75px]
            leading-[2.05]
            text-[rgba(96,78,62,0.82)]
          "
        >
          <p className="mb-0">
            「ヨリソイ」は、お客様に寄り添った形を日々追求するサロンでございます。
            お客様が一生涯通いたくなるような、魅力的なサロンを目指しており、
            お客様の年代によって髪の悩みが異なりますので、
            一緒に考えながら年を重ねていきたいと思います。
          </p>
        </Reveal>

        <Reveal
          delay={0.20}
          y={14}
          blur={0.14}
          duration={0.68}
          className="mt-14 w-full"
        >
          <figure>
            <div
              className="
                mb-4
                flex items-center justify-between gap-6
                border-t border-[rgba(96,78,62,0.12)]
                pt-4
              "
            >
              <p className="text-[11px] tracking-[0.24em] text-[rgba(96,78,62,0.42)]">
                PRIVATE ROOM
              </p>

              <p className="text-[11px] tracking-[0.16em] text-[rgba(96,78,62,0.34)]">
                YORISOI HAIR &amp; SPA
              </p>
            </div>

            <img
              src="/yorisoi/about2.png"
              alt="ヨリソイ Hair＆Spaの落ち着いた半個室空間"
              loading="lazy"
              decoding="async"
              className="
                w-full object-cover
                rounded-[2px]
                shadow-[0_10px_30px_rgba(72,55,40,0.095)]
                [filter:brightness(1.025)_contrast(0.94)_saturate(0.96)]
              "
            />
          </figure>
        </Reveal>

        <Reveal
          as="p"
          delay={0.26}
          y={14}
          blur={0.14}
          duration={0.68}
          className="
            mt-10
            max-w-[760px]
            border-l border-[rgba(96,78,62,0.14)]
            pl-6
            text-[14.5px]
            text-[rgba(96,78,62,0.72)]
            leading-[1.95]
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