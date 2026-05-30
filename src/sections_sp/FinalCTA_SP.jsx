// src/sections_sp/FinalCTA_SP.jsx
import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ✅ 予約URLはこれ1本に統一（ボタンもここだけ）
const RESERVE_URL =
  "https://beauty.hotpepper.jp/CSP/bt/reserve/?storeId=H000706136";

// ✅ 実番号（表示はTELだけ）
const TEL_DISPLAY = "090-7357-0926";

// ✅ 画像は既存のまま
const SPA_IMG = "/yorisoi/headspa3.png";

export default function FinalCTA_SP() {
  const sectionRef = useRef(null);

  const TEL_HREF = useMemo(
    () => `tel:${TEL_DISPLAY.replace(/[^\d]/g, "")}`,
    []
  );

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
      // ✅ App側 wrapper に id="reserve" があるので、ここでは持たせない
      className="
        relative w-full bg-base
        pt-[16vh] pb-[18vh] px-[6vw]
        border-t border-ink/10
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
        {/* HEAD（抽象コピーを排除して、具体に） */}
        <div className="mb-10">
          <p
            data-fc
            className="text-[11px] tracking-[0.32em] text-ink/55 mb-4"
          >
            RESERVE
          </p>

          <h2
            data-fc
            className="
              text-[clamp(22px,5.6vw,28px)]
              text-ink/90
              font-medium
              leading-[1.55]
              tracking-[0.005em]
            "
          >
            カットだけの日も。
            <br />
            ヘッドスパも一緒の日も。
          </h2>

          <p
            data-fc
            className="
              mt-4
              text-[14.5px]
              leading-[1.95]
              text-ink/74
            "
          >
            HotPepperで空席を見て、そのまま予約できます。
            <br />
            メニューに迷う場合も、当日の状態を見ながら決められます。
          </p>
        </div>

        {/* SLIP（PCの“予約票”をSP縦積みへ：デザイン維持） */}
        <div
          data-fc
          className="
            border border-ink/14
            bg-surface/56
            shadow-[0_16px_42px_rgba(0,0,0,0.06)]
            overflow-hidden
          "
        >
          {/* TOP RULE */}
          <div className="h-[1px] bg-ink/14" />

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

            {/* グラデ膜（文字事故回避） */}
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.48),rgba(0,0,0,0.06))]" />

            {/* CAPTION（抽象に寄せすぎない） */}
            <div className="absolute left-0 right-0 bottom-0 px-6 py-6">
              <p className="text-[10.5px] tracking-[0.28em] text-white/72 mb-2">
                HEAD SPA
              </p>
              <p className="text-[20px] leading-[1.5] text-white font-medium max-w-[420px]">
                目を閉じて、
                <br />
                そのまま任せられるスパ。
              </p>
    <p className="mt-3 text-[12.8px] leading-[1.85] text-white max-w-[420px]">
  カットだけの日も、少し疲れている日も。
  <br />
  その日の状態に合わせて、無理なく整えられます。
</p>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="h-[1px] bg-ink/12" />

          {/* GUIDE（下） */}
          <div className="px-6 py-7">
            <div className="text-[11px] tracking-[0.22em] text-ink/55 mb-5">
              BOOKING GUIDE
            </div>

            <div className="border-y border-ink/12">
              <div className="grid grid-cols-[92px,1fr] gap-4 py-3.5 border-b border-ink/10">
                <div className="text-[10.5px] tracking-[0.20em] text-ink/55">
                  予約方法
                </div>
                <div className="text-[14px] leading-[1.9] text-ink/82">
                    HotPepper Beauty またはTELから
                </div>
              </div>

              {/* ✅ TEL追加（表記はTELだけ） */}
              <div className="grid grid-cols-[92px,1fr] gap-4 py-3.5 border-b border-ink/10">
                <div className="text-[10.5px] tracking-[0.20em] text-ink/55">
                  TEL
                </div>
                <div className="text-[14px] leading-[1.9] text-ink/82">
                  <a
                    href={TEL_HREF}
                    className="underline underline-offset-2 decoration-ink/25 hover:decoration-ink/40"
                    aria-label={`電話する ${TEL_DISPLAY}`}
                  >
                    {TEL_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-[92px,1fr] gap-4 py-3.5 border-b border-ink/10">
                <div className="text-[10.5px] tracking-[0.20em] text-ink/55">
                  所要
                </div>
                <div className="text-[14px] leading-[1.9] text-ink/82">
                  空席確認〜予約まで約1分
                </div>
              </div>

              <div className="grid grid-cols-[92px,1fr] gap-4 py-3.5 border-b border-ink/10">
                <div className="text-[10.5px] tracking-[0.20em] text-ink/55">
                  当日予約
                </div>
                <div className="text-[14px] leading-[1.9] text-ink/82">
                  空きがあれば可能
                </div>
              </div>

              <div className="grid grid-cols-[92px,1fr] gap-4 py-3.5">
                <div className="text-[10.5px] tracking-[0.20em] text-ink/55">
                  朝7:00
                </div>
                <div className="text-[14px] leading-[1.9] text-ink/82">
                  朝7:00はWEB予約のみ
                  <br />
                  <span className="text-ink/62">8:00以降はTEL/WEBどちらも可</span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-[13.5px] leading-[1.9] text-ink/72">
              今日は手早く、今日はしっかり。
              <br />
              お客さまの雰囲気に合わせて、進め方を合わせます。
            </p>

            {/* ✅ CTA：ボタンは1つだけ（予約） */}
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
     
              </a>
            </div>

            <p className="mt-5 text-[11px] leading-[1.75] text-ink/50">
              ※ 外部サイトへ移動します。予約内容はHotPepper側で確定します。
            </p>
          </div>

          {/* BOTTOM RULE */}
          <div className="h-[1px] bg-ink/14" />
        </div>
      </div>
    </section>
  );
}