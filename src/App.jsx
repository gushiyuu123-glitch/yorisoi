// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import AppPC from "./AppPC";
import AppSP from "./AppSP";
import ScrollToTop from "./components/ScrollToTop";
import HashScroll from "./components/HashScroll";

const BREAKPOINT = 820;

function getIsSP() {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.(`(max-width: ${BREAKPOINT}px)`)?.matches ?? false;
}

export default function App() {
  const [isSP, setIsSP] = useState(getIsSP);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia(`(max-width: ${BREAKPOINT}px)`);

    const handleChange = (event) => {
      setIsSP(event.matches);
    };

    // 初回表示時に現在の画面幅を反映
    setIsSP(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // 古いSafari対策
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        // 古いSafari対策
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <HashScroll />

      {isSP ? <AppSP /> : <AppPC />}

      <Analytics />
    </BrowserRouter>
  );
}