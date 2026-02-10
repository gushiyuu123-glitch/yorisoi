// src/sections/About.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
      },
    });

    tl.fromTo(
      el.querySelectorAll(".about-fade"),
      { opacity: 0, y: 24, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.16,
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        w-full bg-[#f7f4ef]
        mt-[26vh] pb-[16vh] px-[8vw] mb-[16vh]
      "
    >
      <div className="mx-auto max-w-[760px]">

        {/* 見出し */}
        <p
          className="
            about-fade text-[13px]
            tracking-[0.32em]
            text-[rgba(96,78,62,0.55)]
            mb-6
          "
        >
          ABOUT / なぜ“〇〇〇”なのか
        </p>

        {/* タイトル */}
        <h2
          className="
            about-fade
            text-[clamp(26px,3vw,34px)]
            leading-[1.45]
            text-[#5d4c3f]
            font-medium
          "
        >
          あなたの“ちょうどよい距離感”を
          <br />
          大切にしています。
        </h2>

        {/* 本文 */}
        <div className="about-fade mt-8 text-[15.5px] leading-[2] text-[rgba(96,78,62,0.8)]">
          <p className="mb-5">
            髪の悩みは人それぞれ。  
            「たくさん話したい日」もあれば、「静かに過ごしたい日」もある。
          </p>

          <p className="mb-5">
            YORISOIでは、無理に会話を広げたり、一方的に提案を押し付けることはしません。
            髪質・骨格・日々の生活リズムを聞いた上で、
            <span className="text-[#6E5540]">
              あなたに合う“自然な仕上がり”
            </span>
            を一緒につくっていきます。
          </p>

          <p>
            そのための丁寧なカウンセリングと、18年の技術があります。
          </p>
        </div>

        {/* 写真 */}
        <div className="about-fade mt-14 w-full">
          <img
            src="/yorisoi/about1.png"
            className="
              w-full rounded-[6px] object-cover
              shadow-[0_8px_28px_rgba(0,0,0,0.10)]
              [filter:blur(6px)_brightness(1.03)_contrast(0.9)]
            "
            alt="サロンの雰囲気写真"
          />
        </div>

        {/* 締め */}
        <p
          className="
            about-fade mt-10
            text-[14.5px]
            text-[rgba(96,78,62,0.7)]
            leading-[1.9]
          "
        >
          “話したいときは話せて、静かにしたいときは静かにいられる”  
          — そんなサロンでありたいと思っています。
        </p>

      </div>
    </section>
  );
}
