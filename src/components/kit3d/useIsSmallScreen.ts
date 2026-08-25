"use client";

import { useEffect, useState } from "react";

/**
 * Used only to trim shadow quality/detail on the 3D house for narrower
 * screens — unlike the hero's doorbell, this scene renders dozens of meshes
 * plus shadow-casting geometry, so it benefits from a lighter tier on
 * mid-range phones. The scene itself still renders on every screen size.
 */
export function useIsSmallScreen(breakpoint = 768): boolean {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsSmall(query.matches);

    const listener = (event: MediaQueryListEvent) => setIsSmall(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, [breakpoint]);

  return isSmall;
}
