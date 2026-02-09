// src/components_sp/NavYorisoiFloatingSP.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function NavYorisoiFloatingSP() {
  const navRef = useRef(null);
  const [active, setActive] = useState("");

  // ---- 安定化用 refs ----
  const lastYRef = useRef(0);
  const hiddenRef = useRef(false);
  const rafRef = useRef(0);

  /* 初回フェードイン（柔光） */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const items = nav.querySelectorAll(".nav-sp-item");
    gsap.killTweensOf(items);

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
        overwrite: "auto",
      }
    );
  }, []);

  /* スクロールで隠れる（安定版） */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // 初期値
    lastYRef.current = window.scrollY || 0;

    const SHOW_Y = 0;
    const HIDE_Y = 70;
    const THRESHOLD = 6; // 微小スクロールで反転しないための遊び

    const animateTo = (hide) => {
      if (!navRef.current) return;

      // 既に同じ状態なら何もしない
      if (hiddenRef.current === hide) return;
      hiddenRef.current = hide;

      gsap.killTweensOf(navRef.current);
      gsap.to(navRef.current, {
        y: hide ? HIDE_Y : SHOW_Y,
        opacity: hide ? 0 : 1, // ← ここでフェードも同期
        duration: hide ? 0.28 : 0.34,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onScroll = () => {
      // 1フレームに1回だけ判定
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;

        const currentY = window.scrollY || 0;
        const diff = currentY - lastYRef.current;

        // iOSバウンスや微小揺れを無視
        if (Math.abs(diff) < THRESHOLD) return;

        const isDown = diff > 0;

        // 下に一定以上動いたら隠す / 上に動いたら出す
        animateTo(isDown);

        lastYRef.current = currentY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gsap.killTweensOf(navRef.current);
    };
  }, []);

  /* 現在地ハイライト（安定版：active依存を外して無限再登録を防ぐ） */
  useEffect(() => {
    const sections = ["#about", "#profile", "#menu", "#access", "#reserve"];

    const checkPosition = () => {
      let current = "";

      for (const id of sections) {
        const el = document.querySelector(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.35 && rect.bottom > 60) {
          current = id;
        }
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    window.addEventListener("scroll", checkPosition, { passive: true });
    checkPosition();

    return () => window.removeEventListener("scroll", checkPosition);
  }, []);

  /* NAV LIST */
  const navList = [
    {
      label: "お店",
      target: "#about",
      icon: (
        <>
          <path d="M3 9l9-7 9 7" />
          <path d="M9 22V12h6v10" />
        </>
      ),
    },
    {
      label: "店主",
      target: "#profile",
      icon: (
        <>
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
        </>
      ),
    },
    {
      label: "menu",
      target: "#menu",
      icon: (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      ),
    },
    {
      label: "地図",
      target: "#access",
      icon: (
        <>
          <circle cx="12" cy="10" r="3" />
          <path d="M12 2C7.5 2 4 5.58 4 10c0 6.25 8 12 8 12s8-5.75 8-12c0-4.42-3.5-8-8-8z" />
        </>
      ),
    },
    {
      label: "予約",
      target: "#reserve",
      icon: (
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </>
      ),
    },
  ];

  return (
    <nav
      ref={navRef}
      className="
        fixed bottom-0 left-0 right-0 z-[80]
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
        will-change-transform
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
              text-[11.4px]
              tracking-[0.10em]
              font-medium
              ${isActive ? "text-[rgba(96,78,62,0.95)]" : "text-[rgba(96,78,62,0.72)]"}
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

            {isActive && (
              <div
                className="
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  w-[22px] h-[2px]
                  bg-[rgba(96,78,62,0.42)]
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
