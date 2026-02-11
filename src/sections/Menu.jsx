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
          初めての方でも安心して通えるように、<br />
          特別クーポンをご用意しています。
        </h2>
      </div>

      {/* ===============================
          クーポン（ベスト3だけ抜粋）
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
            title: "【人気No.1】カット + シャンプー + 眉シェービング",
            price: "¥4,280 → ¥3,880",
            desc: "骨格と癖を見極め、長持ちするメンズカット。第一印象を整えたい方に。",
          },
          {
            title: "【早朝限定】カット + シャンプー + 眉シェービング",
            price: "¥4,280 → ¥3,780",
            desc: "平日6〜7時限定。朝の時間を有効活用したいお客様におすすめ。",
          },
          {
            title: "【極上ヘッドスパ】+ カット + シャンプー",
            price: "¥6,680",
            desc: "頭皮ケア・コリ改善・深いリラックスを求める方へ。人気の上位メニュー。",
          },
          {
            title: "【カット + シンプルトリートメント】",
            price: "¥4,500 → ¥4,000",
            desc: "髪のまとまりが欲しい方に。初回限定のクーポン。",
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
            <p className="text-[14.5px] leading-[1.85] text-[rgba(96,78,62,0.78)] flex-grow">
              {cp.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ===============================
          通常メニュー（HotPepper構造準拠）
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
                ["カット（一般）", "¥3,980"],
                ["眉剃り＆眉整え + カット", "¥4,280"],
                ["トータルシェービング + カット", "¥4,800"],
                ["学生カット（小～大学）", "¥3,780"],
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
                ["白髪染め / 白髪ぼかし", "¥7,700"],
                ["ファッションカラー（カット込）", "¥7,700"],
                ["ファッションカラー + シェービング", "¥8,800"],
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
                ["パーマ（カット込）", "¥9,980"],
                ["パーマ ＋ シェービング", "¥11,000"],
                ["ポイントパーマ", "¥8,800"],
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

          {/* ---- スパ / その他 ---- */}
          <div>
            <h3 className="text-[17px] text-[#5d4c3f] font-medium mb-10">
              ヘッドスパ・その他
            </h3>

            <div className="text-[15px] leading-[1.9] text-[rgba(96,78,62,0.82)]">
              {[
                ["ヘッドスパ", "¥3,880"],
                ["ヘアセット / シェービング", "¥3,300"],
                ["追加シェービング", "¥1,100"],
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
      </div>

      {/* ===============================
          注意書き（静かに世界観維持）
      =============================== */}
      <div className="mn text-center mt-[10vh]">
        <p
          className="
            text-[13px]
            leading-[1.85]
            text-[rgba(96,78,62,0.55)]
          "
        >
          ※ メニュー・価格・クーポン内容は変動する場合がございます。<br />
          最新情報は{" "}
          <a
            href="https://beauty.hotpepper.jp/slnH000706136/coupon/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[rgba(96,78,62,0.45)] hover:opacity-80 transition"
          >
            HotPepper Beauty
          </a>
          をご確認ください。
        </p>
      </div>
    </section>
  );
}
