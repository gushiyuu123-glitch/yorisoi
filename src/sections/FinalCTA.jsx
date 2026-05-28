// src/sections/FinalCTA.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const RESERVE_URL = "https://beauty.hotpepper.jp/slnH000706136/";
const COUPON_URL = "https://beauty.hotpepper.jp/slnH000706136/coupon/";

export default function FinalCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const targets = el.querySelectorAll("[data-fc]");
    if (!targets.length) return;

    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 14, filter: "blur(0.12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      /* ✅ App側 wrapper に id="reserve" があるので、ここでは持たせない */
      className="
        relative w-full bg-base
        pt-[18vh] pb-[22vh] px-[6vw]
        border-t border-ink/12
        overflow-hidden
      "
      aria-label="予約"
    >
      {/* 静かな背景膜（抽象語はコピーに使わず、見た目でだけ） */}
      <div
        aria-hidden
        className="
          absolute inset-0 pointer-events-none
          opacity-[0.18]
          [background:radial-gradient(
            900px_600px_at_70%_30%,
            rgba(170,145,120,0.08),
            transparent_72%
          )]
        "
      />

      <div className="relative mx-auto max-w-[1100px]">
        {/* HEAD */}
        <div className="mb-12">
          <p data-fc className="text-[12px] tracking-[0.34em] text-ink/55 mb-5">
            RESERVE
          </p>

          <h2
            data-fc
            className="
              text-[clamp(28px,3vw,38px)]
              text-ink/90
              font-medium
              leading-[1.48]
              tracking-[0.005em]
              max-w-[760px]
            "
          >
            カットだけの日も。
            <br />
            ヘッドスパも一緒の日も。
          </h2>

          <p
            data-fc
            className="
              mt-5 max-w-[720px]
              text-[15px] leading-[1.95]
              text-ink/74
            "
          >
            HotPepperで空席を見て、そのまま予約できます。
            <br />
            メニューに迷う場合も、当日の状態を見ながら決められます。
          </p>
        </div>

        {/* MAIN */}
        <div
          data-fc
          className="
            grid grid-cols-1 lg:grid-cols-[1.05fr,0.95fr]
            border border-ink/14
            bg-surface/60
            shadow-[0_18px_48px_rgba(0,0,0,0.06)]
            overflow-hidden
          "
        >
          {/* LEFT : IMAGE */}
          <div className="relative min-h-[420px] lg:min-h-[540px]">
            <img
              src="/yorisoi/headspa3.png"
              alt="ヘッドスパ施術の様子"
              loading="lazy"
              decoding="async"
              className="
                absolute inset-0 w-full h-full
                object-cover object-center
                scale-[1.02]
              "
            />

            {/* グラデ膜 */}
            <div
              className="
                absolute inset-0
                bg-[linear-gradient(to_top,rgba(0,0,0,0.42),rgba(0,0,0,0.05))]
              "
            />

            {/* キャプション（抽象語を避けて具体に） */}
            <div className="absolute left-0 right-0 bottom-0 px-8 py-7">
              <p className="text-[11px] tracking-[0.28em] text-white/70 mb-3">
                HEAD SPA
              </p>

              <p className="text-[22px] leading-[1.5] text-white font-medium max-w-[460px]">
                目を閉じて、
                <br />
                そのまま任せられるスパ。
              </p>

     <p className="mt-4 text-[13px] leading-[1.8] text-white max-w-[460px]">
  カットだけの日も、少し疲れている日も。
  <br />
  その日の状態に合わせて、無理なく整えられます。
</p>
            </div>
          </div>

          {/* RIGHT : RESERVE */}
          <div className="px-8 py-9 lg:px-10 lg:py-11">
            <div className="text-[12px] tracking-[0.22em] text-ink/55 mb-6">
              BOOKING GUIDE
            </div>

            <div className="border-y border-ink/12">
              <div className="grid grid-cols-[120px,1fr] gap-5 py-4 border-b border-ink/10">
                <div className="text-[11px] tracking-[0.20em] text-ink/55">
                  予約方法
                </div>
                <div className="text-[14.5px] leading-[1.9] text-ink/82">
                  HotPepper Beauty から
                </div>
              </div>

              <div className="grid grid-cols-[120px,1fr] gap-5 py-4 border-b border-ink/10">
                <div className="text-[11px] tracking-[0.20em] text-ink/55">
                  所要
                </div>
                <div className="text-[14.5px] leading-[1.9] text-ink/82">
                  空席確認〜予約まで約1分
                </div>
              </div>

              <div className="grid grid-cols-[120px,1fr] gap-5 py-4 border-b border-ink/10">
                <div className="text-[11px] tracking-[0.20em] text-ink/55">
                  当日予約
                </div>
                <div className="text-[14.5px] leading-[1.9] text-ink/82">
                  空きがあれば可能
                </div>
              </div>

              <div className="grid grid-cols-[120px,1fr] gap-5 py-4">
                <div className="text-[11px] tracking-[0.20em] text-ink/55">
                  朝7:00
                </div>
                <div className="text-[14.5px] leading-[1.9] text-ink/82">
                  朝7:00はWEB予約のみ
                  <br />
                  <span className="text-ink/62">
                    8:00以降はTEL/WEBどちらも可
                  </span>
                </div>
              </div>
            </div>

            {/* ここも抽象語禁止：具体で寄り添いを出す */}
            <p className="mt-6 text-[14px] leading-[1.9] text-ink/72">
              今日は手早く、今日はしっかり。
              <br />
              その日の状態に合わせて、進め方を合わせます。
            </p>

            <div className="mt-8">
              <a
                href={RESERVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HotPepperで空席を確認して予約する（外部サイト）"
                className="
                  group inline-flex items-center justify-between gap-4
                  min-w-[280px]
                  px-6 py-4
                  bg-[#7d6655]
                  text-white
                  border border-[rgba(96,78,62,0.18)]
                  shadow-[0_14px_30px_rgba(0,0,0,0.14)]
                  transition-all duration-300
                  hover:-translate-y-[1px]
                  hover:shadow-[0_18px_36px_rgba(0,0,0,0.16)]
                "
              >
                <div className="text-left">
                  <div className="text-[11px] tracking-[0.18em] opacity-80 mb-1">
                    HOTPEPPER
                  </div>
                  <div className="text-[15px] font-medium leading-[1.35]">
                    空席を確認して予約する
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-[18px] opacity-85 transition-transform duration-300 group-hover:translate-x-[2px]"
                >
                  →
                </span>
              </a>
            </div>

            <div className="mt-5">
              <a
                href={COUPON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  text-[13px]
                  text-ink/68
                  hover:text-ink/86
                  transition-colors
                "
              >
                <span className="underline underline-offset-[5px] decoration-ink/28">
                  クーポン・メニューだけ先に見る
                </span>
                <span aria-hidden className="opacity-60">
                  ↗
                </span>
              </a>
            </div>

            <p className="mt-6 text-[11px] leading-[1.75] text-ink/50">
              ※ 外部サイトへ移動します。予約内容はHotPepper側で確定します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}