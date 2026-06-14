// src/components/NavYorisoiFloating.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function NavYorisoiFloating({
  // Hero中の横Navの位置
  bottom = "11vh",
  left = "8vw",

  // Hero判定
  heroId = "hero",

  // Hero抜け後のMENU（隅っこ）
  burgerCorner = "br", // "bl" | "br"
  burgerOffset = "22px", // 端からの余白
}) {
  const navRef = useRef(null);
  const burgerRef = useRef(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const reduce =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : false;

  const navList = useMemo(
    () => [
      { label: "お店", target: "#about" },
      { label: "店主", target: "#profile" },
      { label: "メニュー", target: "#menu" },
      { label: "アクセス", target: "#access" },
      { label: "予約", target: "#reserve" },
    ],
    []
  );

  const icons = useMemo(
    () => [
      <>
        <path d="M3 9l9-7 9 7" />
        <path d="M9 22V12h6v10" />
      </>,
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      </>,
      <>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>,
      <>
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2C7.5 2 4 5.58 4 10c0 6.25 8 12 8 12s8-5.75 8-12c0-4.42-3.5-8-8-8z" />
      </>,
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>,
    ],
    []
  );

  // --- Hero inView 判定（Homeのみ） ---
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    if (!isHome) {
      setHeroInView(false);
      return;
    }
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setHeroInView(false);
      return;
    }

    const hero = document.getElementById(heroId);
    if (!hero) {
      // Heroが取れないなら「抜けた扱い」でMENUを出す
      setHeroInView(false);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => setHeroInView(!!entry?.isIntersecting),
      {
        // チラつき防止：少し粘らせる
        threshold: 0.08,
        rootMargin: "-6% 0px -18% 0px",
      }
    );

    obs.observe(hero);
    return () => obs.disconnect();
  }, [isHome, heroId]);

  // 表示モード
  const showHeroNav = isHome && heroInView; // Hero中の横Nav
  const showBurger = !showHeroNav; // Hero抜け後 + 下層

  // --- Homeのみ：active（横Navのハイライト） ---
  const [activeTarget, setActiveTarget] = useState("");

  useEffect(() => {
    if (!isHome) {
      setActiveTarget("");
      return;
    }

    const sections = navList
      .map((item) => document.querySelector(item.target))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTarget(`#${entry.target.id}`);
        });
      },
      { threshold: 0.45, rootMargin: "-10% 0px -10% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome, navList]);

  // --- スクロール（Home内 or 下層→Home）保険付き ---
  const scrollToHash = (hash) => {
    if (!hash) return;
    let tries = 0;
    const tick = () => {
      const el = document.querySelector(hash);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
        return;
      }
      tries += 1;
      if (tries < 30) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const go = (toHash) => {
    setActiveTarget(toHash);

    // 下層 → Homeへ
    if (!isHome) {
      setOpen(false);
      navigate(`/${toHash}`, { replace: false });
      // Home側で描画されたあとにスクロール
      setTimeout(() => scrollToHash(toHash), 60);
      return;
    }

    // Home内
    setOpen(false);
    // URLも合わせる
    history.replaceState(null, "", toHash);
    scrollToHash(toHash);
  };

  // --- Hero横Navの登場アニメ（Hero中だけ） ---
  useEffect(() => {
    if (reduce) return;
    if (!showHeroNav) return;

    const items = navRef.current?.querySelectorAll(".nav-item");
    if (!items?.length) return;

    gsap.killTweensOf(items);
    gsap.fromTo(
      items,
      { opacity: 0, y: 14, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.92,
        ease: "power3.out",
        delay: 0.25,
        stagger: 0.07,
      }
    );

    return () => gsap.killTweensOf(items);
  }, [showHeroNav, reduce]);

  // --- Burgerの登場アニメ（Hero抜けた瞬間） ---
  useEffect(() => {
    if (reduce) return;
    if (!showBurger) return;

    const el = burgerRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { opacity: 0, y: 10, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.62,
        ease: "power3.out",
        delay: 0.04,
      }
    );

    return () => gsap.killTweensOf(el);
  }, [showBurger, reduce]);

  // --- overlay ---
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Burger位置
  const burgerStyle =
    burgerCorner === "bl"
      ? { left: burgerOffset, bottom: burgerOffset }
      : { right: burgerOffset, bottom: burgerOffset };

  return (
    <>
      {/* 1) Hero中：横ナビ（この状態のまま維持） */}
      {showHeroNav && (
        <nav
          ref={navRef}
          style={{ bottom, left }}
          className="
            fixed z-[40]
            flex items-center
            text-[15px]
            tracking-[0.18em]
          "
          aria-label="ページ内ナビゲーション（Hero）"
        >
          {navList.map((item, i) => {
            const isActive = activeTarget === item.target;

            return (
              <div key={item.label} className="flex items-center">
                <div className="nav-item">
                  <a
                    href={item.target}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.target);
                    }}
                    className={`
                      group flex items-center gap-2 transition-all duration-300
                      ${
                        isActive
                          ? "text-[rgba(96,78,62,1)]"
                          : "text-[rgba(96,78,62,0.60)] hover:text-[rgba(96,78,62,0.90)]"
                      }
                    `}
                    aria-current={isActive ? "location" : undefined}
                  >
                    <svg
                      className={`
                        w-[16px] h-[16px] shrink-0 transition-all duration-300
                        ${isActive ? "opacity-95" : "opacity-60 group-hover:opacity-90"}
                      `}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {icons[i]}
                    </svg>

                    <span className="relative">
                      <span className="transition-all duration-300 group-hover:tracking-[0.22em]">
                        {item.label}
                      </span>
                      <span
                        className={`
                          absolute -bottom-[3px] left-0
                          h-[1px] bg-[rgba(96,78,62,0.55)]
                          transition-all duration-500 ease-out
                          ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                        `}
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </div>

                {i < navList.length - 1 && (
                  <span
                    className="mx-6 text-[rgba(96,78,62,0.25)] select-none"
                    aria-hidden="true"
                  >
                    ｜
                  </span>
                )}
              </div>
            );
          })}
        </nav>
      )}

      {/* 2) Hero抜け後 + 下層：隅っこMENU（ハンバーガー） */}
      {showBurger && (
        <>
          <button
            ref={burgerRef}
            type="button"
            onClick={() => setOpen(true)}
            style={burgerStyle}
            className="
              fixed z-[70]
              flex items-center gap-2
              text-[12px] tracking-[0.22em]
              text-[rgba(96,78,62,0.72)]
              hover:text-[rgba(96,78,62,0.92)]
              transition
            "
            aria-label="メニューを開く"
          >
            <span className="relative top-[1px]">MENU</span>
            <span
              className="
                relative w-[18px] h-[10px]
                before:absolute before:left-0 before:top-0 before:w-full before:h-[1px]
                before:bg-[rgba(96,78,62,0.55)]
                after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px]
                after:bg-[rgba(96,78,62,0.55)]
              "
              aria-hidden="true"
            />
          </button>

          {open && (
            <div
              className="
                fixed inset-0 z-[80]
                bg-[rgba(247,244,239,0.92)]
                backdrop-blur-[1.5px]
              "
              role="dialog"
              aria-modal="true"
              aria-label="メニュー"
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) setOpen(false);
              }}
            >
              <div className="h-full px-[6vw] py-[6vh]">
                <div className="mx-auto max-w-[980px] h-full flex flex-col">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] tracking-[0.28em] text-[rgba(96,78,62,0.55)]">
                      NAVIGATION
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="
                        text-[12px] tracking-[0.22em]
                        text-[rgba(96,78,62,0.62)]
                        hover:text-[rgba(96,78,62,0.90)]
                        transition
                      "
                    >
                      CLOSE
                    </button>
                  </div>

                  <div className="mt-10 border-t border-[rgba(96,78,62,0.16)]" />

                  <nav className="mt-10">
                    <ul className="space-y-6">
                      {navList.map((it) => (
                        <li key={it.target}>
                          <button
                            type="button"
                            onClick={() => go(it.target)}
                            className="
                              w-full text-left
                              text-[26px] leading-[1.25]
                              text-[#3f3229]
                              tracking-[0.02em]
                              hover:opacity-80 transition
                            "
                          >
                            {it.label}
                          </button>
                          <div className="mt-4 border-b border-[rgba(96,78,62,0.14)]" />
                        </li>
                      ))}
                    </ul>
                  </nav>

                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}