// src/sections_sp/MenuSP.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function MenuSP() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".mnSP"),
      { opacity: 0, y: 22 }, // blur削除
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  }, []);

  return (
    <section
      id="menu-sp"
      ref={sectionRef}
      className="w-full bg-[#f7f4ef] pt-[20vh] pb-[14vh] px-[6vw]"
    >
      <div className="mx-auto max-w-[520px]">

        {/* ===============================
            見出し
        =============================== */}
        <div className="mnSP text-center mb-12">
          <p className="text-[11px] tracking-[0.28em] text-[rgba(96,78,62,0.55)] mb-5">
            MENU / クーポン・料金
          </p>

          <h2 className="text-[clamp(22px,6vw,26px)] text-[#5d4c3f] leading-[1.5] font-medium">
            初めての方も安心して<br />通えるよう、
            <span className="relative">
  特別クーポン
  <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-[rgba(168,216,234,0.25)] -z-10"></span>
</span>
を<br />ご用意しています。
          </h2>
        </div>

        {/* ===============================
            クーポン（高揚ゾーン）
        =============================== */}
        <div className="space-y-6 mb-[12vh]">
          {[
            {
              title: "【人気No.1】カット + シャンプー + 眉シェービング",
              before: "¥4,280",
              after: "¥3,880",
              desc: "骨格・癖を見極めたメンズカット。",
            },
            {
              title: "【早朝限定】カット + シャンプー + 眉シェービング",
              before: "¥4,280",
              after: "¥3,780",
              desc: "平日6〜7時限定。",
            },
            {
              title: "【極上ヘッドスパ】+ カット",
              before: "¥7,280",
              after: "¥6,680",
              desc: "頭皮ケア・疲労改善に。",
            },
            {
              title: "【カット + トリートメント】",
              before: "¥4,500",
              after: "¥4,000",
              desc: "初回限定クーポン。",
            },
          ].map((cp, i) => (
            <div
              key={i}
              className="
                mnSP
                bg-white/70
                rounded-[12px]
                p-6
                border border-[rgba(96,78,62,0.12)]
                shadow-[0_4px_14px_rgba(0,0,0,0.06)]
              "
            >
              <h3 className="text-[16px] text-[#5d4c3f] font-medium mb-3">
                {cp.title}
              </h3>

              <div className="mb-3">
                <span className="text-[12px] text-[rgba(96,78,62,0.45)] line-through mr-2">
                  {cp.before}
                </span>
                <span className="text-[13px] text-[rgba(96,78,62,0.55)] mr-1">
                  →
                </span>
                <span className="text-[18px] font-semibold text-[#5d4c3f]">
                  {cp.after}
                </span>
              </div>

              <p className="text-[14px] leading-[1.8] text-[rgba(96,78,62,0.78)]">
                {cp.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ===============================
            通常メニュー（静ゾーン）
        =============================== */}
        <div className="space-y-[44px]">

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
            <div key={i} className="mnSP">
              <h3 className="text-[15px] text-[#5d4c3f] font-medium mb-3">
                {block.title}
              </h3>

              <div className="text-[14px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
                {block.items.map(([name, price]) => (
                  <div
                    key={name}
                    className="flex justify-between border-b border-[rgba(96,78,62,0.15)] py-2.5"
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
            HotPepper CTA（着地）
        =============================== */}
        <div className="mnSP text-center mt-[12vh]">
          <p className="text-[13px] text-[rgba(96,78,62,0.65)] mb-4">
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
              text-[14px]
              tracking-[0.08em]
              shadow-[0_6px_16px_rgba(0,0,0,0.06)]
              hover:bg-[rgba(96,78,62,0.18)]
              transition
            "
          >
            HotPepperで詳細を見る
          </a>

          <p className="text-[11px] mt-5 text-[rgba(96,78,62,0.45)] leading-[1.7]">
             ※ メニュー・価格・クーポン内容は変動する場合がございます<br></br>
          最新情報はホットペッパーをご確認ください。
          </p>
        </div>

      </div>
    </section>
  );
}
