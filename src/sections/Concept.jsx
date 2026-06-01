// src/sections/Concept.jsx
import { useMemo } from "react";
import { Reveal } from "../components/Reveal";

export default function Concept() {
  const POINTS = useMemo(
    () => [
      {
        kicker: "POINT 01",
        title: "半個室の2席で、落ち着いて進める。",
        desc: "周りが気になりにくい空間で、最初から最後までひとりが担当します。",
        sub: ["席数は2席", "ひとりが通しで担当"],
        img: "/yorisoi/concept-room.png",
        alt: "ヨリソイの店内（半個室の席）",
        cap: "SCENE 01 / ROOM",
        aspect: "aspect-[16/10]",
      },
      {
        kicker: "POINT 02",
        title: "先に把握して、方向を決める。",
        desc: "直したい点と日頃のスタイリングを先に聞き取り、\nその人向きの形を見立てます。",
        sub: ["途中で変わってOK", "必要なことから順に進める"],
        img: "/yorisoi/concept-cut1.png",
        alt: "施術前に確認している様子",
        cap: "SCENE 02 / CUT",
        aspect: "aspect-[16/10]",
      },
      {
        kicker: "POINT 03",
        title: "翌朝の手順が、少なくなる形へ。",
        desc: "乾かして手ぐしで形が出るように。セットに時間をかけずに済む仕上がりを目指します。",
        sub: ["乾かして形が出る", "髪質・骨格に応じて調整"],
        img: "/yorisoi/concept-home.png",
        alt: "自宅で髪を支度している様子",
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
        relative w-full bg-base
        pt-[18vh] pb-[18vh] px-[8vw]
        overflow-hidden
      "
      aria-label="コンセプト"
    >
      {/* 背景：鳥は“気配”に留める */}
      <div aria-hidden className="absolute inset-0 -z-10">
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
            bg-[radial-gradient(circle_at_28%_22%,rgba(255,253,249,0.72),rgba(255,253,249,0.16)_62%,rgba(247,244,239,0.93)_100%)]
          "
        />
      </div>

      <div className="mx-auto max-w-[1280px]">
        {/* 見出し */}
        <header className="max-w-[860px]">
          <Reveal
            as="p"
            y={12}
            blur={0.14}
            duration={0.62}
            className="text-[13px] tracking-[0.32em] text-ink/55 mb-4"
          >
            CONCEPT
          </Reveal>

          <Reveal
            as="h2"
            delay={0.06}
            y={12}
            blur={0.14}
            duration={0.62}
            className="text-[clamp(26px,3vw,34px)] leading-[1.42] text-ink/90 font-medium"
          >
            任せやすい理由を、3つにまとめました。
          </Reveal>

          <Reveal
            delay={0.12}
            y={12}
            blur={0.14}
            duration={0.62}
            className="mt-8 text-[15.5px] leading-[2.0] text-ink/78"
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
            className="mt-10 h-px w-[62%] bg-ink/14"
            aria-hidden
          />
        </header>

        {/* POINT */}
        <div className="mt-[10vh] space-y-[12vh]">
          {POINTS.map((p, i) => {
            const flip = i === 1;
            const bleed = flip
              ? "md:-ml-[8vw] md:pr-[2vw]"
              : "md:-mr-[8vw] md:pl-[2vw]";
            const textAlign = flip ? "md:text-right" : "md:text-left";
            const subAlign = flip ? "md:justify-end" : "";
            const seamAlign = flip ? "md:ml-auto" : "";

            return (
              <div key={p.kicker} className="pt-14 border-t border-ink/12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-10 items-start">
                  {/* TEXT */}
                  <div
                    className={`md:col-span-4 ${
                      flip ? "md:order-2" : "md:order-1"
                    } ${textAlign}`}
                  >
                    <Reveal
                      y={12}
                      blur={0.14}
                      duration={0.62}
                      className="text-[11px] tracking-[0.28em] text-ink/55 mb-3"
                    >
                      {p.kicker}
                    </Reveal>

                    <Reveal
                      delay={0.06}
                      y={12}
                      blur={0.14}
                      duration={0.62}
                      as="h3"
                      className="text-[18px] leading-[1.7] text-ink/90 font-medium"
                    >
                      {p.title}
                    </Reveal>

                    <Reveal
                      delay={0.12}
                      y={12}
                      blur={0.14}
                      duration={0.62}
                      className="mt-3 text-[14.8px] leading-[1.95] text-ink/76 whitespace-pre-line"
                    >
                      {p.desc}
                    </Reveal>

                    <Reveal
                      delay={0.18}
                      y={10}
                      blur={0.12}
                      duration={0.58}
                      className={`mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[12.5px] tracking-[0.06em] text-ink/62 ${subAlign}`}
                    >
                      {p.sub.map((s, idx) => (
                        <span key={idx} className="inline-flex items-center gap-2">
                          <span className="h-[1px] w-[10px] bg-ink/28" aria-hidden />
                          {s}
                        </span>
                      ))}
                    </Reveal>

                    <Reveal
                      delay={0.22}
                      y={8}
                      blur={0.12}
                      duration={0.54}
                      className={`mt-10 h-px w-[72%] bg-ink/14 ${seamAlign}`}
                      aria-hidden
                    />
                  </div>

                  {/* IMAGE */}
                  <figure
                    className={`${
                      flip
                        ? "md:col-span-8 md:order-1"
                        : "md:col-span-8 md:order-2"
                    } ${bleed}`}
                  >
                    <Reveal y={12} blur={0.12} duration={0.62}>
                      <img
                        src={p.img}
                        alt={p.alt}
                        loading="lazy"
                        decoding="async"
                        className={`
                          w-full object-cover
                          rounded-[6px]
                          border border-ink/10
                          shadow-[0_10px_26px_rgba(0,0,0,0.08)]
                          [filter:brightness(1.02)_contrast(0.95)]
                          ${p.aspect}
                        `}
                      />
                    </Reveal>

                    <Reveal
                      delay={0.06}
                      y={10}
                      blur={0.10}
                      duration={0.56}
                      as="figcaption"
                      className="mt-3 text-[11px] tracking-[0.20em] text-ink/58"
                    >
                      {p.cap}
                    </Reveal>
                  </figure>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}