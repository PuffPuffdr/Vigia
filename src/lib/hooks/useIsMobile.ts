"use client";

import { useEffect, useState } from "react";

/**
 * Matches Tailwind's `md` breakpoint (768px). Below it, 3D canvases fall
 * back to a static render for performance (brief section: rendimiento).
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(query.matches);

    const listener = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, [breakpoint]);

  return isMobile;
}
