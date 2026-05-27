import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * #about などの hash に反応して該当idへスクロール
 * - prefers-reduced-motion 対応
 * - ルーティング直後のDOM未生成を1フレーム待つ
 */
export default function HashScroll() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = decodeURIComponent(hash.replace("#", ""));
    const el = document.getElementById(id);
    if (!el) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    requestAnimationFrame(() => {
      el.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    });
  }, [hash, pathname]);

  return null;
}