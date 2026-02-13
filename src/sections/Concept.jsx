// src/sections/Concept.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Concept() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".cp"),
      { opacity: 0, y: 24 },
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
      id="concept"
      ref={sectionRef}
      className="
        relative
        w-full
        pt-[18vh] pb-[20vh] px-[8vw]
        overflow-hidden
      "
    >

      {/* 背景 */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src="/yorisoi/bird.png"
          alt=""
          className="
            w-full h-full object-cover
            opacity-[0.48]
            scale-[1.06]
          "
        />

        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_30%_30%,rgba(255,253,249,0.6),rgba(255,253,249,0.18)_60%)]
          "
        />
      </div>

      {/* 見出し */}
      <div className="cp mx-auto max-w-[760px] mb-14 text-center">
        <p className="text-[13px] tracking-[0.32em] text-[rgba(96,78,62,0.55)] mb-8">
          ヨリソイ / SALON PHILOSOPHY
        </p>

        <h2 className="text-[clamp(26px,3vw,32px)] leading-[1.5] text-[#5d4c3f] font-medium">
          ヨリソイが大切にしていること
        </h2>
      </div>

      {/* 3ブロック */}
      <div
        className="
          mt-[8vh]
          grid grid-cols-1 md:grid-cols-3
          gap-[3vw]
          max-w-[1080px] mx-auto
        "
      >

        {/* 共通カード */}
        {[
          {
            icon: (
              <>
                <path d="M12 3v12" />
                <path d="M16 7v8" />
                <path d="M8 5v10" />
                <path d="M4 15c0 4 4 6 8 6s8-2 8-6" />
              </>
            ),
            title: "やわらかな接客",
            desc: "お客様のペースに寄り添い、無理のない距離感を大切にしています。静かに過ごしたい日も、ゆっくり話したい日も、そのままでいられる場所でありたいと考えています。",
          },
          {
            icon: (
              <>
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M9 6l13 8M9 18l13-8" />
              </>
            ),
            title: "扱いやすい髪",
            desc: "乾かすだけで自然に整う。日常の中で無理なく続くスタイルを。頑張らなくても、きちんと見える髪を目指しています。",
          },
          {
            icon: (
              <>
                <path d="M9 3h6l1 3H8l1-3z" />
                <path d="M4 8h16v10H4z" />
                <path d="M10 12h4" />
              </>
            ),
            title: "心地よい空間",
            desc: "光・香り・空気のバランスを整え、五感が落ち着く空間づくりを大切にしています。長くいても疲れない、静かな時間を。",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="
              cp
              bg-white/75
              backdrop-blur-[2px]
              border border-white/40
              rounded-[14px]
              p-10
              shadow-[0_20px_40px_rgba(0,0,0,0.05)]
              transition-all
            "
          >
            <svg
              className="w-[40px] h-[40px] mb-6 text-[rgba(96,78,62,0.7)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              viewBox="0 0 24 24"
            >
              {item.icon}
            </svg>

            <h3 className="text-[18px] text-[#5d4c3f] font-medium mb-3 leading-[1.6]">
              {item.title}
            </h3>

            <p className="text-[14.5px] leading-[1.9] text-[rgba(96,78,62,0.8)]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
