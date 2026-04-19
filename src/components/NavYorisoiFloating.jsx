// NavYorisoiFloating.jsx（改善完全版）
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function NavYorisoiFloating({ bottom = "11vh" }) {
  // ✅ 改善: bottom prop を受け取って実際に使う（元は常に bottom-[11vh] で固定されていた）
  const navRef = useRef(null);
  const [activeTarget, setActiveTarget] = useState(null);

  const navList = [
    { label: "お店",   target: "#about"   },
    { label: "店主",   target: "#profile" },
    { label: "メニュー", target: "#menu"  },
    { label: "アクセス", target: "#access"},
    { label: "予約",   target: "#reserve" },
  ];

  const icons = [
    // お店
    <>
      <path d="M3 9l9-7 9 7" />
      <path d="M9 22V12h6v10" />
    </>,
    // 店主
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
    </>,
    // メニュー
    <>
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>,
    // アクセス
    <>
      <circle cx="12" cy="10" r="3" />
      <path d="M12 2C7.5 2 4 5.58 4 10c0 6.25 8 12 8 12s8-5.75 8-12c0-4.42-3.5-8-8-8z" />
    </>,
    // 予約
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </>,
  ];

  /* ============================================
      GSAP 入場アニメ
      ✅ 改善: stagger で1アイテムずつ順に出現
      ✅ 改善: cleanup で killTweensOf
  ============================================ */
  useEffect(() => {
    const items = navRef.current?.querySelectorAll(".nav-item");
    if (!items?.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 14, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power3.out",
        delay: 4.3,
        stagger: 0.07, // ✅ 追加: 順番に流れるように
      }
    );

    return () => gsap.killTweensOf(items); // ✅ 改善: cleanup
  }, []);

  /* ============================================
      ✅ 追加: IntersectionObserver でアクティブセクションを追跡
      スクロール位置に応じてナビアイテムをハイライト
  ============================================ */
  useEffect(() => {
    const sections = navList
      .map((item) => document.querySelector(item.target))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTarget(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.45, rootMargin: "-10% 0px -10% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect(); // ✅ cleanup
  }, []);

  const handleClick = (target) => {
    document.querySelector(target)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      ref={navRef}
      // ✅ 改善: bottom を prop から動的に適用
      style={{ bottom }}
      className="
        absolute left-[8vw] z-[40]
        flex items-center
        text-[15px]
        tracking-[0.18em]
      "
      aria-label="ページ内ナビゲーション" // ✅ 追加
    >
      {navList.map((item, i) => {
        const isActive = activeTarget === item.target;

        return (
          // ✅ 改善: セパレーターを nav-item の外に出す
          //         → gap の二重計算がなくなりスペーシングが均等に
          <div key={item.label} className="flex items-center">
            <div className="nav-item">
              {/*
                ✅ 改善: <button> → <a href> に変更
                ナビゲーションには <a> が意味的に正しい
                onClick は scrollIntoView のスムーズ制御のために残す
              */}
              <a
                href={item.target}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.target);
                }}
                className={`
                  group flex items-center gap-2
                  transition-all duration-300
                  ${
                    isActive
                      ? "text-[rgba(96,78,62,1)]"       // ✅ アクティブ: 濃く
                      : "text-[rgba(96,78,62,0.60)] hover:text-[rgba(96,78,62,0.90)]"
                  }
                `}
                aria-current={isActive ? "location" : undefined} // ✅ 追加
              >
                <svg
                  className={`
                    w-[16px] h-[16px] shrink-0
                    transition-all duration-300
                    ${isActive
                      ? "opacity-95"
                      : "opacity-60 group-hover:opacity-90"
                    }
                  `}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true" // ✅ 追加
                >
                  {icons[i]}
                </svg>

                <span className="relative">
                  <span className="transition-all duration-300 group-hover:tracking-[0.22em]">
                    {item.label}
                  </span>

                  {/* ✅ 追加: アクティブ時のアンダーライン */}
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

            {/* ✅ 改善: セパレーターを nav-item の外へ → スペースが均一になる */}
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
  );
}