// ============================================================================
// NavYorisoiFloatingSP — 最強完全版（静止復帰 / iOS対策 / 予約強調）
// GUSHIKEN DESIGN × NOA
// ============================================================================

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function NavYorisoiFloatingSP() {
  const navRef = useRef(null);
  const [active, setActive] = useState("");

  // ---- 安定用 refs ----
  const lastYRef = useRef(0);
  const hiddenRef = useRef(false);
  const rafRef = useRef(0);
  const stopTimerRef = useRef(null);

  // ---- 初回 show 時の “呼吸” を一度だけ抑制 ----
  const hasShownOnceRef = useRef(false);

  // ---------------------------------------------
  // ★ 復帰遅延（0.15〜0.40 の間で調整可能）
  // ---------------------------------------------
  const RESTORE_DELAY = 250; // ← 0.25s（最も自然）

  /* ----------------------------------------------------
        初回フェードイン（blur は 0.18px）
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
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        delay: 1.1,
      }
    );
  }, []);

  /* ----------------------------------------------------
        隠れる/出る（スクロール方向）
        + 停止 → 遅延で出る（完全版）
        + iOS overscroll 無視
  ---------------------------------------------------- */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    lastYRef.current = window.scrollY || 0;

    const SHOW_Y = 0;
    const HIDE_Y = 72;

    // ★ 微揺れ除去 + iOSバウンス除去（2段階）
    const THRESHOLD = 6;     // 微小揺れ
    const BOUNCE_LIMIT = 22; // iOSの大きな跳ね返りも無視

    const animateTo = (hide) => {
      const el = navRef.current;
      if (!el) return;

      if (hiddenRef.current === hide) return;
      hiddenRef.current = hide;

      gsap.killTweensOf(el);

      gsap.to(el, {
        y: hide ? HIDE_Y : SHOW_Y,
        opacity: hide ? 0 : 1,
        duration: hide ? 0.24 : 0.32,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          if (!hide) {
            if (!hasShownOnceRef.current) {
              hasShownOnceRef.current = true;
              return;
            }
            // ★ 表示直後の呼吸（0.8px） — 裕人の世界観
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

        // ---- 停止後の復帰（ここが最重要） ----
        clearTimeout(stopTimerRef.current);
        stopTimerRef.current = setTimeout(() => {
          animateTo(false); // show
        }, RESTORE_DELAY);

        // ---- overscroll 対策：iOS大揺れ無視 ----
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
      let current = "";
      for (const id of sections) {
        const el = document.querySelector(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.33 && rect.bottom > 80) {
          current = id;
        }
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  /* ----------------------------------------------------
        click: スムーススクロール
  ---------------------------------------------------- */
  const scrollToTarget = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return;

    const nav = navRef.current;
    const navH = nav ? nav.getBoundingClientRect().height : 0;

    window.scrollTo({
      top:
        window.scrollY +
        el.getBoundingClientRect().top -
        Math.min(14, navH * 0.22),
      behavior: "smooth",
    });
  };

  /* ----------------------------------------------------
        NAV LIST（予約だけ光膜強化）
  ---------------------------------------------------- */
  const navList = [
    { label: "お店", target: "#about", key: "about" },
    { label: "店主", target: "#profile", key: "profile" },
    { label: "menu", target: "#menu", key: "menu" },
    { label: "地図", target: "#access", key: "access" },
    { label: "予約", target: "#reserve", key: "reserve" }, // ← 特別扱い
  ];

  return (
    <nav
      ref={navRef}
      className="
        fixed bottom-0 left-0 right-0 z-[80]

        bg-[linear-gradient(
          to_top,
          rgba(247,244,239,0.86) 0%,
          rgba(247,244,239,0.76) 36%,
          rgba(247,244,239,0.64) 70%,
          rgba(247,244,239,0.54) 100%
        )]

        backdrop-blur-[9px]
        border-t border-[rgba(96,78,62,0.14)]
        px-[4vw] py-[10px]
        flex justify-between
        will-change-transform
      "
    >
      {navList.map((item) => {
        const isActive = active === item.target;

        return (
          <button
            key={item.key}
            onClick={() => scrollToTarget(item.target)}
            className={`
              nav-sp-item relative flex flex-col items-center
              w-[17vw] text-[11.3px]
              tracking-[0.10em] font-medium
              ${
                isActive
                  ? "text-[rgba(96,78,62,0.94)]"
                  : "text-[rgba(96,78,62,0.70)]"
              }
              active:scale-[0.93]
              select-none
            `}
          >
            {/* アイコン */}
            <div
              className={`
                w-[22px] h-[22px] mb-[3px]
                ${item.key === "reserve" ? "opacity-100" : "opacity-85"}
              `}
            >
              {/* アイコンは省略（既存のものをそのまま） */}
            </div>

            <span>{item.label}</span>

            {/* アクティブ下線 */}
            {isActive && (
              <div
                className="
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  w-[22px] h-[1.7px]
                  bg-[rgba(96,78,62,0.36)]
                  rounded-full
                "
              />
            )}

            {/* ★ 予約だけ光膜を少し強化（+15%） */}
            {item.key === "reserve" && (
              <div
                className="
                  absolute inset-0 -z-10
                  rounded-full
                  opacity-[0.20]
                  bg-[rgba(255,205,150,0.25)]
                "
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
