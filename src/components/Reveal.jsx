// src/components/Reveal.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  duration = 0.62,
  ease = "power3.out",
  y = 14,
  blur = 0.16,
  once = true,
  rootMargin = "0px 0px -12% 0px",
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (reduce) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
      return;
    }

    gsap.set(el, {
      opacity: 0,
      y,
      filter: `blur(${blur}px)`,
      willChange: "transform, opacity, filter",
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;

          gsap.to(el, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration,
            delay,
            ease,
            onComplete: () => {
              el.style.willChange = "auto";
            },
          });

          if (once) io.unobserve(el);
        });
      },
      { root: null, rootMargin, threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, duration, ease, y, blur, once, rootMargin]);

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
}