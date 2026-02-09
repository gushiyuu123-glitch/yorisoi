// src/sections/ProfileC.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ProfileC() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".pfC"),
      { opacity: 0, y: 26, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "power3.out",
        duration: 1.1,
        stagger: 0.16,
        scrollTrigger: { trigger: el, start: "top 75%" },
      }
    );
  }, []);

  return (
    <section
      id="owner"
      ref={sectionRef}
      className="
        w-full bg-[#f7f4ef]
        pt-[8vh] pb-[32vh] px-[8vw]
      "
    >
      {/* ===============================
          2カラム（写真 × ストーリー）
      =============================== */}
      <div
        className="
          mx-auto max-w-[1080px]
          grid grid-cols-2
          gap-[7vw]
          items-start
        "
      >
        {/* 左：写真 */}
    {/* 左：写真 */}
<div className="pfC w-full pr-[1vw]">
  <img
    src="/yorisoi/profile1.png"
    alt="店主の写真"
    className="
      w-full h-[720px]          /* ← 高さをデカくした */
      object-cover
      object-[center]       /* ← 上側を見せて表情が映りやすい */
      rounded-[6px]
      shadow-[0_8px_28px_rgba(0,0,0,0.10)]
      brightness-[1.03] contrast-[0.94]
    "
  />
</div>


        {/* 右：ストーリー */}
        <div className="pfC pl-[1vw]">

          {/* 小見出し */}
          <p
            className="
              text-[13px]
              tracking-[0.32em]
              text-[rgba(96,78,62,0.55)]
              mb-6
            "
          >
            PROFILE / 店主について
          </p>

          {/* タイトル */}
          <h2
            className="
              text-[clamp(26px,3vw,34px)]
              leading-[1.45]
              text-[#5d4c3f]
              font-medium
              mb-6
            "
          >
            美容師としての“軸”が、  
            このサロンをつくりました。
          </h2>

          {/* ストーリー */}
          <div
            className="
              text-[15.5px] leading-[2]
              text-[rgba(96,78,62,0.82)]
              max-w-[520px]
            "
          >
            <p className="mb-5">
              人と向き合う仕事を18年間続けてきて、気づいたことがあります。  
              髪を整えるだけではなく、
              <span className="text-[#5d4c3f] font-medium">
                「その日の気持ちに寄り添う空気」
              </span>
              が、美容室には必要だということ。
            </p>

            <p className="mb-5">
              忙しい日、疲れた日、話したい日、静かにしたい日。  
              お客様の表情や声のトーンから、その日の“ちょうどいい距離感”を探すことが私のスタイルです。
            </p>

            <p className="mb-5">
              カットの技術はもちろん、  
              <span className="text-[#5d4c3f] font-medium">
                「無理のない自然体」
              </span>
              を大切にしています。  
              手ぐしで整う、頑張らなくても決まる、そんな髪型が好きです。
            </p>

            <p>
              初めて来た方でも安心して任せられる、  
              やわらかい空気をまとったサロンでありたい——  
              その想いで YORISOI をつくりました。
            </p>
          </div>

          {/* プロフィール表 */}
          <div
            className="
              mt-10 text-[15px] leading-[1.9]
              text-[rgba(96,78,62,0.80)]
            "
          >
            <p><span className="font-medium text-[#5d4c3f]">名前：</span>山田 聡</p>
            <p><span className="font-medium text-[#5d4c3f]">経験：</span>美容師歴18年（東京・沖縄）</p>
            <p><span className="font-medium text-[#5d4c3f]">得意：</span>扱いやすいナチュラルカット</p>
          </div>

        </div>
      </div>



    </section>
  );
}
