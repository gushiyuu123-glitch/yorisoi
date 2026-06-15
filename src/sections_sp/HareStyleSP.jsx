// src/sections_sp/HareStyleSP.jsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "../components/Reveal";
import {
  FALLBACK_HAIRSTYLES,
  fetchHairstyles,
} from "../lib/hairstylesClient";

const STYLE_URL = "https://beauty.hotpepper.jp/slnH000706136/style/";

function StyleCardSP({ style }) {
  return (
    <figure
      className="
        relative
        snap-start
        min-w-[76vw]
        max-w-[360px]
        aspect-[4/5]
        overflow-hidden
        border border-ink/10
        bg-surface
        shadow-[0_10px_24px_rgba(72,55,40,0.10)]
      "
    >
      <img
        src={style.img}
        alt={style.name}
        draggable={false}
        loading="lazy"
        decoding="async"
        className="
          h-full w-full object-cover
          scale-[1.02]
          select-none pointer-events-none
          [filter:brightness(1.01)_contrast(0.97)_saturate(0.98)]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-[linear-gradient(to_top,rgba(20,17,15,0.76),rgba(20,17,15,0.24)_42%,rgba(20,17,15,0.04)_72%,rgba(20,17,15,0.00))]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute left-0 top-0
          px-3 py-2
          bg-[rgba(20,17,15,0.40)]
          text-[10px]
          tracking-[0.24em]
          text-white
          backdrop-blur-[2px]
          drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]
        "
      >
        {style.tag}
      </div>

      <figcaption
        className="
          absolute bottom-0 left-0 right-0
          px-4 pt-12 pb-4
          bg-[linear-gradient(to_top,rgba(8,7,6,0.88)_0%,rgba(8,7,6,0.58)_52%,rgba(8,7,6,0.00)_100%)]
        "
      >
        <p
          className="
            mb-2
            inline-block
            text-[10.5px]
            tracking-[0.26em]
            font-semibold
            !text-white
            opacity-100
          "
          style={{
            textShadow:
              "0 1px 2px rgba(0,0,0,0.95), 0 4px 14px rgba(0,0,0,0.85)",
          }}
        >
          HAIR STYLE
        </p>

        <h3
          className="
            text-[15px]
            leading-[1.45]
            font-medium
            !text-white
            opacity-100
          "
          style={{
            textShadow:
              "0 2px 4px rgba(0,0,0,0.9), 0 6px 18px rgba(0,0,0,0.7)",
          }}
        >
          {style.name}
        </h3>
      </figcaption>
    </figure>
  );
}

