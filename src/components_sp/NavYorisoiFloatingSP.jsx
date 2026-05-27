import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function NavYorisoiFloatingSP() {
  const navRef = useRef(null);
  const [active, setActive] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const reduce =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : false;

  const list = useMemo(
    () => [
      { label: "お店", key: "about", target: "#about" },
      { label: "店主", key: "profile", target: "#profile" },
      { label: "メニュー", key: "menu", target: "#menu" },
      { label: "地図", key: "access", target: "#access" },
      { label: "予約", key: "reserve", target: "#reserve" },
    ],
    []
  );

  const Icons = {
    about: (
      <>
        <path d="M3 9l9-6 9 6" />
        <path d="M9 21V12h6v9" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      </>
    ),
    menu: (
      <>
        <line x1="3" y1="7" x2="21" y2="7" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="17" x2="21" y2="17" />
      </>
    ),
    access: (
      <>
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2C7.5 2 4 5.6 4 10c0 6.5 8 12 8 12s8-5.5 8-12c0-4.4-3.5-8-8-8z" />
      </>
    ),
    reserve: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
  };

  // 初回フェードは “一回だけ・薄く”
  useEffect(() => {
    if (reduce) return;
    const items = navRef.current?.querySelectorAll?.(".nav-sp-item");
    if (!items?.length) return;

    gsap.killTweensOf(items);
    gsap.fromTo(
      items,
      { opacity: 0, y: 6, filter: "blur(0.10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.52,
        ease: "power3.out",
        stagger: 0.04,
        delay: 0.55,
      }
    );

    return () => gsap.killTweensOf(items);
  }, [reduce]);

  // 現在地ハイライト（IntersectionObserver）
  useEffect(() => {
    if (pathname !== "/") {
      setActive("");
      return;
    }

    const ids = ["#about", "#profile", "#menu", "#access", "#reserve"];
    const els = ids.map((id) => document.querySelector(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0) ||
              (a.boundingClientRect?.top ?? 0) - (b.boundingClientRect?.top ?? 0)
          );

        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { threshold: [0.18, 0.28, 0.38], rootMargin: "-20% 0px -55% 0px" }
    );

    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [pathname]);

  // hash更新だけ（スクロールは HashScroll が担当）
  const go = (hash) => {
    if (pathname !== "/") {
      navigate({ pathname: "/", hash }, { replace: true });
      return;
    }
    navigate({ hash }, { replace: true });
  };

  return (
    <nav
      ref={navRef}
      className="
        fixed bottom-0 left-0 right-0 z-[80]
        bg-[linear-gradient(
          to_top,
          rgba(247,244,239,0.90) 0%,
          rgba(247,244,239,0.78) 40%,
          rgba(247,244,239,0.62) 74%,
          rgba(247,244,239,0.46) 100%
        )]
        backdrop-blur-[10px]
        border-t border-[rgba(96,78,62,0.13)]
        px-[4vw]
        pt-[10px]
        pb-[calc(10px+env(safe-area-inset-bottom))]
        flex justify-between
        [transform:translateZ(0)]
      "
      aria-label="ページ内ナビゲーション"
    >
      {list.map((item) => {
        const isActive = active === item.target;
        const isReserve = item.key === "reserve";

        return (
          <button
            type="button"
            key={item.key}
            onClick={() => go(item.target)}
            aria-current={isActive ? "location" : undefined}
            className={`
              nav-sp-item relative flex flex-col items-center
              w-[17vw] text-[11.2px] tracking-[0.10em] font-medium
              select-none
              ${isActive ? "text-[rgba(96,78,62,0.95)]" : "text-[rgba(96,78,62,0.66)]"}
              active:opacity-[0.82]
              ${isReserve ? "active:scale-[0.90]" : "active:scale-[0.93]"}
            `}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.28"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-[21px] h-[21px] mb-[3px] ${isReserve ? "opacity-[0.96]" : "opacity-[0.86]"}`}
              aria-hidden="true"
            >
              {Icons[item.key]}
            </svg>

            <span>{item.label}</span>

            {isActive && (
              <div
                className="
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  w-[22px] h-[1.7px]
                  bg-[rgba(96,78,62,0.34)]
                  rounded-full
                "
                aria-hidden="true"
              />
            )}

            {isReserve && (
              <div
                className="
                  absolute inset-0 -z-10 rounded-full
                  bg-[rgba(255,225,190,0.18)]
                  opacity-[0.22]
                "
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}