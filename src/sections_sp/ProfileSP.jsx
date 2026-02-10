import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ProfileSP() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".pfSP"),
      { opacity: 0, y: 26, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "power3.out",
        duration: 1.1,
        stagger: 0.16,
        scrollTrigger: { trigger: el, start: "top 82%" },
      }
    );
  }, []);

  return (
    <section
      id="owner"
      ref={sectionRef}
      className="
        w-full bg-[#f7f4ef]
        pt-[12vh] pb-[18vh]
        px-[6vw]
      "
    >
      <div className="mx-auto max-w-[480px]">

        {/* 写真（上：高級感の光膜アリ） */}
        <div className="relative pfSP mb-10">
          <img
            src="/yorisoi/profile1.png"
            alt="店主の写真"
            className="
              w-full h-[420px]
              object-cover object-[center]
              rounded-[8px]
              shadow-[0_8px_26px_rgba(0,0,0,0.12)]
              brightness-[1.03] contrast-[0.94]
            "
          />

          {/* 上部光膜 */}
          <div
            className="
              absolute inset-0 pointer-events-none
              bg-[linear-gradient(
                to_bottom,
                rgba(255,255,255,0.40) 0%,
                rgba(255,255,255,0.15) 45%,
                rgba(255,255,255,0) 100%
              )]
              rounded-[8px]
            "
          />
        </div>

        {/* 見出し */}
        <p className="pfSP text-[11px] tracking-[0.26em] text-[rgba(96,78,62,0.50)] mb-3">
          PROFILE ／ 店主について
        </p>

        {/* タイトル */}
        <h2
          className="
            pfSP
            text-[clamp(22px,6vw,27px)]
            leading-[1.48]
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
            pfSP
            text-[14.8px] leading-[1.92]
            text-[rgba(96,78,62,0.82)]
            space-y-5
          "
        >
          <p>
            人と向き合う仕事を18年間続けてきて、気づいたことがあります。  
            髪を整えるだけではなく、
            <span className="text-[#5d4c3f] font-medium">
              「その日の気持ちに寄り添う空気」
            </span>
            が、美容室には必要だということ。
          </p>

          <p>
            忙しい日、疲れた日、話したい日、静かにしたい日。  
            お客様の表情や声のトーンから、その日の“ちょうどいい距離感”を探すことが私のスタイルです。
          </p>

          <p>
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

        {/* プロフィール情報 */}
        <div
          className="
            pfSP
            mt-10 text-[14.6px] leading-[1.9]
            text-[rgba(96,78,62,0.80)]
            space-y-1.5
          "
        >
          <p><span className="font-medium text-[#5d4c3f]">名前：</span>山田 聡</p>
          <p><span className="font-medium text-[#5d4c3f]">経験：</span>美容師歴〇〇〇年（東京・沖縄）</p>
          <p><span className="font-medium text-[#5d4c3f]">得意：</span>扱いやすいナチュラルカット</p>
        </div>

      </div>
    </section>
  );
}
