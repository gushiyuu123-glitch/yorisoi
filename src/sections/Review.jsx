// src/sections/Review.jsx
import { useEffect, useMemo } from "react";
import { Reveal } from "../components/Reveal";

const HOTPEPPER_REVIEW_URL = "https://beauty.hotpepper.jp/slnH000706136/review/";
const MAX_REVIEWS = 4;

export default function Review() {
  // HotPepper表記に合わせた数値
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

  // ※ 外部口コミの“要点まとめ”（引用ではなく要約）
  const reviews = useMemo(
    () => [
      {
        name: "50代 男性（会社員）",
        text:
          "予約制で待ち時間が少なく、駐車もスムーズでした。仕上げまで丁寧で、家でも手順が迷いません。",
      },
      {
        name: "30代後半 男性（会社員）",
        text:
          "はじめに要望を聞き取ってくれて安心。パーマの強さも段階で相談でき、結果に満足しました。",
      },
      {
        name: "20代後半 男性（会社員）",
        text:
          "同じ雰囲気を安定して再現してくれるので頼れます。細部の微調整もその場で反映してくれて安心でした。",
      },
      {
        name: "40代 男性（会社員）",
        text:
          "動きが丁寧で、時間があっという間でした。翌日もセットが手早く決まりました。",
      },
      // 予備（将来増やす用。表示はMAX_REVIEWSで固定）
      {
        name: "30代後半 男性（会社員）",
        text:
          "カットとパーマのバランスが上手い。伸びてきても崩れにくく、朝の支度が短く済みました。",
      },
      {
        name: "40代 男性（自営業）",
        text:
          "仕上げの精度が高く、安心して任せられます。技術と価格のバランスも良いと感じました。",
      },
    ],
    []
  );

  // JSON-LD（重複しない）
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
      id="review"
      className="w-full bg-base pt-[18vh] pb-[18vh] px-[6vw]"
      aria-label="口コミ"
    >
      <div className="mx-auto max-w-[980px]">
        {/* TITLE */}
        <div className="mx-auto max-w-[780px] text-center mb-12">
          <Reveal
            as="p"
            delay={0.0}
            y={12}
            blur={0.14}
            duration={0.66}
            className="text-[12px] tracking-[0.28em] text-ink/55 mb-6"
          >
            口コミ
          </Reveal>

          <Reveal
            as="h2"
            delay={0.06}
            y={12}
            blur={0.14}
            duration={0.66}
            className="text-[clamp(26px,3vw,34px)] text-ink/90 leading-[1.42] font-medium mb-6"
          >
            任せてよかった、の声。
          </Reveal>

          {/* Rating row（カード化しない） */}
          <Reveal
            delay={0.12}
            y={12}
            blur={0.14}
            duration={0.66}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-end gap-3">
              <span className="text-[13px] text-ink/70 tracking-[0.10em]">
                平均
              </span>
              <span className="text-[34px] leading-none font-semibold text-ink/90">
                {rating.avg}
              </span>
              <span className="text-[13px] text-ink/58">
                / 5.0（{rating.count}件）
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] text-ink/62 tracking-[0.08em]">
              <span>
                雰囲気 <b className="text-ink/86">{rating.mood}</b>
              </span>
              <span>
                接客 <b className="text-ink/86">{rating.service}</b>
              </span>
              <span>
                技術 <b className="text-ink/86">{rating.skill}</b>
              </span>
              <span>
                料金 <b className="text-ink/86">{rating.price}</b>
              </span>
            </div>
          </Reveal>
        </div>

        {/* LIST（罫線で“誌面”に寄せる） */}
        <div className="border-y border-ink/14">
          {visible.map((r, i) => (
            <Reveal
              key={i}
              delay={0.02 * i}
              y={12}
              blur={0.12}
              duration={0.66}
              className="py-9 border-b border-ink/12 last:border-b-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr,220px] gap-6 items-start">
                <div>
                  <p className="text-[15.5px] leading-[1.95] text-ink/82">
                    {r.text}
                  </p>
                </div>

                <div className="lg:text-right">
                  <div className="text-[12px] tracking-[0.22em] text-ink/55 mb-2">
                    ★★★★★
                  </div>
                  <p className="text-[13px] text-ink/60">{r.name}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-[9vh]">
          <Reveal delay={0.0} y={12} blur={0.12} duration={0.66}>
            <a
              href={HOTPEPPER_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                px-8 py-3.5
                rounded-[999px]
                text-[14px]
                text-ink/90
                bg-ink/[0.08]
                tracking-[0.08em]
                hover:bg-ink/[0.12]
                transition-all duration-300
                shadow-[0_6px_18px_rgba(0,0,0,0.05)]
              "
            >
              すべての口コミを見る
            </a>

            <p className="text-[12px] mt-4 leading-[1.8] text-ink/50">
              最新の投稿と点数は外部ページでご確認ください。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}