// src/sections_sp/ReviewSP.jsx
import { useEffect, useMemo } from "react";
import { Reveal } from "../components/Reveal";

const HOTPEPPER_REVIEW_URL = "https://beauty.hotpepper.jp/slnH000706136/review/";
const MAX_REVIEWS = 4;

export default function ReviewSP() {
  const rating = useMemo(
    () => ({
      avg: "5.00",
      count: 63,
      mood: "5.0",
      service: "5.0",
      skill: "5.0",
      price: "4.7",
    }),
    []
  );

  const reviews = useMemo(
    () => [
      {
        name: "50代 男性（会社員）",
        text: "予約制で待たずに入れて、駐車もスムーズでした。家でもセットしやすい形になりました。",
      },
      {
        name: "30代後半 男性（会社員）",
        text: "最初に希望を確認してくれるので安心。パーマの強さも相談できて仕上がりが良かったです。",
      },
      {
        name: "20代後半 男性（会社員）",
        text: "同じ雰囲気を安定して再現してくれる。気になる点もその場で調整してくれて頼りやすいです。",
      },
      {
        name: "40代 男性（会社員）",
        text: "動きが丁寧で、時間があっという間でした。次の日からセットが楽になりました。",
      },
    ],
    []
  );

  useEffect(() => {
    const id = "ld-yorisoi-aggregate-rating";
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HairSalon",
      name: "YORISOI",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.avg,
        reviewCount: String(rating.count),
        bestRating: "5",
        worstRating: "1",
      },
    });

    document.head.appendChild(script);
  }, [rating]);

  const visible = reviews.slice(0, MAX_REVIEWS);

  return (
    <section
      id="review-sp"
      className="w-full bg-base pt-[14vh] pb-[14vh] px-[6vw]"
      aria-label="口コミ"
    >
      <div className="mx-auto max-w-[520px]">
        {/* TITLE */}
        <div className="text-center mb-10">
          <Reveal
            as="p"
            delay={0.0}
            y={10}
            blur={0.12}
            duration={0.62}
            className="text-[11px] tracking-[0.26em] text-ink/55 mb-5"
          >
            口コミ
          </Reveal>

          <Reveal
            as="h2"
            delay={0.06}
            y={10}
            blur={0.12}
            duration={0.62}
            className="text-[24px] leading-[1.45] text-ink/90 font-medium mb-4"
          >
            任せてよかった、の声。
          </Reveal>

          <Reveal delay={0.12} y={10} blur={0.12} duration={0.62}>
            <div className="flex items-end justify-center gap-3">
              <span className="text-[12px] text-ink/70 tracking-[0.10em]">
                平均
              </span>
              <span className="text-[30px] leading-none font-semibold text-ink/90">
                {rating.avg}
              </span>
              <span className="text-[12px] text-ink/58">
                / 5.0（{rating.count}件）
              </span>
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] text-ink/62 tracking-[0.08em]">
              <span>雰囲気 {rating.mood}</span>
              <span>接客 {rating.service}</span>
              <span>技術 {rating.skill}</span>
              <span>料金 {rating.price}</span>
            </div>
          </Reveal>
        </div>

        {/* LIST */}
        <div className="border-y border-ink/14">
          {visible.map((r, i) => (
            <Reveal
              key={i}
              delay={0.04 * i}
              y={10}
              blur={0.10}
              duration={0.62}
              className="py-7 border-b border-ink/12 last:border-b-0"
            >
              <div className="mb-3 text-[11px] tracking-[0.22em] text-ink/55">
                ★★★★★
              </div>

              <p className="text-[14.5px] leading-[1.95] text-ink/82">
                {r.text}
              </p>

              <p className="mt-4 text-[12px] text-ink/58">{r.name}</p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-[7vh]">
          <Reveal delay={0.0} y={10} blur={0.10} duration={0.62}>
            <a
              href={HOTPEPPER_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                px-7 py-3
                rounded-[999px]
                text-[13px]
                text-ink/90
                bg-ink/[0.08]
                tracking-[0.08em]
                active:scale-[0.98]
                transition-all
                shadow-[0_5px_16px_rgba(0,0,0,0.05)]
              "
            >
              口コミをすべて見る
            </a>

            <p className="text-[11px] mt-4 leading-[1.75] text-ink/50">
              最新の口コミ・点数は外部ページで確認できます。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}