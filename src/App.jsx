// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import AppPC from "./AppPC";
import AppSP from "./AppSP";
import ScrollToTop from "./components/ScrollToTop";
import HashScroll from "./components/HashScroll";

const BREAKPOINT = 820;

export default function App() {
  const [isSP, setIsSP] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.(`(max-width: ${BREAKPOINT}px)`)?.matches ?? false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${BREAKPOINT}px)`);

    const onChange = (e) => {
      setIsSP(e.matches);
    };

    setIsSP(mql.matches);

    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
    } else {
      mql.addListener(onChange);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onChange);
      } else {
        mql.removeListener(onChange);
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <HashScroll />

      {isSP ? <AppSP /> : <AppPC />}
    </BrowserRouter>
  );
}