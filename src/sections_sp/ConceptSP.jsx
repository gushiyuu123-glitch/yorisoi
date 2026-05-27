// src/sections_sp/ConceptSP.jsx
import { useMemo } from "react";
import { Reveal } from "../components/Reveal";

export default function ConceptSP() {
  const POINTS = useMemo(
    () => [
      {
        kicker: "POINT 01",
        title: "半個室の2席で、落ち着いて進める。",
        desc: "周りが気になりにくい空間で、最初から最後までしっかり担当します。",
        sub: ["席数は2席", "最初から最後まで担当"],
        img: "/yorisoi/concept-room.png",
        alt: "ヨリソイの店内（半個室の席）",
        cap: "SCENE 01 / ROOM",
        aspect: "aspect-[16/10]",
      },
      {
        kicker: "POINT 02",
        title: "先に確認して、迷わず決める。",
        desc: "「気になるところ」と「普段のセット」を先に聞いて、合う形を一緒に決めます。",
        sub: ["途中で変わってOK", "必要なことから順に進める"],
        img: "/yorisoi/concept-cut.png",
        alt: "施術前に確認している様子",
        cap: "SCENE 02 / CUT",
        aspect: "aspect-[16/10]",
      },
      {
        kicker: "POINT 03",
        title: "家でのセットが、楽になる形へ。",
        desc: "乾かして手ぐしで形が出るように。朝のセットが楽になる仕上がりを目指します。",
        sub: ["乾かして形が出る", "髪質・骨格に合わせて調整"],
        img: "/yorisoi/concept-home.png",
        alt: "自宅で髪を整える様子",
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
        pt-[12vh] pb-[18vh] px-[6vw]
        overflow-hidden
      "
      aria-label="コンセプト"
    >
      {/* 背景：鳥は気配だけ */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src="/yorisoi/bird.png"
          alt=""
          className="
            w-full h-full object-cover
            opacity-[0.12]
            scale-[1.08]
            [filter:brightness(1.06)_contrast(0.92)]
          "
        />
        <div
          className="
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(circle_at_30%_22%,rgba(255,253,249,0.70),rgba(255,253,249,0.18)_62%,rgba(247,244,239,0.94)_100%)]
          "
        />
      </div>

      <div className="mx-auto max-w-[560px]">
        {/* 見出し */}
        <Reveal
          as="p"
          y={12}
          blur={0.14}
          duration={0.60}
          className="text-[11px] tracking-[0.28em] text-ink/55 mb-3"
        >
          CONCEPT
        </Reveal>

        <Reveal
          as="h2"
          delay={0.06}
          y={12}
          blur={0.14}
          duration={0.60}
          className="text-[clamp(20px,6vw,26px)] leading-[1.48] text-ink/90 font-medium"
        >
          任せやすい理由を、<br />
          3つにまとめました。
        </Reveal>

        <Reveal
          delay={0.12}
          y={12}
          blur={0.14}
          duration={0.60}
          className="mt-7 text-[15px] leading-[1.95] text-ink/78"
        >
          店内の安心があって、先に確認して、最後は家で楽になる。
          <br />
          その順番が、いちばん自然だと思っています。
        </Reveal>

        <Reveal
          delay={0.18}
          y={10}
          blur={0.12}
          duration={0.56}
          className="mt-9 h-px w-[64%] bg-ink/14"
          aria-hidden
        />

        {/* POINTS */}
        <div className="mt-[9vh] space-y-[10vh]">
          {POINTS.map((p, i) => {
            const flip = i === 1;
            const textAlign = flip ? "text-right" : "text-left";
            const chipAlign = flip ? "justify-end" : "";

            return (
              <div key={p.kicker} className="pt-10 border-t border-ink/12">
                {/* 画像（SPはブリードで箱感を消す） */}
                <Reveal y={12} blur={0.12} duration={0.60}>
                  <figure className="-mx-[6vw]">
                    <img
                      src={p.img}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                      className={`
                        w-full object-cover
                        [filter:brightness(1.02)_contrast(0.95)]
                        shadow-[0_10px_26px_rgba(0,0,0,0.10)]
                        ${p.aspect}
                      `}
                    />
                    <figcaption className="px-[6vw] mt-3 text-[11px] tracking-[0.20em] text-ink/58">
                      {p.cap}
                    </figcaption>
                  </figure>
                </Reveal>

                {/* テキスト */}
                <div className={`mt-7 ${textAlign}`}>
                  <Reveal
                    y={12}
                    blur={0.14}
                    duration={0.60}
                    className="text-[11px] tracking-[0.28em] text-ink/55 mb-3"
                  >
                    {p.kicker}
                  </Reveal>

                  <Reveal
                    delay={0.06}
                    y={12}
                    blur={0.14}
                    duration={0.60}
                    as="h3"
                    className="text-[18px] leading-[1.65] text-ink/90 font-medium"
                  >
                    {p.title}
                  </Reveal>

                  <Reveal
                    delay={0.12}
                    y={12}
                    blur={0.14}
                    duration={0.60}
                    className="mt-3 text-[14.6px] leading-[1.95] text-ink/76"
                  >
                    {p.desc}
                  </Reveal>

                  <Reveal
                    delay={0.18}
                    y={10}
                    blur={0.12}
                    duration={0.56}
                    className={`mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[12.5px] tracking-[0.06em] text-ink/62 ${chipAlign}`}
                  >
                    {p.sub.map((s, idx) => (
                      <span key={idx} className="inline-flex items-center gap-2">
                        <span className="h-[1px] w-[10px] bg-ink/28" aria-hidden />
                        {s}
                      </span>
                    ))}
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}