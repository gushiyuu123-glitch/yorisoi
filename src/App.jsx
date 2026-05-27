// src/App.jsx
import { useEffect, useState } from "react";
import AppPC from "./AppPC";
import AppSP from "./AppSP";

const BREAKPOINT = 820;

export default function App() {
  const [isSP, setIsSP] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.(`(max-width: ${BREAKPOINT}px)`)?.matches ?? false;
  });

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINT}px)`);
    const onChange = (e) => setIsSP(e.matches);

    // 初回同期（念のため）
    setIsSP(mql.matches);

    // modern / legacy Safari
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  return isSP ? <AppSP /> : <AppPC />;
}