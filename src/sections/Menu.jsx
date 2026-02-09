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
      { opacity: 0, y: 26, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.16,
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
        pt-[32vh] pb-[18vh] px-[8vw]
      "
    >
      {/* ===============================
          見出し
      =============================== */}
      <div className="mn mx-auto max-w-[760px] mb-14 text-center">
        <p
          className="
            text-[13px]
            tracking-[0.32em]
            text-[rgba(96,78,62,0.55)]
            mb-7
          "
        >
          MENU / クーポン・料金
        </p>

        <h2
          className="
            text-[clamp(26px,3vw,34px)]
            text-[#5d4c3f]
            leading-[1.45]
            font-medium
          "
        >
          初めての方も通いやすいよう、<br />
          クーポンをご用意しています。
        </h2>
      </div>

      {/* ===============================
          クーポン（カードのみ・ボタンなし）
      =============================== */}
      <div
        className="
          mn mx-auto max-w-[900px]
          grid grid-cols-2 gap-[2.4vw]
          mb-[12vh]
        "
      >
        {[
          {
            title: "カット + シンプルトリートメント",
            price: "¥4,500 → ¥4,000",
            desc: "髪のまとまりが欲しい方に。初回来店限定のクーポンです。",
          },
          {
            title: "カット + フルカラー",
            price: "¥9,700 → ¥8,800",
            desc: "透明感と自然なツヤを引き出す人気メニュー。",
          },
        ].map((cp, i) => (
          <div
            key={i}
            className="
              flex flex-col
              bg-white/70 backdrop-blur-[1px]
              rounded-[10px] p-8
              shadow-[0_4px_14px_rgba(0,0,0,0.07)]
              border border-[rgba(96,78,62,0.12)]
              hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)]
              transition-all
              h-full
            "
          >
            <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-2">
              {cp.title}
            </h3>

            <p className="text-[15px] text-[#5d4c3f] font-semibold mb-3">
              {cp.price}
            </p>

            <p className="text-[14.5px] leading-[1.85] text-[rgba(96,78,62,0.78)] mb-2 flex-grow">
              {cp.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ===============================
          通常メニュー（そのまま）
      =============================== */}
      <div
        className="
          mn mx-auto max-w-[900px]
          grid grid-cols-2 gap-[4vw]
        "
      >
        {/* LEFT */}
        <div className="space-y-[64px]">
          {/* ---- カット ---- */}
          <div>
            <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-2">
              カット
            </h3>

            <div className="text-[15px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
              {[
                ["カット（一般）", "¥4,500"],
                ["学生カット", "¥3,500"],
                ["前髪カット", "¥800"],
              ].map(([n, p]) => (
                <div
                  key={n}
                  className="
                    flex justify-between
                    border-b border-[rgba(96,78,62,0.18)]
                    py-2
                  "
                >
                  <span>{n}</span>
                  <span className="font-medium text-[#5d4c3f]">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---- カラー ---- */}
          <div>
            <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-2">
              カラー
            </h3>

            <div className="text-[15px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
              {[
                ["リタッチ", "¥4,200"],
                ["フルカラー", "¥5,200"],
                ["ダブルカラー", "¥9,000〜"],
              ].map(([n, p]) => (
                <div
                  key={n}
                  className="
                    flex justify-between
                    border-b border-[rgba(96,78,62,0.18)]
                    py-2
                  "
                >
                  <span>{n}</span>
                  <span className="font-medium text-[#5d4c3f]">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-[64px]">
          {/* ---- パーマ ---- */}
          <div>
            <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-12">
              パーマ
            </h3>

            <div className="text-[15px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
              {[
                ["ナチュラルパーマ", "¥6,200"],
                ["ポイントパーマ", "¥3,200"],
                ["", ""],
              ].map(([n, p], idx) => (
                <div
                  key={idx}
                  className={`
                    flex justify-between
                    border-b border-[rgba(96,78,62,0.18)]
                    py-2
                    ${n === "" ? "opacity-0" : "opacity-100"}
                  `}
                >
                  <span>{n}</span>
                  <span className="font-medium text-[#5d4c3f]">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---- トリートメント ---- */}
          <div>
            <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-10">
              トリートメント
            </h3>

            <div className="text-[15px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
              {[
                ["シンプルトリートメント", "¥2,500"],
                ["集中ケアトリートメント", "¥3,800"],
                ["", ""],
              ].map(([n, p], idx) => (
                <div
                  key={idx}
                  className={`
                    flex justify-between
                    border-b border-[rgba(96,78,62,0.18)]
                    py-2
                    ${n === "" ? "opacity-0" : "opacity-100"}
                  `}
                >
                  <span>{n}</span>
                  <span className="font-medium text-[#5d4c3f]">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===============================
          最後に “1つだけのボタン”
      =============================== */}
      <div className="mn text-center mt-[10vh]">
        <a
          href="#reserve"  
          className="
            inline-block
            px-8 py-3
            text-[15px]
            text-[#5d4c3f]
            bg-[rgba(96,78,62,0.10)]
            hover:bg-[rgba(96,78,62,0.18)]
            backdrop-blur-[2px]
            rounded-[6px]
            tracking-[0.08em]
            shadow-[0_4px_10px_rgba(0,0,0,0.06)]
            hover:shadow-[0_6px_18px_rgba(0,0,0,0.10)]
            transition-all cursor-pointer
          "
        >
          メニュー詳細
        </a>
      </div>
    </section>
  );
}
