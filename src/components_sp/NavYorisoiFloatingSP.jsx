// src/components_sp/NavYorisoiFloatingSP.jsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function NavYorisoiFloatingSP() {
  const navRef = useRef(null);

  const [active, setActive] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Safari下UI対策：上スクロール時に下ナビを逃がす
  const [navHidden, setNavHidden] = useState(true);
  const navHiddenRef = useRef(true);

  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const reduce = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    );
  }, []);

  const setHidden = useCallback((value) => {
    if (navHiddenRef.current === value) return;
    navHiddenRef.current = value;
    setNavHidden(value);
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

  const scrollToTarget = useCallback(
    (target, behavior = reduce ? "auto" : "smooth") => {
      if (typeof window === "undefined") return false;

      const el = document.querySelector(target);
      if (!el) return false;

      // 上固定UIぶんだけ着地点を下げる
      const headerOffset = 118;

      const y = Math.max(
        0,
        window.scrollY + el.getBoundingClientRect().top - headerOffset
      );

      window.scrollTo({
        top: y,
        behavior,
      });

      return true;
    },
    [reduce]
  );

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

  // Safari下UI対策：スクロール方向で下ナビを制御
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastY = window.scrollY || 0;
    let raf = 0;

    const TOP_HIDE = 96;
    const SHOW_AFTER = 150;
    const DELTA = 10;

    const onScroll = () => {
      if (raf) return;

      raf = requestAnimationFrame(() => {
        raf = 0;

        const currentY = window.scrollY || 0;
        const diff = currentY - lastY;

        // ページ上部では出さない
        if (currentY < TOP_HIDE) {
          setHidden(true);
          lastY = currentY;
          return;
        }

        // 微細な揺れでは反応しない
        if (Math.abs(diff) < DELTA) return;

        const scrollingDown = diff > 0;
        const scrollingUp = diff < 0;

        if (scrollingDown && currentY > SHOW_AFTER) {
          setHidden(false);
        }

        if (scrollingUp) {
          setHidden(true);
        }

        lastY = currentY;
      });
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pageshow", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", onScroll);
    };
  }, [setHidden]);

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

    let raf1 = 0;
    let raf2 = 0;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const ok = scrollToTarget(hash, "auto");
        if (ok) setActive(hash);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname, hash, scrollToTarget]);

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
        rootMargin: "-24% 0px -56% 0px",
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
      const ok = scrollToTarget(target);

      if (ok) {
        window.history.replaceState(null, "", target);
        setActive(target);
      }
    },
    [navigate, pathname, scrollToTarget]
  );

  const isHidden = keyboardOpen || navHidden;

  return (
 <nav
  ref={navRef}
  className={`
    fixed left-0 right-0 z-[80]

    bg-[linear-gradient(
      to_top,
      rgba(248,245,240,0.82)_0%,
      rgba(248,245,240,0.68)_58%,
      rgba(248,245,240,0.18)_100%
    )]

    supports-[backdrop-filter]:bg-[rgba(248,245,240,0.46)]
    supports-[backdrop-filter]:backdrop-blur-[10px]
    supports-[backdrop-filter]:backdrop-saturate-[1.08]

    shadow-[0_-1px_0_rgba(255,255,255,0.46),0_-14px_34px_rgba(88,72,56,0.045)]

    px-[4.6vw]
    pt-[10px]
    pb-[calc(10px+env(safe-area-inset-bottom))]

    flex justify-between

    transform-gpu
    will-change-transform
    [contain:paint]

    transition-[opacity,transform,filter]
    duration-300
    ease-[cubic-bezier(.22,.8,.24,1)]

    ${
      isHidden
        ? "opacity-0 translate-y-[calc(100%+18px)] pointer-events-none blur-[1px]"
        : "opacity-100 translate-y-0 pointer-events-auto blur-0"
    }
  `}
  style={{
    bottom: 0,
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
              min-h-[45px]

              text-[11.2px]
              tracking-[0.085em]
              font-medium

              select-none
              touch-manipulation

              transition-[color,opacity,transform]
              duration-150

              ${
                isActive
                  ? "text-[rgba(96,78,62,0.96)]"
                  : "text-[rgba(96,78,62,0.62)]"
              }

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
                  bottom-[-3px]
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