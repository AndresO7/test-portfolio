"use client";

import { useState, useEffect } from "react";

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const narrow = window.innerWidth < 768;
      const touchOnly =
        navigator.maxTouchPoints > 0 &&
        !window.matchMedia("(hover: hover)").matches;
      setIsMobile(narrow || touchOnly);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}
