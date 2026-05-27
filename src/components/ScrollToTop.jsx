import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ルート遷移時にスクロール位置をトップへ戻す
 * - pathname のみ監視（hashだけ変わる場合は動かさない）
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}