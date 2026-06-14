// src/sections_sp/ConceptSP.jsx
import { useMemo } from "react";
import { Reveal } from "../components/Reveal";

export default function ConceptSP() {
  const POINTS = useMemo(
    () => [
      {
        kicker: "POINT 01",
        title: "半個室の2席で、落ち着いて進める。",
        desc: "まわりの視線が入りにくい空間で、最後まで店主が担当します。",
        sub: ["2席のみ", "店主が通しで担当"],
        img: "/yorisoi/concept-room.png",
        alt: "ヨリソイ Hair＆Spaの半個室の店内",
        cap: "SCENE 01 / ROOM",
        aspect: "aspect-[16/10]",
      },
      {
        kicker: "POINT 02",
        title: "先に聞き取って、迷いを減らす。",
        desc: "直したい所と日頃の手入れを先に押さえ、\nその人に合う形を見立てます。",
        sub: ["途中変更OK", "必要な順で進める"],
        img: "/yorisoi/concept-cut1.png",
        alt: "ヨリソイ Hair＆Spaで施術前に髪型を確認している様子",
        cap: "SCENE 02 / CUT",
        aspect: "aspect-[16/10]",
      },
      {
        kicker: "POINT 03",
        title: "翌朝の手入れが、ラクになる形へ。",
        desc: "乾かして手ぐしで形が出るように。\nセットに時間がかからない収まりを目指します。",
        sub: ["乾かして形が出る", "髪質・骨格に応じて微調整"],
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
        pt-[12vh] pb-[18vh] px-[6vw]
      "
      aria-labelledby="concept-sp-title"
    >
      <p className="sr-only">
        ヨリソイ Hair＆Spaが任せやすい理由です。半個室の2席、店主によるマンツーマン対応、
        施術前の確認、骨格や毛流れに合わせたメンズカット、朝の手入れがしやすい仕上がりについて紹介しています。
      </p>

      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/yorisoi/bird.png"
          alt=""
          className="
            w-full h-full object-cover
            opacity-[0.10]
            scale-[1.08]
            [filter:brightness(1.06)_contrast(0.92)]
          "
        />

        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_30%_22%,rgba(255,253,249,0.72),rgba(255,253,249,0.20)_62%,rgba(247,244,239,0.96)_100%)]
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[560px]">
        <Reveal
          as="p"
          data-kicker
          y={12}
          blur={0.12}
          duration={0.60}
          className="mb-3 text-[12px] tracking-[0.26em] text-ink/55"
        >
          CONCEPT
        </Reveal>

        <Reveal
          as="h2"
          id="concept-sp-title"
          delay={0.06}
          y={12}
          blur={0.12}
          duration={0.60}
          className="
            text-[clamp(24px,6.4vw,28px)]
            leading-[1.5]
            text-ink/90
            font-medium
          "
        >
          任せやすさを、
          <br />
          3つにまとめました。
        </Reveal>

        <Reveal
          delay={0.12}
          y={12}
          blur={0.12}
          duration={0.60}
          className="
            mt-7
            text-[16px]
            leading-[1.95]
            text-ink/78
          "
        >
          空間で落ち着けて、先に方向が決まって、最後は手がかからない仕上がりへ。
          <br />
          この流れが自然だと思っています。
        </Reveal>

        <Reveal
          delay={0.18}
          y={10}
          blur={0.10}
          duration={0.56}
          className="mt-9 h-px w-[64%] bg-ink/14"
          aria-hidden="true"
        />

        <div className="mt-[9vh] space-y-[10vh]">
          {POINTS.map((point, index) => (
            <section
              key={point.kicker}
              className="pt-10 border-t border-ink/12"
              aria-labelledby={`concept-sp-point-${index + 1}`}
            >
              <Reveal y={12} blur={0.10} duration={0.60}>
                <figure className="-mx-[6vw]">
                  <img
                    src={point.img}
                    alt={point.alt}
                    loading="lazy"
                    decoding="async"
                    className={`
                      w-full object-cover
                      shadow-[0_10px_26px_rgba(72,55,40,0.10)]
                      [filter:brightness(1.02)_contrast(0.95)_saturate(0.97)]
                      ${point.aspect}
                    `}
                  />

                  <figcaption
                    className="
                      px-[6vw]
                      mt-3
                      text-[11px]
                      tracking-[0.20em]
                      text-ink/58
                    "
                  >
                    {point.cap}
                  </figcaption>
                </figure>
              </Reveal>

              <div className="mt-7 text-left">
                <Reveal
                  as="p"
                  data-kicker
                  y={12}
                  blur={0.12}
                  duration={0.60}
                  className="mb-3 text-[12px] tracking-[0.26em] text-ink/55"
                >
                  {point.kicker}
                </Reveal>

                <Reveal
                  as="h3"
                  id={`concept-sp-point-${index + 1}`}
                  delay={0.06}
                  y={12}
                  blur={0.12}
                  duration={0.60}
                  className="
                    text-[20px]
                    leading-[1.62]
                    text-ink/90
                    font-medium
                  "
                >
                  {point.title}
                </Reveal>

                <Reveal
                  delay={0.12}
                  y={12}
                  blur={0.12}
                  duration={0.60}
                  className="
                    mt-3
                    text-[16px]
                    leading-[1.95]
                    text-ink/76
                    whitespace-pre-line
                  "
                >
                  {point.desc}
                </Reveal>

                <Reveal
                  delay={0.18}
                  y={10}
                  blur={0.10}
                  duration={0.56}
                  className="
                    mt-6
                    flex flex-wrap gap-x-4 gap-y-2
                    text-[13.5px]
                    leading-[1.8]
                    tracking-[0.04em]
                    text-ink/62
                  "
                >
                  {point.sub.map((text) => (
                    <span key={text} className="inline-flex items-center gap-2">
                      <span className="h-px w-[10px] bg-ink/28" aria-hidden="true" />
                      {text}
                    </span>
                  ))}
                </Reveal>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}