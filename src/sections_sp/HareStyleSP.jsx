// src/sections_sp/HareStyleSP.jsx
import { Reveal } from "../components/Reveal";

export default function HareStyleSP() {
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
      id="hare-style-sp"
      className="
        w-full bg-base
        pt-[14vh] pb-[calc(10vh+env(safe-area-inset-bottom))]
        px-[6vw]
        overflow-hidden
      "
      aria-label="メンズヘアスタイル"
    >
      {/* TITLE */}
      <div className="mx-auto max-w-[520px] mb-10">
        <Reveal
          as="p"
          delay={0.0}
          y={12}
          blur={0.14}
          duration={0.62}
          className="text-[11px] tracking-[0.32em] text-ink/55 mb-4"
        >
          MEN&apos;S STYLE
        </Reveal>

        <Reveal
          as="h2"
          delay={0.06}
          y={12}
          blur={0.14}
          duration={0.62}
          className="
            text-[clamp(20px,6vw,26px)]
            leading-[1.48]
            tracking-[0.005em]
            text-ink/90
            font-medium
          "
        >
          パーマも、フェードも。<br />
          朝が楽になる形を、写真で見せます。
        </Reveal>

        <Reveal
          delay={0.12}
          y={12}
          blur={0.12}
          duration={0.62}
          className="mt-4 text-[13.5px] leading-[1.9] text-ink/72"
        >
          実際に施術したスタイルを掲載しています。<br />
          扱いやすさが残る形を基準に。
        </Reveal>
      </div>

      {/* 横スクロール（SP ループ） */}
      <Reveal delay={0.16} y={12} blur={0.12} duration={0.62}>
        <div className="relative w-full overflow-hidden mb-[7vh]">
          {/* 端フェード（SPは少し広め） */}
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-y-0 left-0 w-[16vw] z-10
              bg-[linear-gradient(to_right,rgba(247,243,236,1),rgba(247,243,236,0))]
            "
          />
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-y-0 right-0 w-[16vw] z-10
              bg-[linear-gradient(to_left,rgba(247,243,236,1),rgba(247,243,236,0))]
            "
          />

          <div
            className="
              flex gap-[4.5vw]
              whitespace-nowrap
              will-change-transform
              animate-styleLoopSP
            "
          >
            {loop.map((s) => (
              <figure
                key={s._key}
                aria-hidden={s._dup ? "true" : "false"}
                className="
                  relative
                  min-w-[74vw]
                  max-w-[360px]
                  aspect-[4/5]
                  overflow-hidden
                  rounded-[6px]
                  border border-ink/10
                  shadow-[0_10px_28px_rgba(0,0,0,0.10)]
                  bg-surface
                "
              >
                <img
                  src={s.img}
                  alt={s._dup ? "" : s.name}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="
                    w-full h-full object-cover
                    scale-[1.02]
                    select-none pointer-events-none
                    [filter:brightness(1.01)_contrast(0.96)]
                  "
                />

                {/* 上：タグ */}
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

                {/* 下：スタイル名 */}
                <figcaption
                  className="
                    absolute bottom-0 left-0 right-0
                    px-4 py-3
                    text-[13.5px]
                    font-medium
                    text-[rgba(255,255,255,0.92)]
                    bg-[linear-gradient(to_top,rgba(46,42,39,0.58),rgba(46,42,39,0.00))]
                  "
                >
                  {s.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <div className="text-center">
        <Reveal delay={0.22} y={12} blur={0.12} duration={0.62}>
          <a
            href="https://beauty.hotpepper.jp/slnH000706136/style/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              text-[14px]
              text-ink/82
              tracking-[0.06em]
              underline underline-offset-4
              active:opacity-80
              transition
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
        @keyframes styleLoopSP {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-styleLoopSP {
          animation: styleLoopSP 18s linear infinite;
        }

        /* ✅ SPでは hover停止いらない */
        /* ✅ “pointer: coarse” では止めない（止まる原因だった） */

        @media (prefers-reduced-motion: reduce) {
          .animate-styleLoopSP {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}