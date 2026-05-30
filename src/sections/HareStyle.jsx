// src/sections/HareStyle.jsx
import { Reveal } from "../components/Reveal";

export default function HareStyle() {
  const styles = [
    { name: "スペインカール", img: "/yorisoi/style/spanish.png", tag: "PERM" },
    { name: "ツイスト＆ニュアンス", img: "/yorisoi/style/twist-nuance.png", tag: "PERM" },
    { name: "ニュアンスパーマ", img: "/yorisoi/style/nuance.png", tag: "PERM" },
    { name: "スパイラルパーマ", img: "/yorisoi/style/spiral.png", tag: "PERM" },
    { name: "波巻きパーマ", img: "/yorisoi/style/karma.png", tag: "PERM" },
    { name: "ローフェード", img: "/yorisoi/style/lowfade.png", tag: "CUT" },
    { name: "2ブロフェードスタイル", img: "/yorisoi/style/2bro.png", tag: "CUT" },
    { name: "プードルパーマ", img: "/yorisoi/style/poodle.png", tag: "PERM" },
  ];

  const loop = [...styles, ...styles].map((s, i) => ({
    ...s,
    _dup: i >= styles.length,
    _key: `${s.name}-${i}`,
  }));

  return (
    <section
      id="hare-style"
      className="
        w-full bg-base
        pt-[18vh] pb-[14vh] px-[4vw]
        overflow-hidden
      "
      aria-label="メンズヘアスタイル"
    >
      {/* TITLE */}
      <div className="mx-auto max-w-[820px] mb-14">
        <Reveal
          as="p"
          delay={0.0}
          y={14}
          blur={0.16}
          duration={0.68}
          className="text-[13px] tracking-[0.32em] text-ink/55 mb-6"
        >
          MEN&apos;S STYLE
        </Reveal>

        <Reveal
          as="h2"
          delay={0.06}
          y={14}
          blur={0.16}
          duration={0.68}
          className="
            text-[clamp(26px,3vw,34px)]
            text-ink/90
            leading-[1.45]
            font-medium
            max-w-[760px]
          "
        >
          パーマも、フェードも。<br />
          翌朝の支度が短く済む形を、写真で見せます。
        </Reveal>

        <Reveal
          delay={0.12}
          y={14}
          blur={0.14}
          duration={0.68}
          className="mt-6 text-[15px] leading-[1.95] text-ink/76 max-w-[760px]"
        >
          実際に施術したスタイルを掲載しています。<br />
          「雰囲気」よりも、扱いやすさが残る例を基準に。
        </Reveal>
      </div>

      {/* 横スクロール（自動ループ） */}
      <Reveal delay={0.16} y={14} blur={0.14} duration={0.68}>
        <div className="relative w-full overflow-hidden mb-[10vh]">
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-y-0 left-0 w-[8vw] z-10
              bg-[linear-gradient(to_right,rgba(247,243,236,1),rgba(247,243,236,0))]
            "
          />
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-y-0 right-0 w-[8vw] z-10
              bg-[linear-gradient(to_left,rgba(247,243,236,1),rgba(247,243,236,0))]
            "
          />

          <div
            className="
              flex gap-[3vw]
              whitespace-nowrap
              will-change-transform
              animate-styleLoop
            "
          >
            {loop.map((s) => (
              <figure
                key={s._key}
                aria-hidden={s._dup ? "true" : "false"}
                className="
                  relative
                  min-w-[66vw] sm:min-w-[46vw] lg:min-w-[28vw]
                  max-w-[380px]
                  aspect-[4/5]
                  overflow-hidden
                  rounded-[6px]
                  border border-ink/10
                  shadow-[0_10px_28px_rgba(0,0,0,0.09)]
                  bg-surface
                "
              >
                <img
                  src={s.img}
                  alt={s._dup ? "" : s.name}
                  draggable={false}
                  className="
                    w-full h-full object-cover
                    scale-[1.02]
                    select-none pointer-events-none
                    [filter:brightness(1.01)_contrast(0.96)]
                  "
                  loading="lazy"
                  decoding="async"
                />

                <div
                  className="
                    absolute left-0 top-0
                    px-3 py-2
                    text-[10px]
                    tracking-[0.24em]
                    text-[rgba(255,255,255,0.90)]
                    bg-[rgba(46,42,39,0.26)]
                    backdrop-blur-[2px]
                  "
                >
                  {s.tag}
                </div>

                <figcaption
                  className="
                    absolute bottom-0 left-0 right-0
                    px-4 py-3
                    text-[15px]
                    font-medium
                    text-[rgba(255,255,255,0.92)]
                    bg-[linear-gradient(to_top,rgba(46,42,39,0.56),rgba(46,42,39,0.00))]
                  "
                >
                  {s.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 外部リンク */}
      <div className="text-center">
        <Reveal delay={0.20} y={12} blur={0.12} duration={0.62}>
          <a
            href="https://beauty.hotpepper.jp/slnH000706136/style/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              text-[15px]
              text-ink/82
              tracking-[0.06em]
              underline underline-offset-4
              hover:opacity-70 transition
            "
          >
            他のスタイルも見る
          </a>

          <p className="mt-4 text-[12px] tracking-[0.18em] text-ink/50">
            ※ 最新の掲載は外部ページでご確認ください
          </p>
        </Reveal>
      </div>

      <style>{`
        @keyframes styleLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-styleLoop {
          animation: styleLoop 28s linear infinite;
        }
        @media (hover:hover) {
          .animate-styleLoop:hover { animation-play-state: paused; }
        }
        @media (prefers-reduced-motion: reduce), (pointer: coarse) {
          .animate-styleLoop {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}