export default function HareStyleSP() {
  const scrollerRef = useRef(null);

  const [cmsStyles, setCmsStyles] = useState([]);
  const [canSwipe, setCanSwipe] = useState(false);
  const [showRight, setShowRight] = useState(false);

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
          console.warn("HAIR STYLE SP CMS set error:", error);
        }
      });

    return () => ac.abort();
  }, []);

  const styles = useMemo(() => {
    return cmsStyles.length > 0 ? cmsStyles : FALLBACK_HAIRSTYLES;
  }, [cmsStyles]);

  const updateSwipeState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft || 0;
    const max = el.scrollWidth - el.clientWidth;

    const can = max > 6;
    setCanSwipe(can);

    if (!can) {
      setShowRight(false);
      return;
    }

    setShowRight(scrollLeft < max - 10);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateSwipeState);
    };

    updateSwipeState();

    el.addEventListener("scroll", onScroll, { passive: true });

    let ro;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(updateSwipeState);
      ro.observe(el);
    } else {
      window.addEventListener("resize", updateSwipeState, { passive: true });
    }

    const timer = window.setTimeout(updateSwipeState, 240);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      ro?.disconnect?.();
      window.removeEventListener("resize", updateSwipeState);
      window.clearTimeout(timer);
    };
  }, [updateSwipeState]);

  useEffect(() => {
    const timer = window.setTimeout(updateSwipeState, 160);
    return () => window.clearTimeout(timer);
  }, [styles.length, updateSwipeState]);

  const scrollNext = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = Math.round(el.clientWidth * 0.78);

    el.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      id="hare-style-sp"
      className="
        relative isolate w-full overflow-hidden
        bg-base
        pt-[13vh]
        px-[6vw]
        pb-[calc(10vh+env(safe-area-inset-bottom))]
      "
      aria-labelledby="hare-style-sp-title"
    >
      <p className="sr-only">
        ヨリソイ Hair＆Spaのメンズヘアスタイルです。メンズパーマ、フェード、
        スペインカール、ツイスト、ニュアンスパーマなどの施術例を掲載しています。
      </p>

      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_76%_6%,rgba(255,253,249,0.70),rgba(255,253,249,0.14)_50%,rgba(247,244,239,0.98)_100%)]
          "
        />

        <div
          className="
            absolute right-[3vw] top-[8vh]
            text-[18vw]
            leading-none
            tracking-[-0.10em]
            text-ink/[0.026]
            font-serif
          "
        >
          STYLE
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[560px]">
        <header className="mb-9">
          <Reveal
            as="p"
            y={12}
            blur={0.12}
            duration={0.62}
            className="mb-4 text-[12px] tracking-[0.30em] text-ink/55"
          >
            MEN&apos;S STYLE
          </Reveal>

          <Reveal
            as="h2"
            id="hare-style-sp-title"
            delay={0.06}
            y={12}
            blur={0.12}
            duration={0.62}
            className="
              text-[clamp(24px,6.4vw,28px)]
              leading-[1.52]
              tracking-[-0.01em]
              text-ink/90
              font-medium
            "
          >
            パーマも、フェードも。
            <br />
            手入れが軽い形へ。
          </Reveal>

          <Reveal
            delay={0.12}
            y={12}
            blur={0.1}
            duration={0.62}
            className="mt-5 text-[16px] leading-[1.9] text-ink/72"
          >
            施術例を写真で確認できます。
            仕上がりは、家での扱いやすさも見ながら整えます。
          </Reveal>
        </header>

        <Reveal delay={0.18} y={12} blur={0.1} duration={0.62}>
          <div className="relative mb-[7vh]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p
                className="
                  inline-block
                  text-[10px]
                  tracking-[0.36em]
                  font-light
                  text-ink/36
                  italic
                  -skew-x-[6deg]
                  origin-left
                  [font-family:'Cormorant_Garamond',serif]
                "
              >
                STYLE
              </p>

        
            </div>

            <div
              ref={scrollerRef}
              className="
                -mx-[6vw] px-[6vw]
                overflow-x-auto
                [scrollbar-width:none]
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
                snap-x snap-mandatory
                scroll-px-[6vw]
                touch-pan-x
              "
              aria-label="スタイル写真（横スワイプ）"
            >
              <div className="flex gap-[4.2vw]">
                {styles.map((style, index) => (
                  <StyleCardSP
                    key={style.id || `${style.name}-${index}`}
                    style={style}
                  />
                ))}

                <div aria-hidden="true" className="min-w-[6vw]" />
              </div>
            </div>

            {canSwipe && (
              <button
                type="button"
                onClick={scrollNext}
                aria-label="右のスタイル写真を見る"
                className={`
                  absolute
                  right-[2vw]
                  top-1/2
                  z-20
                  -translate-y-1/2

                  h-[42px]
                  w-[42px]
                  rounded-full

                  inline-flex items-center justify-center

                  bg-[rgba(247,244,239,0.46)]
                  border border-[rgba(255,255,255,0.48)]
                  text-[rgba(72,55,40,0.64)]

                  backdrop-blur-[8px]
                  backdrop-saturate-[1.08]

                  shadow-[0_1px_0_rgba(255,255,255,0.42)_inset,0_8px_22px_rgba(72,55,40,0.075)]

                  transition-[opacity,transform,filter]
                  duration-300
                  ease-[cubic-bezier(.22,.8,.24,1)]

                  active:scale-[0.94]

                  ${
                    showRight
                      ? "opacity-100 translate-x-0 pointer-events-auto blur-0"
                      : "opacity-0 translate-x-[10px] pointer-events-none blur-[1px]"
                  }
                `}
              >
                <span
                  aria-hidden="true"
                  className="
                    block
                    text-[24px]
                    leading-none
                    translate-x-[1px]
                  "
                >
                  →
                </span>
              </button>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.22} y={12} blur={0.08} duration={0.62}>
          <div className="text-center">
            <a
              href={STYLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                text-[14px]
                tracking-[0.055em]
                text-ink/76
                border-b border-ink/20
                pb-1
                transition
                active:opacity-70
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}