import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NavYorisoiFloating() {
  const navRef = useRef(null);

  useEffect(() => {
    const items = navRef.current.querySelectorAll(".nav-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 14, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.15,
        ease: "power3.out",
        delay: 4.3,
      }
    );
  }, []);

  const navList = [
    { label: "お店", target: "#about" },
    { label: "店主", target: "#profile" },
    { label: "メニュー", target: "#menu" },
    { label: "アクセス", target: "#access" },
    { label: "予約", target: "#reserve" },
  ];

  const icons = [
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
  ];

  return (
    <nav
      ref={navRef}
      className="
        absolute bottom-[11vh] left-[8vw] z-[40]
        flex items-center gap-8
        text-[15px]
        text-[rgba(96,78,62,0.75)]
        tracking-[0.18em]
      "
    >
      {navList.map((item, i) => (
        <div key={item.label} className="nav-item flex items-center gap-8">
          <button
            onClick={() =>
              document.querySelector(item.target)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            className="
              group flex items-center gap-2
              transition-all duration-300
              hover:text-[rgba(96,78,62,0.90)]
            "
          >
            <svg
              className="
                w-[16px] h-[16px]
                opacity-75 group-hover:opacity-95
                transition-all
              "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {icons[i]}
            </svg>

            <span className="transition-all group-hover:tracking-[0.20em]">
              {item.label}
            </span>
          </button>

          {i < navList.length - 1 && (
            <span className="opacity-30 text-[rgba(96,78,62,0.6)]">｜</span>
          )}
        </div>
      ))}
    </nav>
  );
}
