// src/sections/Menu.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".mn"),
      { opacity: 0, y: 24 }, // blur排除（裕人ルール）
      {
        opacity: 1,
        y: 0,
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: el, start: "top 75%" },
      }
    );
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="
        w-full bg-[#f7f4ef]
        pt-[28vh] pb-[18vh] px-[6vw]
      "
    >
      {/* ===============================
          見出し
      =============================== */}
      <div className="mn mx-auto max-w-[760px] mb-16 text-center">
        <p className="text-[12px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-6">
          MENU / クーポン・料金
        </p>

        <h2 className="text-[clamp(26px,2.6vw,32px)] text-[#5d4c3f] leading-[1.5] font-medium">
          初めての方でも安心して通えるように、<br />
          <span className="relative">
  特別クーポン
  <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-[rgba(168,216,234,0.25)] -z-10"></span>
</span>
をご用意しています。
        </h2>
      </div>

      {/* ===============================
          クーポン（高揚ゾーン）
      =============================== */}
      <div className="mn mx-auto max-w-[940px] grid grid-cols-2 gap-[2.8vw] mb-[16vh]">
        {[
          {
            title: "【人気No.1】カット + シャンプー + 眉シェービング",
            before: "¥4,280",
            after: "¥3,880",
            desc: "骨格と癖を見極め、長持ちするメンズカット。",
            highlight: true,
          },
          {
            title: "【早朝限定】カット + シャンプー + 眉シェービング",
            before: "¥4,280",
            after: "¥3,780",
            desc: "平日6〜7時限定。朝の時間を有効活用。",
          },
          {
            title: "【極上ヘッドスパ】+ カット",
            before: "¥7,280",
            after: "¥6,680",
            desc: "頭皮ケア・コリ改善・深いリラックス。",
          },
          {
            title: "【カット + トリートメント】",
            before: "¥4,500",
            after: "¥4,000",
            desc: "髪のまとまりが欲しい方に。",
          },
        ].map((cp, i) => (
          <div
            key={i}
            className={`
              relative flex flex-col
              rounded-[14px] p-9
              bg-white/70
              border border-[rgba(96,78,62,0.12)]
              shadow-[0_6px_18px_rgba(0,0,0,0.06)]
              transition-all
              ${
                cp.highlight
                  ? "shadow-[0_10px_30px_rgba(96,78,62,0.18)]"
                  : "hover:shadow-[0_8px_20px_rgba(0,0,0,0.10)]"
              }
            `}
          >
            <span className="absolute top-5 right-6 text-[11px] tracking-[0.15em] text-[rgba(96,78,62,0.55)]">
              FIRST VISIT
            </span>

            <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-4 pr-20">
              {cp.title}
            </h3>

            <div className="mb-4">
              <span className="text-[13px] text-[rgba(96,78,62,0.45)] line-through mr-2">
                {cp.before}
              </span>

              <span className="text-[14px] text-[rgba(96,78,62,0.6)] mr-2">
                →
              </span>

              <span className="text-[18px] font-semibold text-[#5d4c3f]">
                {cp.after}
              </span>
            </div>

            <p className="text-[14.5px] leading-[1.9] text-[rgba(96,78,62,0.78)]">
              {cp.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ===============================
          通常メニュー（静ゾーン）
      =============================== */}
      <div className="mn mx-auto max-w-[900px] grid grid-cols-2 gap-[4vw]">
        {[
          {
            title: "カット",
            items: [
              ["カット（一般）", "¥3,980"],
              ["眉剃り + カット", "¥4,280"],
              ["学生カット", "¥3,780"],
            ],
          },
          {
            title: "カラー",
            items: [
              ["白髪染め / 白髪ぼかし", "¥7,700"],
              ["ファッションカラー", "¥7,700"],
            ],
          },
          {
            title: "パーマ",
            items: [
              ["パーマ（カット込）", "¥9,980"],
              ["ポイントパーマ", "¥8,800"],
            ],
          },
          {
            title: "ヘッドスパ・その他",
            items: [
              ["ヘッドスパ", "¥3,880"],
              ["追加シェービング", "¥1,100"],
            ],
          },
        ].map((block, i) => (
          <div key={i}>
            <h3 className="text-[16px] text-[#5d4c3f] font-medium mb-4">
              {block.title}
            </h3>

            <div className="text-[15px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
              {block.items.map(([name, price]) => (
                <div
                  key={name}
                  className="flex justify-between border-b border-[rgba(96,78,62,0.15)] py-2"
                >
                  <span>{name}</span>
                  <span className="font-medium text-[#5d4c3f]">
                    {price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ===============================
          HotPepper誘導（着地点）
      =============================== */}
      <div className="mn text-center mt-[12vh]">
        <p className="text-[14px] text-[rgba(96,78,62,0.65)] mb-4">
          さらに詳しいメニュー・最新クーポンは
        </p>

        <a
          href="https://beauty.hotpepper.jp/slnH000706136/coupon/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block
            px-8 py-3
            rounded-full
            bg-[rgba(96,78,62,0.12)]
            text-[#5d4c3f]
            text-[14.5px]
            tracking-[0.08em]
            hover:bg-[rgba(96,78,62,0.18)]
            transition-all
            shadow-[0_6px_16px_rgba(0,0,0,0.06)]
          "
        >
          HotPepperで詳細を見る
        </a>

        <p className="text-[12px] mt-5 text-[rgba(96,78,62,0.45)]">
          ※ メニュー・価格・クーポン内容は変動する場合がございます<br></br>
          最新情報はホットペッパーをご確認ください。
        </p>
      </div>
    </section>
  );
}
