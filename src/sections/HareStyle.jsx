// src/sections/HareStyle.jsx
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "../components/Reveal";
import {
  FALLBACK_HAIRSTYLES,
  fetchHairstyles,
} from "../lib/hairstylesClient";

const STYLE_URL = "https://beauty.hotpepper.jp/slnH000706136/style/";

function StyleCard({ style, index, total }) {
  const no = String((index % total) + 1).padStart(2, "0");

  return (
    <figure
      aria-hidden={style._dup ? "true" : "false"}
      className="
        group relative
        min-w-[66vw] sm:min-w-[46vw] lg:min-w-[27vw]
        max-w-[380px]
        aspect-[4/5]
        overflow-hidden
        rounded-[2px]
        border border-ink/10
        shadow-[0_10px_26px_rgba(72,55,40,0.085)]
        bg-surface
      "
    >
      <img
        src={style.img}
        alt={style._dup ? "" : style.name}
        draggable={false}
        className="
          w-full h-full object-cover
          scale-[1.02]
          select-none pointer-events-none
          [filter:brightness(1.01)_contrast(0.97)_saturate(0.98)]
          transition-transform duration-[1200ms] ease-out
          group-hover:scale-[1.045]
        "
        loading="lazy"
        decoding="async"
      />

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-[linear-gradient(to_top,rgba(18,15,13,0.78),rgba(18,15,13,0.30)_42%,rgba(18,15,13,0.06)_72%,rgba(18,15,13,0.00))]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          shadow-[inset_0_-105px_90px_rgba(18,15,13,0.30)]
        "
      />

      <div className="absolute left-0 top-0 z-10 flex items-center">
        <div
          className="
            px-3 py-2
            text-[10px]
            tracking-[0.24em]
            text-white
            bg-[rgba(18,15,13,0.42)]
            backdrop-blur-[2px]
            drop-shadow-[0_1px_7px_rgba(0,0,0,0.55)]
          "
        >
          {style.tag}
        </div>

        <div
          className="
            px-3 py-2
            text-[10px]
            tracking-[0.20em]
            text-white/78
            drop-shadow-[0_1px_7px_rgba(0,0,0,0.55)]
          "
        >
          STYLE {no}
        </div>
      </div>

      <figcaption
        className="
          absolute bottom-0 left-0 right-0 z-10
          px-4 py-4
        "
      >
        <p
          className="
            mb-1.5
            text-[10px]
            tracking-[0.22em]
            text-white/72
            drop-shadow-[0_1px_7px_rgba(0,0,0,0.65)]
          "
        >
          HAIR STYLE
        </p>

        <h3
          className="
            text-[15.5px]
            leading-[1.42]
            font-medium
            text-white
            drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]
          "
        >
          {style.name}
        </h3>
      </figcaption>
    </figure>
  );
}

