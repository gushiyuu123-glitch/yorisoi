// src/components_sp/NavYorisoiFloatingSP.jsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function NavYorisoiFloatingSP() {
  const navRef = useRef(null);
  const [active, setActive] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const reduce = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    );
  }, []);

  const list = useMemo(
    () => [
  { label: "お店", key: "about", target: "#about" },
  { label: "メニュー", key: "menu", target: "#menu" },
  { label: "店主", key: "profile", target: "#profile" },
  { label: "地図", key: "access", target: "#access" },
  { label: "お知らせ", key: "news", target: "/news" },
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
    news: (
      <>
        <path d="M6 3h10a2 2 0 0 1 2 2v14" />
        <path d="M6 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
        <path d="M8 15h6" />
      </>
    ),
  };

  // 初回フェード：軽め
  useEffect(() => {
    if (reduce) return;

    const items = navRef.current?.querySelectorAll?.(".nav-sp-item");
    if (!items?.length) return;

    gsap.killTweensOf(items);

    gsap.fromTo(
      items,
      { opacity: 0, y: 5 },
      {
        opacity: 1,
        y: 0,
        duration: 0.42,
        ease: "power3.out",
        stagger: 0.035,
        delay: 0.45,
      }
    );

    return () => gsap.killTweensOf(items);
  }, [reduce]);

  // iPhone Safari：キーボード表示時の下ナビ暴れ防止
  useEffect(() => {
    if (typeof window === "undefined") return;

    const vv = window.visualViewport;
    if (!vv) return;

    let raf = 0;

    const checkKeyboard = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const diff = window.innerHeight - vv.height;
        setKeyboardOpen(diff > 170);
      });
    };

    checkKeyboard();

    vv.addEventListener("resize", checkKeyboard, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      vv.removeEventListener("resize", checkKeyboard);
    };
  }, []);

  // /news系では「お知らせ」をアクティブ
  useEffect(() => {
    if (pathname === "/news" || pathname.startsWith("/news/")) {
      setActive("/news");
      return;
    }

    if (pathname !== "/") {
      setActive("");
    }
  }, [pathname]);

  // 別ページから /#about などで戻ってきた時のスクロール補正
  useEffect(() => {
    if (pathname !== "/" || !hash) return;

    let raf = 0;

    raf = requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (!el) return;

      el.scrollIntoView({
        behavior: "auto",
        block: "start",
      });

      setActive(hash);
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  // 現在地ハイライト：LPトップのときだけ
  useEffect(() => {
    if (pathname !== "/") return;

    const ids = ["#about", "#profile", "#menu", "#access"];
    const els = ids.map((id) => document.querySelector(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0) ||
              (a.boundingClientRect?.top ?? 0) -
                (b.boundingClientRect?.top ?? 0)
          );

        if (visible[0]) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      {
        threshold: [0.18, 0.28, 0.38],
        rootMargin: "-22% 0px -58% 0px",
      }
    );

    els.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, [pathname]);

  const go = useCallback(
    (target) => {
      // /news
      if (target.startsWith("/")) {
        navigate(target);
        return;
      }

      // 別ページからLP内セクションへ
      if (pathname !== "/") {
        navigate({ pathname: "/", hash: target });
        return;
      }

      // 同一ページ内スクロール
      const el = document.querySelector(target);

      if (el) {
        el.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        });

        window.history.replaceState(null, "", target);
        setActive(target);
      }
    },
    [navigate, pathname, reduce]
  );

  return (
<nav
  ref={navRef}
  className={`
    fixed left-0 right-0 z-[80]

    bg-[linear-gradient(
      to_top,
      rgba(247,244,239,0.86)_0%,
      rgba(247,244,239,0.78)_54%,
      rgba(247,244,239,0.62)_100%
    )]
    supports-[backdrop-filter]:bg-[rgba(247,244,239,0.72)]
    supports-[backdrop-filter]:backdrop-blur-[5px]
    supports-[backdrop-filter]:backdrop-saturate-[1.08]

    border-t border-[rgba(255,255,255,0.46)]
    shadow-[0_-10px_28px_rgba(62,47,35,0.065),inset_0_1px_0_rgba(255,255,255,0.58)]

    px-[4.2vw]
    pt-[9px]
    pb-[calc(9px+env(safe-area-inset-bottom))]

    flex justify-between

    transition-[opacity,transform] duration-200 ease-out
    [transform:translate3d(0,0,0)]
    [contain:paint]

    ${keyboardOpen ? "opacity-0 translate-y-[16px] pointer-events-none" : "opacity-100 translate-y-0"}
  `}
  style={{
    bottom: "max(6px, env(safe-area-inset-bottom))",
  }}
  aria-label="ページ内ナビゲーション"
>
      {list.map((item) => {
        const isActive = active === item.target;

        return (
          <button
            type="button"
            key={item.key}
            onClick={() => go(item.target)}
            aria-current={isActive ? "location" : undefined}
            className={`
              nav-sp-item
              relative flex flex-col items-center justify-center
              w-[17vw]
              text-[11.2px]
              tracking-[0.085em]
              font-medium
              select-none
              touch-manipulation

              transition-[color,opacity,transform] duration-150

              ${isActive ? "text-[rgba(96,78,62,0.96)]" : "text-[rgba(96,78,62,0.62)]"}

              active:opacity-[0.82]
              active:scale-[0.94]
            `}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.28"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`
                w-[21px] h-[21px] mb-[3px]
                transition-opacity duration-150
                ${isActive ? "opacity-100" : "opacity-[0.76]"}
              `}
              aria-hidden="true"
            >
              {Icons[item.key]}
            </svg>

            <span className="leading-none whitespace-nowrap">
              {item.label}
            </span>

            {isActive && (
              <span
                className="
                  absolute left-1/2 -translate-x-1/2
                  bottom-[-6px]
                  w-[20px] h-[1.6px]
                  rounded-full
                  bg-[rgba(96,78,62,0.34)]
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