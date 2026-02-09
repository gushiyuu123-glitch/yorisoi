// src/components_sp/NavYorisoiFloatingSP.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function NavYorisoiFloatingSP() {
  const navRef = useRef(null);
  const [active, setActive] = useState("");

  /* 初回フェードイン（柔光） */
  useEffect(() => {
    const items = navRef.current.querySelectorAll(".nav-sp-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 10, filter: "blur(0.3px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        delay: 1.35,
      }
    );
  }, []);

  /* スクロールで隠れる */
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const isDown = currentY > lastY;

      gsap.to(navRef.current, {
        y: isDown ? 70 : 0,
        duration: 0.34,
        ease: "power3.out",
      });

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 現在地ハイライト */
  useEffect(() => {
    const sections = ["#about", "#profile", "#menu", "#access", "#reserve"];

    const checkPosition = () => {
      let current = "";

      sections.forEach((id) => {
        const el = document.querySelector(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.35 && rect.bottom > 60) {
          current = id;
        }
      });

      if (current !== active) setActive(current);
    };

    window.addEventListener("scroll", checkPosition);
    checkPosition();
    return () => window.removeEventListener("scroll", checkPosition);
  }, [active]);

  /* NAV LIST */
  const navList = [
    { label: "お店", target: "#about", icon: <>
      <path d="M3 9l9-7 9 7" />
      <path d="M9 22V12h6v10" />
    </> },

    { label: "店主", target: "#profile", icon: <>
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
    </> },

    { label: "menu", target: "#menu", icon: <>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </> },

    { label: "地図", target: "#access", icon: <>
      <circle cx="12" cy="10" r="3" />
      <path d="M12 2C7.5 2 4 5.58 4 10c0 6.25 8 12 8 12s8-5.75 8-12c0-4.42-3.5-8-8-8z" />
    </> },

    { label: "予約", target: "#reserve", icon: <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </> }
  ];

  return (
    <nav
      ref={navRef}
      className="
        fixed bottom-0 left-0 right-0 z-[80]

        /* ★ 背景膜（自然光の層） */
        bg-[linear-gradient(
          to_top,
          rgba(247,244,239,0.80) 0%,
          rgba(247,244,239,0.74) 40%,
          rgba(247,244,239,0.66) 70%,
          rgba(247,244,239,0.58) 100%
        )]

        backdrop-blur-[9px]
        border-t border-[rgba(96,78,62,0.16)]

        px-[4vw] py-[10px]
        flex justify-between
        transition-transform duration-300
      "
    >
      {navList.map((item, i) => {
        const isActive = active === item.target;

        return (
          <button
            key={i}
            onClick={() =>
              document.querySelector(item.target)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            className={`
              nav-sp-item
              relative
              flex flex-col items-center justify-center
              w-[18vw]

              text-[11.4px]         /* ★ SP最適 */
              tracking-[0.10em]     /* ★ 品のある余白 */
              font-medium           /* ★ 可読性UP */

              ${isActive
                ? "text-[rgba(96,78,62,0.95)]"
                : "text-[rgba(96,78,62,0.72)]"}
              transition-all
            `}
          >
            <svg
              className={`
                w-[20px] h-[20px] mb-[3px]
                transition-all
                ${isActive ? "opacity-100 scale-[1.07]" : "opacity-80 scale-[1]"}
              `}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.45"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {item.icon}
            </svg>

            {item.label}

            {/* アクティブ：控えめな光ライン（ミニマル） */}
            {isActive && (
              <div
                className="
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  w-[22px] h-[2px]
                  bg-[rgba(96,78,62,0.42)]    /* ★ 少し控えめに */
                  rounded-full
                "
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
