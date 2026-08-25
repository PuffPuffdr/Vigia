"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useInViewport } from "@/lib/hooks/useInViewport";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsSmallScreen } from "./useIsSmallScreen";

const HouseScene = dynamic(() => import("./HouseScene"), { ssr: false });

export default function HouseCanvas() {
  const [ref, isVisible] = useInViewport<HTMLDivElement>("300px");
  const reducedMotion = useReducedMotion();
  const isSmallScreen = useIsSmallScreen();

  return (
    <div ref={ref} className="relative h-[520px] w-full overflow-hidden rounded-xl3 sm:h-[600px] lg:h-[680px]">
      {isVisible ? (
        <Suspense fallback={<HouseFallback />}>
          <HouseScene lightweight={isSmallScreen} reducedMotion={reducedMotion} />
        </Suspense>
      ) : (
        <HouseFallback />
      )}
    </div>
  );
}

function HouseFallback() {
  return (
    <div className="glass-panel flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl3 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
      <p className="px-6 text-sm text-text-mute">Cargando tu casa en 3D…</p>
    </div>
  );
}
