// src/sections/Concept.jsx
import { useMemo } from "react";
import { Reveal } from "../components/Reveal";

export default function Concept() {
  const POINTS = useMemo(
    () => [
      {
        kicker: "POINT 01",
        title: "半個室の2席で、落ち着いて進める。",
        desc: "周りが気になりにくい空間で、最初から最後まで店主が担当します。",
        sub: ["席数は2席", "店主が通しで担当"],
        img: "/yorisoi/concept-room.png",
        alt: "ヨリソイ Hair＆Spaの半個室の店内",
        cap: "SCENE 01 / ROOM",
        aspect: "aspect-[16/10]",
      },
      {
        kicker: "POINT 02",
        title: "先に把握して、方向を決める。",
        desc: "直したい点と日頃の手入れを先に聞き取り、\n骨格や毛流れを見ながら、その人に合う形を見立てます。",
        sub: ["途中で変わってOK", "必要なことから順に進める"],
        img: "/yorisoi/concept-cut1.png",
        alt: "ヨリソイ Hair＆Spaで施術前に髪型を確認している様子",
        cap: "SCENE 02 / CUT",
        aspect: "aspect-[16/10]",
      },
      {
        kicker: "POINT 03",
        title: "翌朝の手入れが、ラクになる形へ。",
        desc: "乾かして手ぐしで形が出るように。\nセットに時間をかけずに済む仕上がりを目指します。",
        sub: ["乾かして形が出る", "髪質・骨格に応じて調整"],
        img: "/yorisoi/concept-home.png",
        alt: "自宅で髪を整える男性の朝の支度",
        cap: "SCENE 03 / HOME",
        aspect: "aspect-[4/3]",
      },
    ],
    []
  );

  return (
    <section
      id="concept"
      className="
        relative isolate w-full overflow-hidden
        bg-base
        pt-[18vh] pb-[18vh] px-[8vw]
      "
      aria-labelledby="concept-title"
    >
      <p className="sr-only">
        ヨリソイ Hair＆Spaが任せやすい理由です。半個室の2席、店主によるマンツーマン対応、
        施術前の確認、骨格や毛流れに合わせたメンズカット、朝の手入れがしやすい仕上がりについて紹介しています。
      </p>

      {/* 背景：鳥は気配だけ */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/yorisoi/bird.png"
          alt=""
          className="
            w-full h-full object-cover
            opacity-[0.10]
            scale-[1.04]
            [filter:brightness(1.05)_contrast(0.92)]
          "
        />

        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_28%_22%,rgba(255,253,249,0.72),rgba(255,253,249,0.16)_62%,rgba(247,244,239,0.95)_100%)]
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <header className="max-w-[860px]">
          <Reveal
            as="p"
            data-kicker
            y={12}
            blur={0.14}
            duration={0.62}
            className="mb-4 text-[13px] tracking-[0.32em] text-ink/55"
          >
            CONCEPT
          </Reveal>

          <Reveal
            as="h2"
            id="concept-title"
            delay={0.06}
            y={12}
            blur={0.14}
            duration={0.62}
            className="
              text-[clamp(28px,3vw,36px)]
              leading-[1.42]
              text-ink/90
              font-medium
            "
          >
            任せやすい理由を、3つにまとめました。
          </Reveal>

          <Reveal
            delay={0.12}
            y={12}
            blur={0.14}
            duration={0.62}
            className="
              mt-8
              text-[15.8px]
              leading-[2.05]
              text-ink/78
              max-w-[760px]
            "
          >
            空間で落ち着けて、先に方向が決まって、最後は手がかからない仕上がりへ。
            <br />
            この順番が、いちばん自然だと思っています。
          </Reveal>

          <Reveal
            delay={0.18}
            y={10}
            blur={0.12}
            duration={0.58}
            className="
              mt-10
              h-px
              w-[62%]
              bg-[linear-gradient(to_right,rgba(96,78,62,0.18),rgba(96,78,62,0.04),rgba(96,78,62,0))]
            "
            aria-hidden="true"
          />
        </header>

        <div className="mt-[10vh] space-y-[12vh]">
          {POINTS.map((point, index) => {
            const flip = index === 1;

            const bleed = flip
              ? "md:-ml-[8vw] md:pr-[2vw]"
              : "md:-mr-[8vw] md:pl-[2vw]";

            const textOrder = flip ? "md:order-2" : "md:order-1";
            const imageOrder = flip ? "md:order-1" : "md:order-2";
            const textAlign = flip ? "md:text-right" : "md:text-left";
            const subAlign = flip ? "md:justify-end" : "";
            const seamAlign = flip ? "md:ml-auto" : "";

            return (
              <section
                key={point.kicker}
                className="pt-14 border-t border-ink/12"
                aria-labelledby={`concept-point-${index + 1}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-10 items-start">
                  <div className={`md:col-span-4 ${textOrder} ${textAlign}`}>
                    <Reveal
                      as="p"
                      data-kicker
                      y={12}
                      blur={0.14}
                      duration={0.62}
                      className="mb-3 text-[11px] tracking-[0.28em] text-ink/55"
                    >
                      {point.kicker}
                    </Reveal>

                    <Reveal
                      as="h3"
                      id={`concept-point-${index + 1}`}
                      delay={0.06}
                      y={12}
                      blur={0.14}
                      duration={0.62}
                      className="
                        text-[19px]
                        leading-[1.7]
                        text-ink/90
                        font-medium
                      "
                    >
                      {point.title}
                    </Reveal>

                    <Reveal
                      delay={0.12}
                      y={12}
                      blur={0.14}
                      duration={0.62}
                      className="
                        mt-3
                        text-[15px]
                        leading-[1.98]
                        text-ink/76
                        whitespace-pre-line
                      "
                    >
                      {point.desc}
                    </Reveal>

                    <Reveal
                      delay={0.18}
                      y={10}
                      blur={0.12}
                      duration={0.58}
                      className={`
                        mt-6
                        flex flex-wrap gap-x-4 gap-y-2
                        text-[12.8px]
                        tracking-[0.06em]
                        text-ink/62
                        ${subAlign}
                      `}
                    >
                      {point.sub.map((text) => (
                        <span key={text} className="inline-flex items-center gap-2">
                          <span className="h-px w-[10px] bg-ink/28" aria-hidden="true" />
                          {text}
                        </span>
                      ))}
                    </Reveal>

                    <Reveal
                      delay={0.22}
                      y={8}
                      blur={0.12}
                      duration={0.54}
                      className={`mt-10 h-px w-[72%] bg-ink/14 ${seamAlign}`}
                      aria-hidden="true"
                    />
                  </div>

                  <figure className={`md:col-span-8 ${imageOrder} ${bleed}`}>
                    <Reveal y={12} blur={0.12} duration={0.62}>
                      <img
                        src={point.img}
                        alt={point.alt}
                        loading="lazy"
                        decoding="async"
                        className={`
                          w-full object-cover
                          rounded-[4px]
                          border border-ink/10
                          shadow-[0_10px_26px_rgba(72,55,40,0.08)]
                          [filter:brightness(1.02)_contrast(0.95)_saturate(0.97)]
                          ${point.aspect}
                        `}
                      />
                    </Reveal>

                    <Reveal
                      as="figcaption"
                      delay={0.06}
                      y={10}
                      blur={0.10}
                      duration={0.56}
                      className="mt-3 text-[11px] tracking-[0.20em] text-ink/58"
                    >
                      {point.cap}
                    </Reveal>
                  </figure>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}