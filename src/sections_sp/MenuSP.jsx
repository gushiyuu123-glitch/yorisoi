// src/sections_sp/MenuSP.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function MenuSP() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(
      el.querySelectorAll(".mnSP"),
      { opacity: 0, y: 24, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: el, start: "top 82%" }
      }
    );
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="
        w-full bg-[#f7f4ef]
        pt-[22vh] pb-[14vh] px-[6vw]
      "
    >
      <div className="mx-auto max-w-[520px]">

        {/* 見出し */}
        <div className="mnSP text-center mb-12">
          <p
            className="
              text-[11px]
              tracking-[0.26em]
              text-[rgba(96,78,62,0.55)]
              mb-5
            "
          >
            MENU / クーポン・料金
          </p>

          <h2
            className="
              text-[clamp(22px,6vw,28px)]
              text-[#5d4c3f]
              leading-[1.45]
              font-medium
            "
          >
            初めての方も通いやすいよう、<br />
            クーポンをご用意しています。
          </h2>
        </div>

        {/* クーポンカード（1カラム） */}
        <div className="space-y-5 mb-[10vh]">
          {[
            {
              title: "カット + シンプルトリートメント",
              price: "¥4,500 → ¥4,000",
              desc: "髪のまとまりが欲しい方に。初回来店限定のクーポンです。"
            },
            {
              title: "カット + フルカラー",
              price: "¥9,700 → ¥8,800",
              desc: "透明感と自然なツヤを引き出す人気メニュー。"
            }
          ].map((cp, i) => (
            <div
              key={i}
              className="
                mnSP
                bg-white/65 backdrop-blur-[1px]
                rounded-[10px] p-6
                shadow-[0_4px_12px_rgba(0,0,0,0.06)]
                border border-[rgba(96,78,62,0.12)]
              "
            >
              <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-1.5">
                {cp.title}
              </h3>

              <p className="text-[15px] text-[#5d4c3f] font-semibold mb-2">
                {cp.price}
              </p>

              <p className="text-[14px] leading-[1.85] text-[rgba(96,78,62,0.78)]">
                {cp.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 通常メニュー */}
        <div className="space-y-[48px]">

          {/* カット */}
          <div className="mnSP">
            <h3 className="text-[16px] text-[#5d4c3f] font-medium mb-2">
              カット
            </h3>

            <div className="text-[14.5px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
              {[
                ["カット（一般）", "¥4,500"],
                ["学生カット", "¥3,500"],
                ["前髪カット", "¥800"]
              ].map(([name, price]) => (
                <div
                  key={name}
                  className="
                    flex justify-between
                    border-b border-[rgba(96,78,62,0.18)]
                    py-2.5
                  "
                >
                  <span>{name}</span>
                  <span className="font-medium text-[#5d4c3f]">{price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* カラー */}
          <div className="mnSP">
            <h3 className="text-[16px] text-[#5d4c3f] font-medium mb-2">
              カラー
            </h3>

            <div className="text-[14.5px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
              {[
                ["リタッチ", "¥4,200"],
                ["フルカラー", "¥5,200"],
                ["ダブルカラー", "¥9,000〜"]
              ].map(([name, price]) => (
                <div
                  key={name}
                  className="
                    flex justify-between
                    border-b border-[rgba(96,78,62,0.18)]
                    py-2.5
                  "
                >
                  <span>{name}</span>
                  <span className="font-medium text-[#5d4c3f]">{price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* パーマ */}
          <div className="mnSP">
            <h3 className="text-[16px] text-[#5d4c3f] font-medium mb-2">
              パーマ
            </h3>

            <div className="text-[14.5px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
              {[
                ["ナチュラルパーマ", "¥6,200"],
                ["ポイントパーマ", "¥3,200"]
              ].map(([name, price], idx) => (
                <div
                  key={idx}
                  className="
                    flex justify-between
                    border-b border-[rgba(96,78,62,0.18)]
                    py-2.5
                  "
                >
                  <span>{name}</span>
                  <span className="font-medium text-[#5d4c3f]">{price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* トリートメント */}
          <div className="mnSP">
            <h3 className="text-[16px] text-[#5d4c3f] font-medium mb-2">
              トリートメント
            </h3>

            <div className="text-[14.5px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
              {[
                ["シンプルトリートメント", "¥2,500"],
                ["集中ケアトリートメント", "¥3,800"]
              ].map(([name, price], idx) => (
                <div
                  key={idx}
                  className="
                    flex justify-between
                    border-b border-[rgba(96,78,62,0.18)]
                    py-2.5
                  "
                >
                  <span>{name}</span>
                  <span className="font-medium text-[#5d4c3f]">{price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 予約導線（1つだけのボタン） */}
        <div className="mnSP text-center mt-[9vh]">
  <p
  className="
    mnSP text-center mt-6 mb-4
    text-[12px]
    leading-[1.8]
    text-[rgba(96,78,62,0.50)]
  "
>
  ※ メニュー・価格・クーポン内容は変動する場合がございます。<br />
  最新情報は  
  <a
    href="https://beauty.hotpepper.jp/"
    target="_blank"
    rel="noopener noreferrer"
    className="underline decoration-[rgba(96,78,62,0.40)] hover:opacity-80 transition"
  >
    HotPepper Beauty
  </a>
  をご確認ください。
</p>

        </div>

      </div>
    </section>
  );
}
