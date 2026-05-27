// src/sections_sp/FinalCTA_SP.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ✅ PCの意図そのまま：画像＋予約票（slip）
// ※ PC側が coupon URL になってるので合わせる（必要なら分けて）
const RESERVE_URL = "https://beauty.hotpepper.jp/slnH000706136/";
const COUPON_URL  = "https://beauty.hotpepper.jp/slnH000706136/coupon/";

// ✅ 画像はPCと同じ想定
const SPA_IMG = "/yorisoi/headspa3.png";

export default function FinalCTA_SP() {
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
        { opacity: 0, y: 12, filter: "blur(0.12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.66,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 84%", once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reserve"
      className="
        relative w-full bg-[#f7f4ef]
        pt-[16vh] pb-[18vh] px-[6vw]
        border-t border-[rgba(96,78,62,0.10)]
        overflow-hidden
      "
      aria-label="予約"
    >
      {/* 静かな背景膜（PCの空気をSPに） */}
      <div
        aria-hidden
        className="
          absolute inset-0 pointer-events-none
          opacity-[0.18]
          [background:radial-gradient(
            720px_520px_at_55%_24%,
            rgba(170,145,120,0.08),
            transparent_72%
          )]
        "
      />

      <div className="relative mx-auto max-w-[520px]">
        {/* HEAD（PCと同じコピー） */}
        <div className="mb-10">
          <p
            data-fc
            className="text-[11px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-4"
          >
            RESERVE
          </p>

          <h2
            data-fc
            className="
              text-[clamp(22px,5.6vw,28px)]
              text-[#5d4c3f]
              font-medium
              leading-[1.55]
              tracking-[0.005em]
            "
          >
            整えるだけじゃなく、
            <br />
            ほどける時間まで。
          </h2>

          <p
            data-fc
            className="
              mt-4
              text-[14.5px]
              leading-[1.95]
              text-[rgba(96,78,62,0.74)]
            "
          >
            カットやシェービングに加えて、ヘッドスパで力を抜く時間も。
            <br />
            見た目が整うだけでなく、気持ちまで静かに戻る感覚を味わえます。
          </p>
        </div>

        {/* SLIP（PCの“予約票”をSP縦積みへ） */}
        <div
          data-fc
          className="
            border border-[rgba(96,78,62,0.14)]
            bg-[rgba(255,255,255,0.56)]
            shadow-[0_16px_42px_rgba(0,0,0,0.06)]
            overflow-hidden
          "
        >
          {/* TOP RULE */}
          <div className="h-[1px] bg-[rgba(96,78,62,0.14)]" />

          {/* IMAGE（上） */}
          <div className="relative h-[min(52vh,520px)]">
            <img
              src={SPA_IMG}
              alt="ヘッドスパ施術の様子"
              loading="lazy"
              decoding="async"
              className="
                absolute inset-0 w-full h-full
                object-cover object-center
                scale-[1.02]
              "
            />

            {/* グラデ膜（SPは少し濃くして文字事故回避） */}
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.48),rgba(0,0,0,0.06))]" />

            {/* CAPTION（PCの文法そのまま、サイズだけSP） */}
            <div className="absolute left-0 right-0 bottom-0 px-6 py-6">
              <p className="text-[10.5px] tracking-[0.28em] text-[rgba(255,255,255,0.72)] mb-2">
                HEAD SPA
              </p>
              <p className="text-[20px] leading-[1.5] text-white font-medium max-w-[420px]">
                眠くなるほど、
                <br />
                力が抜ける時間。
              </p>
              <p className="mt-3 text-[12.8px] leading-[1.85] text-[rgba(255,255,255,0.78)] max-w-[420px]">
                忙しさを切り替えたい日にも。
                <br />
                仕上がりと一緒に、気分まで整えて帰れます。
              </p>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="h-[1px] bg-[rgba(96,78,62,0.12)]" />

          {/* GUIDE（下） */}
          <div className="px-6 py-7">
            <div className="text-[11px] tracking-[0.22em] text-[rgba(96,78,62,0.55)] mb-5">
              BOOKING GUIDE
            </div>

            <div className="border-y border-[rgba(96,78,62,0.12)]">
              <div className="grid grid-cols-[92px,1fr] gap-4 py-3.5 border-b border-[rgba(96,78,62,0.10)]">
                <div className="text-[10.5px] tracking-[0.20em] text-[rgba(96,78,62,0.55)]">
                  予約方法
                </div>
                <div className="text-[14px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
                  HotPepper Beauty から
                </div>
              </div>

              <div className="grid grid-cols-[92px,1fr] gap-4 py-3.5 border-b border-[rgba(96,78,62,0.10)]">
                <div className="text-[10.5px] tracking-[0.20em] text-[rgba(96,78,62,0.55)]">
                  所要
                </div>
                <div className="text-[14px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
                  空席確認〜予約まで約1分
                </div>
              </div>

              <div className="grid grid-cols-[92px,1fr] gap-4 py-3.5 border-b border-[rgba(96,78,62,0.10)]">
                <div className="text-[10.5px] tracking-[0.20em] text-[rgba(96,78,62,0.55)]">
                  当日予約
                </div>
                <div className="text-[14px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
                  空きがあれば可能
                </div>
              </div>

              <div className="grid grid-cols-[92px,1fr] gap-4 py-3.5">
                <div className="text-[10.5px] tracking-[0.20em] text-[rgba(96,78,62,0.55)]">
                  朝7:00
                </div>
                <div className="text-[14px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
                  朝7:00はWEB予約のみ
                  <br />
                  <span className="text-[rgba(96,78,62,0.62)]">
                    8:00以降はTEL/WEBどちらも可
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-[13.5px] leading-[1.9] text-[rgba(96,78,62,0.72)]">
              カットだけの日も、少し疲れている日も。
              <br />
              その日の状態に合わせて、無理なく整えられます。
            </p>

            {/* CTA（SPはフル幅） */}
            <div className="mt-7">
              <a
                href={RESERVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HotPepperで空席を確認して予約する（外部サイト）"
                className="
                  group inline-flex w-full items-center justify-between gap-4
                  px-5 py-4
                  bg-[#7d6655]
                  text-white
                  border border-[rgba(96,78,62,0.18)]
                  shadow-[0_12px_26px_rgba(0,0,0,0.14)]
                  transition-all duration-300
                  active:translate-y-[1px]
                "
              >
                <div className="text-left">
                  <div className="text-[10.5px] tracking-[0.18em] opacity-80 mb-1">
                    HOTPEPPER
                  </div>
                  <div className="text-[14.5px] font-medium leading-[1.35]">
                    空席を確認して予約する
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-[18px] opacity-85 transition-transform duration-300 group-active:translate-x-[2px]"
                >
                  →
                </span>
              </a>
            </div>

            <div className="mt-4">
              <a
                href={COUPON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  text-[12.5px]
                  text-[rgba(96,78,62,0.68)]
                  hover:text-[rgba(96,78,62,0.86)]
                  transition-colors
                "
              >
                <span className="underline underline-offset-[5px] decoration-[rgba(96,78,62,0.28)]">
                  クーポン・メニューだけ先に見る
                </span>
                <span aria-hidden className="opacity-60">↗</span>
              </a>
            </div>

            <p className="mt-5 text-[11px] leading-[1.75] text-[rgba(96,78,62,0.50)]">
              ※ 外部サイトへ移動します。予約内容はHotPepper側で確定します。
            </p>
          </div>

          {/* BOTTOM RULE */}
          <div className="h-[1px] bg-[rgba(96,78,62,0.14)]" />
        </div>
      </div>
    </section>
  );
}