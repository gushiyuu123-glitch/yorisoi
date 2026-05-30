// src/sections_sp/HareStyleSP.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "../components/Reveal";

export default function HareStyleSP() {
  const styles = useMemo(
    () => [
      { name: "スペインカール", img: "/yorisoi/style/spanish.png", tag: "PERM" },
      { name: "ツイスト＆ニュアンス", img: "/yorisoi/style/twist-nuance.png", tag: "PERM" },
      { name: "ニュアンスパーマ", img: "/yorisoi/style/nuance.png", tag: "PERM" },
      { name: "スパイラルパーマ", img: "/yorisoi/style/spiral.png", tag: "PERM" },
      { name: "波巻きパーマ", img: "/yorisoi/style/karma.png", tag: "PERM" },
      { name: "ローフェード", img: "/yorisoi/style/lowfade.png", tag: "CUT" },
      { name: "2ブロフェードスタイル", img: "/yorisoi/style/2bro.png", tag: "CUT" },
      { name: "プードルパーマ", img: "/yorisoi/style/poodle.png", tag: "PERM" },
    ],
    []
  );

  const scrollerRef = useRef(null);

  const [canSwipe, setCanSwipe] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      const x = el.scrollLeft || 0;
      const max = el.scrollWidth - el.clientWidth;

      const can = max > 6;
      setCanSwipe(can);

      if (!can) {
        setShowLeft(false);
        setShowRight(false);
        return;
      }

      const atStart = x <= 6;
      const atEnd = x >= max - 6;

      setShowLeft(!atStart);
      setShowRight(!atEnd);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });

    let ro;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => update());
      ro.observe(el);
    } else {
      window.addEventListener("resize", update, { passive: true });
    }

    const t = window.setTimeout(update, 220);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      ro?.disconnect?.();
      window.removeEventListener("resize", update);
      window.clearTimeout(t);
    };
  }, []);

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
          手入れが軽い方向を、写真で見せます。
        </Reveal>

        <Reveal
          delay={0.12}
          y={12}
          blur={0.12}
          duration={0.62}
          className="mt-4 text-[13.5px] leading-[1.9] text-ink/72"
        >
          施術例を並べています。<br />
          仕上がりは「扱いやすさ」を優先したものです。
        </Reveal>
      </div>

      {/* Swipe Gallery */}
      <Reveal delay={0.18} y={12} blur={0.12} duration={0.62}>
        <div className="relative mb-[7vh]">
          <div
            aria-hidden
            className={`
              pointer-events-none absolute inset-y-0 left-0 w-[16vw] z-10
              bg-[linear-gradient(to_right,rgba(247,243,236,1),rgba(247,243,236,0))]
              transition-opacity duration-300
              ${canSwipe && showLeft ? "opacity-100" : "opacity-0"}
            `}
          />
          <div
            aria-hidden
            className={`
              pointer-events-none absolute inset-y-0 right-0 w-[16vw] z-10
              bg-[linear-gradient(to_left,rgba(247,243,236,1),rgba(247,243,236,0))]
              transition-opacity duration-300
              ${canSwipe && showRight ? "opacity-100" : "opacity-0"}
            `}
          />

          <div
            aria-hidden
            className={`
              pointer-events-none absolute inset-y-0 left-0 w-[16vw] z-20
              flex items-center justify-start pl-[2.5vw]
              transition-opacity duration-300
              ${canSwipe && showLeft ? "opacity-100" : "opacity-0"}
            `}
          >
            <span
              className="
                inline-flex items-center justify-center
                w-[34px] h-[34px]
                rounded-full
                bg-base/70
                border border-ink/12
                text-ink/55
                shadow-[0_6px_18px_rgba(0,0,0,0.06)]
                backdrop-blur-[6px]
                select-none
              "
            >
              ←
            </span>
          </div>

          <div
            aria-hidden
            className={`
              pointer-events-none absolute inset-y-0 right-0 w-[16vw] z-20
              flex items-center justify-end pr-[2.5vw]
              transition-opacity duration-300
              ${canSwipe && showRight ? "opacity-100" : "opacity-0"}
            `}
          >
            <span
              className="
                inline-flex items-center justify-center
                w-[34px] h-[34px]
                rounded-full
                bg-base/70
                border border-ink/12
                text-ink/55
                shadow-[0_6px_18px_rgba(0,0,0,0.06)]
                backdrop-blur-[6px]
                select-none
              "
            >
              →
            </span>
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
            <div className="flex gap-[4.5vw]">
              {styles.map((s) => (
                <figure
                  key={s.name}
                  className="
                    relative
                    snap-start
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
                    alt={s.name}
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

              <div aria-hidden className="min-w-[6vw]" />
            </div>
          </div>
        </div>
      </Reveal>

      <div className="text-center">
        <Reveal delay={0.24} y={12} blur={0.12} duration={0.62}>
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
            他のスタイルも見る <span aria-hidden className="text-ink/55">→</span>
          </a>

          <p className="mt-4 text-[12px] tracking-[0.18em] text-ink/50">
            ※ 最新の掲載は外部ページでご確認ください
          </p>
        </Reveal>
      </div>
    </section>
  );
}