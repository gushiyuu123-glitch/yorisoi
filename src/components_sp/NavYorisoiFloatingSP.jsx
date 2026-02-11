// ============================================================================
// NavYorisoiFloatingSP — FINAL EDITION
// - 静止復帰 / iOSバウンス無視 / 予約ボタン強調 / 光膜統一 / GSAP最適化
// GUSHIKEN DESIGN × NOA
// ============================================================================

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function NavYorisoiFloatingSP() {
  const navRef = useRef(null);
  const [active, setActive] = useState("");

  const lastYRef = useRef(0);
  const hiddenRef = useRef(false);
  const rafRef = useRef(0);
  const stopTimerRef = useRef(null);
  const hasShownOnceRef = useRef(false);

  // 復帰ディレイ（自然な戻り）
  const RESTORE_DELAY = 250;

  /* ----------------------------------------------------
      初回フェードイン（GSAP最適化版）
  ---------------------------------------------------- */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const items = nav.querySelectorAll(".nav-sp-item");

    gsap.killTweensOf(items);

    gsap.fromTo(
      items,
      { opacity: 0, y: 10, filter: "blur(0.18px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.06,
        delay: 1.0,
        overwrite: "auto",
      }
    );
  }, []);

  /* ----------------------------------------------------
      スクロール方向で出入り（iOS 安定版）
      - THRESHOLD: 微振動
      - BOUNCE_LIMIT: iOS の戻り防止
      - 停止後 → 遅延復帰
  ---------------------------------------------------- */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    lastYRef.current = window.scrollY || 0;

    const SHOW_Y = 0;
    const HIDE_Y = 72;

    const THRESHOLD = 5;       // ← 感度UP（5px以上で反応）
    const BOUNCE_LIMIT = 26;   // ← iOSスロー戻り無視強化

    const animateTo = (hide) => {
      const el = navRef.current;
      if (!el) return;

      if (hiddenRef.current === hide) return;
      hiddenRef.current = hide;

      gsap.killTweensOf(el);

      gsap.to(el, {
        y: hide ? HIDE_Y : SHOW_Y,
        opacity: hide ? 0 : 1,
        duration: hide ? 0.23 : 0.30,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          if (!hide) {
            if (!hasShownOnceRef.current) {
              hasShownOnceRef.current = true;
              return;
            }
            // 呼吸（0.8px）
            gsap.fromTo(
              el,
              { y: SHOW_Y + 0.8 },
              {
                y: SHOW_Y,
                duration: 0.12,
                ease: "power2.out",
                overwrite: "auto",
              }
            );
          }
        },
      });
    };

    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;

        const currentY = window.scrollY || 0;
        const diff = currentY - lastYRef.current;

        // 停止 → 復帰
        clearTimeout(stopTimerRef.current);
        stopTimerRef.current = setTimeout(
          () => animateTo(false),
          RESTORE_DELAY
        );

        // 微振動 / iOS戻り 無視
        if (Math.abs(diff) < THRESHOLD) return;
        if (Math.abs(diff) > BOUNCE_LIMIT) return;

        const isDown = diff > 0;
        animateTo(isDown);

        lastYRef.current = currentY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      gsap.killTweensOf(navRef.current);
    };
  }, []);

  /* ----------------------------------------------------
      現在地ハイライト
  ---------------------------------------------------- */
  useEffect(() => {
    const sections = ["#about", "#profile", "#menu", "#access", "#reserve"];

    const check = () => {
      let cur = "";
      for (const id of sections) {
        const el = document.querySelector(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.33 && rect.bottom > 80) {
          cur = id;
        }
      }
      setActive((p) => (p === cur ? p : cur));
    };

    window.addEventListener("scroll", check, { passive: true });
    check();

    return () => window.removeEventListener("scroll", check);
  }, []);

  /* ----------------------------------------------------
      click
  ---------------------------------------------------- */
  const scrollToTarget = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return;

    const nav = navRef.current;
    const navH = nav?.getBoundingClientRect().height || 0;

    window.scrollTo({
      top:
        window.scrollY +
        el.getBoundingClientRect().top -
        Math.min(16, navH * 0.22),
      behavior: "smooth",
    });
  };

  /* ----------------------------------------------------
      nav items
      - 予約だけ 0.5% ボタン感追加（scale/光膜）
      - 全体の光膜・影を世界観で統一
  ---------------------------------------------------- */
  const list = [
    { label: "お店", target: "#about", key: "about" },
    { label: "店主", target: "#profile", key: "profile" },
    { label: "menu", target: "#menu", key: "menu" },
    { label: "地図", target: "#access", key: "access" },
    { label: "予約", target: "#reserve", key: "reserve" }, // ← 主役
  ];

  return (
    <nav
      ref={navRef}
      className="
        fixed bottom-0 left-0 right-0 z-[80]

        /* 光膜を全体で統一（色相180°の木漏れ日） */
        bg-[linear-gradient(
          to_top,
          rgba(247,244,239,0.86) 0%,
          rgba(247,244,239,0.76) 36%,
          rgba(247,244,239,0.66) 70%,
          rgba(247,244,239,0.52) 100%
        )]

        backdrop-blur-[9px]
        border-t border-[rgba(96,78,62,0.14)]
        px-[4vw] py-[10px]
        flex justify-between

        will-change-transform
        [transform:translateZ(0)]
      "
    >
      {list.map((item) => {
        const isActive = active === item.target;
        const isReserve = item.key === "reserve";

        return (
          <button
            key={item.key}
            onClick={() => scrollToTarget(item.target)}
            className={`
              nav-sp-item relative flex flex-col items-center
              w-[17vw] text-[11.3px] tracking-[0.10em]
              font-medium select-none

              ${
                isActive
                  ? "text-[rgba(96,78,62,0.94)]"
                  : "text-[rgba(96,78,62,0.70)]"
              }

              ${
                isReserve
                  ? "active:scale-[0.915]" // 予約だけ微ボタン感
                  : "active:scale-[0.93]"
              }

            `}
          >
            {/* アイコン（あなたの元のを入れる） */}
            <div
              className={`
                w-[22px] h-[22px] mb-[3px]
                transition-all
                ${
                  isReserve
                    ? "scale-[1.012] opacity-[0.97]" // ★ 0.5% ボタン感
                    : "scale-[1] opacity-[0.88]"
                }
              `}
            />

            <span>{item.label}</span>

            {isActive && (
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2
                           w-[22px] h-[1.7px] bg-[rgba(96,78,62,0.36)]
                           rounded-full"
              />
            )}

            {/* ★ 予約だけ光膜 +5%（気づかれないレベル） */}
            {isReserve && (
              <div
                className="
                  absolute inset-0 -z-10 rounded-full
                  bg-[rgba(255,220,180,0.18)]
                  opacity-[0.22]
                "
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