export default function HareStyle() {
  const [cmsStyles, setCmsStyles] = useState([]);

  useEffect(() => {
    const ac = new AbortController();

    fetchHairstyles({ signal: ac.signal })
      .then((data) => {
        if (!ac.signal.aborted) {
          setCmsStyles(Array.isArray(data) ? data : []);
        }
      })
      .catch((error) => {
        if (error?.name !== "AbortError") {
          console.warn("HAIR STYLE CMS set error:", error);
        }
      });

    return () => ac.abort();
  }, []);

  const styles = useMemo(() => {
    return cmsStyles.length > 0 ? cmsStyles : FALLBACK_HAIRSTYLES;
  }, [cmsStyles]);

  const loop = useMemo(() => {
    return [...styles, ...styles].map((style, index) => ({
      ...style,
      _dup: index >= styles.length,
      _key: `${style.id || style.name}-${index}`,
    }));
  }, [styles]);

  return (
    <section
      id="hare-style"
      className="
        relative isolate
        w-full bg-base
        pt-[18vh] pb-[14vh] px-[4vw]
        overflow-hidden
      "
      aria-labelledby="hare-style-title"
    >
      <p className="sr-only">
        ヨリソイ Hair＆Spaのメンズヘアスタイル。パーマ、フェード、スペインカール、
        ニュアンスパーマなどの施術スタイルを写真で紹介しています。
      </p>

      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_72%_4%,rgba(255,253,249,0.72),rgba(255,253,249,0.12)_46%,rgba(247,243,236,0.98)_100%)]
          "
        />

        <div
          className="
            absolute right-[4vw] top-[8vh]
            text-[clamp(74px,8vw,132px)]
            leading-none
            tracking-[-0.10em]
            text-ink/[0.024]
            font-serif
          "
        >
          STYLE
        </div>
      </div>

      <div className="mx-auto max-w-[900px] mb-14">
        <div aria-hidden="true" className="mb-9 flex items-center gap-5">
          <span className="text-[11px] tracking-[0.26em] text-ink/38">
            04 / STYLE
          </span>
          <span className="h-px flex-1 bg-[linear-gradient(to_right,rgba(96,78,62,0.16),rgba(96,78,62,0.03),rgba(96,78,62,0))]" />
        </div>

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
          id="hare-style-title"
          delay={0.06}
          y={14}
          blur={0.16}
          duration={0.68}
          className="
            text-[clamp(27px,3vw,36px)]
            text-ink/90
            leading-[1.46]
            font-medium
            max-w-[780px]
            tracking-[-0.01em]
          "
        >
          パーマも、フェードも。
          <br />
          翌朝の支度が短く済む形を、写真で見せます。
        </Reveal>

        <Reveal
          delay={0.12}
          y={14}
          blur={0.14}
          duration={0.68}
          className="mt-6 text-[15px] leading-[1.95] text-ink/72 max-w-[760px]"
        >
          実際に施術したスタイルを掲載しています。
          <br />
          「雰囲気」よりも、扱いやすさが残る例を基準に。
        </Reveal>
      </div>

      <Reveal delay={0.16} y={14} blur={0.14} duration={0.68}>
        <div className="relative w-full overflow-hidden mb-[10vh]">
          <div className="mx-auto max-w-[1480px] mb-5 px-[1vw]">
            <div className="flex items-end justify-between gap-6 border-t border-ink/10 pt-4">
              <p className="text-[11px] tracking-[0.26em] text-ink/44">
                STYLE SAMPLE
              </p>

              <p className="text-[11px] tracking-[0.18em] text-ink/36">
                CMS UPDATED
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-y-0 left-0 w-[9vw] z-10
              bg-[linear-gradient(to_right,rgba(247,243,236,1),rgba(247,243,236,0))]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-y-0 right-0 w-[9vw] z-10
              bg-[linear-gradient(to_left,rgba(247,243,236,1),rgba(247,243,236,0))]
            "
          />

          <div
            className="
              flex gap-[2.4vw]
              whitespace-nowrap
              will-change-transform
              animate-styleLoop
            "
          >
            {loop.map((style, index) => (
              <StyleCard
                key={style._key}
                style={style}
                index={index}
                total={styles.length}
              />
            ))}
          </div>
        </div>
      </Reveal>

      <div className="text-center">
        <Reveal delay={0.20} y={12} blur={0.12} duration={0.62}>
          <a
            href={STYLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              text-[15px]
              text-ink/82
              tracking-[0.06em]
              border-b border-ink/24
              pb-1
              transition
              hover:text-ink
              hover:border-ink/48
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ink/15
              focus-visible:ring-offset-4
              focus-visible:ring-offset-base
            "
            aria-label="HotPepper Beautyでヘアスタイル写真を見る"
          >
            HotPepperでスタイルを見る
            <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
      </div>

      <style>{`
        @keyframes styleLoop {
          0% {
            transform: translate3d(0, 0, 0);
          }

          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .animate-styleLoop {
          animation: styleLoop 34s linear infinite;
        }

        @media (hover: hover) {
          .animate-styleLoop:hover {
            animation-play-state: paused;
          }
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