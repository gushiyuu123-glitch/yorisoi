import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function AboutSP() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(
      el.querySelectorAll(".about-sp-fade"),
      { opacity: 0, y: 22, filter: "blur(3px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        w-full bg-[#f7f4ef]
        mt-[24vh]          /* ← HEROとの距離最適化 */
        pb-[14vh]
        px-[6vw]
      "
    >
      <div className="mx-auto max-w-[480px]">

        {/* 小鳥アイコン */}
        <div className="about-sp-fade flex justify-start mb-6 opacity-85">
          <img
            src="/yorisoi/bird-logo.png"
            className="w-[28px] h-[28px] opacity-75"
          />
        </div>

        {/* 見出し */}
        <p className="about-sp-fade text-[11px] tracking-[0.26em] text-[rgba(96,78,62,0.50)] mb-3">
          ABOUT ／ 寄り添いの理由
        </p>

        {/* タイトル */}
        <h2
          className="
            about-sp-fade
            text-[clamp(20px,6vw,26px)]
            leading-[1.52]
            text-[#5b473a]
            font-medium
            mb-5
          "
        >
          あなたの“ちょうどよい距離感”を  
          大切にしています。
        </h2>

        {/* 一文の呼吸 */}
        <p
          className="
            about-sp-fade
            text-[14.5px]
            text-[rgba(96,78,62,0.78)]
            mb-6
            leading-[1.85]
          "
        >
          気をつかわず過ごせる「静けさの場所」でありたい。
        </p>

        {/* 本文 */}
        <div
          className="
            about-sp-fade
            text-[14.7px]
            leading-[1.92]
            text-[rgba(96,78,62,0.82)]
            space-y-5
          "
        >
          <p>
            髪の悩みは人それぞれ。「たくさん話したい日」もあれば、
            「静かに過ごしたい日」もある。
          </p>

          <p>
            YORISOIでは無理に会話を広げたり、一方的に提案を押し付けることはしません。
            <br />
            髪質・骨格・生活リズムを聞いた上で、
            <span className="text-[#6E5540] font-medium">
              自然な仕上がり
            </span>
            を一緒につくっていきます。
          </p>

          <p>そのための丁寧なカウンセリングと、18年の技術があります。</p>
        </div>

        {/* 中間ライン見出し */}
        <p
          className="
            about-sp-fade
            mt-8
            text-[12px]
            tracking-[0.15em]
            text-[rgba(96,78,62,0.45)]
            text-center
          "
        >
          ─ サロンの空気感 ─
        </p>

        {/* 写真 */}
        <div className="about-sp-fade mt-6 w-full">
          <img
            src="/yorisoi/about1.png"
            className="
              w-full rounded-[6px] object-cover
              shadow-[0_6px_20px_rgba(0,0,0,0.12)]
              [filter:brightness(1.04)_contrast(0.97)]
            "
          />
        </div>

        {/* 締め(白膜ボックス) */}
        <div className="about-sp-fade bg-white/45 backdrop-blur-[1px] rounded-[6px] px-4 py-3 mt-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <p className="text-[13.5px] text-[rgba(96,78,62,0.78)] leading-[1.85]">
            “話したいときは話せて、静かにしたいときは静かにいられる”  
            — そんなサロンでありたいと思っています。
          </p>
        </div>

      </div>
    </section>
  );
}
